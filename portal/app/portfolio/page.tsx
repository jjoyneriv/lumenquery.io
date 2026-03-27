'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Portfolio {
  id: string;
  name: string;
  description?: string;
  totalValueUsd: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  accountCount: number;
  isDefault: boolean;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [creating, setCreating] = useState(false);
  const [tier, setTier] = useState<string>('FREE');
  const [limits, setLimits] = useState({ maxPortfolios: 1, currentPortfolios: 0 });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) {
        if (response.status === 403) {
          setError('Portfolio feature is not enabled. Please upgrade your subscription.');
        } else {
          throw new Error('Failed to fetch portfolios');
        }
        return;
      }
      const data = await response.json();
      setPortfolios(data.portfolios);
      setTier(data.tier);
      setLimits(data.limits);
    } catch (err) {
      setError('Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async () => {
    if (!newPortfolioName.trim()) return;

    setCreating(true);
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newPortfolioName.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || 'Failed to create portfolio');
        return;
      }

      setShowCreateModal(false);
      setNewPortfolioName('');
      fetchPortfolios();
    } catch (err) {
      alert('Failed to create portfolio');
    } finally {
      setCreating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Tier Info Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-indigo-100">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-[#6A6A6A]">Current Plan</div>
            <div className="text-xl font-bold text-indigo-600">{tier}</div>
            <div className="text-xs text-[#6A6A6A]">
              {limits.currentPortfolios} / {limits.maxPortfolios} portfolios used
            </div>
          </div>
        </div>
        {limits.currentPortfolios < limits.maxPortfolios && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-lg bg-[#7366FF] text-white font-medium hover:bg-[#5A4FCF] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Portfolio
          </button>
        )}
      </div>

      {/* Portfolios Section */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Your Portfolios</h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <p className="mt-4 text-[#6A6A6A]">Loading portfolios...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">{error}</div>
                <Link
                  href="/pricing"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  View Plans
                </Link>
              </div>
            ) : portfolios.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-4xl mb-4">{'{ }'}</div>
                <h2 className="text-xl font-bold mb-2">No Portfolios Yet</h2>
                <p className="text-[#6A6A6A] mb-6">
                  Create your first portfolio to start tracking your Stellar assets.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Create Your First Portfolio
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {portfolios.map((portfolio) => {
                  const pnlColor = portfolio.totalPnlUsd >= 0 ? 'text-green-600' : 'text-red-600';
                  return (
                    <Link
                      key={portfolio.id}
                      href={`/portfolio/${portfolio.id}`}
                      className="block p-6 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9] hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{portfolio.name}</h3>
                            {portfolio.isDefault && (
                              <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
                                Default
                              </span>
                            )}
                          </div>
                          {portfolio.description && (
                            <p className="text-sm text-[#6A6A6A] mt-1">{portfolio.description}</p>
                          )}
                          <p className="text-sm text-[#6A6A6A] mt-2">
                            {portfolio.accountCount} {portfolio.accountCount === 1 ? 'account' : 'accounts'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            {formatCurrency(portfolio.totalValueUsd)}
                          </div>
                          <div className={`text-sm font-medium ${pnlColor}`}>
                            {formatPercent(portfolio.totalPnlPercent)} ({formatCurrency(portfolio.totalPnlUsd)})
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

      </div>

      {/* Features Section */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">Multi-Account</h3>
          <p className="text-xs sm:text-sm text-[#6A6A6A]">Track multiple accounts in one view</p>
        </div>
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">P&L Tracking</h3>
          <p className="text-xs sm:text-sm text-[#6A6A6A]">FIFO cost basis calculation</p>
        </div>
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">Yield Tracking</h3>
          <p className="text-xs sm:text-sm text-[#6A6A6A]">Staking, LP, and DeFi rewards</p>
        </div>
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">Trustline Risk</h3>
          <p className="text-xs sm:text-sm text-[#6A6A6A]">Issuer authorization analysis</p>
        </div>
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">Contract Positions</h3>
          <p className="text-xs sm:text-sm text-[#6A6A6A]">Soroban smart contracts</p>
        </div>
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm sm:text-base mb-1">Performance</h3>
          <p className="text-xs sm:text-sm text-white/70">Historical snapshots</p>
        </div>
      </div>

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Create New Portfolio</h2>
            <input
              type="text"
              placeholder="Portfolio name"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#E6E7E9] focus:outline-none focus:border-indigo-500"
              maxLength={100}
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#E6E7E9] font-medium hover:bg-[#F5F6F7]"
              >
                Cancel
              </button>
              <button
                onClick={createPortfolio}
                disabled={creating || !newPortfolioName.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
