'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IntelligenceDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Overview</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#dashboard" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Dashboard</a></li>
          <li><a href="#tiers" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Subscription Tiers</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Features</h3>
        <ul className="space-y-2">
          <li><a href="#live-stream" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Live Stream</a></li>
          <li><a href="#accounts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Accounts</a></li>
          <li><a href="#watchlists" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Watchlists</a></li>
          <li><a href="#alerts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Alerts</a></li>
          <li><a href="#trustlines" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Trustlines</a></li>
          <li><a href="#contracts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Contracts</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">API Reference</h3>
        <ul className="space-y-2">
          <li><a href="#api-stream" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Stream API</a></li>
          <li><a href="#api-accounts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Accounts API</a></li>
          <li><a href="#api-watchlists" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Watchlists API</a></li>
          <li><a href="#api-alerts" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Alerts API</a></li>
          <li><a href="#api-trustlines" className="text-[#6A6A6A] hover:text-[#7366FF]" onClick={() => setSidebarOpen(false)}>Trustlines API</a></li>
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
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-medium">Premium Feature</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Transaction Intelligence</h1>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Real-time monitoring, account profiling, and intelligent alerting for the Stellar network.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Transaction Intelligence provides enterprise-grade monitoring and analytics for the Stellar network.
                Track accounts, monitor transactions in real-time, receive intelligent alerts, and gain deep insights
                into on-chain activity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-blue-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Live Streaming</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Real-time transaction feed with filters</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-green-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Account Profiling</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Behavior analysis and risk scoring</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="text-orange-600 text-xl mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Smart Alerts</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Customizable notifications</p>
                </div>
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Dashboard Overview</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Intelligence dashboard provides a central hub for all monitoring operations. Access it at{' '}
                <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Dashboard Statistics</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Metric</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Unread Alerts</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#6A6A6A]">Count of alerts requiring attention</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Watched Accounts</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#6A6A6A]">Total accounts in your watchlists</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Alert Configs</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#6A6A6A]">Active alert rule configurations</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium">TX/Hour</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-[#6A6A6A]">Transactions monitored per hour</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-blue-600 text-lg">Live Stream</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-green-600 text-lg">Accounts</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-purple-600 text-lg">Watchlists</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-orange-600 text-lg">Alerts</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-yellow-600 text-lg">Trustlines</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <span className="text-indigo-600 text-lg">Contracts</span>
                </div>
              </div>
            </section>

            {/* Subscription Tiers */}
            <section id="tiers" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Subscription Tiers</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Transaction Intelligence is available across three tiers with increasing capabilities.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Feature</th>
                      <th className="text-center py-3 px-4 font-medium">Solo ($25/mo)</th>
                      <th className="text-center py-3 px-4 font-medium">Teams ($99/mo)</th>
                      <th className="text-center py-3 px-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Concurrent Streams</td>
                      <td className="py-3 px-4 text-center">2</td>
                      <td className="py-3 px-4 text-center">10</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Watched Accounts</td>
                      <td className="py-3 px-4 text-center">50</td>
                      <td className="py-3 px-4 text-center">500</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Alert Configurations</td>
                      <td className="py-3 px-4 text-center">10</td>
                      <td className="py-3 px-4 text-center">50</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Alert Retention</td>
                      <td className="py-3 px-4 text-center">30 days</td>
                      <td className="py-3 px-4 text-center">90 days</td>
                      <td className="py-3 px-4 text-center">1 year</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Whale Threshold</td>
                      <td className="py-3 px-4 text-center">100K XLM</td>
                      <td className="py-3 px-4 text-center">50K XLM</td>
                      <td className="py-3 px-4 text-center">10K XLM</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Historical Data</td>
                      <td className="py-3 px-4 text-center">30 days</td>
                      <td className="py-3 px-4 text-center">90 days</td>
                      <td className="py-3 px-4 text-center">1 year</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">API Rate Limit</td>
                      <td className="py-3 px-4 text-center">120/min</td>
                      <td className="py-3 px-4 text-center">300/min</td>
                      <td className="py-3 px-4 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Webhook Notifications</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Anomaly Detection</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Live Stream */}
            <section id="live-stream" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Live Stream</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Monitor Stellar network transactions in real-time with powerful filtering capabilities.
                Access at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/stream</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Stream Filters</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">all</span>
                    <span className="font-semibold text-sm">All Transactions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Stream all network operations without filtering</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">payments</span>
                    <span className="font-semibold text-sm">Payment Operations</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">XLM and asset transfers between accounts</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">offers</span>
                    <span className="font-semibold text-sm">DEX Operations</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Manage offers and trades on the decentralized exchange</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">path_payments</span>
                    <span className="font-semibold text-sm">Path Payments</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Cross-asset payments using DEX liquidity paths</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-orange-100 text-orange-700 font-mono text-xs">trustlines</span>
                    <span className="font-semibold text-sm">Trustline Changes</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Trustline creation, updates, and removals</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">whale</span>
                    <span className="font-semibold text-sm">Whale Movements</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Large XLM transfers exceeding your tier threshold</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-mono text-xs">contracts</span>
                    <span className="font-semibold text-sm">Soroban Contracts</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Smart contract invocations (invoke_host_function)</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Stream Controls</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Pause/Resume</h4>
                  <p className="text-xs text-[#6A6A6A]">Temporarily pause the stream to analyze transactions without losing new data</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Clear History</h4>
                  <p className="text-xs text-[#6A6A6A]">Reset the transaction list while keeping the stream connected</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Auto-Scroll</h4>
                  <p className="text-xs text-[#6A6A6A]">Automatically scrolls to new transactions; pauses when you scroll up</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Status Indicator</h4>
                  <p className="text-xs text-[#6A6A6A]">Shows connection status: connecting, connected, disconnected, error</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Technical Details</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm">
                <li>Uses Server-Sent Events (SSE) for real-time streaming</li>
                <li>5-second polling intervals with automatic reconnection</li>
                <li>Maximum 100 transactions retained in history by default</li>
                <li>Auto-reconnection with 5-second delay on disconnect</li>
              </ul>
            </section>

            {/* Accounts */}
            <section id="accounts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Accounts</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Analyze any Stellar account or Soroban contract with comprehensive profiling.
                Access at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/accounts</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Account Profile Data</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "account": {
    "id": "GABC...XYZ",
    "displayId": "GABC...XYZ",
    "sequence": "123456789",
    "lastModified": "2026-02-13T10:30:00Z"
  },
  "balance": {
    "xlm": "1000000.0000000",
    "xlmFormatted": "1,000,000.00 XLM"
  },
  "classification": {
    "type": "WHALE",
    "riskScore": 25
  },
  "activity": {
    "recentOperations": 152,
    "totalVolume": "5.2M XLM",
    "uniqueCounterparties": 87
  },
  "trustlines": [...],
  "topCounterparties": [...],
  "recentTransactions": [...],
  "behaviorMetrics": {...}  // Premium only
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Account Classification Types</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Criteria</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">WHALE</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Balance &ge; 10M XLM</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">High-value account</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">EXCHANGE</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">&gt;50 counterparties</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Exchange or high-activity</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">MARKET_MAKER</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">&gt;10 trustlines</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Multi-asset trading</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">ISSUER</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Has issued assets</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Asset issuer account</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">ANCHOR</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Verified anchor</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Fiat on/off-ramp</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs">RETAIL</span></td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Payment activity</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Standard user account</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Behavior Metrics (Premium)</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Premium subscribers get access to detailed behavior analysis scores (0-100):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Velocity Score</h4>
                  <p className="text-xs text-[#6A6A6A]">Transaction frequency relative to typical accounts</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Volume Score</h4>
                  <p className="text-xs text-[#6A6A6A]">Average transaction size compared to network</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Diversity Score</h4>
                  <p className="text-xs text-[#6A6A6A]">Number and variety of counterparties</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-1 text-sm">Regularity Score</h4>
                  <p className="text-xs text-[#6A6A6A]">Consistency of transaction patterns over time</p>
                </div>
              </div>
            </section>

            {/* Watchlists */}
            <section id="watchlists" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Watchlists</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Organize and monitor groups of accounts with custom watchlists.
                Access at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/watchlists</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Watchlist Features</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm mb-6">
                <li>Create unlimited watchlists to organize accounts by purpose</li>
                <li>Add labels to accounts for easy identification</li>
                <li>Quick access to account profiles from watchlist view</li>
                <li>Track account count against your tier limits</li>
                <li>Filter live stream by watchlist accounts</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Watchlist Structure</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "id": "wl_abc123",
  "name": "High-Value Traders",
  "description": "Top traders to monitor for market signals",
  "createdAt": "2026-02-10T15:30:00Z",
  "updatedAt": "2026-02-13T09:45:00Z",
  "accounts": [
    {
      "id": "wa_xyz789",
      "accountId": "GABC...XYZ",
      "label": "Whale Alpha",
      "addedAt": "2026-02-10T15:35:00Z"
    }
  ]
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Account Limits by Tier</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-2xl font-bold text-[#7366FF]">50</div>
                  <div className="text-xs text-[#6A6A6A]">Solo Tier</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-2xl font-bold text-[#7366FF]">500</div>
                  <div className="text-xs text-[#6A6A6A]">Teams Tier</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-2xl font-bold text-[#7366FF]">&infin;</div>
                  <div className="text-xs text-[#6A6A6A]">Enterprise</div>
                </div>
              </div>
            </section>

            {/* Alerts */}
            <section id="alerts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Alerts</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Configure intelligent alerts to be notified of important on-chain events.
                Inbox at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/alerts</code>,
                configurations at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/alerts/configs</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Alert Types</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">WHALE_MOVEMENT</span>
                    <span className="font-semibold text-sm">Whale Movement</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-2">Monitors large XLM transfers exceeding a threshold</p>
                  <div className="text-xs text-[#6A6A6A]">
                    <strong>Conditions:</strong> minAmount, assetCode (optional), accounts (optional)
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">TRUSTLINE_CHANGE</span>
                    <span className="font-semibold text-sm">Trustline Change</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-2">Tracks trustline creation, removal, or updates</p>
                  <div className="text-xs text-[#6A6A6A]">
                    <strong>Conditions:</strong> eventType (created/removed/both), assetCode, accounts
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-mono text-xs">ACCOUNT_ACTIVITY</span>
                    <span className="font-semibold text-sm">Account Activity</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-2">Monitors operations from accounts in a watchlist</p>
                  <div className="text-xs text-[#6A6A6A]">
                    <strong>Conditions:</strong> watchlistId, minAmount, operationTypes
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-mono text-xs">CONTRACT_CALL</span>
                    <span className="font-semibold text-sm">Contract Call</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-2">Tracks Soroban contract invocations</p>
                  <div className="text-xs text-[#6A6A6A]">
                    <strong>Conditions:</strong> contractId, functionName (optional), minGas
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">ANOMALY_DETECTED</span>
                    <span className="font-semibold text-sm">Anomaly Detection</span>
                    <span className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs">Premium</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A] mb-2">AI-powered anomaly detection on account behavior</p>
                  <div className="text-xs text-[#6A6A6A]">
                    <strong>Conditions:</strong> sensitivity (low/medium/high), accounts
                  </div>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Alert Severity Levels</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-xs">INFO</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">Informational events</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-semibold text-xs">WARNING</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">Events needing attention</p>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                  <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-semibold text-xs">CRITICAL</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">Urgent events</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Notification Channels</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Channel</th>
                      <th className="text-center py-3 px-4 font-medium">Solo</th>
                      <th className="text-center py-3 px-4 font-medium">Teams</th>
                      <th className="text-center py-3 px-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">In-App Alerts</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Email</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Webhooks</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4">Slack Integration</td>
                      <td className="py-3 px-4 text-center text-red-500">No</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                      <td className="py-3 px-4 text-center text-green-500">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Cooldown Period</h3>
              <p className="text-[#6A6A6A] text-sm">
                Each alert configuration has a cooldown period (default: 5 minutes) to prevent notification spam.
                After an alert triggers, the same configuration won&apos;t fire again until the cooldown expires.
              </p>
            </section>

            {/* Trustlines */}
            <section id="trustlines" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Trustlines</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Monitor trustline changes across the Stellar network.
                Access at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/trustlines</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Trustline Change Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                  <span className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold text-sm">Created</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">New trustline established</p>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-center">
                  <span className="px-3 py-1 rounded bg-red-100 text-red-700 font-semibold text-sm">Removed</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">Trustline deleted</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                  <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-sm">Updated</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">Trustline limit changed</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Filter Options</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm">
                <li><strong>Type Filter:</strong> Show all changes, only created, or only removed</li>
                <li><strong>Asset Filter:</strong> Filter by specific asset code (e.g., USDC, yXLM)</li>
                <li><strong>Limit:</strong> Control how many results to display (max 100)</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Trustline Data</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "id": "tl_123",
  "type": "created",
  "account": "GABC...XYZ",
  "fullAccount": "GABCD...",  // Premium only
  "assetCode": "USDC",
  "assetIssuer": "GCNY...ABC",
  "fullIssuer": "GCNY5...",   // Premium only
  "limit": "1000000.0000000",
  "createdAt": "2026-02-13T10:30:00Z"
}`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Summary Analytics</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                The trustlines page displays summary analytics including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-lg font-bold text-[#7366FF]">Total</div>
                  <div className="text-xs text-[#6A6A6A]">All changes</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-lg font-bold text-green-600">Created</div>
                  <div className="text-xs text-[#6A6A6A]">New trustlines</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-lg font-bold text-red-600">Removed</div>
                  <div className="text-xs text-[#6A6A6A]">Deleted</div>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] text-center">
                  <div className="text-lg font-bold text-purple-600">Top Assets</div>
                  <div className="text-xs text-[#6A6A6A]">Most active</div>
                </div>
              </div>
            </section>

            {/* Contracts */}
            <section id="contracts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Contracts</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Track Soroban smart contract activity on the Stellar network.
                Access at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] text-xs">/intelligence/contracts</code>.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Contract Monitoring Features</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Contract Invocations</h4>
                  <p className="text-xs text-[#6A6A6A]">Track all invoke_host_function operations targeting Soroban contracts</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Function Calls</h4>
                  <p className="text-xs text-[#6A6A6A]">Filter by specific function names within contracts</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Gas Usage</h4>
                  <p className="text-xs text-[#6A6A6A]">Monitor gas consumption and set alerts for high-gas transactions</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold mb-2 text-sm">Contract Events</h4>
                  <p className="text-xs text-[#6A6A6A]">Stream events emitted by contracts in real-time</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Use Cases</h3>
              <ul className="list-disc list-inside space-y-2 text-[#6A6A6A] text-sm">
                <li>Monitor DeFi protocol activity (swaps, liquidity changes)</li>
                <li>Track NFT minting and transfers</li>
                <li>Watch for contract upgrades or admin operations</li>
                <li>Set alerts for unusual gas consumption patterns</li>
                <li>Analyze contract adoption and usage trends</li>
              </ul>

              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-indigo-700 text-sm">Pro Tip</span>
                </div>
                <p className="text-xs sm:text-sm text-indigo-700">
                  Combine contract monitoring with the Live Stream filter set to &quot;contracts&quot;
                  for a real-time view of all Soroban activity on the network.
                </p>
              </div>
            </section>

            {/* API Reference: Stream */}
            <section id="api-stream" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Stream API</h2>

              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                  <code className="text-[#6A6A6A] text-sm">/api/intelligence/stream</code>
                </div>
                <p className="text-xs sm:text-sm text-[#6A6A6A]">Server-Sent Events stream of network transactions</p>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Parameter</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">filter</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">string</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Transaction type: all, payments, offers, path_payments, trustlines, whale, contracts</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">value</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">string</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Filter value (account ID or asset code)</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">minAmount</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">number</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Minimum XLM amount for whale filter</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Event Types</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 mb-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`// Connection established
event: connected
data: {"message": "Stream connected"}

// New transaction
event: transaction
data: {"id": "...", "type": "payment", "amount": "100.00", ...}

// Keep-alive (every 5 seconds)
event: heartbeat
data: {"timestamp": "2026-02-13T10:30:00Z"}

// Error occurred
event: error
data: {"message": "Error description"}

// Rate limit reached
event: rate_limit
data: {"message": "Rate limit exceeded", "retryAfter": 60}`}
                </pre>
              </div>
            </section>

            {/* API Reference: Accounts */}
            <section id="api-accounts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Accounts API</h2>

              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                  <code className="text-[#6A6A6A] text-sm">/api/intelligence/accounts/&#123;accountId&#125;</code>
                </div>
                <p className="text-xs sm:text-sm text-[#6A6A6A]">Get detailed profile for a Stellar account or contract</p>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Path Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Parameter</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">accountId</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Stellar account (G...) or contract ID (C...)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Response</h3>
              <div className="bg-[#1D1E26] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`{
  "profile": {
    "account": { "id": "GABC...", "sequence": "123" },
    "balance": { "xlm": "1000000", "xlmFormatted": "1M XLM" },
    "classification": { "type": "WHALE", "riskScore": 25 },
    "activity": { "recentOperations": 152, "totalVolume": "5.2M XLM" },
    "trustlines": [...],
    "topCounterparties": [...],
    "recentTransactions": [...],
    "behaviorMetrics": { ... }  // Premium only
  }
}`}
                </pre>
              </div>
            </section>

            {/* API Reference: Watchlists */}
            <section id="api-watchlists" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Watchlists API</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">List all watchlists with account counts</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-[#7366FF]/10 text-[#7366FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Create a new watchlist</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Get watchlist details</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">PUT</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Update watchlist name/description</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">DELETE</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Delete a watchlist</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-[#7366FF]/10 text-[#7366FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists/&#123;id&#125;/accounts</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Add account to watchlist</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">DELETE</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/watchlists/&#123;id&#125;/accounts/&#123;accountId&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Remove account from watchlist</p>
                </div>
              </div>
            </section>

            {/* API Reference: Alerts */}
            <section id="api-alerts" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Alerts API</h2>

              <h3 className="text-base sm:text-lg font-semibold mt-4 mb-3">Alert Inbox</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">List alerts with optional filters (status, severity)</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">PUT</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Mark alert as read</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">DELETE</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Delete an alert</p>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Alert Configurations</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/configs</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">List all alert configurations</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-[#7366FF]/10 text-[#7366FF] font-mono text-xs">POST</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/configs</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Create new alert configuration</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs">PUT</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/configs/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Update alert configuration</p>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs">DELETE</span>
                    <code className="text-[#6A6A6A] text-sm">/api/intelligence/alerts/configs/&#123;id&#125;</code>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Delete alert configuration</p>
                </div>
              </div>
            </section>

            {/* API Reference: Trustlines */}
            <section id="api-trustlines" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Trustlines API</h2>

              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                  <code className="text-[#6A6A6A] text-sm">/api/intelligence/trustlines</code>
                </div>
                <p className="text-xs sm:text-sm text-[#6A6A6A]">Get recent trustline changes with filters</p>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Query Parameters</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-medium">Parameter</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">type</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">string</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Filter: all, created, removed</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">asset</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">string</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Filter by asset code</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-3 px-4 font-mono">limit</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">number</td>
                      <td className="py-3 px-4 text-[#6A6A6A]">Max results (default 50, max 100)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Need Help?</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Have questions about Transaction Intelligence? We&apos;re here to help.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-[#7366FF] text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Contact Support
                </a>
                <Link href="/intelligence" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Go to Intelligence
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
