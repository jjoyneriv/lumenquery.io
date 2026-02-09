'use client';

import { useState } from 'react';
import { formatRelativeTime, formatGas, formatTxHash } from '@/lib/soroban/formatter';

interface Call {
  id: string;
  txHash: string;
  ledger: number;
  timestamp: string;
  functionName: string;
  inputsDecoded: unknown;
  outputsDecoded: unknown;
  status: string;
  errorCode: string | null;
  gasUsed: number | null;
  aiExplanation: string | null;
}

interface CallHistoryTableProps {
  calls: Call[];
  onExplain?: (callId: string) => void;
  onViewDetails?: (call: Call) => void;
  canExplain?: boolean;
}

export function CallHistoryTable({
  calls,
  onExplain,
  onViewDetails,
  canExplain = false,
}: CallHistoryTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (calls.length === 0) {
    return (
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-8 text-center">
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
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-[#6A6A6A]">No calls found for this contract</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E6E7E9] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5F6F7] border-b border-[#E6E7E9]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Function
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Gas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                TX Hash
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {calls.map((call) => (
              <>
                <tr
                  key={call.id}
                  className="hover:bg-[#F5F6F7] transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === call.id ? null : call.id)}
                >
                  <td className="px-4 py-3">
                    <code className="text-sm font-mono text-[#2855FF]">
                      {call.functionName}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        call.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {call.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">
                    {formatGas(call.gasUsed)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6A6A6A]">
                    {formatRelativeTime(call.timestamp)}
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs font-mono text-[#6A6A6A]">
                      {formatTxHash(call.txHash)}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canExplain && onExplain && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onExplain(call.id);
                          }}
                          className="p-1.5 text-[#6A6A6A] hover:text-[#2855FF] transition-colors"
                          title="AI Explain"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails?.(call);
                        }}
                        className="p-1.5 text-[#6A6A6A] hover:text-[#2855FF] transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === call.id && (
                  <tr key={`${call.id}-expanded`}>
                    <td colSpan={6} className="px-4 py-4 bg-[#F5F6F7]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-medium text-[#6A6A6A] uppercase mb-2">
                            Input Parameters
                          </h4>
                          <pre className="text-xs font-mono bg-white p-3 rounded border border-[#E6E7E9] overflow-x-auto">
                            {JSON.stringify(call.inputsDecoded, null, 2) || 'No inputs'}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-[#6A6A6A] uppercase mb-2">
                            Output
                          </h4>
                          <pre className="text-xs font-mono bg-white p-3 rounded border border-[#E6E7E9] overflow-x-auto">
                            {JSON.stringify(call.outputsDecoded, null, 2) || 'No output'}
                          </pre>
                        </div>
                        {call.errorCode && (
                          <div className="md:col-span-2">
                            <h4 className="text-xs font-medium text-red-600 uppercase mb-2">
                              Error
                            </h4>
                            <code className="text-sm text-red-600">{call.errorCode}</code>
                          </div>
                        )}
                        {call.aiExplanation && (
                          <div className="md:col-span-2">
                            <h4 className="text-xs font-medium text-[#2855FF] uppercase mb-2">
                              AI Explanation
                            </h4>
                            <p className="text-sm text-[#6A6A6A] whitespace-pre-wrap">
                              {call.aiExplanation}
                            </p>
                          </div>
                        )}
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
  );
}
