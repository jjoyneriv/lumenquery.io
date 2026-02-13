'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Getting Started</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#authentication" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Authentication</a></li>
          <li><a href="#quick-start" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Quick Start</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Horizon API</h3>
        <ul className="space-y-2">
          <li><a href="#base-url" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Base URL</a></li>
          <li><a href="#endpoints" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Endpoints</a></li>
          <li><a href="#rate-limits" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Rate Limits</a></li>
          <li><a href="#errors" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Errors</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Soroban RPC</h3>
        <ul className="space-y-2">
          <li><a href="#soroban-overview" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Overview</a></li>
          <li><a href="#soroban-methods" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Methods</a></li>
          <li><a href="#soroban-examples" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Examples</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Resources</h3>
        <ul className="space-y-2">
          <li><a href="#sdks" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>SDKs</a></li>
          <li><a href="#examples" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Examples</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Features</h3>
        <ul className="space-y-2">
          <li><Link href="/docs/analytics" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Stellar Network Analytics</Link></li>
          <li><Link href="/docs/intelligence" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Transaction Intelligence</Link></li>
          <li><Link href="/docs/compliance" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Compliance & AML</Link></li>
          <li><Link href="/docs/contracts" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Smart Contracts Explorer</Link></li>
          <li><Link href="/docs/portfolio" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Portfolio Intelligence</Link></li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="docs" />

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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">LumenQuery API Documentation</h1>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Enterprise-grade Stellar infrastructure. Horizon API for blockchain data, Soroban RPC for smart contracts.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                LumenQuery provides fully-managed Stellar infrastructure for building blockchain applications.
                Access both the <strong>Horizon REST API</strong> for blockchain data and the <strong>Soroban RPC</strong> for
                smart contract interactions. Our infrastructure handles the complexity of running nodes,
                so you can focus on building your application.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">REST</span>
                    <h3 className="font-semibold text-sm sm:text-base">Horizon API</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Access accounts, transactions, ledgers, and all blockchain data via REST API.</p>
                  <code className="text-xs text-blue-600 mt-2 block">api.lumenquery.io</code>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">JSON-RPC</span>
                    <h3 className="font-semibold text-sm sm:text-base">Soroban RPC</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Deploy and invoke smart contracts, simulate transactions, query contract state.</p>
                  <code className="text-xs text-purple-600 mt-2 block">rpc.lumenquery.io</code>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-xl sm:text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Fast</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Low-latency responses from optimized infrastructure</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-xl sm:text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Secure</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">HTTPS encryption and API key authentication</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-xl sm:text-2xl mb-2">📈</div>
                  <h3 className="font-semibold mb-1 text-sm sm:text-base">Scalable</h3>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Handle millions of requests with ease</p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Authentication</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                All API requests require authentication using an API key. Include your API key in the
                <code className="mx-1 px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] border border-[#E6E7E9] text-xs sm:text-sm">X-API-Key</code> header.
              </p>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`X-API-Key: lq_your_api_key_here`}
                </pre>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                <strong>Keep your API key secure!</strong> Never expose your API key in client-side code or public repositories.
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Quick Start</h2>
              <ol className="list-decimal list-inside space-y-3 sm:space-y-4 text-[#6A6A6A] text-sm sm:text-base">
                <li><strong className="text-black">Create an account</strong> at <Link href="/auth/signup" className="text-[#2855FF] hover:underline">lumenquery.io/auth/signup</Link></li>
                <li><strong className="text-black">Generate an API key</strong> from your <Link href="/dashboard" className="text-[#2855FF] hover:underline">dashboard</Link></li>
                <li><strong className="text-black">Make your first request:</strong></li>
              </ol>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mt-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -H "X-API-Key: lq_your_api_key" \\
  https://api.lumenquery.io/ledgers?limit=1`}
                </pre>
              </div>
            </section>

            {/* Base URL */}
            <section id="base-url" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Base URL</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">All API requests should be made to:</p>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
                <code className="text-[#2855FF] text-sm sm:text-lg">https://api.lumenquery.io</code>
              </div>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Endpoints</h2>
              <p className="text-[#6A6A6A] mb-4 sm:mb-6 text-sm sm:text-base">
                LumenQuery provides full access to the Stellar Horizon API. All standard Horizon endpoints are available.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Accounts</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A] break-all">/accounts/&#123;account_id&#125;</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A] break-all">/accounts/&#123;account_id&#125;/transactions</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Ledgers</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/ledgers</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/ledgers/&#123;sequence&#125;</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Transactions</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/transactions</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                      <code className="text-[#6A6A6A]">/transactions</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Rate Limits</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Horizon API and Soroban RPC have separate rate limits. Both are tracked independently per organization.
              </p>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3 flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">REST</span>
                Horizon API
              </h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full min-w-[400px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Plan</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Req/Min</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Req/Month</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Free</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">60</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">10,000</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Starter</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">300</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">100,000</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Professional</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">1,000</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">1,000,000</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Enterprise</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">5,000</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3 flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">JSON-RPC</span>
                Soroban RPC
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-sm">
                  <thead>
                    <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Plan</th>
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium">Requests/Minute</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Free</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">30</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Starter</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">150</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Professional</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">500</td>
                    </tr>
                    <tr className="border-b border-[#E6E7E9]">
                      <td className="py-2 sm:py-3 px-2 sm:px-4">Enterprise</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4">2,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Errors */}
            <section id="errors" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Errors</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-xs sm:text-sm">401</span>
                    <span className="font-semibold text-sm sm:text-base">Unauthorized</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Missing or invalid API key</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-xs sm:text-sm">429</span>
                    <span className="font-semibold text-sm sm:text-base">Too Many Requests</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#6A6A6A]">Rate limit exceeded</p>
                </div>
              </div>
            </section>

            {/* Soroban RPC Overview */}
            <section id="soroban-overview" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9] flex flex-wrap items-center gap-2">
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs sm:text-sm">JSON-RPC</span>
                Soroban RPC
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban RPC provides access to Stellar&apos;s smart contract platform. Use it to deploy contracts,
                invoke contract functions, simulate transactions, and query contract state.
              </p>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
                <p className="text-[#6A6A6A] text-xs sm:text-sm mb-2">RPC Endpoint:</p>
                <code className="text-[#2855FF] text-sm sm:text-lg">https://rpc.lumenquery.io</code>
              </div>
            </section>

            {/* Soroban Methods */}
            <section id="soroban-methods" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Soroban RPC Methods</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Network & Health</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getHealth</code>
                      <span className="text-[#6A6A6A] hidden sm:inline">- Check RPC server health</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getNetwork</code>
                      <span className="text-[#6A6A6A] hidden sm:inline">- Get network configuration</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getLatestLedger</code>
                      <span className="text-[#6A6A6A] hidden sm:inline">- Get current ledger sequence</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Transactions</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">simulateTransaction</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">sendTransaction</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getTransaction</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getTransactions</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Contract Data</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getLedgerEntries</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getEvents</code>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getFeeStats</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Soroban Examples */}
            <section id="soroban-examples" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Soroban RPC Examples</h2>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Check RPC Health</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-3">Get Latest Ledger</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getLatestLedger"}' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-3">Simulate Transaction</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"simulateTransaction",
    "params":{"transaction":"AAAAAgAAAA...base64_xdr"}
  }' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>
            </section>

            {/* SDKs */}
            <section id="sdks" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">SDKs</h2>

              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Horizon API (JavaScript)</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-6 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' }
});`}
                </pre>
              </div>

              <h3 className="text-base sm:text-lg font-semibold mb-3">Soroban RPC (JavaScript)</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`import { SorobanRpc } from '@stellar/stellar-sdk';

const server = new SorobanRpc.Server('https://rpc.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' }
});

// Get latest ledger
const ledger = await server.getLatestLedger();
console.log('Latest ledger:', ledger.sequence);`}
                </pre>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Examples</h2>
              <h3 className="text-base sm:text-lg font-semibold mt-6 mb-3">Get Account Balance</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300">
{`curl -H "X-API-Key: lq_your_api_key" \\
  "https://api.lumenquery.io/accounts/GABC...XYZ"`}
                </pre>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Need Help?</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">Have questions or need assistance? We&apos;re here to help.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-[#2855FF] text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Contact Support
                </a>
                <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Go to Dashboard
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
