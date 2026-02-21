// ===========================================
// Soroban Contract Deployment Service
// ===========================================

import {
  TransactionBuilder,
  Networks,
  Operation,
  Account,
  xdr,
  StrKey,
  hash,
  Keypair,
} from '@stellar/stellar-sdk';
import { rpcCallPublic } from './rpc-client';
import { SimulateTransactionResult } from './types';
import { NetworkType, NETWORK_CONFIG } from '../wallet/types';

// ===========================================
// Types
// ===========================================

export interface PreparedTransaction {
  xdr: string;
  minResourceFee: string;
  sorobanData: string;
}

export interface DeploymentConfig {
  sourceAccount: string;
  network: NetworkType;
}

// ===========================================
// Transaction Building
// ===========================================

/**
 * Build a transaction to upload WASM code
 */
export async function buildUploadWasmTransaction(
  wasmBytes: Uint8Array,
  config: DeploymentConfig
): Promise<string> {
  const { sourceAccount, network } = config;
  const networkConfig = NETWORK_CONFIG[network];

  // Get account sequence from Horizon
  const accountInfo = await getAccountInfo(sourceAccount, network);
  const account = new Account(sourceAccount, accountInfo.sequence);

  // Create the upload wasm operation
  const uploadOp = Operation.uploadContractWasm({
    wasm: wasmBytes,
  });

  // Build the transaction
  const transaction = new TransactionBuilder(account, {
    fee: '100', // Will be updated after simulation
    networkPassphrase: networkConfig.networkPassphrase,
  })
    .addOperation(uploadOp)
    .setTimeout(300) // 5 minutes
    .build();

  return transaction.toXDR();
}

/**
 * Build a transaction to create a contract instance from WASM hash
 */
export async function buildCreateContractTransaction(
  wasmHash: string,
  config: DeploymentConfig
): Promise<string> {
  const { sourceAccount, network } = config;
  const networkConfig = NETWORK_CONFIG[network];

  // Get account sequence from Horizon
  const accountInfo = await getAccountInfo(sourceAccount, network);
  const account = new Account(sourceAccount, accountInfo.sequence);

  // Convert wasm hash to buffer
  const wasmHashBuffer = Buffer.from(wasmHash, 'hex');

  // Create the create contract operation
  const createOp = Operation.createCustomContract({
    address: new (require('@stellar/stellar-sdk').Address)(sourceAccount),
    wasmHash: wasmHashBuffer,
  });

  // Build the transaction
  const transaction = new TransactionBuilder(account, {
    fee: '100', // Will be updated after simulation
    networkPassphrase: networkConfig.networkPassphrase,
  })
    .addOperation(createOp)
    .setTimeout(300) // 5 minutes
    .build();

  return transaction.toXDR();
}

/**
 * Simulate a transaction and prepare it with resource info
 * Uses the Stellar SDK's SorobanRpc to assemble the transaction
 */
export async function simulateAndPrepare(
  xdrString: string
): Promise<PreparedTransaction> {
  // Simulate the transaction via RPC
  const simulation = await rpcCallPublic<SimulateTransactionResult>(
    'simulateTransaction',
    { transaction: xdrString }
  );

  if (simulation.error) {
    throw new Error(`Simulation failed: ${simulation.error}`);
  }

  if (!simulation.transactionData) {
    throw new Error('Simulation did not return transaction data');
  }

  // Use SorobanRpc.assembleTransaction to properly assemble the transaction
  const { SorobanRpc, TransactionBuilder } = require('@stellar/stellar-sdk');

  // Parse the original transaction
  const originalTx = TransactionBuilder.fromXDR(xdrString, NETWORK_CONFIG.MAINNET.networkPassphrase);

  // Create a mock simulation result that matches the SDK's expected format
  const simulationResponse = {
    transactionData: simulation.transactionData,
    minResourceFee: simulation.minResourceFee,
    events: simulation.events || [],
    results: simulation.results || [],
    latestLedger: simulation.latestLedger,
    cost: simulation.cost,
  };

  // Assemble the transaction with simulation results
  const assembledTx = SorobanRpc.assembleTransaction(originalTx, simulationResponse);

  return {
    xdr: assembledTx.toXDR(),
    minResourceFee: simulation.minResourceFee || '0',
    sorobanData: simulation.transactionData,
  };
}

/**
 * Extract WASM hash from successful upload transaction result
 */
export function extractWasmHash(resultMetaXdr: string): string {
  try {
    const meta = xdr.TransactionMeta.fromXDR(resultMetaXdr, 'base64');

    // For Soroban, the result is in v3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const switchVal = (meta.switch() as any);
    const armValue = typeof switchVal === 'number' ? switchVal : switchVal.value ?? switchVal.name;

    if (armValue === 3 || armValue === 'txMeta3') {
      const v3 = meta.v3();
      const sorobanMeta = v3.sorobanMeta();

      if (sorobanMeta) {
        const returnValue = sorobanMeta.returnValue();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valueSwitchVal = (returnValue.switch() as any);
        const valueArm = typeof valueSwitchVal === 'number' ? valueSwitchVal : valueSwitchVal.name;

        if (valueArm === 'scvBytes') {
          const hashBytes = returnValue.bytes();
          return Buffer.from(hashBytes).toString('hex');
        }
      }
    }

    throw new Error('Could not extract WASM hash from result');
  } catch (error) {
    console.error('Error extracting WASM hash:', error);
    throw new Error('Failed to extract WASM hash from transaction result');
  }
}

/**
 * Extract contract ID from successful create contract transaction result
 */
export function extractContractId(resultMetaXdr: string): string {
  try {
    const meta = xdr.TransactionMeta.fromXDR(resultMetaXdr, 'base64');

    // For Soroban, the result is in v3
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const switchVal = (meta.switch() as any);
    const armValue = typeof switchVal === 'number' ? switchVal : switchVal.value ?? switchVal.name;

    if (armValue === 3 || armValue === 'txMeta3') {
      const v3 = meta.v3();
      const sorobanMeta = v3.sorobanMeta();

      if (sorobanMeta) {
        const returnValue = sorobanMeta.returnValue();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const valueSwitchVal = (returnValue.switch() as any);
        const valueArm = typeof valueSwitchVal === 'number' ? valueSwitchVal : valueSwitchVal.name;

        if (valueArm === 'scvAddress') {
          const address = returnValue.address();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const addrSwitchVal = (address.switch() as any);
          const addrArm = typeof addrSwitchVal === 'number' ? addrSwitchVal : addrSwitchVal.name;

          if (addrArm === 'scAddressTypeContract') {
            const contractId = address.contractId();
            return StrKey.encodeContract(contractId);
          }
        }
      }
    }

    throw new Error('Could not extract contract ID from result');
  } catch (error) {
    console.error('Error extracting contract ID:', error);
    throw new Error('Failed to extract contract ID from transaction result');
  }
}

// ===========================================
// Helper Functions
// ===========================================

/**
 * Get account info from Horizon
 */
async function getAccountInfo(
  publicKey: string,
  network: NetworkType
): Promise<{ sequence: string }> {
  const horizonUrl = NETWORK_CONFIG[network].horizonUrl;
  const response = await fetch(`${horizonUrl}/accounts/${publicKey}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        'Account not found. Please fund the account before deploying.'
      );
    }
    throw new Error(`Failed to fetch account: ${response.status}`);
  }

  const data = await response.json();
  return { sequence: data.sequence };
}

/**
 * Calculate WASM hash from bytes
 */
export function calculateWasmHash(wasmBytes: Uint8Array): string {
  return hash(Buffer.from(wasmBytes)).toString('hex');
}

/**
 * Validate WASM file
 */
export function validateWasm(wasmBytes: Uint8Array): {
  valid: boolean;
  error?: string;
} {
  // Check minimum size
  if (wasmBytes.length < 8) {
    return { valid: false, error: 'File is too small to be a valid WASM' };
  }

  // Check magic bytes (\0asm)
  const magic = new Uint8Array([0x00, 0x61, 0x73, 0x6d]);
  const fileMagic = wasmBytes.slice(0, 4);

  if (!magic.every((byte, i) => byte === fileMagic[i])) {
    return { valid: false, error: 'Invalid WASM file (wrong magic bytes)' };
  }

  // Check size limit (256 KB)
  const maxSize = 256 * 1024;
  if (wasmBytes.length > maxSize) {
    return {
      valid: false,
      error: `WASM file too large (${(wasmBytes.length / 1024).toFixed(1)} KB > 256 KB limit)`,
    };
  }

  return { valid: true };
}

/**
 * Format fee in XLM
 */
export function formatFeeXLM(stroops: string | number): string {
  const xlm = Number(stroops) / 10000000;
  return xlm.toFixed(7) + ' XLM';
}
