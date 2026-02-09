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

const SOROBAN_RPC_URL = process.env.SOROBAN_RPC_URL || 'http://127.0.0.1:8001';

let requestId = 0;

async function rpcCall<T>(method: string, params: unknown = {}): Promise<T> {
  requestId++;

  const response = await fetch(SOROBAN_RPC_URL, {
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
