// ===========================================
// Soroban Pro - RPC Client
// ===========================================

import {
  SorobanRpcResponse,
  GetEventsResult,
  SorobanTransaction,
  GetLedgerEntriesResult,
  SimulateTransactionResult,
} from './types';

// RPC endpoints with fallback support
const RPC_ENDPOINTS = [
  'https://mainnet.sorobanrpc.com',
  'https://soroban-rpc.mainnet.stellar.gateway.fm',
  process.env.SOROBAN_RPC_URL || 'http://127.0.0.1:8001',
];

let requestId = 0;

// Core RPC call to a specific endpoint
async function rpcCallToEndpoint<T>(
  endpoint: string,
  method: string,
  params: unknown = {}
): Promise<T> {
  requestId++;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: requestId,
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed: ${response.status}`);
  }

  const data: SorobanRpcResponse<T> = await response.json();

  if (data.error) {
    throw new Error(`RPC error: ${data.error.message}`);
  }

  return data.result as T;
}

// RPC call with fallback to multiple endpoints
async function rpcCall<T>(method: string, params: unknown = {}): Promise<T> {
  let lastError: Error | null = null;

  for (const endpoint of RPC_ENDPOINTS) {
    try {
      return await rpcCallToEndpoint<T>(endpoint, method, params);
    } catch (error) {
      lastError = error as Error;
      console.warn(`RPC endpoint ${endpoint} failed:`, error);
    }
  }

  throw lastError || new Error('All RPC endpoints failed');
}

// RPC call to public endpoint only (for transactions)
export async function rpcCallPublic<T>(method: string, params: unknown = {}): Promise<T> {
  return rpcCallToEndpoint<T>(RPC_ENDPOINTS[0], method, params);
}

// Get contract events
export async function getEvents(
  contractId?: string,
  startLedger?: number,
  endLedger?: number,
  limit: number = 100
): Promise<GetEventsResult> {
  const filters: Array<{ type: string; contractIds?: string[] }> = [];

  if (contractId) {
    filters.push({
      type: 'contract',
      contractIds: [contractId],
    });
  }

  const params: Record<string, unknown> = {
    pagination: { limit },
  };

  if (startLedger) {
    params.startLedger = startLedger;
  }

  if (filters.length > 0) {
    params.filters = filters;
  }

  return rpcCall<GetEventsResult>('getEvents', params);
}

// Get transaction by hash
export async function getTransaction(txHash: string): Promise<SorobanTransaction> {
  return rpcCall<SorobanTransaction>('getTransaction', { hash: txHash });
}

// Get ledger entries (contract storage)
export async function getLedgerEntries(keys: string[]): Promise<GetLedgerEntriesResult> {
  return rpcCall<GetLedgerEntriesResult>('getLedgerEntries', { keys });
}

// Get latest ledger
export async function getLatestLedger(): Promise<{ id: string; sequence: number; protocolVersion: number }> {
  return rpcCall('getLatestLedger');
}

// Get network info
export async function getNetwork(): Promise<{ friendbotUrl?: string; passphrase: string; protocolVersion: number }> {
  return rpcCall('getNetwork');
}

// Simulate transaction
export async function simulateTransaction(xdr: string): Promise<SimulateTransactionResult> {
  return rpcCall<SimulateTransactionResult>('simulateTransaction', {
    transaction: xdr,
  });
}

// Get health
export async function getHealth(): Promise<{ status: string }> {
  return rpcCall('getHealth');
}

// Get fee stats
export async function getFeeStats(): Promise<{
  sorobanInclusionFee: { min: string; max: string; mode: string; p10: string; p50: string; p90: string; p95: string; p99: string };
  inclusionFee: { min: string; max: string; mode: string; p10: string; p50: string; p90: string; p95: string; p99: string };
  latestLedger: number;
}> {
  return rpcCall('getFeeStats');
}

// Build contract instance ledger key
export function buildContractInstanceKey(contractId: string): string {
  // This would need proper XDR encoding
  // For now, return a placeholder
  return contractId;
}

// Build contract data ledger key
export function buildContractDataKey(contractId: string, key: string): string {
  // This would need proper XDR encoding
  return `${contractId}:${key}`;
}

// ===========================================
// Transaction Submission Functions
// ===========================================

export interface SendTransactionResult {
  status: 'PENDING' | 'DUPLICATE' | 'TRY_AGAIN_LATER' | 'ERROR';
  hash: string;
  latestLedger: number;
  latestLedgerCloseTime: string;
  errorResultXdr?: string;
  diagnosticEventsXdr?: string[];
}

export interface GetTransactionResult {
  status: 'NOT_FOUND' | 'SUCCESS' | 'FAILED';
  latestLedger: number;
  latestLedgerCloseTime: string;
  oldestLedger: number;
  oldestLedgerCloseTime: string;
  // Only present when status is SUCCESS or FAILED
  applicationOrder?: number;
  envelopeXdr?: string;
  resultXdr?: string;
  resultMetaXdr?: string;
  ledger?: number;
  createdAt?: string;
}

// Send a signed transaction to the network
export async function sendTransaction(signedXdr: string): Promise<SendTransactionResult> {
  return rpcCallPublic<SendTransactionResult>('sendTransaction', {
    transaction: signedXdr,
  });
}

// Get transaction status (poll for completion)
export async function getTransactionStatus(txHash: string): Promise<GetTransactionResult> {
  return rpcCallPublic<GetTransactionResult>('getTransaction', {
    hash: txHash,
  });
}

// Poll transaction until it completes or times out
export async function pollTransactionCompletion(
  txHash: string,
  timeoutMs: number = 60000,
  intervalMs: number = 2000
): Promise<GetTransactionResult> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const result = await getTransactionStatus(txHash);

    if (result.status !== 'NOT_FOUND') {
      return result;
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Transaction ${txHash} timed out after ${timeoutMs}ms`);
}

// Get account info from Horizon (for sequence number)
export async function getAccount(publicKey: string): Promise<{
  id: string;
  sequence: string;
  balances: Array<{ asset_type: string; balance: string }>;
}> {
  const horizonUrl = 'https://horizon.stellar.org';
  const response = await fetch(`${horizonUrl}/accounts/${publicKey}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Account not found. Please fund the account first.');
    }
    throw new Error(`Failed to fetch account: ${response.status}`);
  }

  return response.json();
}
