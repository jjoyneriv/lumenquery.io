'use client';

import Link from 'next/link';

export default function ContractAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Smart Contract Analytics</h1>
        <p className="text-[#6A6A6A] text-sm mt-1">
          Soroban contract activity, gas usage, and event tracking
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-2xl border border-[#E6E7E9] p-8 sm:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">Coming Soon</h2>
        <p className="text-[#6A6A6A] max-w-md mx-auto mb-6">
          Soroban smart contract analytics including invocation frequency,
          gas usage trends, and contract event monitoring are under development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/analytics"
            className="px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-medium transition-colors"
          >
            View Network Analytics
          </Link>
          <Link
            href="/docs"
            className="px-6 py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] text-black font-medium transition-colors"
          >
            Read Soroban Docs
          </Link>
        </div>
      </div>

      {/* Preview of upcoming features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Call Frequency</h3>
          <p className="text-sm text-[#6A6A6A]">
            Track contract invocation rates and popular methods
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Gas Usage</h3>
          <p className="text-sm text-[#6A6A6A]">
            Monitor gas consumption trends and optimization opportunities
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Event Logs</h3>
          <p className="text-sm text-[#6A6A6A]">
            Track contract events and state changes in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
