'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PortfolioDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <Link href="/docs" className="flex items-center gap-2 text-sm text-[#6A6A6A] hover:text-indigo-600 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Docs
        </Link>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Overview</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#dashboard" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Dashboard</a></li>
          <li><a href="#tiers" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Subscription Tiers</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Features</h3>
        <ul className="space-y-2">
          <li><a href="#portfolios" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Portfolios</a></li>
          <li><a href="#accounts" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Account Management</a></li>
          <li><a href="#positions" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Asset Positions</a></li>
          <li><a href="#pnl" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>P&L Tracking</a></li>
          <li><a href="#trustlines" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Trustline Risk</a></li>
          <li><a href="#contracts" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Contract Positions</a></li>
          <li><a href="#yield" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Yield Tracking</a></li>
          <li><a href="#snapshots" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Performance Snapshots</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">How-to</h3>
        <ul className="space-y-2">
          <li><a href="#create-portfolio" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Create a Portfolio</a></li>
          <li><a href="#add-account" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Add an Account</a></li>
          <li><a href="#sync-data" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Sync Portfolio Data</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Reference</h3>
        <ul className="space-y-2">
          <li><a href="#cost-basis" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Cost Basis (FIFO)</a></li>
          <li><a href="#risk-scoring" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>Risk Scoring</a></li>
          <li><a href="#api-reference" className="text-[#6A6A6A] hover:text-indigo-600" onClick={() => setSidebarOpen(false)}>API Reference</a></li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Documentation Menu
        </button>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[#F5F6F7]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {sidebarContent}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1" aria-label="Documentation navigation">
            <nav className="sticky top-8">
              {sidebarContent}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <header className="mb-8 sm:mb-12">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Portfolio Intelligence</h1>
                <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">Premium</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Track your Stellar portfolio with multi-account aggregation, P&L tracking, yield monitoring, and risk analysis.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Portfolio Intelligence solves the problem of fragmented and opaque Stellar portfolios. Whether you&apos;re
                a power user with multiple accounts, a DAO managing treasury, or a fund tracking positions, Portfolio
                Intelligence gives you complete visibility into your holdings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-indigo-600 text-xl sm:text-2xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Multi-Account</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Aggregate multiple Stellar accounts into one view</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-indigo-600 text-xl sm:text-2xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">P&L Tracking</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Track profit and loss with FIFO cost basis</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-indigo-600 text-xl sm:text-2xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Yield Tracking</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Monitor DeFi yields and staking rewards</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                <h3 className="font-semibold text-indigo-800 mb-2">Target Users</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li><strong>Power Users:</strong> Track multiple personal accounts in one place</li>
                  <li><strong>DAOs:</strong> Manage treasury with team access and snapshots</li>
                  <li><strong>Funds:</strong> Professional portfolio tracking with P&L reports</li>
                  <li><strong>DeFi Participants:</strong> Monitor Soroban contract positions and yields</li>
                </ul>
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Dashboard</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Portfolio dashboard provides a comprehensive overview of your holdings across all linked accounts.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Total Value</div>
                  <div className="text-lg font-bold">$125,430</div>
                  <div className="text-xs text-[#6A6A6A]">2,508,600 XLM</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Total P&L</div>
                  <div className="text-lg font-bold text-green-600">+$12,340</div>
                  <div className="text-xs text-green-600">+10.9%</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Accounts</div>
                  <div className="text-lg font-bold">5</div>
                  <div className="text-xs text-[#6A6A6A]">Linked</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Positions</div>
                  <div className="text-lg font-bold">12</div>
                  <div className="text-xs text-[#6A6A6A]">Assets</div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Dashboard Sections</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium">Portfolio Summary</h4>
                  <p className="text-sm text-[#6A6A6A]">Total value, P&L, account count, and last sync time with refresh button</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium">Top Positions</h4>
                  <p className="text-sm text-[#6A6A6A]">Your largest holdings by value with asset code, balance, and P&L percentage</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium">Asset Allocation</h4>
                  <p className="text-sm text-[#6A6A6A]">Visual breakdown of holdings by asset with percentage allocation</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium">Accounts List</h4>
                  <p className="text-sm text-[#6A6A6A]">All linked accounts with labels, balances, and position counts</p>
                </div>
              </div>
            </section>

            {/* Subscription Tiers */}
            <section id="tiers" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Subscription Tiers</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Portfolio Intelligence offers three tiers to match your needs. Start free and upgrade as you grow.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 font-medium">FREE</th>
                      <th className="text-center py-3 px-4 font-medium">PRO ($10/mo)</th>
                      <th className="text-center py-3 px-4 font-medium">DAO ($50/mo)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Portfolios</td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-center">5</td>
                      <td className="py-3 px-4 text-center">100</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Accounts per Portfolio</td>
                      <td className="py-3 px-4 text-center">1</td>
                      <td className="py-3 px-4 text-center">10</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">P&L Tracking</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Yield Tracking</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Contract Positions</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Snapshot Retention</td>
                      <td className="py-3 px-4 text-center">7 days</td>
                      <td className="py-3 px-4 text-center">90 days</td>
                      <td className="py-3 px-4 text-center">365 days</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Team Access</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">API Access</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Export (CSV/JSON)</td>
                      <td className="py-3 px-4 text-center text-red-500">-</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                      <td className="py-3 px-4 text-center text-green-600">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Portfolios */}
            <section id="portfolios" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Portfolios</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                A portfolio is a container for grouping Stellar accounts. You might create separate portfolios for
                personal holdings, trading, or different organizations.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Portfolio Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Field</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">name</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Display name for the portfolio</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">description</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Optional description or notes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">totalValueUsd</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Aggregated USD value of all accounts</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">totalPnlUsd</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Total profit/loss in USD</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">lastSyncedAt</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Last data sync timestamp</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Account Management */}
            <section id="accounts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Account Management</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Link Stellar accounts to your portfolio by providing the account ID (public key). Each account is
                validated against the Stellar network before being added.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Account Properties</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Field</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">accountId</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Stellar public key (starts with G)</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">label</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Optional friendly name (e.g., &quot;Trading&quot;, &quot;Savings&quot;)</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">xlmBalance</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Native XLM balance</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">totalValueUsd</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Total value including all assets</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-mono text-indigo-600">positionCount</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Number of asset positions</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-1">Read-Only Access</h4>
                <p className="text-sm text-yellow-700">
                  Portfolio Intelligence only reads public blockchain data. Your private keys are never required
                  or stored. You maintain full custody of your assets.
                </p>
              </div>
            </section>

            {/* Asset Positions */}
            <section id="positions" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Asset Positions</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Asset positions represent your holdings in each asset. Positions are aggregated across all accounts
                in a portfolio, giving you a unified view of your total exposure.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Position Data</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Asset Code</span>
                      <span className="ml-2 text-sm text-[#6A6A6A]">e.g., XLM, USDC, yXLM</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Balance</span>
                      <span className="ml-2 text-sm text-[#6A6A6A]">Total quantity held</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Current Value</span>
                      <span className="ml-2 text-sm text-[#6A6A6A]">USD value at current price</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Cost Basis</span>
                      <span className="ml-2 text-sm text-[#6A6A6A]">Average acquisition cost (PRO+)</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Unrealized P&L</span>
                      <span className="ml-2 text-sm text-[#6A6A6A]">Profit/loss if sold now (PRO+)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* P&L Tracking */}
            <section id="pnl" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">
                P&L Tracking
                <span className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">PRO+</span>
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Track profit and loss across your portfolio with automatic trade import and FIFO cost basis calculation.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">P&L Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">Unrealized P&L</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Profit or loss on positions you still hold, calculated as current value minus cost basis.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">Realized P&L</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Actual profit or loss from completed trades, using FIFO to match buy and sell orders.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">P&L by Time Period</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Period</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">24h</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Change in last 24 hours</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">7d</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Change in last 7 days</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">30d</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Change in last 30 days</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">All Time</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Total P&L since tracking began</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Trustline Risk */}
            <section id="trustlines" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Trustline Risk</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Every non-XLM asset on Stellar requires a trustline to an issuer. Portfolio Intelligence assesses
                the risk of each trustline based on issuer flags and behavior.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Risk Factors</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium">HIGH</span>
                    <span className="font-medium">Authorization Required</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">
                    Issuer can freeze or revoke your assets at any time. Common for regulated securities.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium">HIGH</span>
                    <span className="font-medium">Clawback Enabled</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">
                    Issuer can claw back assets from your account without permission.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">MEDIUM</span>
                    <span className="font-medium">Authorization Revocable</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">
                    Issuer can revoke authorization, freezing the asset in your account.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">LOW</span>
                    <span className="font-medium">Immutable Issuer</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">
                    Issuer cannot change asset flags. This is the safest configuration.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Risk Score</h3>
              <p className="text-[#6A6A6A] text-sm sm:text-base">
                Each trustline receives a risk score from 0-100 based on weighted factors:
              </p>
              <div className="mt-3 bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`Risk Score = (
  authRequired * 25 +
  authRevocable * 20 +
  clawbackEnabled * 30 +
  !authImmutable * 15 +
  lowHolderCount * 10
)`}
                </pre>
              </div>
            </section>

            {/* Contract Positions */}
            <section id="contracts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">
                Contract Positions
                <span className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">PRO+</span>
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Track your positions in Soroban smart contracts, including DeFi protocols, liquidity pools,
                and staking contracts.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Supported Position Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">STAKE</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Tokens staked in validator or protocol staking contracts.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">LP</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Liquidity provider positions in AMM pools.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">LEND</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Assets supplied to lending protocols.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-medium mb-2">BORROW</h4>
                  <p className="text-sm text-[#6A6A6A]">
                    Assets borrowed from lending protocols (liability).
                  </p>
                </div>
              </div>
            </section>

            {/* Yield Tracking */}
            <section id="yield" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">
                Yield Tracking
                <span className="ml-2 px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">PRO+</span>
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Monitor yield from various sources including staking rewards, AMM fees, and lending interest.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Yield Sources</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Type</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-medium">STAKING</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Validator staking rewards</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-medium">AMM_FEES</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Trading fees from liquidity provision</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-medium">LENDING</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Interest from lending protocols</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-medium">AIRDROP</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Token airdrops and distributions</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4 font-medium">OTHER</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Other yield sources</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Yield Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">APY</div>
                  <div className="text-lg font-bold text-green-600">12.5%</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Daily</div>
                  <div className="text-lg font-bold">$42.50</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Monthly</div>
                  <div className="text-lg font-bold">$1,275</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-sm text-[#6A6A6A]">Total Earned</div>
                  <div className="text-lg font-bold">$8,430</div>
                </div>
              </div>
            </section>

            {/* Performance Snapshots */}
            <section id="snapshots" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Performance Snapshots</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Portfolio Intelligence automatically captures daily snapshots of your portfolio value, enabling
                historical performance analysis.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Snapshot Data</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="font-medium">Total Value (USD & XLM)</span>
                  <p className="text-sm text-[#6A6A6A]">Portfolio value at snapshot time</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="font-medium">Cumulative P&L</span>
                  <p className="text-sm text-[#6A6A6A]">Total profit/loss at that point</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="font-medium">Asset Breakdown</span>
                  <p className="text-sm text-[#6A6A6A]">Individual asset values and allocations</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Retention by Tier</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Tier</th>
                      <th className="text-left py-2 px-4 font-medium">Retention</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">FREE</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">7 days</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">PRO</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">90 days</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">DAO</td>
                      <td className="py-2 px-4 text-[#6A6A6A]">365 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* How-to: Create Portfolio */}
            <section id="create-portfolio" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How-to: Create a Portfolio</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-medium">Navigate to Portfolio</h4>
                    <p className="text-sm text-[#6A6A6A]">Click &quot;Portfolio&quot; in the main navigation</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-medium">Click &quot;Create Portfolio&quot;</h4>
                    <p className="text-sm text-[#6A6A6A]">Opens the portfolio creation modal</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-medium">Enter Portfolio Details</h4>
                    <p className="text-sm text-[#6A6A6A]">Provide a name and optional description</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-medium">Submit</h4>
                    <p className="text-sm text-[#6A6A6A]">Your portfolio is created and ready for accounts</p>
                  </div>
                </li>
              </ol>
            </section>

            {/* How-to: Add Account */}
            <section id="add-account" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How-to: Add an Account</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-medium">Open Your Portfolio</h4>
                    <p className="text-sm text-[#6A6A6A]">Select the portfolio you want to add an account to</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-medium">Click &quot;Add Account&quot;</h4>
                    <p className="text-sm text-[#6A6A6A]">Opens the account addition modal</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-medium">Enter Account ID</h4>
                    <p className="text-sm text-[#6A6A6A]">Paste the Stellar public key (starts with G)</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-medium">Add Label (Optional)</h4>
                    <p className="text-sm text-[#6A6A6A]">Give it a friendly name like &quot;Trading&quot; or &quot;Savings&quot;</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">5</span>
                  <div>
                    <h4 className="font-medium">Submit</h4>
                    <p className="text-sm text-[#6A6A6A]">Account is validated and added to your portfolio</p>
                  </div>
                </li>
              </ol>
            </section>

            {/* How-to: Sync Data */}
            <section id="sync-data" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">How-to: Sync Portfolio Data</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Portfolio data is synced automatically, but you can trigger a manual sync to get the latest balances.
              </p>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-medium">Open Your Portfolio Dashboard</h4>
                    <p className="text-sm text-[#6A6A6A]">Navigate to the portfolio you want to sync</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-medium">Click the Sync Button</h4>
                    <p className="text-sm text-[#6A6A6A]">Located in the summary section next to &quot;Last synced&quot;</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-medium">Wait for Sync</h4>
                    <p className="text-sm text-[#6A6A6A]">Data is fetched from Stellar Horizon for all accounts</p>
                  </div>
                </li>
              </ol>
            </section>

            {/* Cost Basis (FIFO) */}
            <section id="cost-basis" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Cost Basis (FIFO)</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Portfolio Intelligence uses First-In-First-Out (FIFO) accounting to calculate cost basis and P&L.
                This is the most common method for tax reporting.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">How FIFO Works</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`Example: You buy XLM at different prices

Buy 1: 1,000 XLM @ $0.10 = $100 cost basis
Buy 2: 500 XLM @ $0.12 = $60 cost basis
Buy 3: 200 XLM @ $0.15 = $30 cost basis

Total: 1,700 XLM, $190 cost basis

When you sell 1,200 XLM:
- First 1,000 XLM from Buy 1 ($100 cost)
- Next 200 XLM from Buy 2 ($24 cost, 200/500 * $60)
- Total cost basis for sale: $124

Remaining: 500 XLM
- 300 XLM from Buy 2 ($36 cost)
- 200 XLM from Buy 3 ($30 cost)
- Remaining cost basis: $66`}
                </pre>
              </div>
            </section>

            {/* Risk Scoring */}
            <section id="risk-scoring" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Risk Scoring</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Each trustline is assigned a risk score from 0-100 based on multiple factors.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Risk Levels</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 px-4 font-medium">Score</th>
                      <th className="text-left py-2 px-4 font-medium">Level</th>
                      <th className="text-left py-2 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">0-25</td>
                      <td className="py-2 px-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">LOW</span></td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Minimal issuer control, safe</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">26-50</td>
                      <td className="py-2 px-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">MEDIUM</span></td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Some issuer control, moderate risk</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">51-75</td>
                      <td className="py-2 px-4"><span className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs">HIGH</span></td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Significant issuer control</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 px-4">76-100</td>
                      <td className="py-2 px-4"><span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">CRITICAL</span></td>
                      <td className="py-2 px-4 text-[#6A6A6A]">Full issuer control, freeze/clawback enabled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">API Reference</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Access Portfolio Intelligence programmatically via the REST API.
              </p>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-3">Portfolios</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/api/portfolio</code>
                      <span className="text-[#6A6A6A]">- List all portfolios</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">POST</span>
                      <code className="text-[#6A6A6A]">/api/portfolio</code>
                      <span className="text-[#6A6A6A]">- Create portfolio</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;</code>
                      <span className="text-[#6A6A6A]">- Get portfolio details</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">PUT</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;</code>
                      <span className="text-[#6A6A6A]">- Update portfolio</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">DELETE</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;</code>
                      <span className="text-[#6A6A6A]">- Delete portfolio</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-3">Accounts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;/accounts</code>
                      <span className="text-[#6A6A6A]">- List accounts</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">POST</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;/accounts</code>
                      <span className="text-[#6A6A6A]">- Add account</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-3">Sync</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">POST</span>
                      <code className="text-[#6A6A6A]">/api/portfolio/&#123;id&#125;/sync</code>
                      <span className="text-[#6A6A6A]">- Sync portfolio data from Horizon</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Example: Create Portfolio</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -X POST "https://lumenquery.io/api/portfolio" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "name": "My Trading Portfolio",
    "description": "Active trading accounts"
  }'`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Example: Add Account</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -X POST "https://lumenquery.io/api/portfolio/{id}/accounts" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "accountId": "GABC...XYZ",
    "label": "Main Trading"
  }'`}
                </pre>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-indigo-600 text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Need Help?</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Have questions about Portfolio Intelligence? We&apos;re here to help.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-indigo-600 text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Contact Support
                </a>
                <Link href="/portfolio" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Go to Portfolio
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
