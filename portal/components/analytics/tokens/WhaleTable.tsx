'use client';

import { useState } from 'react';

interface Whale {
  address: string;
  balance: string;
  lastActivity: string;
}

interface LargeMovement {
  from: string;
  to: string;
  amount: string;
  timestamp: string;
  type: string;
}

interface WhaleTableProps {
  whales: Whale[];
  movements: LargeMovement[];
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
      className="ml-2 text-[#6A6A6A] hover:text-[#7366FF] transition-colors"
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

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function WhaleTable({ whales, movements }: WhaleTableProps) {
  return (
    <div className="space-y-6">
      {/* Top Whales Table */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
          <h3 className="font-semibold text-black flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Top XLM Holders ({'>'}1M XLM)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Address
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Balance (XLM)
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E7E9]">
              {whales.length > 0 ? (
                whales.map((whale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <code className="text-sm font-mono text-[#7366FF]">{whale.address}</code>
                        <CopyButton text={whale.address} />
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-sm font-medium text-black">
                      {whale.balance}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                      {formatTimeAgo(whale.lastActivity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 sm:px-6 py-8 text-center text-[#6A6A6A]">
                    No whale accounts found in recent activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Large Movements Table */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
          <h3 className="font-semibold text-black flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Recent Large Movements ({'>'}100K XLM)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  From
                </th>
                <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">

                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  To
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Amount (XLM)
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E7E9]">
              {movements.length > 0 ? (
                movements.map((movement, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">
                      <code className="text-sm font-mono text-[#6A6A6A]">{movement.from}</code>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-center">
                      <svg className="w-4 h-4 text-[#7366FF] inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <code className="text-sm font-mono text-[#6A6A6A]">{movement.to}</code>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-sm font-medium text-black">
                      {movement.amount}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                      {formatTimeAgo(movement.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 sm:px-6 py-8 text-center text-[#6A6A6A]">
                    No large movements detected recently
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
