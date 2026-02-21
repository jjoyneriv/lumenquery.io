'use client';

import { useState, useCallback } from 'react';
import { DeploymentState, DeploymentStep, NetworkType } from '@/lib/wallet';
import {
  buildUploadWasmTransaction,
  buildCreateContractTransaction,
  simulateAndPrepare,
  extractWasmHash,
  extractContractId,
  validateWasm,
  formatFeeXLM,
} from '@/lib/soroban/deploy';
import {
  sendTransaction,
  pollTransactionCompletion,
} from '@/lib/soroban/rpc-client';

export interface UseContractDeployReturn {
  // State
  state: DeploymentState;

  // Actions
  setWasmFile: (file: File | null) => Promise<void>;
  simulateUpload: (
    publicKey: string,
    network: NetworkType
  ) => Promise<{ xdr: string; fee: string } | null>;
  uploadWasm: (signedXdr: string) => Promise<string | null>;
  simulateCreate: (
    wasmHash: string,
    publicKey: string,
    network: NetworkType
  ) => Promise<{ xdr: string; fee: string } | null>;
  createContract: (signedXdr: string) => Promise<string | null>;
  reset: () => void;
}

const initialState: DeploymentState = {
  step: 'IDLE',
  wasmFile: null,
  wasmBytes: null,
  wasmHash: null,
  contractId: null,
  uploadTxHash: null,
  createTxHash: null,
  error: null,
  estimatedFee: null,
};

export function useContractDeploy(): UseContractDeployReturn {
  const [state, setState] = useState<DeploymentState>(initialState);

  // Reset to initial state
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  // Set and validate WASM file
  const setWasmFile = useCallback(async (file: File | null) => {
    if (!file) {
      setState((prev) => ({
        ...prev,
        wasmFile: null,
        wasmBytes: null,
        error: null,
      }));
      return;
    }

    try {
      setState((prev) => ({ ...prev, step: 'UPLOADING', error: null }));

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const wasmBytes = new Uint8Array(arrayBuffer);

      // Validate WASM
      const validation = validateWasm(wasmBytes);
      if (!validation.valid) {
        setState((prev) => ({
          ...prev,
          step: 'ERROR',
          error: validation.error || 'Invalid WASM file',
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        step: 'IDLE',
        wasmFile: file,
        wasmBytes,
        error: null,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to read file';
      setState((prev) => ({
        ...prev,
        step: 'ERROR',
        error: message,
      }));
    }
  }, []);

  // Simulate upload transaction
  const simulateUpload = useCallback(
    async (
      publicKey: string,
      network: NetworkType
    ): Promise<{ xdr: string; fee: string } | null> => {
      if (!state.wasmBytes) {
        setState((prev) => ({ ...prev, error: 'No WASM file selected' }));
        return null;
      }

      try {
        setState((prev) => ({ ...prev, step: 'SIMULATING', error: null }));

        // Build the transaction
        const txXdr = await buildUploadWasmTransaction(state.wasmBytes, {
          sourceAccount: publicKey,
          network,
        });

        // Simulate and prepare
        const prepared = await simulateAndPrepare(txXdr);

        const fee = formatFeeXLM(prepared.minResourceFee);
        setState((prev) => ({
          ...prev,
          estimatedFee: fee,
        }));

        return {
          xdr: prepared.xdr,
          fee,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Simulation failed';
        setState((prev) => ({
          ...prev,
          step: 'ERROR',
          error: message,
        }));
        return null;
      }
    },
    [state.wasmBytes]
  );

  // Upload WASM (submit signed transaction)
  const uploadWasm = useCallback(
    async (signedXdr: string): Promise<string | null> => {
      try {
        setState((prev) => ({
          ...prev,
          step: 'SUBMITTING_UPLOAD',
          error: null,
        }));

        // Submit transaction
        const result = await sendTransaction(signedXdr);

        if (result.status === 'ERROR') {
          throw new Error('Transaction submission failed');
        }

        setState((prev) => ({
          ...prev,
          step: 'CONFIRMING_UPLOAD',
          uploadTxHash: result.hash,
        }));

        // Poll for completion
        const txResult = await pollTransactionCompletion(result.hash);

        if (txResult.status !== 'SUCCESS') {
          throw new Error('Transaction failed');
        }

        // Extract WASM hash from result
        const wasmHash = extractWasmHash(txResult.resultMetaXdr!);

        setState((prev) => ({
          ...prev,
          wasmHash,
        }));

        return wasmHash;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        setState((prev) => ({
          ...prev,
          step: 'ERROR',
          error: message,
        }));
        return null;
      }
    },
    []
  );

  // Simulate create contract transaction
  const simulateCreate = useCallback(
    async (
      wasmHash: string,
      publicKey: string,
      network: NetworkType
    ): Promise<{ xdr: string; fee: string } | null> => {
      try {
        setState((prev) => ({ ...prev, step: 'SIMULATING', error: null }));

        // Build the transaction
        const txXdr = await buildCreateContractTransaction(wasmHash, {
          sourceAccount: publicKey,
          network,
        });

        // Simulate and prepare
        const prepared = await simulateAndPrepare(txXdr);

        const fee = formatFeeXLM(prepared.minResourceFee);
        setState((prev) => ({
          ...prev,
          estimatedFee: fee,
        }));

        return {
          xdr: prepared.xdr,
          fee,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Simulation failed';
        setState((prev) => ({
          ...prev,
          step: 'ERROR',
          error: message,
        }));
        return null;
      }
    },
    []
  );

  // Create contract (submit signed transaction)
  const createContract = useCallback(
    async (signedXdr: string): Promise<string | null> => {
      try {
        setState((prev) => ({
          ...prev,
          step: 'SUBMITTING_CREATE',
          error: null,
        }));

        // Submit transaction
        const result = await sendTransaction(signedXdr);

        if (result.status === 'ERROR') {
          throw new Error('Transaction submission failed');
        }

        setState((prev) => ({
          ...prev,
          step: 'CONFIRMING_CREATE',
          createTxHash: result.hash,
        }));

        // Poll for completion
        const txResult = await pollTransactionCompletion(result.hash);

        if (txResult.status !== 'SUCCESS') {
          throw new Error('Transaction failed');
        }

        // Extract contract ID from result
        const contractId = extractContractId(txResult.resultMetaXdr!);

        setState((prev) => ({
          ...prev,
          step: 'SUCCESS',
          contractId,
        }));

        return contractId;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Create failed';
        setState((prev) => ({
          ...prev,
          step: 'ERROR',
          error: message,
        }));
        return null;
      }
    },
    []
  );

  return {
    state,
    setWasmFile,
    simulateUpload,
    uploadWasm,
    simulateCreate,
    createContract,
    reset,
  };
}
