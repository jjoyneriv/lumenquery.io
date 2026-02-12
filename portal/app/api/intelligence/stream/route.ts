import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkIntelligenceAccess, getWhaleThreshold } from '@/lib/intelligence/gates';
import {
  fetchPayments,
  fetchOperations,
  filterWhaleMovements,
  transformOperation,
  mapOperationType,
} from '@/lib/intelligence/horizon-client';
import { StreamFilterType } from '@/lib/intelligence/types';

const HORIZON_URL = process.env.HORIZON_API_URL || 'http://stellar-horizon:8000';

export async function GET(req: Request) {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Get user and organization
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });

  if (!user?.organizationId) {
    return NextResponse.json(
      { error: 'Organization not found' },
      { status: 400 }
    );
  }

  // Check streaming access
  const access = await checkIntelligenceAccess(user.organizationId, 'stream');
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.reason },
      { status: 403 }
    );
  }

  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const filter = (searchParams.get('filter') || 'all') as StreamFilterType;
  const filterValue = searchParams.get('value') || undefined;
  const minAmount = parseFloat(searchParams.get('minAmount') || '0');

  // Get whale threshold
  const whaleThreshold = await getWhaleThreshold(user.organizationId);

  // Create SSE stream
  let isActive = true;
  let lastCursor: string | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // Send initial connection message
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: 'connected',
            filter,
            filterValue,
            timestamp: new Date().toISOString(),
          })}\n\n`
        )
      );

      // Poll for new transactions/operations
      const poll = async () => {
        while (isActive) {
          try {
            let operations: Awaited<ReturnType<typeof fetchOperations>>['operations'] = [];

            // Fetch based on filter type
            if (filter === 'payments' || filter === 'whale') {
              const result = await fetchPayments(50, lastCursor);
              operations = result.payments;
              if (result.nextCursor) lastCursor = result.nextCursor;
            } else {
              const result = await fetchOperations(50, lastCursor);
              operations = result.operations;
              if (result.nextCursor) lastCursor = result.nextCursor;
            }

            // Filter operations based on filter type
            let filtered = operations;

            switch (filter) {
              case 'payments':
                filtered = operations.filter(
                  (op) =>
                    op.type === 'payment' ||
                    op.type === 'create_account' ||
                    op.type === 'path_payment_strict_send' ||
                    op.type === 'path_payment_strict_receive'
                );
                break;

              case 'offers':
                filtered = operations.filter(
                  (op) =>
                    op.type === 'manage_sell_offer' ||
                    op.type === 'manage_buy_offer' ||
                    op.type === 'create_passive_sell_offer'
                );
                break;

              case 'path_payments':
                filtered = operations.filter(
                  (op) =>
                    op.type === 'path_payment_strict_send' ||
                    op.type === 'path_payment_strict_receive'
                );
                break;

              case 'trustlines':
                filtered = operations.filter((op) => op.type === 'change_trust');
                break;

              case 'account':
                if (filterValue) {
                  filtered = operations.filter(
                    (op) =>
                      op.source_account === filterValue ||
                      op.from === filterValue ||
                      op.to === filterValue
                  );
                }
                break;

              case 'asset':
                if (filterValue) {
                  filtered = operations.filter(
                    (op) =>
                      op.asset_code === filterValue ||
                      (op.asset_type === 'native' && filterValue === 'XLM')
                  );
                }
                break;

              case 'whale':
                filtered = filterWhaleMovements(
                  operations,
                  minAmount > 0 ? minAmount : whaleThreshold
                );
                break;

              case 'contracts':
                filtered = operations.filter(
                  (op) => op.type === 'invoke_host_function'
                );
                break;
            }

            // Send filtered operations
            for (const op of filtered) {
              const transformed = transformOperation(op);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: 'transaction',
                    operation: {
                      ...transformed,
                      transactionType: mapOperationType(op.type),
                      createdAt: op.created_at,
                      successful: op.transaction_successful,
                    },
                    timestamp: new Date().toISOString(),
                  })}\n\n`
                )
              );
            }

            // Send heartbeat
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'heartbeat',
                  timestamp: new Date().toISOString(),
                })}\n\n`
              )
            );

            // Wait before next poll
            await new Promise((resolve) => setTimeout(resolve, 5000));
          } catch (error) {
            console.error('Stream error:', error);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'error',
                  message: 'Error fetching data',
                  timestamp: new Date().toISOString(),
                })}\n\n`
              )
            );

            // Wait before retry
            await new Promise((resolve) => setTimeout(resolve, 10000));
          }
        }
      };

      poll();

      // Handle client disconnect
      req.signal.addEventListener('abort', () => {
        isActive = false;
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
