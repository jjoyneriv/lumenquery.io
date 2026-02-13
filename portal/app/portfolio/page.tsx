'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioNav } from '@/components/portfolio';

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
    <div className="min-h-screen bg-white text-black">
      <Header activePage="portfolio" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <PortfolioNav />

              <div className="mt-8 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                <div className="text-sm font-medium text-indigo-800 mb-2">Current Plan</div>
                <div className="text-lg font-bold text-indigo-600">{tier}</div>
                <div className="text-xs text-indigo-600 mt-1">
                  {limits.currentPortfolios} / {limits.maxPortfolios} portfolios
                </div>
                {tier !== 'DAO' && (
                  <Link
                    href="/pricing"
                    className="mt-3 block text-center px-3 py-1.5 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                  >
                    Upgrade
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Portfolio Intelligence</h1>
                <p className="text-[#6A6A6A] mt-1">
                  Track your Stellar portfolio with P&L, yield tracking, and risk analysis.
                </p>
              </div>
              {limits.currentPortfolios < limits.maxPortfolios && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Portfolio
                </button>
              )}
            </div>

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

            {/* Features Section */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
                <div className="text-indigo-600 text-2xl mb-2">{'{ }'}</div>
                <h3 className="font-semibold mb-1">Multi-Account Aggregation</h3>
                <p className="text-sm text-[#6A6A6A]">Track multiple Stellar accounts in one unified view.</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                <div className="text-green-600 text-2xl mb-2">{'$'}</div>
                <h3 className="font-semibold mb-1">Asset-Level P&L</h3>
                <p className="text-sm text-[#6A6A6A]">FIFO cost basis tracking with unrealized and realized gains.</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                <div className="text-amber-600 text-2xl mb-2">{'%'}</div>
                <h3 className="font-semibold mb-1">Yield Tracking</h3>
                <p className="text-sm text-[#6A6A6A]">Monitor rewards from staking, LP, and DeFi positions.</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-rose-50 border border-red-100">
                <div className="text-red-600 text-2xl mb-2">{'!'}</div>
                <h3 className="font-semibold mb-1">Trustline Risk</h3>
                <p className="text-sm text-[#6A6A6A]">Assess risk from issuer authorization flags and asset quality.</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-100">
                <div className="text-purple-600 text-2xl mb-2">{'</>'}</div>
                <h3 className="font-semibold mb-1">Contract Positions</h3>
                <p className="text-sm text-[#6A6A6A]">Track Soroban smart contract positions and staked assets.</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                <div className="text-blue-600 text-2xl mb-2">{'~'}</div>
                <h3 className="font-semibold mb-1">Performance History</h3>
                <p className="text-sm text-[#6A6A6A]">Historical snapshots to track portfolio performance over time.</p>
              </div>
            </div>
          </main>
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

      <Footer />
    </div>
  );
}
