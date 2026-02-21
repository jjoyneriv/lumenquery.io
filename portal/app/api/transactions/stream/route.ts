import { NextRequest } from 'next/server';

// Force dynamic rendering - this is a streaming endpoint
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Use public Stellar Horizon API as default/fallback
const HORIZON_URL = process.env.HORIZON_API_URL || 'https://horizon.stellar.org';
const PUBLIC_HORIZON_URL = 'https://horizon.stellar.org';

// Helper to fetch with fallback to public Horizon
async function fetchWithFallback(path: string, options?: RequestInit): Promise<Response> {
  try {
    const res = await fetch(`${HORIZON_URL}${path}`, options);
    if (res.ok) return res;
    // If local Horizon fails, try public
    if (HORIZON_URL !== PUBLIC_HORIZON_URL) {
      console.log(`Local Horizon failed for ${path}, falling back to public`);
      return fetch(`${PUBLIC_HORIZON_URL}${path}`, options);
    }
    return res;
  } catch (error) {
    // Network error - try public Horizon
    if (HORIZON_URL !== PUBLIC_HORIZON_URL) {
      console.log(`Local Horizon unreachable for ${path}, falling back to public`);
      return fetch(`${PUBLIC_HORIZON_URL}${path}`, options);
    }
    throw error;
  }
}

// Decode operation type to human-readable description
function describeOperation(op: any): string {
  const type = op.type;

  switch (type) {
    case 'create_account':
      return `Create account ${shortenAddress(op.account)} with ${formatXLM(op.starting_balance)} XLM`;

    case 'payment':
      const asset = op.asset_type === 'native' ? 'XLM' : `${op.asset_code}`;
      return `Payment of ${formatAmount(op.amount)} ${asset} from ${shortenAddress(op.from)} to ${shortenAddress(op.to)}`;

    case 'path_payment_strict_receive':
    case 'path_payment_strict_send':
      const srcAsset = op.source_asset_type === 'native' ? 'XLM' : op.source_asset_code;
      const destAsset = op.asset_type === 'native' ? 'XLM' : op.asset_code;
      return `Path payment: ${formatAmount(op.source_amount || op.amount)} ${srcAsset} → ${formatAmount(op.amount)} ${destAsset} to ${shortenAddress(op.to)}`;

    case 'manage_sell_offer':
    case 'manage_buy_offer':
      const selling = op.selling_asset_type === 'native' ? 'XLM' : op.selling_asset_code;
      const buying = op.buying_asset_type === 'native' ? 'XLM' : op.buying_asset_code;
      if (op.amount === '0') {
        return `Cancel offer #${op.offer_id}`;
      }
      return `${type === 'manage_buy_offer' ? 'Buy' : 'Sell'} ${formatAmount(op.amount)} ${selling} for ${buying} @ ${op.price}`;

    case 'create_passive_sell_offer':
      const sellAsset = op.selling_asset_type === 'native' ? 'XLM' : op.selling_asset_code;
      const buyAsset = op.buying_asset_type === 'native' ? 'XLM' : op.buying_asset_code;
      return `Passive offer: Sell ${formatAmount(op.amount)} ${sellAsset} for ${buyAsset} @ ${op.price}`;

    case 'set_options':
      const changes = [];
      if (op.inflation_dest) changes.push(`inflation dest: ${shortenAddress(op.inflation_dest)}`);
      if (op.home_domain) changes.push(`home domain: ${op.home_domain}`);
      if (op.signer_key) changes.push(`signer: ${shortenAddress(op.signer_key)}`);
      if (op.master_key_weight !== undefined) changes.push(`master weight: ${op.master_key_weight}`);
      if (op.low_threshold !== undefined) changes.push(`low threshold: ${op.low_threshold}`);
      if (op.med_threshold !== undefined) changes.push(`med threshold: ${op.med_threshold}`);
      if (op.high_threshold !== undefined) changes.push(`high threshold: ${op.high_threshold}`);
      return `Set options: ${changes.length > 0 ? changes.join(', ') : 'update account settings'}`;

    case 'change_trust':
      const trustAsset = op.asset_type === 'native' ? 'XLM' : `${op.asset_code}:${shortenAddress(op.asset_issuer)}`;
      if (op.limit === '0') {
        return `Remove trustline for ${trustAsset}`;
      }
      return `${op.limit ? 'Update' : 'Add'} trustline for ${trustAsset}${op.limit ? ` (limit: ${formatAmount(op.limit)})` : ''}`;

    case 'allow_trust':
      const allowAsset = op.asset_code;
      return `${op.authorize ? 'Authorize' : 'Deauthorize'} ${shortenAddress(op.trustor)} for ${allowAsset}`;

    case 'account_merge':
      return `Merge account into ${shortenAddress(op.into)}`;

    case 'inflation':
      return 'Run inflation';

    case 'manage_data':
      if (op.value) {
        return `Set data entry "${op.name}" = "${tryDecodeValue(op.value)}"`;
      }
      return `Delete data entry "${op.name}"`;

    case 'bump_sequence':
      return `Bump sequence to ${op.bump_to}`;

    case 'create_claimable_balance':
      const cbAsset = op.asset === 'native' ? 'XLM' : op.asset.split(':')[0];
      return `Create claimable balance: ${formatAmount(op.amount)} ${cbAsset}`;

    case 'claim_claimable_balance':
      return `Claim balance ${shortenAddress(op.balance_id)}`;

    case 'begin_sponsoring_future_reserves':
      return `Begin sponsoring reserves for ${shortenAddress(op.sponsored_id)}`;

    case 'end_sponsoring_future_reserves':
      return 'End sponsoring future reserves';

    case 'revoke_sponsorship':
      return 'Revoke sponsorship';

    case 'clawback':
      const clawAsset = op.asset_code;
      return `Clawback ${formatAmount(op.amount)} ${clawAsset} from ${shortenAddress(op.from)}`;

    case 'clawback_claimable_balance':
      return `Clawback claimable balance ${shortenAddress(op.balance_id)}`;

    case 'set_trust_line_flags':
      return `Set trustline flags for ${shortenAddress(op.trustor)}`;

    case 'liquidity_pool_deposit':
      return `Deposit to liquidity pool: ${formatAmount(op.max_amount_a)} + ${formatAmount(op.max_amount_b)}`;

    case 'liquidity_pool_withdraw':
      return `Withdraw from liquidity pool: ${formatAmount(op.amount)} shares`;

    case 'invoke_host_function':
      return `Invoke Soroban contract${op.function ? `: ${op.function}` : ''}`;

    case 'extend_footprint_ttl':
      return `Extend footprint TTL by ${op.extend_to} ledgers`;

    case 'restore_footprint':
      return 'Restore footprint';

    default:
      return `${type.replace(/_/g, ' ')}`;
  }
}

function shortenAddress(address: string): string {
  if (!address) return '';
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatXLM(amount: string): string {
  return parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 7 });
}

function formatAmount(amount: string): string {
  if (!amount) return '0';
  const num = parseFloat(amount);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 7 });
}

function tryDecodeValue(base64Value: string): string {
  try {
    const decoded = Buffer.from(base64Value, 'base64').toString('utf-8');
    // Check if it's printable
    if (/^[\x20-\x7E]*$/.test(decoded)) {
      return decoded;
    }
    return `[binary: ${base64Value.slice(0, 20)}...]`;
  } catch {
    return base64Value;
  }
}

function decodeMemo(tx: any): string | null {
  if (!tx.memo_type || tx.memo_type === 'none') return null;

  switch (tx.memo_type) {
    case 'text':
      return tx.memo;
    case 'id':
      return `ID: ${tx.memo}`;
    case 'hash':
      return `Hash: ${tx.memo?.slice(0, 16)}...`;
    case 'return':
      return `Return: ${tx.memo?.slice(0, 16)}...`;
    default:
      return tx.memo;
  }
}

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let cursor = '';
      let running = true;

      // Send initial message
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to transaction stream' })}\n\n`));

      const fetchTransactions = async () => {
        try {
          // Fetch latest transactions
          let path = `/transactions?order=desc&limit=10`;
          if (cursor) {
            path = `/transactions?cursor=${cursor}&order=asc&limit=10`;
          }

          const response = await fetchWithFallback(path, {
            headers: { 'Accept': 'application/json' },
          });

          if (!response.ok) {
            throw new Error(`Horizon error: ${response.status}`);
          }

          const data = await response.json();
          const transactions = data._embedded?.records || [];

          // Process transactions (newest first for initial load, oldest first for updates)
          const txList = cursor ? transactions : transactions.reverse();

          for (const tx of txList) {
            // Fetch operations for this transaction
            const opsResponse = await fetchWithFallback(`/transactions/${tx.hash}/operations?limit=10`, {
              headers: { 'Accept': 'application/json' },
            });

            let operations: any[] = [];
            if (opsResponse.ok) {
              const opsData = await opsResponse.json();
              operations = opsData._embedded?.records || [];
            }

            // Build decoded transaction
            const decodedTx = {
              type: 'transaction',
              hash: tx.hash,
              ledger: tx.ledger,
              created_at: tx.created_at,
              source_account: tx.source_account,
              source_account_short: shortenAddress(tx.source_account),
              fee_charged: tx.fee_charged,
              fee_xlm: (parseInt(tx.fee_charged) / 10000000).toFixed(7),
              operation_count: tx.operation_count,
              memo: decodeMemo(tx),
              successful: tx.successful,
              operations: operations.map((op, index) => ({
                index: index + 1,
                type: op.type,
                description: describeOperation(op),
                raw: op,
              })),
              // Include envelope XDR for reference
              envelope_xdr: tx.envelope_xdr,
              result_xdr: tx.result_xdr,
            };

            controller.enqueue(encoder.encode(`data: ${JSON.stringify(decodedTx)}\n\n`));

            // Update cursor to the newest transaction
            if (!cursor || tx.paging_token > cursor) {
              cursor = tx.paging_token;
            }
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Error fetching transactions' })}\n\n`));
        }
      };

      // Initial fetch
      await fetchTransactions();

      // Poll for new transactions every 5 seconds
      const interval = setInterval(async () => {
        if (!running) {
          clearInterval(interval);
          return;
        }
        await fetchTransactions();
      }, 5000);

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        running = false;
        clearInterval(interval);
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
