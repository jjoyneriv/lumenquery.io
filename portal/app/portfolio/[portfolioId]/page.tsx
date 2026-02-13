'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PortfolioNav, PortfolioSummary, AssetTable } from '@/components/portfolio';

interface Portfolio {
  id: string;
  name: string;
  description?: string;
  totalValueUsd: number;
  totalValueXlm: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  lastSyncedAt?: string;
  accounts: any[];
  topPositions: any[];
  assetAllocation: Record<string, number>;
  stats: {
    accountCount: number;
    positionCount: number;
    tradeCount: number;
    yieldSourceCount: number;
  };
}

export default function PortfolioDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.portfolioId as string;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, [portfolioId]);

  const fetchPortfolio = async () => {
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}`);
      if (!response.ok) {
        if (response.status === 404) {
          setError('Portfolio not found');
        } else {
          throw new Error('Failed to fetch portfolio');
        }
        return;
      }
      const data = await response.json();
      setPortfolio(data);
    } catch (err) {
      setError('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const syncPortfolio = async () => {
    setSyncing(true);
    try {
      const response = await fetch(`/api/portfolio/${portfolioId}/sync`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Sync failed');
      }
      await fetchPortfolio();
    } catch (err) {
      alert('Failed to sync portfolio');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-[#6A6A6A]">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-white">
        <Header activePage="portfolio" />
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">{error || 'Portfolio not found'}</h1>
          <Link href="/portfolio" className="text-indigo-600 hover:underline">
            Back to Portfolios
          </Link>
        </div>
      </div>
    );
  }

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
                <h1 className="text-2xl sm:text-3xl font-bold">{portfolio.name}</h1>
                {portfolio.description && (
                  <p className="text-[#6A6A6A] mt-1">{portfolio.description}</p>
                )}
              </div>
              <Link
                href={`/portfolio/${portfolioId}/accounts`}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Account
              </Link>
            </div>

            {/* Summary Cards */}
            <PortfolioSummary
              totalValueUsd={portfolio.totalValueUsd}
              totalValueXlm={portfolio.totalValueXlm}
              totalPnlUsd={portfolio.totalPnlUsd}
              totalPnlPercent={portfolio.totalPnlPercent}
              accountCount={portfolio.stats.accountCount}
              positionCount={portfolio.stats.positionCount}
              lastSyncedAt={portfolio.lastSyncedAt}
              onSync={syncPortfolio}
              syncing={syncing}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-sm text-[#6A6A6A]">Accounts</div>
                <div className="text-xl font-bold">{portfolio.stats.accountCount}</div>
              </div>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-sm text-[#6A6A6A]">Positions</div>
                <div className="text-xl font-bold">{portfolio.stats.positionCount}</div>
              </div>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-sm text-[#6A6A6A]">Trades</div>
                <div className="text-xl font-bold">{portfolio.stats.tradeCount}</div>
              </div>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-sm text-[#6A6A6A]">Yield Sources</div>
                <div className="text-xl font-bold">{portfolio.stats.yieldSourceCount}</div>
              </div>
            </div>

            {/* Top Positions */}
            {portfolio.topPositions.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Top Positions</h2>
                  <Link
                    href={`/portfolio/${portfolioId}/assets`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="rounded-xl bg-[#F5F6F7] border border-[#E6E7E9] overflow-hidden">
                  <AssetTable
                    assets={portfolio.topPositions.map((p) => ({
                      assetCode: p.assetCode,
                      assetIssuer: p.assetIssuer,
                      balance: p.balance,
                      currentValueUsd: p.valueUsd,
                      pnlPercent: p.pnlPercent,
                    }))}
                    showPnL={true}
                  />
                </div>
              </div>
            )}

            {/* Asset Allocation */}
            {Object.keys(portfolio.assetAllocation).length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Asset Allocation</h2>
                <div className="p-4 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(portfolio.assetAllocation)
                      .sort((a, b) => b[1] - a[1])
                      .map(([asset, percentage]) => (
                        <div
                          key={asset}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E6E7E9]"
                        >
                          <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-indigo-600">
                              {asset.slice(0, 2)}
                            </span>
                          </div>
                          <span className="font-medium">{asset}</span>
                          <span className="text-[#6A6A6A]">{percentage.toFixed(1)}%</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Accounts List */}
            {portfolio.accounts.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Accounts</h2>
                  <Link
                    href={`/portfolio/${portfolioId}/accounts`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Manage
                  </Link>
                </div>
                <div className="space-y-3">
                  {portfolio.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="p-4 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9] flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">
                          {account.label || `Account ${account.accountId.slice(0, 8)}...`}
                        </div>
                        <div className="text-sm text-[#6A6A6A] font-mono">
                          {account.accountId.slice(0, 12)}...{account.accountId.slice(-8)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${account.totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-[#6A6A6A]">
                          {account.positionCount} positions
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {portfolio.accounts.length === 0 && (
              <div className="mt-8 text-center py-12 px-4 rounded-xl bg-[#F5F6F7] border border-[#E6E7E9]">
                <div className="text-4xl mb-4">+</div>
                <h2 className="text-xl font-bold mb-2">Add Your First Account</h2>
                <p className="text-[#6A6A6A] mb-6">
                  Link a Stellar account to start tracking your portfolio.
                </p>
                <Link
                  href={`/portfolio/${portfolioId}/accounts`}
                  className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Add Account
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
