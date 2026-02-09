'use client';

import { useState } from 'react';

interface Contract {
  contractId: string;
  invocations: number;
  lastActivity: string;
}

interface ContractTableProps {
  contracts: Contract[];
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
      className="ml-2 text-[#6A6A6A] hover:text-[#2855FF] transition-colors"
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

export function ContractTable({ contracts }: ContractTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Top Contracts by Invocations
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Contract / Account
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Invocations (24h)
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {contracts.length > 0 ? (
              contracts.map((contract, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center">
                      <code className="text-sm font-mono text-[#2855FF]">{contract.contractId}</code>
                      <CopyButton text={contract.contractId} />
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right text-sm font-medium text-black">
                    {contract.invocations.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                    {contract.lastActivity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 sm:px-6 py-8 text-center text-[#6A6A6A]">
                  No contract invocations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
