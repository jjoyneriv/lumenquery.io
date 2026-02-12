'use client';

import { useState } from 'react';

export interface Transaction {
  id: string;
  type: string;
  sourceAccount: string;
  fullSourceAccount?: string;
  timestamp: string;
  ledger: number;
  txHash: string;
  amount?: string;
  assetCode?: string;
  destinationAccount?: string;
  fullDestinationAccount?: string;
  details?: Record<string, unknown>;
}

interface TransactionRowProps {
  transaction: Transaction;
  hasFullAccess?: boolean;
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

const typeColors: Record<string, { bg: string; text: string }> = {
  payment: { bg: 'bg-green-100', text: 'text-green-800' },
  path_payment: { bg: 'bg-blue-100', text: 'text-blue-800' },
  create_account: { bg: 'bg-purple-100', text: 'text-purple-800' },
  manage_offer: { bg: 'bg-orange-100', text: 'text-orange-800' },
  set_options: { bg: 'bg-gray-100', text: 'text-gray-800' },
  change_trust: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  allow_trust: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  account_merge: { bg: 'bg-red-100', text: 'text-red-800' },
  invoke_host_function: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  default: { bg: 'bg-gray-100', text: 'text-gray-800' },
};

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

export function TransactionRow({ transaction, hasFullAccess }: TransactionRowProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = typeColors[transaction.type] || typeColors.default;

  return (
    <div className="border-b border-[#E6E7E9] last:border-0">
      <div
        className="p-4 hover:bg-[#F5F6F7] cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                {transaction.type.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-[#6A6A6A]">
                #{transaction.ledger.toLocaleString()}
              </span>
              <span className="text-xs text-[#6A6A6A]">
                {formatTimeAgo(transaction.timestamp)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#6A6A6A]">From:</span>
              <code className="font-mono text-[#2855FF]">{transaction.sourceAccount}</code>
              {hasFullAccess && transaction.fullSourceAccount && (
                <CopyButton text={transaction.fullSourceAccount} />
              )}

              {transaction.destinationAccount && (
                <>
                  <svg className="w-4 h-4 text-[#6A6A6A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-[#6A6A6A]">To:</span>
                  <code className="font-mono text-[#2855FF]">{transaction.destinationAccount}</code>
                  {hasFullAccess && transaction.fullDestinationAccount && (
                    <CopyButton text={transaction.fullDestinationAccount} />
                  )}
                </>
              )}
            </div>

            {transaction.amount && (
              <div className="mt-2 text-sm">
                <span className="font-semibold text-black">{transaction.amount}</span>
                <span className="text-[#6A6A6A] ml-1">{transaction.assetCode || 'XLM'}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 text-[#6A6A6A] transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 bg-[#F5F6F7]">
          <div className="bg-white rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6A6A6A]">Transaction Hash:</span>
              <code className="text-sm font-mono text-[#2855FF]">{transaction.txHash}</code>
              <CopyButton text={transaction.txHash} />
            </div>

            {transaction.details && Object.keys(transaction.details).length > 0 && (
              <div>
                <p className="text-sm text-[#6A6A6A] mb-2">Details:</p>
                <pre className="text-xs font-mono bg-[#F5F6F7] p-3 rounded overflow-x-auto">
                  {JSON.stringify(transaction.details, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
