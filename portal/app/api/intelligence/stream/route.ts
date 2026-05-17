import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import {
  fetchPayments,
  fetchOperations,
  filterWhaleMovements,
  transformOperation,
  mapOperationType,
} from '@/lib/intelligence/horizon-client';
import { StreamFilterType } from '@/lib/intelligence/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DEFAULT_WHALE_THRESHOLD = 100000;
const POLL_INTERVAL = 5000;

function filterOps(operations: any[], filter: string, filterValue?: string, whaleThreshold?: number): any[] {
  switch (filter) {
    case 'payments':
      return operations.filter((op) =>
        op.type === 'payment' || op.type === 'create_account' ||
        op.type === 'path_payment_strict_send' || op.type === 'path_payment_strict_receive'
      );
    case 'offers':
      return operations.filter((op) =>
        op.type === 'manage_sell_offer' || op.type === 'manage_buy_offer' ||
        op.type === 'create_passive_sell_offer'
      );
    case 'path_payments':
      return operations.filter((op) =>
        op.type === 'path_payment_strict_send' || op.type === 'path_payment_strict_receive'
      );
    case 'trustlines':
      return operations.filter((op) => op.type === 'change_trust');
    case 'account':
      return filterValue
        ? operations.filter((op) => op.source_account === filterValue || op.from === filterValue || op.to === filterValue)
        : operations;
    case 'asset':
      return filterValue
        ? operations.filter((op) => op.asset_code === filterValue || (op.asset_type === 'native' && filterValue === 'XLM'))
        : operations;
    case 'whale':
      return filterWhaleMovements(operations, whaleThreshold || DEFAULT_WHALE_THRESHOLD);
    case 'contracts':
      return operations.filter((op) => op.type === 'invoke_host_function');
    default:
      return operations;
  }
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const filter = (searchParams.get('filter') || 'all') as StreamFilterType;
  const filterValue = searchParams.get('value') || undefined;
  const minAmount = parseFloat(searchParams.get('minAmount') || '0');
  const whaleThreshold = minAmount > 0 ? minAmount : DEFAULT_WHALE_THRESHOLD;

  let isActive = true;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let lastSeenId: string | undefined;

      // Send connection event
      controller.enqueue(encoder.encode(
        `event: connected\ndata: ${JSON.stringify({ filter, timestamp: new Date().toISOString() })}\n\n`
      ));

      // First fetch: get latest operations (desc) to establish baseline
      try {
        const isPaymentFilter = filter === 'payments' || filter === 'whale';
        const initial = isPaymentFilter
          ? await fetchPayments(20)
          : await fetchOperations(20);
        const ops = isPaymentFilter ? (initial as any).payments : (initial as any).operations;

        if (ops && ops.length > 0) {
          // Record the latest paging_token so we only get newer ops next time
          lastSeenId = ops[0].paging_token || ops[0].id;

          // Send initial batch (reversed so oldest first)
          const filtered = filterOps(ops.reverse(), filter, filterValue, whaleThreshold);
          for (const op of filtered.slice(-10)) {
            const transformed = transformOperation(op);
            controller.enqueue(encoder.encode(
              `event: transaction\ndata: ${JSON.stringify({
                ...transformed,
                hash: op.transaction_hash,
                transactionType: mapOperationType(op.type),
                createdAt: op.created_at,
                successful: op.transaction_successful,
              })}\n\n`
            ));
          }
        }
      } catch (err) {
        console.error('Initial fetch error:', err);
      }

      // Poll loop: fetch only NEW operations using cursor
      const poll = async () => {
        while (isActive) {
          await new Promise((r) => setTimeout(r, POLL_INTERVAL));
          if (!isActive) break;

          try {
            const isPaymentFilter = filter === 'payments' || filter === 'whale';

            // Fetch with cursor to get only operations AFTER lastSeenId
            let ops: any[] = [];
            if (lastSeenId) {
              // Use cursor with order=asc to get operations after our last seen
              const url = isPaymentFilter
                ? `/payments?cursor=${lastSeenId}&order=asc&limit=50&include_failed=false`
                : `/operations?cursor=${lastSeenId}&order=asc&limit=50&include_failed=false`;

              const HORIZON = 'https://horizon.stellar.org';
              const res = await fetch(`${HORIZON}${url}`, { cache: 'no-store' });
              if (res.ok) {
                const data = await res.json();
                ops = data._embedded?.records || [];
              }
            } else {
              const result = isPaymentFilter
                ? await fetchPayments(20)
                : await fetchOperations(20);
              ops = isPaymentFilter ? (result as any).payments : (result as any).operations;
            }

            if (ops.length > 0) {
              // Update cursor to the newest operation
              lastSeenId = ops[ops.length - 1].paging_token || ops[ops.length - 1].id;

              const filtered = filterOps(ops, filter, filterValue, whaleThreshold);
              for (const op of filtered) {
                const transformed = transformOperation(op);
                controller.enqueue(encoder.encode(
                  `event: transaction\ndata: ${JSON.stringify({
                    ...transformed,
                    hash: op.transaction_hash,
                    transactionType: mapOperationType(op.type),
                    createdAt: op.created_at,
                    successful: op.transaction_successful,
                  })}\n\n`
                ));
              }
            }

            // Heartbeat
            controller.enqueue(encoder.encode(
              `event: heartbeat\ndata: ${JSON.stringify({ timestamp: new Date().toISOString() })}\n\n`
            ));
          } catch (error) {
            console.error('Stream poll error:', error);
            controller.enqueue(encoder.encode(
              `event: error\ndata: ${JSON.stringify({ message: 'Poll error', timestamp: new Date().toISOString() })}\n\n`
            ));
            await new Promise((r) => setTimeout(r, 10000));
          }
        }
      };

      poll();

      req.signal.addEventListener('abort', () => {
        isActive = false;
        try { controller.close(); } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
