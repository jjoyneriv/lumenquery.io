'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  WalletState,
  NetworkType,
  isFreighterInstalled,
  isFreighterAllowed,
  connectFreighter,
  getFreighterPublicKey,
  getFreighterNetwork,
  signWithFreighter,
} from '@/lib/wallet';

export interface UseFreighterReturn {
  // State
  installed: boolean;
  connected: boolean;
  publicKey: string | null;
  network: NetworkType | null;
  loading: boolean;
  error: string | null;

  // Actions
  connect: () => Promise<boolean>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string | null>;
  checkConnection: () => Promise<void>;
}

export function useFreighter(): UseFreighterReturn {
  const [state, setState] = useState<WalletState>({
    installed: false,
    connected: false,
    publicKey: null,
    network: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check initial connection state
  const checkConnection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if installed
      const installed = await isFreighterInstalled();
      if (!installed) {
        setState({
          installed: false,
          connected: false,
          publicKey: null,
          network: null,
        });
        return;
      }

      // Check if allowed
      const allowed = await isFreighterAllowed();
      if (!allowed) {
        setState({
          installed: true,
          connected: false,
          publicKey: null,
          network: null,
        });
        return;
      }

      // Get current state
      const publicKey = await getFreighterPublicKey();
      const network = await getFreighterNetwork();

      setState({
        installed: true,
        connected: !!publicKey,
        publicKey,
        network,
      });
    } catch (err) {
      console.error('Error checking Freighter connection:', err);
      setError('Failed to check wallet connection');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check connection on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Connect to Freighter
  const connect = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const installed = await isFreighterInstalled();
      if (!installed) {
        setError('Please install Freighter wallet extension');
        return false;
      }

      const result = await connectFreighter();
      if (!result) {
        setError('Failed to connect to wallet');
        return false;
      }

      setState({
        installed: true,
        connected: true,
        publicKey: result.publicKey,
        network: result.network,
      });

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Disconnect (just clear local state, Freighter doesn't have disconnect)
  const disconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      connected: false,
      publicKey: null,
    }));
  }, []);

  // Sign a transaction
  const signTransaction = useCallback(
    async (xdr: string): Promise<string | null> => {
      if (!state.connected || !state.network) {
        setError('Wallet not connected');
        return null;
      }

      try {
        setError(null);
        const signedXdr = await signWithFreighter(xdr, state.network);

        if (!signedXdr) {
          setError('User rejected transaction');
          return null;
        }

        return signedXdr;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to sign';
        setError(message);
        return null;
      }
    },
    [state.connected, state.network]
  );

  return {
    installed: state.installed,
    connected: state.connected,
    publicKey: state.publicKey,
    network: state.network,
    loading,
    error,
    connect,
    disconnect,
    signTransaction,
    checkConnection,
  };
}
