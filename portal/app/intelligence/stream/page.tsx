'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TransactionFeed } from '@/components/intelligence';

type FilterType = 'all' | 'payments' | 'offers' | 'path_payments' | 'trustlines' | 'whale' | 'contracts';

const filterOptions: Array<{ value: FilterType; label: string }> = [
  { value: 'all', label: 'All Transactions' },
  { value: 'payments', label: 'Payments' },
  { value: 'offers', label: 'Offers' },
  { value: 'path_payments', label: 'Path Payments' },
  { value: 'trustlines', label: 'Trustline Changes' },
  { value: 'whale', label: 'Whale Movements' },
  { value: 'contracts', label: 'Contract Calls' },
];

export default function StreamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [assetFilter, setAssetFilter] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/stream');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Live Transaction Stream
        </h1>
        <p className="text-[#6A6A6A] mt-1">
          Real-time feed of Stellar network activity
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-[#6A6A6A] mb-2">Filter by Type</label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filter === option.value
                      ? 'bg-[#7366FF] text-white'
                      : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:w-48">
            <label htmlFor="assetFilter" className="block text-sm text-[#6A6A6A] mb-2">
              Filter by Asset
            </label>
            <input
              type="text"
              id="assetFilter"
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
              placeholder="e.g., USDC"
              className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Transaction Feed */}
      <div style={{ height: 'calc(100vh - 450px)', minHeight: '400px' }}>
        <TransactionFeed
          filter={filter}
          assetCode={assetFilter || undefined}
          autoScroll={true}
          maxTransactions={100}
          hasFullAccess={true}
        />
      </div>
    </div>
  );
}
