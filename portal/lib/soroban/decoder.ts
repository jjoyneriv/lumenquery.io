// ===========================================
// Soroban Pro - XDR Decoder Utilities
// ===========================================

import { DecodedValue, SCValType } from './types';

// Base64 decode helper
export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64');
}

// Parse SCVal type from XDR
function getSCValType(typeNum: number): SCValType {
  const typeMap: Record<number, SCValType> = {
    0: 'bool',
    1: 'void',
    2: 'error',
    3: 'u32',
    4: 'i32',
    5: 'u64',
    6: 'i64',
    7: 'timepoint',
    8: 'duration',
    9: 'u128',
    10: 'i128',
    11: 'u256',
    12: 'i256',
    13: 'bytes',
    14: 'string',
    15: 'symbol',
    16: 'vec',
    17: 'map',
    18: 'address',
    19: 'contractInstance',
    20: 'ledgerKeyContractInstance',
    21: 'ledgerKeyNonce',
  };
  return typeMap[typeNum] || 'bytes';
}

// Decode a Soroban SCVal from XDR base64
export function decodeScVal(xdrBase64: string): DecodedValue {
  try {
    const buffer = base64ToBuffer(xdrBase64);

    if (buffer.length < 4) {
      return { type: 'unknown', value: xdrBase64, raw: xdrBase64 };
    }

    const typeNum = buffer.readUInt32BE(0);
    const type = getSCValType(typeNum);

    switch (type) {
      case 'bool':
        return { type: 'bool', value: buffer.length > 4 ? buffer[4] !== 0 : false };

      case 'void':
        return { type: 'void', value: null };

      case 'u32':
        return { type: 'u32', value: buffer.length >= 8 ? buffer.readUInt32BE(4) : 0 };

      case 'i32':
        return { type: 'i32', value: buffer.length >= 8 ? buffer.readInt32BE(4) : 0 };

      case 'u64':
        return { type: 'u64', value: buffer.length >= 12 ? buffer.readBigUInt64BE(4).toString() : '0' };

      case 'i64':
        return { type: 'i64', value: buffer.length >= 12 ? buffer.readBigInt64BE(4).toString() : '0' };

      case 'u128':
      case 'i128':
        if (buffer.length >= 20) {
          const high = buffer.readBigUInt64BE(4);
          const low = buffer.readBigUInt64BE(12);
          const value = (high << BigInt(64)) + low;
          return { type, value: value.toString() };
        }
        return { type, value: '0' };

      case 'bytes':
        if (buffer.length > 8) {
          const length = buffer.readUInt32BE(4);
          const bytes = buffer.slice(8, 8 + length);
          return { type: 'bytes', value: bytes.toString('hex'), raw: xdrBase64 };
        }
        return { type: 'bytes', value: '', raw: xdrBase64 };

      case 'string':
        if (buffer.length > 8) {
          const length = buffer.readUInt32BE(4);
          const str = buffer.slice(8, 8 + length).toString('utf8');
          return { type: 'string', value: str };
        }
        return { type: 'string', value: '' };

      case 'symbol':
        if (buffer.length > 8) {
          const length = buffer.readUInt32BE(4);
          const sym = buffer.slice(8, 8 + length).toString('utf8');
          return { type: 'symbol', value: sym };
        }
        return { type: 'symbol', value: '' };

      case 'address':
        // Address is 32 bytes (256 bits)
        if (buffer.length >= 36) {
          const addressBytes = buffer.slice(4, 36);
          return { type: 'address', value: addressBytes.toString('hex'), raw: xdrBase64 };
        }
        return { type: 'address', value: xdrBase64, raw: xdrBase64 };

      case 'vec':
        // Vector - would need recursive parsing
        return { type: 'vec', value: '[vector]', raw: xdrBase64 };

      case 'map':
        // Map - would need recursive parsing
        return { type: 'map', value: '{map}', raw: xdrBase64 };

      default:
        return { type, value: xdrBase64, raw: xdrBase64 };
    }
  } catch {
    return { type: 'unknown', value: xdrBase64, raw: xdrBase64 };
  }
}

// Decode contract call inputs from XDR
export function decodeContractInputs(inputsXdr: string): DecodedValue[] {
  try {
    // For now, return the raw XDR - full parsing would require the Stellar SDK
    // This is a simplified decoder for common cases
    return [{ type: 'raw', value: inputsXdr, raw: inputsXdr }];
  } catch {
    return [{ type: 'error', value: 'Failed to decode inputs', raw: inputsXdr }];
  }
}

// Decode contract call outputs from XDR
export function decodeContractOutputs(outputsXdr: string | null): DecodedValue[] | null {
  if (!outputsXdr) return null;
  try {
    return [decodeScVal(outputsXdr)];
  } catch {
    return [{ type: 'error', value: 'Failed to decode outputs', raw: outputsXdr }];
  }
}

// Decode event topics
export function decodeEventTopics(topics: string[]): DecodedValue[] {
  return topics.map(topic => {
    try {
      return decodeScVal(topic);
    } catch {
      return { type: 'unknown', value: topic, raw: topic };
    }
  });
}

// Decode event data
export function decodeEventData(data: string | null): DecodedValue | null {
  if (!data) return null;
  try {
    return decodeScVal(data);
  } catch {
    return { type: 'unknown', value: data, raw: data };
  }
}

// Decode storage key
export function decodeStorageKey(keyXdr: string): DecodedValue {
  try {
    return decodeScVal(keyXdr);
  } catch {
    return { type: 'unknown', value: keyXdr, raw: keyXdr };
  }
}

// Decode storage value
export function decodeStorageValue(valueXdr: string): DecodedValue {
  try {
    return decodeScVal(valueXdr);
  } catch {
    return { type: 'unknown', value: valueXdr, raw: valueXdr };
  }
}

// Parse Soroban error code
export function parseErrorCode(errorXdr: string | null): { code: string; description: string } | null {
  if (!errorXdr) return null;

  // Common Soroban error patterns
  const errorPatterns: Record<string, string> = {
    'ContractError(1)': 'Insufficient balance',
    'ContractError(2)': 'Unauthorized',
    'ContractError(3)': 'Invalid argument',
    'ContractError(4)': 'Overflow',
    'ContractError(5)': 'Already exists',
    'ContractError(6)': 'Not found',
    'HostError(InvalidAction)': 'Invalid contract action',
    'HostError(ObjectNotFound)': 'Object not found in storage',
    'HostError(InternalError)': 'Internal VM error',
  };

  // Try to match known error patterns
  for (const [code, description] of Object.entries(errorPatterns)) {
    if (errorXdr.includes(code)) {
      return { code, description };
    }
  }

  return { code: errorXdr, description: 'Unknown error' };
}

// Hash function inputs for AI cache key
export function hashFunctionInputs(functionName: string, inputs: unknown): string {
  const crypto = require('crypto');
  const data = JSON.stringify({ functionName, inputs });
  return crypto.createHash('sha256').update(data).digest('hex');
}
