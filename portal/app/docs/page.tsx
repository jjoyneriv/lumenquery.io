'use client';

import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">LumenQuery API Documentation</h1>
            <p className="text-[#6A6A6A] text-sm sm:text-base">
              Enterprise-grade Stellar infrastructure. Horizon API for blockchain data, Soroban RPC for smart contracts.
            </p>
          </div>
          <Link
            href="/auth/signup"
            className="px-4 py-2 rounded-lg bg-[#7366FF] text-white font-medium hover:bg-[#5A4FCF] text-center whitespace-nowrap"
          >
            Get API Key
          </Link>
        </div>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>

      {/* Quick Start & Authentication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentication */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <h2 className="text-lg font-bold mb-4">Authentication</h2>
          <p className="text-[#6A6A6A] mb-4 text-sm">
            Include your API key in the <code className="mx-1 px-2 py-1 rounded bg-[#F5F6F7] text-[#7366FF] border border-[#E6E7E9] text-xs">X-API-Key</code> header.
          </p>
          <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs text-gray-300">
{`X-API-Key: lq_your_api_key_here`}
            </pre>
          </div>
          <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs">
            <strong>Keep your API key secure!</strong> Never expose it in client-side code.
          </div>
        </div>

        {/* Quick Start */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <h2 className="text-lg font-bold mb-4">Quick Start</h2>
          <ol className="list-decimal list-inside space-y-2 text-[#6A6A6A] text-sm mb-4">
            <li><strong className="text-black">Create an account</strong> at <Link href="/auth/signup" className="text-[#7366FF] hover:underline">lumenquery.io/auth/signup</Link></li>
            <li><strong className="text-black">Generate an API key</strong> from your <Link href="/dashboard" className="text-[#7366FF] hover:underline">dashboard</Link></li>
            <li><strong className="text-black">Make your first request:</strong></li>
          </ol>
          <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
            <pre className="text-xs text-gray-300">
{`curl -H "X-API-Key: lq_your_api_key" \\
  https://api.lumenquery.io/ledgers?limit=1`}
            </pre>
          </div>
        </div>
      </div>

      {/* Horizon API Endpoints */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">REST</span>
          <h2 className="text-lg font-bold">Horizon API Endpoints</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Accounts</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-mono text-[10px]">GET</span>
                <code className="text-[#6A6A6A]">/accounts/{'{id}'}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-mono text-[10px]">GET</span>
                <code className="text-[#6A6A6A]">/accounts/{'{id}'}/transactions</code>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Ledgers</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-mono text-[10px]">GET</span>
                <code className="text-[#6A6A6A]">/ledgers</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-mono text-[10px]">GET</span>
                <code className="text-[#6A6A6A]">/ledgers/{'{sequence}'}</code>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Transactions</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-mono text-[10px]">GET</span>
                <code className="text-[#6A6A6A]">/transactions</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-[#7366FF]/20 text-[#7366FF] font-mono text-[10px]">POST</span>
                <code className="text-[#6A6A6A]">/transactions</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Soroban RPC */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">JSON-RPC</span>
          <h2 className="text-lg font-bold">Soroban RPC Methods</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Network & Health</h3>
            <div className="space-y-1 text-xs">
              <code className="block text-[#6A6A6A]">getHealth</code>
              <code className="block text-[#6A6A6A]">getNetwork</code>
              <code className="block text-[#6A6A6A]">getLatestLedger</code>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Transactions</h3>
            <div className="space-y-1 text-xs">
              <code className="block text-[#6A6A6A]">simulateTransaction</code>
              <code className="block text-[#6A6A6A]">sendTransaction</code>
              <code className="block text-[#6A6A6A]">getTransaction</code>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
            <h3 className="font-semibold mb-2 text-sm">Contract Data</h3>
            <div className="space-y-1 text-xs">
              <code className="block text-[#6A6A6A]">getLedgerEntries</code>
              <code className="block text-[#6A6A6A]">getEvents</code>
              <code className="block text-[#6A6A6A]">getFeeStats</code>
            </div>
          </div>
        </div>

        {/* Example */}
        <h3 className="font-semibold mb-2 text-sm">Example: Get Latest Ledger</h3>
        <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
          <pre className="text-xs text-gray-300">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getLatestLedger"}' \\
  https://rpc.lumenquery.io`}
          </pre>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">REST</span>
            <h2 className="text-lg font-bold">Horizon Rate Limits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                  <th className="text-left py-2 px-3 font-medium text-xs">Plan</th>
                  <th className="text-left py-2 px-3 font-medium text-xs">Req/Min</th>
                  <th className="text-left py-2 px-3 font-medium text-xs">Req/Month</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Free</td>
                  <td className="py-2 px-3">60</td>
                  <td className="py-2 px-3">10,000</td>
                </tr>
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Starter</td>
                  <td className="py-2 px-3">300</td>
                  <td className="py-2 px-3">100,000</td>
                </tr>
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Professional</td>
                  <td className="py-2 px-3">1,000</td>
                  <td className="py-2 px-3">1,000,000</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Enterprise</td>
                  <td className="py-2 px-3">5,000</td>
                  <td className="py-2 px-3">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">JSON-RPC</span>
            <h2 className="text-lg font-bold">Soroban Rate Limits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                  <th className="text-left py-2 px-3 font-medium text-xs">Plan</th>
                  <th className="text-left py-2 px-3 font-medium text-xs">Requests/Minute</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Free</td>
                  <td className="py-2 px-3">30</td>
                </tr>
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Starter</td>
                  <td className="py-2 px-3">150</td>
                </tr>
                <tr className="border-b border-[#E6E7E9]">
                  <td className="py-2 px-3">Professional</td>
                  <td className="py-2 px-3">500</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Enterprise</td>
                  <td className="py-2 px-3">2,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SDKs */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <h2 className="text-lg font-bold mb-4">SDK Integration</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 text-sm">Horizon API (JavaScript)</h3>
            <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs text-gray-300">
{`import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server(
  'https://api.lumenquery.io',
  { headers: { 'X-API-Key': 'lq_...' } }
);`}
              </pre>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm">Soroban RPC (JavaScript)</h3>
            <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
              <pre className="text-xs text-gray-300">
{`import { SorobanRpc } from '@stellar/stellar-sdk';

const server = new SorobanRpc.Server(
  'https://rpc.lumenquery.io',
  { headers: { 'X-API-Key': 'lq_...' } }
);`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Documentation Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Link href="/docs/analytics" className="p-4 rounded-xl bg-white border border-[#E6E7E9] hover:border-[#7366FF] transition-colors group">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 transition-colors">
            <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-1">Analytics</h3>
          <p className="text-xs text-[#6A6A6A]">Network metrics & charts</p>
        </Link>
        <Link href="/docs/intelligence" className="p-4 rounded-xl bg-white border border-[#E6E7E9] hover:border-[#7366FF] transition-colors group">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-600 transition-colors">
            <svg className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-1">Intelligence</h3>
          <p className="text-xs text-[#6A6A6A]">Alerts & monitoring</p>
        </Link>
        <Link href="/docs/contracts" className="p-4 rounded-xl bg-white border border-[#E6E7E9] hover:border-[#7366FF] transition-colors group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-600 transition-colors">
            <svg className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-1">Contracts</h3>
          <p className="text-xs text-[#6A6A6A]">Soroban explorer</p>
        </Link>
        <Link href="/docs/portfolio" className="p-4 rounded-xl bg-white border border-[#E6E7E9] hover:border-[#7366FF] transition-colors group">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-600 transition-colors">
            <svg className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-semibold text-sm mb-1">Portfolio</h3>
          <p className="text-xs text-[#6A6A6A]">P&L & yield tracking</p>
        </Link>
      </div>

      {/* Support CTA */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
        <h2 className="text-lg font-bold mb-2">Need Help?</h2>
        <p className="text-white/80 mb-4 text-sm">Have questions or need assistance? We&apos;re here to help.</p>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-[#7366FF] text-sm font-medium hover:bg-gray-100 transition-colors">
            Contact Support
          </a>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
