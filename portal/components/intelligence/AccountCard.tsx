'use client';

import { useState } from 'react';
import Link from 'next/link';

interface AccountProfile {
  accountId: string;
  truncatedId: string;
  accountType: string;
  riskScore: number;
  totalTransactions: number;
  totalVolume: string;
  avgTransactionSize: string;
  avgTxPerDay: number;
  uniqueCounterparties: number;
  trustlineCount: number;
  firstSeen?: string;
  lastSeen?: string;
  nativeBalance: string;
  subentryCount: number;
}

interface AccountCardProps {
  profile: AccountProfile;
  hasFullAccess?: boolean;
  showLink?: boolean;
}

const accountTypeColors: Record<string, { bg: string; text: string; label: string }> = {
  WHALE: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Whale' },
  EXCHANGE: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Exchange' },
  MARKET_MAKER: { bg: 'bg-green-100', text: 'text-green-800', label: 'Market Maker' },
  ISSUER: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Issuer' },
  ANCHOR: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Anchor' },
  CONTRACT: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Contract' },
  RETAIL: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Retail' },
  UNKNOWN: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' },
};

const riskColors: Record<string, { bg: string; text: string }> = {
  low: { bg: 'bg-green-100', text: 'text-green-800' },
  medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  high: { bg: 'bg-red-100', text: 'text-red-800' },
};

function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score <= 30) return 'low';
  if (score <= 60) return 'medium';
  return 'high';
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
      className="text-[#6A6A6A] hover:text-[#7366FF] transition-colors"
      title="Copy address"
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

export function AccountCard({ profile, hasFullAccess, showLink = true }: AccountCardProps) {
  const typeInfo = accountTypeColors[profile.accountType] || accountTypeColors.UNKNOWN;
  const riskLevel = getRiskLevel(profile.riskScore);
  const riskStyle = riskColors[riskLevel];

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeInfo.bg} ${typeInfo.text}`}>
                {typeInfo.label}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${riskStyle.bg} ${riskStyle.text}`}>
                Risk: {profile.riskScore}/100
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="font-mono text-sm text-[#7366FF]">
                {hasFullAccess ? profile.accountId : profile.truncatedId}
              </code>
              {hasFullAccess && <CopyButton text={profile.accountId} />}
            </div>
          </div>
          {showLink && (
            <Link
              href={`/intelligence/accounts/${profile.accountId}`}
              className="text-[#7366FF] hover:text-[#5A4FCF] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Balance</p>
            <p className="font-semibold text-black">{profile.nativeBalance} XLM</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Total Volume</p>
            <p className="font-semibold text-black">{profile.totalVolume}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Transactions</p>
            <p className="font-semibold text-black">{profile.totalTransactions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Avg TX/Day</p>
            <p className="font-semibold text-black">{profile.avgTxPerDay.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Avg TX Size</p>
            <p className="font-semibold text-black">{profile.avgTransactionSize}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Counterparties</p>
            <p className="font-semibold text-black">{profile.uniqueCounterparties.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Trustlines</p>
            <p className="font-semibold text-black">{profile.trustlineCount}</p>
          </div>
          <div>
            <p className="text-xs text-[#6A6A6A] mb-1">Sub-entries</p>
            <p className="font-semibold text-black">{profile.subentryCount}</p>
          </div>
        </div>

        {(profile.firstSeen || profile.lastSeen) && (
          <div className="mt-4 pt-4 border-t border-[#E6E7E9] flex flex-wrap gap-4 text-sm text-[#6A6A6A]">
            {profile.firstSeen && (
              <span>First seen: {new Date(profile.firstSeen).toLocaleDateString()}</span>
            )}
            {profile.lastSeen && (
              <span>Last seen: {new Date(profile.lastSeen).toLocaleDateString()}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
