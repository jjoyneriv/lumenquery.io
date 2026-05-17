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
  payment: { bg: 'bg-green-500/10', text: 'text-green-400' },
  path_payment: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  create_account: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  manage_offer: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  set_options: { bg: 'bg-white/5', text: 'text-[#A8A9AD]' },
  change_trust: { bg: 'bg-[#FFB829]/10', text: 'text-[#FFB829]' },
  allow_trust: { bg: 'bg-[#FFB829]/10', text: 'text-[#FFB829]' },
  account_merge: { bg: 'bg-[#FC564A]/10', text: 'text-[#FC564A]' },
  invoke_host_function: { bg: 'bg-[#7366FF]/10', text: 'text-[#7366FF]' },
  default: { bg: 'bg-white/5', text: 'text-[#A8A9AD]' },
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
      className="text-gray-400 hover:text-[#7366FF] transition-colors"
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
    <div className="border-b border-white/10 last:border-0">
      <div
        className="p-4 hover:bg-[#1D1E26] cursor-pointer transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                {transaction.type.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-gray-400">
                #{transaction.ledger.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(transaction.timestamp)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">From:</span>
              <code className="font-mono text-[#7366FF]">{transaction.sourceAccount}</code>
              {hasFullAccess && transaction.fullSourceAccount && (
                <CopyButton text={transaction.fullSourceAccount} />
              )}

              {transaction.destinationAccount && (
                <>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-gray-400">To:</span>
                  <code className="font-mono text-[#7366FF]">{transaction.destinationAccount}</code>
                  {hasFullAccess && transaction.fullDestinationAccount && (
                    <CopyButton text={transaction.fullDestinationAccount} />
                  )}
                </>
              )}
            </div>

            {transaction.amount && (
              <div className="mt-2 text-sm">
                <span className="font-semibold text-white">{transaction.amount}</span>
                <span className="text-gray-400 ml-1">{transaction.assetCode || 'XLM'}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
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
        <div className="px-4 pb-4 bg-[#1D1E26]">
          <div className="bg-[#262932] rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Transaction Hash:</span>
              <code className="text-sm font-mono text-[#7366FF]">{transaction.txHash}</code>
              <CopyButton text={transaction.txHash} />
            </div>

            {transaction.details && Object.keys(transaction.details).length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Details:</p>
                <pre className="text-xs font-mono bg-[#1D1E26] p-3 rounded overflow-x-auto">
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
