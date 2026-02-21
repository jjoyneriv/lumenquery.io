// ===========================================
// Freighter Wallet Integration
// ===========================================

import {
  isConnected as freighterIsConnected,
  isAllowed,
  setAllowed,
  getAddress,
  getNetwork,
  signTransaction,
} from '@stellar/freighter-api';
import { NetworkType, NETWORK_CONFIG } from './types';

/**
 * Check if Freighter extension is installed
 */
export async function isFreighterInstalled(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    // Check if the freighter object exists on window
    const result = await freighterIsConnected();
    return result.isConnected !== undefined;
  } catch {
    return false;
  }
}

/**
 * Check if the user has allowed access to the extension
 */
export async function isFreighterAllowed(): Promise<boolean> {
  try {
    const result = await isAllowed();
    return result.isAllowed;
  } catch {
    return false;
  }
}

/**
 * Request connection to Freighter wallet
 */
export async function connectFreighter(): Promise<{ publicKey: string; network: NetworkType } | null> {
  try {
    // Request permission
    const allowResult = await setAllowed();
    if (!allowResult.isAllowed) {
      throw new Error('User denied wallet access');
    }

    // Get public key
    const addressResult = await getAddress();
    if (addressResult.error) {
      throw new Error(addressResult.error);
    }

    // Get network
    const networkResult = await getNetwork();
    if (networkResult.error) {
      throw new Error(networkResult.error);
    }

    const network = mapFreighterNetwork(networkResult.network);

    return {
      publicKey: addressResult.address,
      network,
    };
  } catch (error) {
    console.error('Failed to connect Freighter:', error);
    return null;
  }
}

/**
 * Get the currently connected public key
 */
export async function getFreighterPublicKey(): Promise<string | null> {
  try {
    const result = await getAddress();
    if (result.error) {
      return null;
    }
    return result.address;
  } catch {
    return null;
  }
}

/**
 * Get the current network from Freighter
 */
export async function getFreighterNetwork(): Promise<NetworkType | null> {
  try {
    const result = await getNetwork();
    if (result.error) {
      return null;
    }
    return mapFreighterNetwork(result.network);
  } catch {
    return null;
  }
}

/**
 * Sign a transaction XDR with Freighter
 */
export async function signWithFreighter(
  xdr: string,
  network: NetworkType = 'MAINNET'
): Promise<string | null> {
  try {
    const networkPassphrase = NETWORK_CONFIG[network].networkPassphrase;

    const result = await signTransaction(xdr, {
      networkPassphrase,
    });

    if (result.error) {
      throw new Error(result.error);
    }

    return result.signedTxXdr;
  } catch (error) {
    console.error('Failed to sign transaction:', error);
    return null;
  }
}

/**
 * Map Freighter network string to NetworkType
 */
function mapFreighterNetwork(network: string): NetworkType {
  const networkLower = network.toLowerCase();

  if (networkLower.includes('public') || networkLower === 'mainnet') {
    return 'MAINNET';
  }
  if (networkLower.includes('test') || networkLower === 'testnet') {
    return 'TESTNET';
  }
  if (networkLower.includes('future') || networkLower === 'futurenet') {
    return 'FUTURENET';
  }

  // Default to mainnet
  return 'MAINNET';
}

/**
 * Check if connected to the correct network
 */
export async function isCorrectNetwork(expectedNetwork: NetworkType): Promise<boolean> {
  const currentNetwork = await getFreighterNetwork();
  return currentNetwork === expectedNetwork;
}

/**
 * Format public key for display (truncated)
 */
export function formatPublicKey(publicKey: string, chars: number = 4): string {
  if (!publicKey || publicKey.length < chars * 2 + 3) {
    return publicKey;
  }
  return `${publicKey.slice(0, chars)}...${publicKey.slice(-chars)}`;
}
