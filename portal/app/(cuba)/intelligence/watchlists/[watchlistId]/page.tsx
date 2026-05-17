'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { IntelligenceNav, WatchlistAccountsTable, AddAccountForm } from '@/components/intelligence';

interface WatchlistAccount {
  id: string;
  accountId: string;
  label?: string;
  addedAt: string;
}

interface Watchlist {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  accounts: WatchlistAccount[];
}

export default function WatchlistDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const watchlistId = params.watchlistId as string;

  const [watchlist, setWatchlist] = useState<Watchlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/signin?callbackUrl=/intelligence/watchlists/${watchlistId}`);
    }
  }, [status, router, watchlistId]);

  useEffect(() => {
    if (session && watchlistId) {
      fetchWatchlist();
    }
  }, [session, watchlistId]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`/api/intelligence/watchlists/${watchlistId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch watchlist');
      }

      setWatchlist(data.watchlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch watchlist');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async (accountId: string, label?: string) => {
    const res = await fetch(`/api/intelligence/watchlists/${watchlistId}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, label }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add account');
    }

    setShowAddForm(false);
    fetchWatchlist();
  };

  const handleRemoveAccount = async (accountId: string) => {
    const res = await fetch(
      `/api/intelligence/watchlists/${watchlistId}/accounts?accountId=${accountId}`,
      { method: 'DELETE' }
    );

    if (res.ok) {
      fetchWatchlist();
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[#262932] rounded-xl border border-white/10 p-4 sticky top-8">
            <h2 className="font-semibold text-white mb-4">Intelligence</h2>
            <IntelligenceNav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {loading ? (
            <div className="bg-[#262932] rounded-xl border border-white/10 p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF] mx-auto" />
            </div>
          ) : error ? (
            <div className="bg-[#262932] rounded-xl border border-white/10 p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Link
                href="/intelligence/watchlists"
                className="text-[#7366FF] hover:text-[#5A4FCF]"
              >
                &larr; Back to Watchlists
              </Link>
            </div>
          ) : watchlist ? (
            <>
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {watchlist.name}
                  </h1>
                  {watchlist.description && (
                    <p className="text-gray-400 mt-1">{watchlist.description}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-2">
                    {watchlist.accounts.length} account{watchlist.accounts.length !== 1 ? 's' : ''} •
                    Created {new Date(watchlist.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/intelligence/watchlists"
                    className="text-[#7366FF] hover:text-[#5A4FCF] text-sm"
                  >
                    &larr; Back to Watchlists
                  </Link>
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors"
                    >
                      Add Account
                    </button>
                  )}
                </div>
              </header>

              {/* Add Account Form */}
              {showAddForm && (
                <AddAccountForm
                  onSubmit={handleAddAccount}
                  onCancel={() => setShowAddForm(false)}
                />
              )}

              {/* Accounts Table */}
              <WatchlistAccountsTable
                accounts={watchlist.accounts}
                onRemove={handleRemoveAccount}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
