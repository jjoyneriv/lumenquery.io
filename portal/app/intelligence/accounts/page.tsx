'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AccountCard } from '@/components/intelligence';

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

export default function AccountsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/accounts');
    }
  }, [status, router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const res = await fetch(`/api/intelligence/accounts/${searchQuery.trim()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch account');
      }

      setProfile(data.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account profile');
    } finally {
      setLoading(false);
    }
  };

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
          Account Lookup
        </h1>
        <p className="text-[#6A6A6A] mt-1">
          Analyze Stellar account behavior and profiles
        </p>
      </header>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-xl border border-[#E6E7E9] p-6">
        <label htmlFor="accountSearch" className="block text-sm font-medium text-[#6A6A6A] mb-2">
          Enter Stellar Account ID
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            id="accountSearch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="G... or C..."
            className="flex-1 px-4 py-3 border border-[#E6E7E9] rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Account Profile */}
      {profile && (
        <div className="space-y-6">
          <AccountCard
            profile={profile}
            hasFullAccess={true}
            showLink={false}
          />

          <div className="flex gap-3">
            <Link
              href={`/intelligence/stream?account=${profile.accountId}`}
              className="px-4 py-2 bg-[#7366FF] text-white rounded-lg text-sm font-medium hover:bg-[#5A4FCF] transition-colors"
            >
              Watch Live Activity
            </Link>
            <button
              onClick={() => {
                // Add to watchlist logic
                alert('Add to watchlist functionality coming soon');
              }}
              className="px-4 py-2 border border-[#E6E7E9] text-[#6A6A6A] rounded-lg text-sm font-medium hover:text-black hover:border-[#7366FF] transition-colors"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!profile && !loading && !error && (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-12 text-center">
          <svg
            className="w-16 h-16 mx-auto text-[#6A6A6A] mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-black mb-2">
            Search for an Account
          </h3>
          <p className="text-[#6A6A6A] max-w-md mx-auto">
            Enter a Stellar account ID (starting with G) or contract ID (starting with C) to view its behavior profile and analytics.
          </p>
        </div>
      )}
    </div>
  );
}
