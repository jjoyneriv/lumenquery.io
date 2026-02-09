// ===========================================
// Soroban Pro - Human-Readable Formatting
// ===========================================

import { DecodedValue, ContractCallDecoded, StorageEntry } from './types';

// Format Stellar/Soroban address for display
export function formatAddress(address: string, length: number = 8): string {
  if (!address) return 'Unknown';
  if (address.length <= length * 2 + 3) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

// Format contract ID (C... addresses)
export function formatContractId(contractId: string): string {
  if (!contractId) return 'Unknown';
  if (contractId.length <= 20) return contractId;
  return `${contractId.slice(0, 10)}...${contractId.slice(-6)}`;
}

// Format transaction hash
export function formatTxHash(txHash: string): string {
  if (!txHash) return 'Unknown';
  if (txHash.length <= 16) return txHash;
  return `${txHash.slice(0, 8)}...${txHash.slice(-8)}`;
}

// Format ledger number with commas
export function formatLedger(ledger: number): string {
  return ledger.toLocaleString();
}

// Format gas usage (in stroops)
export function formatGas(gas: bigint | number | null): string {
  if (gas === null || gas === undefined) return 'N/A';
  const gasNum = typeof gas === 'bigint' ? Number(gas) : gas;
  if (gasNum >= 1_000_000) {
    return `${(gasNum / 1_000_000).toFixed(2)}M`;
  }
  if (gasNum >= 1_000) {
    return `${(gasNum / 1_000).toFixed(2)}K`;
  }
  return gasNum.toLocaleString();
}

// Format XLM amount (from stroops)
export function formatXLM(stroops: bigint | number | string): string {
  const value = typeof stroops === 'string' ? BigInt(stroops) : BigInt(stroops);
  const xlm = Number(value) / 10_000_000;
  if (xlm >= 1_000_000) {
    return `${(xlm / 1_000_000).toFixed(2)}M XLM`;
  }
  if (xlm >= 1_000) {
    return `${(xlm / 1_000).toFixed(2)}K XLM`;
  }
  return `${xlm.toFixed(7)} XLM`;
}

// Format timestamp
export function formatTimestamp(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Format relative time (e.g., "2 hours ago")
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatTimestamp(d);
}

// Format decoded value for display
export function formatDecodedValue(value: DecodedValue): string {
  if (!value) return 'null';

  switch (value.type) {
    case 'bool':
      return value.value ? 'true' : 'false';
    case 'void':
      return 'void';
    case 'u32':
    case 'i32':
      return String(value.value);
    case 'u64':
    case 'i64':
    case 'u128':
    case 'i128':
    case 'u256':
    case 'i256':
      return String(value.value);
    case 'string':
      return `"${value.value}"`;
    case 'symbol':
      return `:${value.value}`;
    case 'bytes':
      const hex = String(value.value);
      if (hex.length > 20) {
        return `0x${hex.slice(0, 8)}...${hex.slice(-8)}`;
      }
      return `0x${hex}`;
    case 'address':
      return formatAddress(String(value.value));
    case 'vec':
      return '[Array]';
    case 'map':
      return '{Map}';
    default:
      return String(value.value).slice(0, 50);
  }
}

// Format function signature
export function formatFunctionSignature(
  functionName: string,
  inputs: DecodedValue[]
): string {
  const params = inputs.map(input => formatDecodedValue(input)).join(', ');
  return `${functionName}(${params})`;
}

// Format call status with color indicator
export function formatCallStatus(status: string): { label: string; color: string } {
  if (status === 'success') {
    return { label: 'Success', color: 'green' };
  }
  return { label: 'Failed', color: 'red' };
}

// Format error code with description
export function formatErrorCode(errorCode: string | null): string {
  if (!errorCode) return '';

  // Parse common error patterns
  const match = errorCode.match(/ContractError\((\d+)\)/);
  if (match) {
    return `Contract Error #${match[1]}`;
  }

  const hostMatch = errorCode.match(/HostError\((\w+)\)/);
  if (hostMatch) {
    return `Host Error: ${hostMatch[1]}`;
  }

  return errorCode;
}

// Format storage key for display
export function formatStorageKey(key: DecodedValue): string {
  if (key.type === 'symbol') {
    return `:${key.value}`;
  }
  return formatDecodedValue(key);
}

// Format file size
export function formatBytes(bytes: bigint | number): string {
  const b = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  if (b >= 1_073_741_824) {
    return `${(b / 1_073_741_824).toFixed(2)} GB`;
  }
  if (b >= 1_048_576) {
    return `${(b / 1_048_576).toFixed(2)} MB`;
  }
  if (b >= 1024) {
    return `${(b / 1024).toFixed(2)} KB`;
  }
  return `${b} B`;
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

// Format number with K/M suffix
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

// Format contract call for display in table
export function formatCallForTable(call: ContractCallDecoded): {
  id: string;
  function: string;
  status: string;
  statusColor: string;
  gas: string;
  time: string;
  txHash: string;
} {
  const { label: status, color: statusColor } = formatCallStatus(call.status);
  return {
    id: call.id,
    function: call.functionName,
    status,
    statusColor,
    gas: formatGas(call.gasUsed),
    time: formatRelativeTime(call.timestamp),
    txHash: formatTxHash(call.txHash),
  };
}

// Format storage entry for display
export function formatStorageForTable(entry: StorageEntry): {
  key: string;
  value: string;
  ledger: string;
  time: string;
} {
  return {
    key: formatStorageKey(entry.key),
    value: formatDecodedValue(entry.value),
    ledger: formatLedger(entry.ledger),
    time: formatRelativeTime(entry.timestamp),
  };
}

// Get event type badge color
export function getEventTypeBadgeColor(eventType: string): string {
  switch (eventType) {
    case 'system':
      return 'blue';
    case 'contract':
      return 'green';
    case 'diagnostic':
      return 'yellow';
    default:
      return 'gray';
  }
}

// Truncate text with ellipsis
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

// Generate copy-friendly text
export function copyableText(value: string): string {
  return value;
}
