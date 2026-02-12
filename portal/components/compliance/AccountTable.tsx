'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MonitoredAccount {
  id: string;
  accountId: string;
  label?: string;
  monitoringLevel: 'BASIC' | 'STANDARD' | 'ENHANCED' | 'RESTRICTED';
  riskScore: number;
  riskFactors?: Record<string, unknown>;
  lastAssessed?: string;
  lastActivity?: string;
  totalVolume30d: string;
  txCount30d: number;
  addedAt: string;
}

interface AccountTableProps {
  accounts: MonitoredAccount[];
  onDelete?: (id: string) => void;
  onEditLevel?: (id: string, level: string) => void;
}

const levelConfig: Record<string, { bg: string; text: string }> = {
  BASIC: { bg: 'bg-gray-100', text: 'text-gray-800' },
  STANDARD: { bg: 'bg-blue-100', text: 'text-blue-800' },
  ENHANCED: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  RESTRICTED: { bg: 'bg-red-100', text: 'text-red-800' },
};

function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-green-600';
}

function getRiskBarColor(score: number): string {
  if (score >= 70) return 'bg-red-500';
  if (score >= 40) return 'bg-yellow-500';
  return 'bg-green-500';
}

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

function formatVolume(volume: string): string {
  const num = parseFloat(volume);
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
  return num.toFixed(2);
}

function formatTimeAgo(timestamp?: string): string {
  if (!timestamp) return 'Never';
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function AccountTable({ accounts, onDelete, onEditLevel }: AccountTableProps) {
  const [sortField, setSortField] = useState<keyof MonitoredAccount>('riskScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sortedAccounts = [...accounts].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDir === 'asc'
      ? String(aVal || '').localeCompare(String(bVal || ''))
      : String(bVal || '').localeCompare(String(aVal || ''));
  });

  const handleSort = (field: keyof MonitoredAccount) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-[#6A6A6A] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <p className="text-[#6A6A6A] mb-4">No monitored accounts</p>
        <p className="text-sm text-[#6A6A6A]">
          Add accounts to monitor for compliance violations
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F6F7] border-b border-[#E6E7E9]">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider cursor-pointer hover:bg-[#E6E7E9]"
                onClick={() => handleSort('accountId')}
              >
                Account
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider cursor-pointer hover:bg-[#E6E7E9]"
                onClick={() => handleSort('riskScore')}
              >
                Risk Score
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider cursor-pointer hover:bg-[#E6E7E9]"
                onClick={() => handleSort('monitoringLevel')}
              >
                Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                30d Volume
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Last Activity
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {sortedAccounts.map((account) => {
              const level = levelConfig[account.monitoringLevel] || levelConfig.STANDARD;

              return (
                <tr key={account.id} className="hover:bg-[#F5F6F7]">
                  <td className="px-4 py-3">
                    <div>
                      <code className="text-sm font-mono text-[#2855FF]">
                        {truncateAddress(account.accountId)}
                      </code>
                      {account.label && (
                        <p className="text-xs text-[#6A6A6A] mt-0.5">{account.label}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getRiskBarColor(account.riskScore)}`}
                          style={{ width: `${account.riskScore}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getRiskColor(account.riskScore)}`}>
                        {account.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${level.bg} ${level.text}`}>
                      {account.monitoringLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-black">{formatVolume(account.totalVolume30d)} XLM</p>
                      <p className="text-xs text-[#6A6A6A]">{account.txCount30d} txs</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">
                    {formatTimeAgo(account.lastActivity)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/compliance/accounts/${account.id}`}
                        className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
                      >
                        View
                      </Link>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(account.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
