'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioNav } from '@/components/portfolio';

interface Account {
  id: string;
  accountId: string;
  label?: string;
  addedAt: string;
  xlmBalance: number;
  totalValueUsd: number;
  positionCount: number;
  positions: { assetCode: string; balance: number; valueUsd: number }[];
}

export default function PortfolioAccountsPage() {
  const params = useParams();
  const portfolioId = params.portfolioId as string;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccountId, setNewAccountId] = useState('');
  const [newAccountLabel, setNewAccountLabel] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [maxAccounts, setMaxAccounts] = useState(10);

  useEffect(() => {
    fetchAccounts();
  }, [portfolioId]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/accounts`);
      if (!response.ok) throw new Error('Failed to fetch accounts');
      const data = await response.json();
      setAccounts(data.accounts);
      setMaxAccounts(data.maxAccounts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addAccount = async () => {
    if (!newAccountId.trim()) return;

    setAdding(true);
    setAddError(null);

    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: newAccountId.trim(),
          label: newAccountLabel.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAddError(data.error || 'Failed to add account');
        return;
      }

      setShowAddModal(false);
      setNewAccountId('');
      setNewAccountLabel('');
      fetchAccounts();
    } catch (err) {
      setAddError('Failed to add account');
    } finally {
      setAdding(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatXlm = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="portfolio" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <Link
                href="/portfolio"
                className="flex items-center gap-2 text-sm text-[#6A6A6A] hover:text-indigo-600 mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Portfolios
              </Link>
              <PortfolioNav portfolioId={portfolioId} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Accounts</h1>
                <p className="text-[#6A6A6A] mt-1">
                  {accounts.length} / {maxAccounts} accounts linked
                </p>
              </div>
              {accounts.length < maxAccounts && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Account
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-[#6A6A6A]">Loading accounts...</p>
              </div>
            ) : accounts.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-4xl mb-4">+</div>
                <h2 className="text-xl font-bold mb-2">No Accounts Yet</h2>
                <p className="text-[#6A6A6A] mb-6">
                  Add a Stellar account to start tracking your portfolio.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Add Your First Account
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-6 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold">
                            {account.label || 'Unnamed Account'}
                          </h3>
                        </div>
                        <div className="text-sm text-[#6A6A6A] font-mono mt-1">
                          {account.accountId}
                        </div>
                        <div className="text-xs text-[#6A6A6A] mt-2">
                          Added {new Date(account.addedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {formatCurrency(account.totalValueUsd)}
                        </div>
                        <div className="text-sm text-[#6A6A6A]">
                          {formatXlm(account.xlmBalance)} XLM
                        </div>
                      </div>
                    </div>

                    {account.positions.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#E6E7E9]">
                        <div className="text-sm text-[#6A6A6A] mb-2">
                          {account.positionCount} positions
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {account.positions.map((pos, index) => (
                            <div
                              key={index}
                              className="px-3 py-1.5 rounded-lg bg-white border border-[#E6E7E9] text-sm"
                            >
                              <span className="font-medium">{pos.assetCode}</span>
                              <span className="text-[#6A6A6A] ml-2">
                                {formatCurrency(pos.valueUsd)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Add Stellar Account</h2>

            {addError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {addError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Account ID *</label>
                <input
                  type="text"
                  placeholder="G..."
                  value={newAccountId}
                  onChange={(e) => setNewAccountId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#E6E7E9] focus:outline-none focus:border-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-[#6A6A6A] mt-1">
                  Enter a Stellar account address (starts with G)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Label (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Trading, Savings, DAO Treasury"
                  value={newAccountLabel}
                  onChange={(e) => setNewAccountLabel(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#E6E7E9] focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddError(null);
                  setNewAccountId('');
                  setNewAccountLabel('');
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-[#E6E7E9] font-medium hover:bg-[#F5F6F7]"
              >
                Cancel
              </button>
              <button
                onClick={addAccount}
                disabled={adding || !newAccountId.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {adding ? 'Adding...' : 'Add Account'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
