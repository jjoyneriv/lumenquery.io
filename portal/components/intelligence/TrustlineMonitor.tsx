'use client';

import { useState } from 'react';

interface TrustlineChange {
  id: string;
  type: 'created' | 'removed' | 'updated';
  account: string;
  fullAccount?: string;
  assetCode: string;
  assetIssuer?: string;
  fullIssuer?: string;
  limit?: string;
  createdAt: string;
}

interface TrustlineMonitorProps {
  trustlines: TrustlineChange[];
  summary: {
    total: number;
    created: number;
    removed: number;
    updated: number;
  };
  topAssets: Array<{ code: string; count: number }>;
  hasFullAccess?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const typeColors = {
  created: { bg: 'bg-green-100', text: 'text-green-800' },
  removed: { bg: 'bg-red-100', text: 'text-red-800' },
  updated: { bg: 'bg-blue-100', text: 'text-blue-800' },
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[#6A6A6A] hover:text-[#2855FF] transition-colors"
      title="Copy"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export function TrustlineMonitor({
  trustlines,
  summary,
  topAssets,
  hasFullAccess,
  onRefresh,
  isLoading,
}: TrustlineMonitorProps) {
  const [filter, setFilter] = useState<'all' | 'created' | 'removed'>('all');

  const filteredTrustlines = trustlines.filter((t) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
          <p className="text-xs text-[#6A6A6A] mb-1">Total Changes</p>
          <p className="text-2xl font-bold text-black">{summary.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
          <p className="text-xs text-[#6A6A6A] mb-1">Created</p>
          <p className="text-2xl font-bold text-green-600">{summary.created}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
          <p className="text-xs text-[#6A6A6A] mb-1">Removed</p>
          <p className="text-2xl font-bold text-red-600">{summary.removed}</p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
          <p className="text-xs text-[#6A6A6A] mb-1">Updated</p>
          <p className="text-2xl font-bold text-blue-600">{summary.updated}</p>
        </div>
      </div>

      {/* Top Assets */}
      {topAssets.length > 0 && (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
          <h3 className="text-sm font-medium text-black mb-3">Most Active Assets</h3>
          <div className="flex flex-wrap gap-2">
            {topAssets.map(({ code, count }) => (
              <span
                key={code}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#F5F6F7] text-black"
              >
                {code}
                <span className="ml-2 text-[#6A6A6A]">{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'all'
                ? 'bg-[#2855FF] text-white'
                : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('created')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'created'
                ? 'bg-green-500 text-white'
                : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
            }`}
          >
            Created
          </button>
          <button
            onClick={() => setFilter('removed')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'removed'
                ? 'bg-red-500 text-white'
                : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
            }`}
          >
            Removed
          </button>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-[#F5F6F7] text-[#6A6A6A] hover:text-black transition-colors disabled:opacity-50"
          >
            <svg
              className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>

      {/* Trustline Table */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
        {filteredTrustlines.length === 0 ? (
          <div className="p-8 text-center text-[#6A6A6A]">
            No trustline changes found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                    Limit
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E7E9]">
                {filteredTrustlines.map((change) => {
                  const colors = typeColors[change.type];

                  return (
                    <tr key={change.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                          {change.type}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-[#2855FF]">
                            {change.account}
                          </code>
                          {hasFullAccess && change.fullAccount && (
                            <CopyButton text={change.fullAccount} />
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <span className="font-medium text-black">{change.assetCode}</span>
                          {change.assetIssuer && (
                            <p className="text-xs text-[#6A6A6A] font-mono mt-0.5">
                              {change.assetIssuer}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                        {change.limit ? parseFloat(change.limit).toLocaleString() : '-'}
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                        {formatTimeAgo(change.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
