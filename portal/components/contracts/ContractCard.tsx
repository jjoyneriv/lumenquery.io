'use client';

import Link from 'next/link';
import { formatRelativeTime, formatNumber } from '@/lib/soroban/formatter';

interface ContractCardProps {
  id: string;
  contractId: string;
  name: string | null;
  totalCalls: number;
  lastSeenLedger: number;
  createdAt: string | Date;
}

export function ContractCard({
  contractId,
  name,
  totalCalls,
  lastSeenLedger,
  createdAt,
}: ContractCardProps) {
  return (
    <Link
      href={`/contracts/${contractId}`}
      className="block bg-white border border-[#E6E7E9] rounded-lg p-4 hover:border-[#7366FF] hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm text-[#7366FF] truncate">
            {contractId.slice(0, 12)}...{contractId.slice(-8)}
          </h3>
          {name && (
            <p className="text-base font-medium text-black mt-1">{name}</p>
          )}
        </div>
        <svg
          className="w-5 h-5 text-[#6A6A6A] flex-shrink-0 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#E6E7E9]">
        <div>
          <p className="text-xs text-[#6A6A6A]">Total Calls</p>
          <p className="text-sm font-medium">{formatNumber(totalCalls)}</p>
        </div>
        <div>
          <p className="text-xs text-[#6A6A6A]">Last Seen</p>
          <p className="text-sm font-medium">#{lastSeenLedger.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-[#6A6A6A]">Indexed</p>
          <p className="text-sm font-medium">{formatRelativeTime(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}
