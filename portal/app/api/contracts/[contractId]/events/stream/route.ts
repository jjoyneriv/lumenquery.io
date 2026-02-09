import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkSorobanProAccess } from '@/lib/soroban/gates';
import { getEvents } from '@/lib/soroban/rpc-client';

export async function GET(
  req: Request,
  { params }: { params: { contractId: string } }
) {
  const { contractId } = params;

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
  const access = await checkSorobanProAccess(user.organizationId, 'stream');
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.reason },
      { status: 403 }
    );
  }

  // Get contract
  const contract = await prisma.contract.findUnique({
    where: { contractId },
    select: { id: true },
  });

  if (!contract) {
    return NextResponse.json(
      { error: 'Contract not found' },
      { status: 404 }
    );
  }

  // Create SSE stream
  let lastLedger = 0;
  let isActive = true;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // Send initial connection message
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected', contractId })}\n\n`));

      // Poll for new events
      const poll = async () => {
        while (isActive) {
          try {
            const result = await getEvents(contractId, lastLedger || undefined, undefined, 20);

            if (result.events && result.events.length > 0) {
              // Filter new events
              const newEvents = lastLedger
                ? result.events.filter(e => e.ledger > lastLedger)
                : result.events;

              for (const event of newEvents) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                  type: 'event',
                  event: {
                    id: event.id,
                    eventType: event.type,
                    ledger: event.ledger,
                    timestamp: event.ledgerClosedAt,
                    txHash: event.txHash,
                    topics: event.topic,
                    data: event.value,
                  },
                })}\n\n`));

                // Index in database
                await prisma.contractEvent.upsert({
                  where: { eventId: event.id },
                  create: {
                    contractId: contract.id,
                    eventId: event.id,
                    txHash: event.txHash,
                    ledger: event.ledger,
                    timestamp: new Date(event.ledgerClosedAt),
                    eventType: event.type,
                    topics: event.topic as object,
                    data: event.value ? { raw: event.value } : undefined,
                  },
                  update: {},
                });
              }

              lastLedger = result.latestLedger;
            }

            // Send heartbeat
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'heartbeat',
              ledger: result.latestLedger,
              timestamp: new Date().toISOString(),
            })}\n\n`));

            // Wait 5 seconds before next poll
            await new Promise(resolve => setTimeout(resolve, 5000));
          } catch (error) {
            console.error('Event stream error:', error);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({
              type: 'error',
              message: 'Error fetching events',
            })}\n\n`));

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 10000));
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
