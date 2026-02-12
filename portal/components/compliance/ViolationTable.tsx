'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Violation {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  status: 'PENDING' | 'UNDER_REVIEW' | 'CLEARED' | 'CONFIRMED' | 'ESCALATED' | 'REPORTED';
  score: number;
  accountId: string;
  counterpartyId?: string;
  transactionHash?: string;
  ruleName: string;
  ruleType: string;
  matchDetails?: Record<string, unknown>;
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
}

interface ViolationTableProps {
  violations: Violation[];
  onStatusChange?: (id: string, status: string) => void;
  showActions?: boolean;
}

const severityConfig = {
  INFO: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  WARNING: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  CRITICAL: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
};

const statusConfig: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: 'bg-gray-100', text: 'text-gray-800' },
  UNDER_REVIEW: { bg: 'bg-blue-100', text: 'text-blue-800' },
  CLEARED: { bg: 'bg-green-100', text: 'text-green-800' },
  CONFIRMED: { bg: 'bg-orange-100', text: 'text-orange-800' },
  ESCALATED: { bg: 'bg-purple-100', text: 'text-purple-800' },
  REPORTED: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
};

const ruleTypeLabels: Record<string, string> = {
  SANCTIONS_SCREENING: 'Sanctions',
  VELOCITY_LIMIT: 'Velocity',
  VOLUME_LIMIT: 'Volume',
  CIRCULAR_PAYMENT: 'Circular',
  MIXER_DETECTION: 'Mixer',
  UNUSUAL_PATTERN: 'Pattern',
  COUNTERPARTY_RISK: 'Counterparty',
  CONTRACT_ABUSE: 'Contract',
  STRUCTURING: 'Structuring',
  DORMANT_ACTIVATION: 'Dormant',
};

function formatTimeAgo(timestamp: string): string {
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

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

export function ViolationTable({ violations, onStatusChange, showActions = true }: ViolationTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (violations.length === 0) {
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-[#6A6A6A] mb-4">No violations found</p>
        <p className="text-sm text-[#6A6A6A]">
          Violations will appear here when compliance rules are triggered
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
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Severity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Rule
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Account
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Time
              </th>
              {showActions && (
                <th className="px-4 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {violations.map((violation) => {
              const severity = severityConfig[violation.severity];
              const status = statusConfig[violation.status] || statusConfig.PENDING;
              const isExpanded = expandedId === violation.id;

              return (
                <>
                  <tr
                    key={violation.id}
                    className="hover:bg-[#F5F6F7] cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : violation.id)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${severity.dot}`} />
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${severity.bg} ${severity.text}`}>
                          {violation.severity}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-black">{violation.ruleName}</p>
                        <p className="text-xs text-[#6A6A6A]">
                          {ruleTypeLabels[violation.ruleType] || violation.ruleType}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-[#2855FF]">
                        {truncateAddress(violation.accountId)}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              violation.score >= 80 ? 'bg-red-500' :
                              violation.score >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${violation.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#6A6A6A]">{violation.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${status.bg} ${status.text}`}>
                        {violation.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6A6A6A] whitespace-nowrap">
                      {formatTimeAgo(violation.createdAt)}
                    </td>
                    {showActions && (
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Link
                          href={`/compliance/violations/${violation.id}`}
                          className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View
                        </Link>
                      </td>
                    )}
                  </tr>
                  {isExpanded && (
                    <tr key={`${violation.id}-expanded`} className="bg-[#F5F6F7]">
                      <td colSpan={showActions ? 7 : 6} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {violation.counterpartyId && (
                            <div>
                              <p className="text-xs text-[#6A6A6A] mb-1">Counterparty</p>
                              <code className="text-sm font-mono text-black">
                                {truncateAddress(violation.counterpartyId)}
                              </code>
                            </div>
                          )}
                          {violation.transactionHash && (
                            <div>
                              <p className="text-xs text-[#6A6A6A] mb-1">Transaction</p>
                              <code className="text-sm font-mono text-black">
                                {truncateAddress(violation.transactionHash)}
                              </code>
                            </div>
                          )}
                          {violation.reviewedBy && (
                            <div>
                              <p className="text-xs text-[#6A6A6A] mb-1">Reviewed by</p>
                              <p className="text-sm text-black">{violation.reviewedBy}</p>
                            </div>
                          )}
                          {violation.resolution && (
                            <div className="md:col-span-2">
                              <p className="text-xs text-[#6A6A6A] mb-1">Resolution</p>
                              <p className="text-sm text-black">{violation.resolution}</p>
                            </div>
                          )}
                        </div>
                        {showActions && violation.status === 'PENDING' && onStatusChange && (
                          <div className="mt-4 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onStatusChange(violation.id, 'UNDER_REVIEW');
                              }}
                              className="px-3 py-1.5 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] transition-colors"
                            >
                              Start Review
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onStatusChange(violation.id, 'CLEARED');
                              }}
                              className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
