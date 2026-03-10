'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContractsDocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Overview</h3>
        <ul className="space-y-2">
          <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Introduction</a></li>
          <li><a href="#dashboard" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Dashboard</a></li>
          <li><a href="#tiers" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Subscription Tiers</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Features</h3>
        <ul className="space-y-2">
          <li><a href="#decoded-calls" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Decoded Calls</a></li>
          <li><a href="#storage-viewer" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Storage Viewer</a></li>
          <li><a href="#event-stream" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Event Stream</a></li>
          <li><a href="#ai-explanations" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>AI Explanations</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Reference</h3>
        <ul className="space-y-2">
          <li><a href="#xdr-decoding" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>XDR Decoding</a></li>
          <li><a href="#data-types" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Soroban Data Types</a></li>
          <li><a href="#api-reference" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>API Reference</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Documentation</h3>
        <ul className="space-y-2">
          <li><Link href="/docs" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>API Documentation</Link></li>
          <li><Link href="/docs/analytics" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Network Analytics</Link></li>
          <li><Link href="/docs/intelligence" className="text-[#6A6A6A] hover:text-[#2855FF]" onClick={() => setSidebarOpen(false)}>Transaction Intelligence</Link></li>
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
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Soroban Smart Contracts Explorer</h1>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">Soroban Pro</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
                Premium smart contract explorer with decoded data, real-time event streaming, and AI-powered explanations for Stellar&apos;s Soroban platform.
              </p>
            </header>

            {/* Introduction */}
            <section id="introduction" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Soroban Smart Contracts Explorer is a premium tool designed for Web3 developers, startups, and auditors
                who need deep visibility into Soroban smart contracts on the Stellar network. Unlike basic block explorers,
                our tool provides <strong>decoded contract data</strong>, making it easy to understand what contracts are doing
                without manually parsing XDR-encoded data.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="text-purple-600 text-2xl mb-2">{'</>'}</div>
                  <h3 className="font-semibold text-sm mb-1">Decoded Calls</h3>
                  <p className="text-xs text-[#6A6A6A]">Human-readable function calls and parameters</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-blue-600 text-2xl mb-2">{'{ }'}</div>
                  <h3 className="font-semibold text-sm mb-1">Storage Viewer</h3>
                  <p className="text-xs text-[#6A6A6A]">Browse contract state and data</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-green-600 text-2xl mb-2">{'~>'}</div>
                  <h3 className="font-semibold text-sm mb-1">Event Stream</h3>
                  <p className="text-xs text-[#6A6A6A]">Real-time contract event monitoring</p>
                </div>
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="text-amber-600 text-2xl mb-2">{'AI'}</div>
                  <h3 className="font-semibold text-sm mb-1">AI Explanations</h3>
                  <p className="text-xs text-[#6A6A6A]">Plain-English contract analysis</p>
                </div>
              </div>
            </section>

            {/* Dashboard */}
            <section id="dashboard" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Dashboard</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Contracts Explorer dashboard at <code className="px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] text-xs">/contracts</code> provides
                a centralized interface for exploring Soroban smart contracts.
              </p>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-4">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">Dashboard Features</h3>
                <ul className="space-y-2 text-sm text-[#6A6A6A]">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&#10003;</span>
                    <span><strong>Contract Search</strong> - Search by contract ID, name, or deployer address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&#10003;</span>
                    <span><strong>Recent Contracts</strong> - View recently deployed or active contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&#10003;</span>
                    <span><strong>Contract Overview</strong> - Quick stats including total calls, storage size, and events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5">&#10003;</span>
                    <span><strong>Analytics</strong> - Gas usage trends, error rates, and call frequency</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <h3 className="font-semibold mb-2 text-sm">Getting Started</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-[#6A6A6A]">
                  <li>Navigate to <Link href="/contracts" className="text-[#2855FF] hover:underline">/contracts</Link></li>
                  <li>Enter a contract ID in the search bar (e.g., <code className="px-1 bg-white rounded text-xs">CDLZ...XYZ</code>)</li>
                  <li>Explore decoded calls, storage, events, and analytics</li>
                </ol>
              </div>
            </section>

            {/* Subscription Tiers */}
            <section id="tiers" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Subscription Tiers</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban Pro features are available across different subscription tiers, each designed for specific use cases.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold">Free</th>
                      <th className="text-center py-3 px-4 font-semibold">Developer<br/><span className="text-xs font-normal text-[#6A6A6A]">$25/mo</span></th>
                      <th className="text-center py-3 px-4 font-semibold">Team<br/><span className="text-xs font-normal text-[#6A6A6A]">$99/mo</span></th>
                      <th className="text-center py-3 px-4 font-semibold">Auditor</th>
                      <th className="text-center py-3 px-4 font-semibold">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-3 px-4">Contracts/month</td>
                      <td className="py-3 px-4 text-center">10</td>
                      <td className="py-3 px-4 text-center">50</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Unlimited</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Unlimited</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Unlimited</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-3 px-4">Call history retention</td>
                      <td className="py-3 px-4 text-center">7 days</td>
                      <td className="py-3 px-4 text-center">30 days</td>
                      <td className="py-3 px-4 text-center">90 days</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Full</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Full</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-3 px-4">AI explanations</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center">50/mo</td>
                      <td className="py-3 px-4 text-center">500/mo</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Unlimited</td>
                      <td className="py-3 px-4 text-center text-purple-600 font-medium">Unlimited</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-3 px-4">Export (CSV/JSON)</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-3 px-4">Real-time event streaming</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-3 px-4">Version comparison</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-3 px-4">API access</td>
                      <td className="py-3 px-4 text-center text-[#6A6A6A]">-</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                      <td className="py-3 px-4 text-center text-green-600">&#10003;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Decoded Calls */}
            <section id="decoded-calls" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9] flex items-center gap-2">
                <span className="text-purple-600">{'</>'}</span>
                Decoded Calls
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban smart contract calls are encoded in XDR (External Data Representation) format, making them difficult
                to read in their raw form. The Decoded Calls feature automatically parses and decodes this data into
                human-readable format.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">What Gets Decoded</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Function Calls</h4>
                  <ul className="text-xs text-[#6A6A6A] space-y-1">
                    <li>- Function name (e.g., <code className="bg-white px-1 rounded">transfer</code>, <code className="bg-white px-1 rounded">mint</code>)</li>
                    <li>- Parameter names and values</li>
                    <li>- Parameter types (Address, i128, Symbol, etc.)</li>
                    <li>- Return values with type information</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Transaction Context</h4>
                  <ul className="text-xs text-[#6A6A6A] space-y-1">
                    <li>- Caller/source account</li>
                    <li>- Timestamp and ledger sequence</li>
                    <li>- Gas consumed (in stroops)</li>
                    <li>- Success/failure status with error codes</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Example: Raw vs Decoded</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#6A6A6A] mb-2">Raw XDR (unreadable):</p>
                  <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-gray-400">
{`AAAAAgAAAADo...base64_encoded_xdr_data...AAAAAAAAAA==`}
                    </pre>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#6A6A6A] mb-2">Decoded (human-readable):</p>
                  <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-gray-300">
{`{
  "function": "transfer",
  "parameters": {
    "from": "GABC...XYZ",
    "to": "GDEF...UVW",
    "amount": 1000000000  // 100 tokens (7 decimals)
  },
  "result": {
    "type": "void",
    "success": true
  },
  "gas_used": 234567,
  "timestamp": "2026-02-13T10:30:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Call History Table</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                The Call History view displays all invocations of a contract with the following columns:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Timestamp</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">When the call was executed</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">Function</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Decoded function name</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Caller</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Source account address (truncated)</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">Parameters</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Decoded input parameters</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Status</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Success (green) or Failed (red) with error code</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">Gas</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Gas consumed in stroops</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Filtering Calls</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Use the filter options to narrow down the call history:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#6A6A6A]">
                <li><strong>Function name</strong> - Filter by specific function (e.g., <code className="px-1 bg-[#F5F6F7] rounded text-xs">transfer</code>)</li>
                <li><strong>Caller address</strong> - Show calls from a specific account</li>
                <li><strong>Status</strong> - Filter by success or failed calls only</li>
                <li><strong>Date range</strong> - Specify start and end dates</li>
                <li><strong>Gas range</strong> - Filter by minimum/maximum gas consumed</li>
              </ul>
            </section>

            {/* Storage Viewer */}
            <section id="storage-viewer" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9] flex items-center gap-2">
                <span className="text-blue-600">{'{ }'}</span>
                Storage Viewer
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                The Storage Viewer provides a complete view of a contract&apos;s on-chain state. Soroban contracts store data
                in key-value pairs, and this tool decodes both keys and values into readable formats.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Storage Types</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Soroban supports three types of contract storage, each with different characteristics:
              </p>
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">PERSISTENT</span>
                    <h4 className="font-semibold text-sm">Persistent Storage</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">
                    Long-term storage that persists indefinitely. Used for critical data like token balances,
                    ownership records, and configuration. Requires rent payments to maintain.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">TEMPORARY</span>
                    <h4 className="font-semibold text-sm">Temporary Storage</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">
                    Short-lived storage that expires after a set number of ledgers. Used for session data,
                    temporary locks, and caching. No rent required but data may be purged.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">INSTANCE</span>
                    <h4 className="font-semibold text-sm">Instance Storage</h4>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">
                    Storage tied to the contract instance itself. Used for contract-level configuration,
                    admin addresses, and version information. Persists with the contract.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Storage Table</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                The Storage Viewer displays contract state in a sortable, searchable table:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-2 px-3 font-semibold">Column</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Key</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Decoded storage key (e.g., <code className="bg-[#F5F6F7] px-1 rounded text-xs">Balance:GABC...XYZ</code>)</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">Type</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Storage type badge (Persistent/Temporary/Instance)</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Value</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Decoded value with type information</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">TTL</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Time-to-live (ledgers remaining for temporary storage)</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">Last Modified</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Ledger sequence when value was last changed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Example: Token Contract Storage</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-gray-300">
{`// Token contract storage entries (decoded)
┌────────────────────────────────────┬────────────┬─────────────────┐
│ Key                                │ Type       │ Value           │
├────────────────────────────────────┼────────────┼─────────────────┤
│ Admin                              │ Instance   │ GABC...XYZ      │
│ Name                               │ Instance   │ "MyToken"       │
│ Symbol                             │ Instance   │ "MTK"           │
│ Decimals                           │ Instance   │ 7               │
│ Balance:GABC...XYZ                 │ Persistent │ 1000000000000   │
│ Balance:GDEF...UVW                 │ Persistent │ 500000000000    │
│ Allowance:GABC...XYZ:GDEF...UVW    │ Temporary  │ 100000000000    │
└────────────────────────────────────┴────────────┴─────────────────┘`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Storage Snapshots</h3>
              <p className="text-[#6A6A6A] text-sm">
                Team and higher tiers can access historical storage snapshots to see how contract state has changed over time.
                Snapshots are taken at regular intervals and can be compared side-by-side to track state changes.
              </p>
            </section>

            {/* Event Stream */}
            <section id="event-stream" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9] flex items-center gap-2">
                <span className="text-green-600">{'~>'}</span>
                Event Stream
              </h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban contracts emit events to communicate state changes and important actions. The Event Stream
                feature provides both historical event logs and real-time streaming for monitoring contract activity.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Event Structure</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Each Soroban event contains the following decoded information:
              </p>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto mb-6">
                <pre className="text-xs text-gray-300">
{`{
  "type": "contract",           // Event type: contract, system, or diagnostic
  "ledger": 12345678,          // Ledger sequence when event was emitted
  "timestamp": "2026-02-13T10:30:00Z",
  "contract_id": "CDLZ...XYZ",
  "topics": [                  // Event topics (indexed, searchable)
    "transfer",                // Topic 0: Event name
    "GABC...XYZ",              // Topic 1: From address
    "GDEF...UVW"               // Topic 2: To address
  ],
  "data": {                    // Event data payload
    "amount": 1000000000
  }
}`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Event Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">CONTRACT</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">
                    Events explicitly emitted by the contract code. These are the primary events for tracking business logic.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">SYSTEM</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">
                    Events generated by the Soroban runtime. Includes contract deployment, upgrade, and lifecycle events.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-medium">DIAGNOSTIC</span>
                  <p className="text-xs text-[#6A6A6A] mt-2">
                    Debug events for development. Only available in certain network configurations.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Real-Time Streaming</h3>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-medium">TEAM+</span>
                  <span className="font-semibold text-sm">Available for Team tier and above</span>
                </div>
                <p className="text-xs text-[#6A6A6A]">
                  Real-time event streaming uses Server-Sent Events (SSE) to push new events to your browser
                  as they occur on the network. No polling required.
                </p>
              </div>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                To enable real-time streaming:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-[#6A6A6A] mb-6">
                <li>Navigate to the Events tab for a contract</li>
                <li>Click the &quot;Live Stream&quot; toggle in the top-right</li>
                <li>New events will appear automatically as they are emitted</li>
                <li>Click any event row to view decoded details</li>
              </ol>

              <h3 className="text-lg font-semibold mt-6 mb-3">Event Filtering</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                Filter events by:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#6A6A6A]">
                <li><strong>Event type</strong> - Contract, System, or Diagnostic</li>
                <li><strong>Topic</strong> - Filter by specific topic values (e.g., &quot;transfer&quot;)</li>
                <li><strong>Date range</strong> - Historical events within a time window</li>
                <li><strong>Ledger range</strong> - Events from specific ledger sequences</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Common Event Patterns</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-2 px-3 font-semibold">Event</th>
                      <th className="text-left py-2 px-3 font-semibold">Topics</th>
                      <th className="text-left py-2 px-3 font-semibold">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">transfer</td>
                      <td className="py-2 px-3 text-[#6A6A6A] text-xs">[&quot;transfer&quot;, from, to]</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Token transfers</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">approve</td>
                      <td className="py-2 px-3 text-[#6A6A6A] text-xs">[&quot;approve&quot;, owner, spender]</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Allowance approvals</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-medium">mint</td>
                      <td className="py-2 px-3 text-[#6A6A6A] text-xs">[&quot;mint&quot;, to]</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Token minting</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-medium">burn</td>
                      <td className="py-2 px-3 text-[#6A6A6A] text-xs">[&quot;burn&quot;, from]</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Token burning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* AI Explanations */}
            <section id="ai-explanations" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9] flex items-center gap-2">
                <span className="text-amber-600">AI</span>
                AI Explanations
              </h2>

              {/* Coming Soon Disclaimer */}
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-amber-500 text-xl">&#9888;</div>
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">Coming Soon</h3>
                    <p className="text-sm text-amber-700">
                      AI Explanations is currently in development and not yet enabled. This feature will be available
                      in a future release. The documentation below describes the planned functionality.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                AI Explanations use advanced language models to analyze contract calls and provide plain-English
                explanations of what happened. This feature is designed to help developers, auditors, and non-technical
                users understand complex smart contract interactions without deep Soroban expertise.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">How It Works</h3>
              <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9] mb-6">
                <ol className="list-decimal list-inside space-y-2 text-sm text-[#6A6A6A]">
                  <li>Select a contract call from the Call History</li>
                  <li>Click the &quot;Explain&quot; button</li>
                  <li>The AI analyzes the decoded call data, parameters, and context</li>
                  <li>A plain-English explanation is generated and displayed</li>
                  <li>Explanations are cached for 7 days to save API credits</li>
                </ol>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Example Explanation</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto mb-6">
                <p className="text-xs text-gray-500 mb-2">// Contract call: transfer(from, to, amount)</p>
                <pre className="text-xs text-gray-300">
{`{
  "function": "transfer",
  "from": "GABC...XYZ",
  "to": "GDEF...UVW",
  "amount": 1000000000
}`}
                </pre>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium">AI Explanation</span>
                </div>
                <p className="text-sm text-[#6A6A6A]">
                  <strong>Summary:</strong> This transaction transfers 100 tokens from account GABC...XYZ to account GDEF...UVW.
                </p>
                <p className="text-sm text-[#6A6A6A] mt-2">
                  <strong>Details:</strong> The <code className="px-1 bg-white rounded text-xs">transfer</code> function
                  was called to move tokens between two accounts. The amount of 1,000,000,000 represents 100 tokens
                  (assuming 7 decimal places, which is standard for Stellar assets). The transaction was successful
                  and consumed 234,567 stroops of gas.
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Explanation Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Basic Explanation</h4>
                  <p className="text-xs text-[#6A6A6A]">
                    A concise summary of what the contract call does. Suitable for quick understanding.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Detailed Analysis</h4>
                  <p className="text-xs text-[#6A6A6A]">
                    In-depth explanation including parameter breakdown, gas analysis, and potential implications.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Security Review</h4>
                  <p className="text-xs text-[#6A6A6A]">
                    Highlights potential security considerations, unusual patterns, or risk factors.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h4 className="font-semibold text-sm mb-2">Comparison</h4>
                  <p className="text-xs text-[#6A6A6A]">
                    Compare multiple calls to identify patterns or differences in behavior.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Usage Limits</h3>
              <p className="text-[#6A6A6A] mb-4 text-sm">
                AI Explanations are subject to monthly limits based on your subscription tier:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-2 px-3 font-semibold">Tier</th>
                      <th className="text-left py-2 px-3 font-semibold">AI Explanations/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3">Free</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Not available</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3">Developer ($25/mo)</td>
                      <td className="py-2 px-3">50</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3">Team ($99/mo)</td>
                      <td className="py-2 px-3">500</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3">Auditor</td>
                      <td className="py-2 px-3 text-purple-600 font-medium">Unlimited</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3">Enterprise</td>
                      <td className="py-2 px-3 text-purple-600 font-medium">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Caching</h3>
              <p className="text-[#6A6A6A] text-sm">
                AI explanations are cached for 7 days. If you request an explanation for a call that was already
                analyzed, the cached response is returned instantly without counting against your monthly limit.
              </p>
            </section>

            {/* XDR Decoding */}
            <section id="xdr-decoding" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">XDR Decoding</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                XDR (External Data Representation) is the binary encoding format used by Stellar and Soroban for all
                on-chain data. Our decoder handles the complex task of parsing XDR and converting it to readable JSON.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Supported XDR Types</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">TransactionEnvelope</div>
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">TransactionResult</div>
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">TransactionMeta</div>
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">LedgerEntry</div>
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">ContractEvent</div>
                <div className="p-2 rounded bg-[#F5F6F7] text-xs font-mono">SCVal (Soroban Values)</div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Decoding Process</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-gray-300">
{`// 1. Raw XDR (Base64 encoded)
AAAABQAAAADo...base64...==

// 2. Parse binary XDR structure
{ type: "SCVal", value: { type: "Map", entries: [...] } }

// 3. Convert to readable format
{
  "balances": {
    "GABC...XYZ": 1000000000,
    "GDEF...UVW": 500000000
  }
}`}
                </pre>
              </div>
            </section>

            {/* Soroban Data Types */}
            <section id="data-types" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">Soroban Data Types</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Soroban uses a rich type system for contract data. The explorer decodes all native types:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-sm border border-[#E6E7E9] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#F5F6F7]">
                      <th className="text-left py-2 px-3 font-semibold">Type</th>
                      <th className="text-left py-2 px-3 font-semibold">Description</th>
                      <th className="text-left py-2 px-3 font-semibold">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-mono text-purple-600">Address</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Stellar account or contract address</td>
                      <td className="py-2 px-3 font-mono text-xs">GABC...XYZ</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-mono text-purple-600">i128</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">128-bit signed integer</td>
                      <td className="py-2 px-3 font-mono text-xs">1000000000</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-mono text-purple-600">u128</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">128-bit unsigned integer</td>
                      <td className="py-2 px-3 font-mono text-xs">1000000000</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-mono text-purple-600">Symbol</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Short string identifier (max 32 chars)</td>
                      <td className="py-2 px-3 font-mono text-xs">&quot;transfer&quot;</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-mono text-purple-600">String</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Variable-length string</td>
                      <td className="py-2 px-3 font-mono text-xs">&quot;MyToken&quot;</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-mono text-purple-600">Bytes</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Raw byte array</td>
                      <td className="py-2 px-3 font-mono text-xs">0x1a2b3c...</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-mono text-purple-600">Vec</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Dynamic array</td>
                      <td className="py-2 px-3 font-mono text-xs">[1, 2, 3]</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9] bg-[#F5F6F7]/50">
                      <td className="py-2 px-3 font-mono text-purple-600">Map</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Key-value mapping</td>
                      <td className="py-2 px-3 font-mono text-xs">{'{'}key: value{'}'}</td>
                    </tr>
                    <tr className="border-t border-[#E6E7E9]">
                      <td className="py-2 px-3 font-mono text-purple-600">Bool</td>
                      <td className="py-2 px-3 text-[#6A6A6A]">Boolean value</td>
                      <td className="py-2 px-3 font-mono text-xs">true / false</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-10 sm:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 pb-2 border-b border-[#E6E7E9]">API Reference</h2>
              <p className="text-[#6A6A6A] mb-4 text-sm sm:text-base">
                Programmatic access to contract data is available via REST API for Developer tier and above.
              </p>

              <div className="space-y-6">
                {/* Search Contracts */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/search</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A] mb-3">Search for contracts by ID, name, or deployer</p>
                  <div className="text-xs">
                    <span className="text-[#6A6A6A]">Query params:</span>
                    <code className="ml-2 px-1 bg-white rounded">q</code>
                    <code className="ml-2 px-1 bg-white rounded">limit</code>
                    <code className="ml-2 px-1 bg-white rounded">offset</code>
                  </div>
                </div>

                {/* Get Contract */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Get contract details including metadata and statistics</p>
                </div>

                {/* Get Calls */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/calls</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A] mb-3">Get decoded call history with pagination</p>
                  <div className="text-xs">
                    <span className="text-[#6A6A6A]">Query params:</span>
                    <code className="ml-2 px-1 bg-white rounded">function</code>
                    <code className="ml-2 px-1 bg-white rounded">caller</code>
                    <code className="ml-2 px-1 bg-white rounded">status</code>
                    <code className="ml-2 px-1 bg-white rounded">from</code>
                    <code className="ml-2 px-1 bg-white rounded">to</code>
                  </div>
                </div>

                {/* Get Storage */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/storage</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A] mb-3">Get decoded contract storage entries</p>
                  <div className="text-xs">
                    <span className="text-[#6A6A6A]">Query params:</span>
                    <code className="ml-2 px-1 bg-white rounded">type</code>
                    <span className="text-[#6A6A6A]">(persistent|temporary|instance)</span>
                  </div>
                </div>

                {/* Get Events */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/events</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A] mb-3">Get decoded contract events</p>
                  <div className="text-xs">
                    <span className="text-[#6A6A6A]">Query params:</span>
                    <code className="ml-2 px-1 bg-white rounded">type</code>
                    <code className="ml-2 px-1 bg-white rounded">topic</code>
                    <code className="ml-2 px-1 bg-white rounded">from_ledger</code>
                    <code className="ml-2 px-1 bg-white rounded">to_ledger</code>
                  </div>
                </div>

                {/* Event Stream */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/events/stream</code>
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">SSE</span>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Real-time event stream via Server-Sent Events (Team+ only)</p>
                </div>

                {/* AI Explain */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/calls/[callId]/explain</code>
                    <span className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs">Coming Soon</span>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Get AI-powered explanation for a contract call</p>
                </div>

                {/* Export */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/export</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A] mb-3">Export contract data in CSV or JSON format</p>
                  <div className="text-xs">
                    <span className="text-[#6A6A6A]">Query params:</span>
                    <code className="ml-2 px-1 bg-white rounded">format</code>
                    <span className="text-[#6A6A6A]">(csv|json)</span>
                    <code className="ml-2 px-1 bg-white rounded">type</code>
                    <span className="text-[#6A6A6A]">(calls|storage|events)</span>
                  </div>
                </div>

                {/* Analytics */}
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                    <code className="text-sm font-medium">/api/contracts/[contractId]/analytics</code>
                  </div>
                  <p className="text-xs text-[#6A6A6A]">Get contract analytics including gas usage, call frequency, and error rates</p>
                </div>
              </div>
            </section>

            {/* Support */}
            <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Need Help with Soroban?</h2>
              <p className="text-white/80 mb-4 text-sm sm:text-base">
                Our team can help you explore contracts, debug issues, or integrate with the Soroban Pro API.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-[#2855FF] text-sm font-medium hover:bg-gray-100 transition-colors text-center">
                  Contact Support
                </a>
                <Link href="/contracts" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors text-center">
                  Explore Contracts
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
