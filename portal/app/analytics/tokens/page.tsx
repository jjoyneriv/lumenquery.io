'use client';

import Link from 'next/link';

export default function TokenAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Token Analytics</h1>
        <p className="text-[#6A6A6A] text-sm mt-1">
          Token velocity, whale tracking, and issuer risk analysis
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-2xl border border-[#E6E7E9] p-8 sm:p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-2">Coming Soon</h2>
        <p className="text-[#6A6A6A] max-w-md mx-auto mb-6">
          Token analytics including velocity metrics, whale movement tracking (100K+ XLM),
          and issuer risk assessment are under development.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/analytics"
            className="px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-medium transition-colors"
          >
            View Network Analytics
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] text-black font-medium transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      {/* Preview of upcoming features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Token Velocity</h3>
          <p className="text-sm text-[#6A6A6A]">
            Track how quickly tokens are being transferred across the network
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Whale Tracking</h3>
          <p className="text-sm text-[#6A6A6A]">
            Monitor large XLM movements (100K+) in real-time
          </p>
        </div>
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 opacity-60">
          <h3 className="font-semibold mb-2">Issuer Risk</h3>
          <p className="text-sm text-[#6A6A6A]">
            Analyze token issuer behavior and trustworthiness
          </p>
        </div>
      </div>
    </div>
  );
}
