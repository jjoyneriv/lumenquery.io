// ===========================================
// Wallet Types for Freighter Integration
// ===========================================

export type NetworkType = 'MAINNET' | 'TESTNET' | 'FUTURENET';

export interface WalletState {
  installed: boolean;
  connected: boolean;
  publicKey: string | null;
  network: NetworkType | null;
}

export type DeploymentStep =
  | 'IDLE'
  | 'CONNECTING'
  | 'UPLOADING'
  | 'SIMULATING'
  | 'SIGNING_UPLOAD'
  | 'SUBMITTING_UPLOAD'
  | 'CONFIRMING_UPLOAD'
  | 'SIGNING_CREATE'
  | 'SUBMITTING_CREATE'
  | 'CONFIRMING_CREATE'
  | 'SUCCESS'
  | 'ERROR';

export interface DeploymentState {
  step: DeploymentStep;
  wasmFile: File | null;
  wasmBytes: Uint8Array | null;
  wasmHash: string | null;
  contractId: string | null;
  uploadTxHash: string | null;
  createTxHash: string | null;
  error: string | null;
  estimatedFee: string | null;
}

export interface DeploymentResult {
  success: boolean;
  wasmHash?: string;
  contractId?: string;
  uploadTxHash?: string;
  createTxHash?: string;
  error?: string;
}

export interface SimulationResult {
  preparedXdr: string;
  minResourceFee: string;
  transactionData: string;
  events: string[];
  footprint: {
    readOnly: string[];
    readWrite: string[];
  };
}

export interface TransactionStatus {
  status: 'NOT_FOUND' | 'PENDING' | 'SUCCESS' | 'FAILED';
  resultXdr?: string;
  errorMessage?: string;
  ledger?: number;
}

// Network configuration
export const NETWORK_CONFIG = {
  MAINNET: {
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    horizonUrl: 'https://horizon.stellar.org',
    sorobanRpcUrl: 'https://mainnet.sorobanrpc.com',
  },
  TESTNET: {
    networkPassphrase: 'Test SDF Network ; September 2015',
    horizonUrl: 'https://horizon-testnet.stellar.org',
    sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
  },
  FUTURENET: {
    networkPassphrase: 'Test SDF Future Network ; October 2022',
    horizonUrl: 'https://horizon-futurenet.stellar.org',
    sorobanRpcUrl: 'https://rpc-futurenet.stellar.org',
  },
} as const;

// WASM validation constants
export const WASM_MAGIC_BYTES = new Uint8Array([0x00, 0x61, 0x73, 0x6d]); // \0asm
export const MAX_WASM_SIZE = 256 * 1024; // 256 KB
