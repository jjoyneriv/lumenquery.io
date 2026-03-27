'use client';

import { useState } from 'react';
import { formatRelativeTime, formatLedger } from '@/lib/soroban/formatter';

interface StorageEntry {
  id: string;
  key: string;
  keyDecoded: string | null;
  value: string;
  valueDecoded: unknown;
  ledger: number;
  timestamp: string;
}

interface StorageTableProps {
  entries: StorageEntry[];
  snapshot?: {
    totalEntries: number;
    totalSizeBytes: number;
    ledger: number;
    timestamp: string;
  } | null;
}

export function StorageTable({ entries, snapshot }: StorageTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} B`;
  };

  if (entries.length === 0) {
    return (
      <div className="bg-[#262932] border border-white/10 rounded-lg p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
        <p className="text-gray-400">No storage entries found for this contract</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {snapshot && (
        <div className="bg-[#262932] border border-white/10 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Storage Snapshot</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-400">Total Entries</p>
              <p className="text-lg font-semibold">{snapshot.totalEntries.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Size</p>
              <p className="text-lg font-semibold">{formatBytes(snapshot.totalSizeBytes)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Ledger</p>
              <p className="text-lg font-semibold">#{formatLedger(snapshot.ledger)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Updated</p>
              <p className="text-lg font-semibold">{formatRelativeTime(snapshot.timestamp)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#262932] border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1D1E26] border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Key
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Value Preview
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Ledger
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E7E9]">
              {entries.map((entry) => (
                <>
                  <tr
                    key={entry.id}
                    className="hover:bg-[#1D1E26] transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  >
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-[#7366FF]">
                        {entry.keyDecoded || entry.key.slice(0, 20)}
                        {!entry.keyDecoded && entry.key.length > 20 && '...'}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-gray-400">
                        {entry.valueDecoded
                          ? JSON.stringify(entry.valueDecoded).slice(0, 40)
                          : entry.value.slice(0, 40)}
                        {(entry.valueDecoded
                          ? JSON.stringify(entry.valueDecoded).length > 40
                          : entry.value.length > 40) && '...'}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      #{formatLedger(entry.ledger)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {formatRelativeTime(entry.timestamp)}
                    </td>
                  </tr>
                  {expandedId === entry.id && (
                    <tr key={`${entry.id}-expanded`}>
                      <td colSpan={4} className="px-4 py-4 bg-[#1D1E26]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xs font-medium text-gray-400 uppercase">
                                Full Key
                              </h4>
                              <button
                                onClick={() => copyToClipboard(entry.key, `key-${entry.id}`)}
                                className="text-xs text-[#7366FF] hover:underline"
                              >
                                {copied === `key-${entry.id}` ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <pre className="text-xs font-mono bg-[#262932] p-3 rounded border border-white/10 overflow-x-auto">
                              {entry.keyDecoded || entry.key}
                            </pre>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xs font-medium text-gray-400 uppercase">
                                Full Value
                              </h4>
                              <button
                                onClick={() => copyToClipboard(
                                  entry.valueDecoded
                                    ? JSON.stringify(entry.valueDecoded, null, 2)
                                    : entry.value,
                                  `value-${entry.id}`
                                )}
                                className="text-xs text-[#7366FF] hover:underline"
                              >
                                {copied === `value-${entry.id}` ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <pre className="text-xs font-mono bg-[#262932] p-3 rounded border border-white/10 overflow-x-auto max-h-48">
                              {entry.valueDecoded
                                ? JSON.stringify(entry.valueDecoded, null, 2)
                                : entry.value}
                            </pre>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
