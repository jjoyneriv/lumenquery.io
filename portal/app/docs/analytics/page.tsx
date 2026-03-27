'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AnalyticsDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Overview</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#dashboard" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Dashboard</a></li>
          <li><a href="#time-ranges" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Time Ranges</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Sections</h3>
        <ul className="space-y-2">
          <li><a href="#network" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Network Metrics</a></li>
          <li><a href="#tokens" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Token Analytics</a></li>
          <li><a href="#contracts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Smart Contracts</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Reference</h3>
        <ul className="space-y-2">
          <li><a href="#stroops" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Understanding Stroops</a></li>
          <li><a href="#api-reference" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>API Reference</a></li>
          <li><a href="#data-sources" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Data Sources</a></li>
        </ul>
      </div>
      <div>
        <Link href="/docs" className="text-[#7366FF] hover:underline text-sm flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Docs
        </Link>
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
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Public Access</span>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Real-Time</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Stellar Network Analytics</h1>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Real-time blockchain metrics, token analytics, and smart contract insights for the Stellar network.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Stellar Network Analytics provides a comprehensive, real-time view of the Stellar blockchain.
                Monitor ledger sequences, transaction throughput, token activity, and Soroban smart contract
                interactions—all without requiring authentication.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-blue-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Network</h3>
                  <p className="text-xs text-[#6A6A6A]">Ledgers, TPS, fees</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-green-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Tokens</h3>
                  <p className="text-xs text-[#6A6A6A]">Volume, whales, risk</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="text-purple-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Contracts</h3>
                  <p className="text-xs text-[#6A6A6A]">Soroban activity</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="text-orange-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">Real-Time</h3>
                  <p className="text-xs text-[#6A6A6A]">30-60s refresh</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-50 border border-green-200 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-green-700 text-sm">No Authentication Required</span>
                </div>
                <p className="text-xs sm:text-sm text-green-700">
                  All analytics pages are publicly accessible. No API key or account needed to view real-time network data.
                </p>
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Dashboard Overview</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Analytics dashboard at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/analytics</code> provides
                a high-level view of Stellar network health and activity.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Current Ledger
                  </h4>
                  <p className="text-xs text-[#6A6A6A]">Latest ledger sequence number and protocol version. Updates every ~5 seconds as new ledgers close.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Transactions (24h)
                  </h4>
                  <p className="text-xs text-[#6A6A6A]">Estimated total transactions in the last 24 hours, extrapolated from recent ledger data.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    Success Rate
                  </h4>
                  <p className="text-xs text-[#6A6A6A]">Percentage of transactions that completed successfully. High rates indicate network health.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    Average Fee
                  </h4>
                  <p className="text-xs text-[#6A6A6A]">Average transaction fee in stroops. Includes P95 percentile for fee estimation.</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Historical Charts</h3>
              <p className="text-[#6A6A6A] text-sm mb-4">
                Two side-by-side area charts visualize trends over your selected time range:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-semibold mb-1 text-sm text-blue-700">Transaction Volume</h4>
                  <p className="text-xs text-blue-600">Number of transactions per time bucket (hourly, 4-hour, or daily)</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-1 text-sm text-green-700">Success Rate</h4>
                  <p className="text-xs text-green-600">Transaction success percentage over time</p>
                </div>
              </div>
            </section>

            {/* Time Ranges */}
            <section id="time-ranges" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Time Ranges</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Use the time range selector to view data across different periods. Each range uses appropriate
                data aggregation for optimal visualization.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Range</th>
                      <th className="text-left py-3 px-4 font-medium">Data Points</th>
                      <th className="text-left py-3 px-4 font-medium">Bucket Size</th>
                      <th className="text-left py-3 px-4 font-medium">Cache TTL</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">24h</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">~25 points</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Hourly</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">30 seconds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-medium">7d</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">~43 points</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">4-hour</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">5 minutes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-orange-100 text-orange-700 font-medium">30d</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">~20 points</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Daily</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">10 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-yellow-700 text-sm">Note</span>
                </div>
                <p className="text-xs sm:text-sm text-yellow-700">
                  The 30-day range shows approximately 19 days of data, limited by the available Horizon ledger history.
                </p>
              </div>
            </section>

            {/* Network Metrics */}
            <section id="network" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Network Metrics</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Detailed ledger and transaction analysis available at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/analytics/network</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Current Ledger Information</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "ledger": {
    "sequence": 61234567,           // Current ledger number
    "closedAt": "2026-02-13T10:30:22Z",  // When this ledger closed
    "protocolVersion": 25           // Stellar protocol version
  }
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Transaction Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Metric</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                      <th className="text-left py-3 px-4 font-medium">Calculation</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-medium">Transactions (24h)</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Estimated 24-hour transaction count</td>
                      <td className="py-3 px-4 text-[#6A6A6A]"><code className="text-xs">sample_txs × (86400 / sample_timespan)</code></td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-medium">TPS</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Transactions per second</td>
                      <td className="py-3 px-4 text-[#6A6A6A]"><code className="text-xs">txs_last_10_ledgers / timespan_seconds</code></td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-medium">Success Rate</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Percentage of successful transactions</td>
                      <td className="py-3 px-4 text-[#6A6A6A]"><code className="text-xs">successful_txs / total_txs × 100</code></td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-medium">Average Fee</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Mean base fee across ledgers</td>
                      <td className="py-3 px-4 text-[#6A6A6A]"><code className="text-xs">sum(base_fees) / ledger_count</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Fee Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Current Fee</h4>
                  <p className="text-xs text-[#6A6A6A]">Base fee from the latest ledger in stroops</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Average (24h)</h4>
                  <p className="text-xs text-[#6A6A6A]">Mean fee calculated from sample ledgers</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">P95 Percentile</h4>
                  <p className="text-xs text-[#6A6A6A]">95th percentile fee for estimation</p>
                </div>
              </div>
            </section>

            {/* Token Analytics */}
            <section id="tokens" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Token Analytics</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Token velocity, whale tracking, and issuer risk analysis at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/analytics/tokens</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Velocity Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-1 text-sm text-green-700">Payments (24h)</h4>
                  <p className="text-xs text-green-600">Total XLM payment operations, extrapolated from sample data</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-1 text-sm text-green-700">Volume (24h)</h4>
                  <p className="text-xs text-green-600">Total XLM transferred across all payments</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-1 text-sm text-green-700">Avg Payment Size</h4>
                  <p className="text-xs text-green-600">Mean transaction amount in XLM</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Top Tokens by Volume</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Shows the top 5 assets by 24-hour trading volume, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm mb-6">
                <li><strong>Token Code:</strong> Asset code (e.g., USDC, yXLM)</li>
                <li><strong>Issuer:</strong> Truncated issuer address</li>
                <li><strong>24h Volume:</strong> Total volume in XLM</li>
                <li><strong>Payment Count:</strong> Number of payments involving this asset</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Whale Tracking</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <h4 className="font-semibold mb-2 text-sm text-red-700">Top XLM Holders (&gt;1M XLM)</h4>
                  <p className="text-xs text-red-600 mb-2">Accounts holding more than 1 million XLM</p>
                  <div className="text-xs text-red-600">
                    <strong>Columns:</strong> Address, Balance (XLM), Last Activity
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <h4 className="font-semibold mb-2 text-sm text-orange-700">Recent Large Movements (&gt;100K XLM)</h4>
                  <p className="text-xs text-orange-600 mb-2">Transfers exceeding 100,000 XLM</p>
                  <div className="text-xs text-orange-600">
                    <strong>Columns:</strong> From, To, Amount (XLM), Time
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Issuer Risk Analysis</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Evaluates token issuer trustworthiness based on account flags:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Risk Level</th>
                      <th className="text-left py-3 px-4 font-medium">Criteria</th>
                      <th className="text-left py-3 px-4 font-medium">Meaning</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 font-medium">Low</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Flags immutable OR no special flags</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Issuer cannot change permissions</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-medium">Medium</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Authorization required only</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Issuer must approve trustlines</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-red-100 text-red-700 font-medium">High</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Clawback OR revocable enabled</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Issuer can freeze/reclaim assets</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-sm font-semibold mb-3">Risk Factors Evaluated</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-xs text-[#6A6A6A]">authRequired</code>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-xs text-[#6A6A6A]">authRevocable</code>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-xs text-[#6A6A6A]">authClawback</code>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <code className="text-xs text-[#6A6A6A]">authImmutable</code>
                </div>
              </div>
            </section>

            {/* Smart Contracts */}
            <section id="contracts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Smart Contracts (Soroban)</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban smart contract activity and gas usage metrics at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/analytics/contracts</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Activity Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-semibold mb-1 text-sm text-purple-700">Invocations (24h)</h4>
                  <p className="text-xs text-purple-600">Total contract invocations, extrapolated from sample</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-semibold mb-1 text-sm text-purple-700">Success Rate</h4>
                  <p className="text-xs text-purple-600">Percentage of successful contract calls</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-semibold mb-1 text-sm text-purple-700">Avg Gas Fee</h4>
                  <p className="text-xs text-purple-600">Mean gas fee (displayed in stroops or XLM)</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Gas Usage & Fee Percentiles</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Fee statistics from the Soroban RPC with percentile breakdowns:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-lg font-bold text-[#7366FF]">Mode</div>
                  <div className="text-xs text-[#6A6A6A]">Most common fee</div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                  <div className="text-lg font-bold text-green-600">P50</div>
                  <div className="text-xs text-green-600">Median fee</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                  <div className="text-lg font-bold text-yellow-600">P95</div>
                  <div className="text-xs text-yellow-600">95th percentile</div>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                  <div className="text-lg font-bold text-red-600">P99</div>
                  <div className="text-xs text-red-600">99th percentile</div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Top Contracts</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Most active contracts ranked by invocation count:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm mb-6">
                <li><strong>Contract ID:</strong> Truncated contract address</li>
                <li><strong>Invocations (24h):</strong> Extrapolated call count</li>
                <li><strong>Last Activity:</strong> Time since last invocation</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Recent Events</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Latest contract events from the network:
              </p>
              <div className="bg-[#1D1E26] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "events": [
    {
      "contractId": "CABC...XYZ",    // Contract address
      "type": "ContractEvent",       // Event type
      "ledger": 61234567,            // Ledger sequence
      "timestamp": "5m ago",         // Relative time
      "txHash": "abc123...def"       // Transaction hash
    }
  ]
}`}
                </pre>
              </div>
            </section>

            {/* Understanding Stroops */}
            <section id="stroops" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Understanding Stroops</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Stroops are the smallest unit of currency on the Stellar network, similar to how satoshis
                are to Bitcoin or wei is to Ethereum.
              </p>

              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 mb-6">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[#7366FF] mb-2">1 XLM = 10,000,000 stroops</div>
                  <div className="text-sm text-[#6A6A6A]">One XLM equals ten million stroops (10<sup>7</sup>)</div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Why Stroops?</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Precision</h4>
                  <p className="text-xs text-[#6A6A6A]">Stroops allow for highly precise transactions. The smallest possible payment on Stellar is 0.0000001 XLM (1 stroop).</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Integer Math</h4>
                  <p className="text-xs text-[#6A6A6A]">Using integers avoids floating-point precision issues that can cause rounding errors in financial calculations.</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Low Fees</h4>
                  <p className="text-xs text-[#6A6A6A]">The base transaction fee is typically 100 stroops (0.00001 XLM), making Stellar extremely cost-effective.</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Conversion Examples</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Stroops</th>
                      <th className="text-left py-3 px-4 font-medium">XLM</th>
                      <th className="text-left py-3 px-4 font-medium">Common Use</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">1</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">0.0000001 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Minimum unit</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">100</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">0.00001 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Base transaction fee</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">10,000</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">0.001 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Small micro-payment</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">1,000,000</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">0.1 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Small transfer</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">10,000,000</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">1 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Standard unit</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">100,000,000</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">10 XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Typical payment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Conversion Formulas</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`// Stroops to XLM
const xlm = stroops / 10_000_000;

// XLM to Stroops
const stroops = xlm * 10_000_000;

// Examples:
100 stroops → 0.00001 XLM
1 XLM → 10,000,000 stroops`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Display Format in Analytics</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Our analytics use smart formatting based on context:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Network Fees</h4>
                  <p className="text-xs text-[#6A6A6A]">Always displayed in stroops (e.g., &quot;100 stroops&quot;)</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Token Volumes</h4>
                  <p className="text-xs text-[#6A6A6A]">Always displayed in XLM with 2 decimal places (e.g., &quot;1,234,567.89 XLM&quot;)</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Contract Gas Fees</h4>
                  <p className="text-xs text-[#6A6A6A]">Smart display: stroops for small amounts, XLM for amounts &ge;10,000,000 stroops</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-semibold text-blue-700 text-sm">Origin of the Name</span>
                </div>
                <p className="text-xs sm:text-sm text-blue-700">
                  The term &quot;stroop&quot; is named after the astronomical unit &quot;parsec&quot; spelled backwards (sort of).
                  It&apos;s a playful nod to Stellar&apos;s space-themed naming conventions, where lumens (XLM) refer to units of light.
                </p>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">API Reference</h2>

              <div className="space-y-6">
                {/* Network API */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/analytics/network</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-3">Network metrics including ledger info, transactions, and fees</p>
                  <div className="text-xs">
                    <strong>Query Parameters:</strong>
                    <code className="ml-2 px-2 py-1 rounded bg-white text-[#7366FF]">range=24h|7d|30d</code>
                  </div>
                </div>

                {/* Tokens API */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/analytics/tokens</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-3">Token velocity, whale tracking, and issuer risk analysis</p>
                  <div className="text-xs">
                    <strong>Query Parameters:</strong>
                    <code className="ml-2 px-2 py-1 rounded bg-white text-[#7366FF]">range=24h|7d|30d</code>
                  </div>
                </div>

                {/* Contracts API */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/analytics/contracts</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-3">Soroban contract activity, gas usage, and events</p>
                  <div className="text-xs">
                    <strong>Query Parameters:</strong>
                    <code className="ml-2 px-2 py-1 rounded bg-white text-[#7366FF]">range=24h|7d|30d</code>
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Response Example (Network)</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "ledger": {
    "sequence": 61234567,
    "closedAt": "2026-02-13T10:30:22Z",
    "protocolVersion": 25
  },
  "transactions": {
    "last24h": 4500000,
    "tps": 52.13,
    "successRate": 99.2
  },
  "fees": {
    "current": 100,
    "avg24h": 100,
    "percentile95": 7500
  },
  "history": [
    {
      "timestamp": "2026-02-12T05:00:00.000Z",
      "transactions": 180000,
      "successRate": 99.1
    }
  ],
  "updatedAt": "2026-02-13T10:30:30.000Z"
}`}
                </pre>
              </div>
            </section>

            {/* Data Sources */}
            <section id="data-sources" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Data Sources</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                All analytics data is sourced from the Stellar network infrastructure:
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-semibold mb-2 text-sm text-blue-700">Stellar Horizon API</h4>
                  <p className="text-xs text-blue-600">
                    Provides ledgers, transactions, operations, effects, and account data. Used for all network
                    and token analytics.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-semibold mb-2 text-sm text-purple-700">Soroban RPC</h4>
                  <p className="text-xs text-purple-600">
                    Provides smart contract data including events, fee statistics, and contract state.
                    Used for contract analytics.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-semibold mb-2 text-sm text-green-700">Redis Cache</h4>
                  <p className="text-xs text-green-600">
                    All API responses are cached with time-based expiration (30s to 10min) to ensure
                    fast response times and reduce load on data sources.
                  </p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Data Refresh Rates</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Section</th>
                      <th className="text-left py-3 px-4 font-medium">Auto-Refresh</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Network Overview</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Every 30 seconds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Network Metrics</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Every 30 seconds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Token Analytics</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Every 60 seconds</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Contract Analytics</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Every 60 seconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Explore Analytics</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Ready to dive into Stellar network data? Access our real-time analytics dashboard.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/analytics" className="px-4 py-2 rounded-lg bg-white text-[#7366FF] text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Go to Analytics
                </Link>
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Contact Support
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
