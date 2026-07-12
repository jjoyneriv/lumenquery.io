import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise Stellar Horizon API & Soroban RPC Infrastructure',
  description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure. Enterprise-grade Horizon API and Soroban RPC with sub-100ms response times. Free tier available.',
  keywords: ['Stellar', 'Horizon API', 'Soroban RPC', 'blockchain', 'XLM', 'cryptocurrency', 'smart contracts', 'Web3'],
  alternates: {
    canonical: 'https://lumenquery.io',
  },
  openGraph: {
    title: 'Enterprise Stellar Horizon API & Soroban RPC',
    description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure.',
    type: 'website',
    url: 'https://lumenquery.io',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'LumenQuery - Enterprise Stellar Infrastructure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Stellar Infrastructure',
    description: 'Build on Stellar with reliable Horizon API and Soroban RPC. Start free.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="text-white">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* ── Row 1: Welcome + Metrics + Status ── */}

        {/* Welcome Card */}
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-gradient-to-br from-[#7366FF] to-[#a26cf8] rounded-2xl p-6 h-full relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="LumenQuery" width={44} height={44} className="w-11 h-11" />
                <div>
                  <h2 className="text-xl font-bold text-white">LumenQuery.io</h2>
                  <span className="text-white/70 text-xs tracking-wider uppercase">RPC Builder</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                Stellar Infrastructure<br />
                <span className="text-white/80">Made Simple</span>
              </h1>
              <p className="text-white/70 text-sm mb-6 max-w-xs">
                Enterprise-grade Horizon API and Soroban RPC for the Stellar network.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth/signup" className="px-5 py-2.5 rounded-lg bg-white text-[#7366FF] font-semibold text-sm hover:bg-white/90 transition-colors">
                  Start for Free
                </Link>
                <Link href="/docs" className="px-5 py-2.5 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                  View Docs
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-white/50">
                10,000 requests/month free &middot; No credit card required
              </p>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -right-2 -top-10 w-24 h-24 rounded-full bg-white/5" />
          </div>
        </div>

        {/* 4 Metric Widgets */}
        <div className="col-span-12 xl:col-span-5">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
            {/* TPS */}
            <div className="bg-[#262932] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#7366FF]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  Live
                </span>
              </div>
              <h4 className="text-2xl font-bold mb-1">~100</h4>
              <span className="text-xs text-[#A8A9AD]">Transactions/sec</span>
            </div>
            {/* Ledger */}
            <div className="bg-[#262932] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1">61M+</h4>
              <span className="text-xs text-[#A8A9AD]">Ledger Sequence</span>
            </div>
            {/* Uptime */}
            <div className="bg-[#262932] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFB829]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1">99.9%</h4>
              <span className="text-xs text-[#A8A9AD]">API Uptime</span>
            </div>
            {/* Response Time */}
            <div className="bg-[#262932] rounded-2xl p-5 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#40B8F4]/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#40B8F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-1">&lt;100ms</h4>
              <span className="text-xs text-[#A8A9AD]">Response Time</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 xl:col-span-3">
          <div className="bg-[#262932] rounded-2xl p-5 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-semibold text-sm">Quick Actions</h5>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
            </div>
            <div className="space-y-2.5">
              <Link href="/analytics" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#7366FF]/10 flex items-center justify-center group-hover:bg-[#7366FF]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">Network Analytics</span>
                  <p className="text-[11px] text-[#A8A9AD]">Live blockchain metrics</p>
                </div>
              </Link>
              <Link href="/query" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">Query Stellar</span>
                  <p className="text-[11px] text-[#A8A9AD]">Natural language search</p>
                </div>
              </Link>
              <Link href="/contracts" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#FFB829]/10 flex items-center justify-center group-hover:bg-[#FFB829]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">Smart Contracts</span>
                  <p className="text-[11px] text-[#A8A9AD]">Soroban Pro explorer</p>
                </div>
              </Link>
              <Link href="/dashboard/transactions" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-[#FC564A]/10 flex items-center justify-center group-hover:bg-[#FC564A]/20 transition-colors">
                  <svg className="w-4 h-4 text-[#FC564A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">Live Transactions</span>
                  <p className="text-[11px] text-[#A8A9AD]">Real-time stream</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Row 2: Code Examples + Features + Pricing ── */}

        {/* API Code Examples */}
        <div className="col-span-12 xl:col-span-5">
          <div className="bg-[#262932] rounded-2xl border border-white/5 h-full">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <h5 className="font-semibold text-sm">API Integration</h5>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-[10px] font-semibold">REST</span>
                  <span className="text-xs text-[#A8A9AD]">Horizon API</span>
                </div>
                <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-gray-300"><code>{`curl -H "X-API-Key: lq_..." \\
  api.lumenquery.io/ledgers?limit=1`}</code></pre>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-[10px] font-semibold">JSON-RPC</span>
                  <span className="text-xs text-[#A8A9AD]">Soroban RPC</span>
                </div>
                <div className="bg-[#1D1E26] rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs text-gray-300"><code>{`curl -X POST -H "X-API-Key: lq_..." \\
  -d '{"jsonrpc":"2.0","method":"getHealth"}' \\
  rpc.lumenquery.io`}</code></pre>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-[11px] text-[#A8A9AD]">Endpoints:</span>
                <code className="text-[11px] text-[#7366FF]">api.lumenquery.io</code>
                <code className="text-[11px] text-purple-400">rpc.lumenquery.io</code>
              </div>
            </div>
          </div>
        </div>

        {/* Why LumenQuery */}
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-[#262932] rounded-2xl border border-white/5 h-full">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <h5 className="font-semibold text-sm">Why LumenQuery?</h5>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#7366FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-0.5">Lightning Fast</h6>
                  <p className="text-xs text-[#A8A9AD]">Sub-100ms response times with global edge caching and optimized infrastructure.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-0.5">Secure by Default</h6>
                  <p className="text-xs text-[#A8A9AD]">API key auth, HTTPS encryption, rate limiting, and CORS protection built in.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FFB829]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-0.5">Built to Scale</h6>
                  <p className="text-xs text-[#A8A9AD]">From prototype to production. Handle millions of requests without changing code.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#40B8F4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#40B8F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <h6 className="text-sm font-semibold mb-0.5">Soroban Ready</h6>
                  <p className="text-xs text-[#A8A9AD]">Full Soroban RPC support for smart contract deployment, calls, and event streaming.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Quick View */}
        <div className="col-span-12 xl:col-span-3">
          <div className="bg-[#262932] rounded-2xl border border-white/5 h-full">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-sm">Plans</h5>
                <Link href="/pricing" className="text-[11px] text-[#7366FF] hover:underline">View All</Link>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="p-3 rounded-xl bg-[#1D1E26] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Free</span>
                  <span className="text-sm font-bold text-[#7366FF]">$0</span>
                </div>
                <p className="text-[11px] text-[#A8A9AD]">10K requests/mo &middot; 60 req/min</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1D1E26] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Starter</span>
                  <span className="text-sm font-bold">$29<span className="text-[10px] text-[#A8A9AD] font-normal">/mo</span></span>
                </div>
                <p className="text-[11px] text-[#A8A9AD]">100K requests/mo &middot; 300 req/min</p>
              </div>
              <div className="p-3 rounded-xl border border-[#7366FF]/30 bg-[#7366FF]/5 relative">
                <span className="absolute -top-2 right-3 px-1.5 py-0.5 bg-[#7366FF] text-white text-[9px] font-bold rounded">POPULAR</span>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Professional</span>
                  <span className="text-sm font-bold">$49<span className="text-[10px] text-[#A8A9AD] font-normal">/mo</span></span>
                </div>
                <p className="text-[11px] text-[#A8A9AD]">1M requests/mo &middot; 1K req/min</p>
              </div>
              <div className="p-3 rounded-xl bg-[#1D1E26] border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Enterprise</span>
                  <span className="text-sm font-bold">Custom</span>
                </div>
                <p className="text-[11px] text-[#A8A9AD]">Unlimited &middot; Dedicated support</p>
              </div>
              <Link href="/auth/signup" className="block text-center py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white text-sm font-medium transition-colors">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>

        {/* ── Row 2.5: Social Proof ── */}
        <div className="col-span-12">
          <div className="bg-[#262932] rounded-2xl border border-white/5 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-8 sm:gap-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">67+</div>
                  <div className="text-xs text-[#A8A9AD] mt-1">Technical Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-[#A8A9AD] mt-1">API Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">&lt;100ms</div>
                  <div className="text-xs text-[#A8A9AD] mt-1">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">94</div>
                  <div className="text-xs text-[#A8A9AD] mt-1">API Endpoints</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/status" className="px-4 py-2 rounded-lg border border-white/10 text-xs text-[#A8A9AD] hover:border-green-500/30 hover:text-green-400 transition-colors">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  All Systems Operational
                </Link>
                <Link href="/sla" className="px-4 py-2 rounded-lg border border-white/10 text-xs text-[#A8A9AD] hover:border-[#7366FF]/30 hover:text-[#7366FF] transition-colors">
                  View SLA
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 3: Blog + Guides ── */}

        {/* Latest Blog Posts */}
        <div className="col-span-12 xl:col-span-7">
          <div className="bg-[#262932] rounded-2xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-sm">Latest from the Blog</h5>
                <Link href="/blog" className="text-[11px] text-[#7366FF] hover:underline">View All</Link>
              </div>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[11px] text-[#A8A9AD] uppercase tracking-wider">
                      <th className="pb-3 font-medium">Article</th>
                      <th className="pb-3 font-medium hidden sm:table-cell">Category</th>
                      <th className="pb-3 font-medium hidden md:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href="/blog/franklin-templeton-benji-stellar-5-years" className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                          Franklin Templeton and Stellar Mark 5 Years of BENJI
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell"><span className="px-2 py-0.5 rounded-full bg-[#FFB829]/10 text-[#FFB829] text-[10px] font-medium">RWA</span></td>
                      <td className="py-3 text-xs text-[#A8A9AD] hidden md:table-cell whitespace-nowrap">May 3</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href="/blog/xlm-price-may-2026-market-cap-ranking" className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                          XLM at $0.159: Stellar Holds Steady at #19 by Market Cap
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell"><span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-medium">Market</span></td>
                      <td className="py-3 text-xs text-[#A8A9AD] hidden md:table-cell whitespace-nowrap">May 3</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href="/blog/stellar-payments-defi-rwa-positioning-2026" className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                          Stellar in 2026: Payments, DeFi, and Asset Tokenization
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell"><span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-[10px] font-medium">Industry</span></td>
                      <td className="py-3 text-xs text-[#A8A9AD] hidden md:table-cell whitespace-nowrap">May 3</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href="/blog/xlm-technical-analysis-breakout-levels-may-2026" className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                          XLM Technical Analysis: $0.20 Breakout or $0.14 Support Test?
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell"><span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-medium">Market</span></td>
                      <td className="py-3 text-xs text-[#A8A9AD] hidden md:table-cell whitespace-nowrap">May 3</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4">
                        <Link href="/blog/moneygram-stellar-partnership-stablecoin-utility" className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                          MoneyGram and Stellar Extend Partnership to Scale Stablecoin Utility
                        </Link>
                      </td>
                      <td className="py-3 hidden sm:table-cell"><span className="px-2 py-0.5 rounded-full bg-[#40B8F4]/10 text-[#40B8F4] text-[10px] font-medium">Partnerships</span></td>
                      <td className="py-3 text-xs text-[#A8A9AD] hidden md:table-cell whitespace-nowrap">Apr 24</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Guides */}
        <div className="col-span-12 xl:col-span-5">
          <div className="bg-[#262932] rounded-2xl border border-white/5 h-full">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <h5 className="font-semibold text-sm">Developer Guides</h5>
            </div>
            <div className="p-5 space-y-3">
              <Link href="/docs" className="flex items-center gap-3 p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#7366FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7366FF]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block">API Reference</span>
                  <span className="text-[11px] text-[#A8A9AD]">Complete Horizon API & Soroban RPC docs</span>
                </div>
              </Link>
              <Link href="/docs/analytics" className="flex items-center gap-3 p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-green-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block">Analytics Guide</span>
                  <span className="text-[11px] text-[#A8A9AD]">Network metrics, stroops, data sources</span>
                </div>
              </Link>
              <Link href="/docs/contracts" className="flex items-center gap-3 p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#FFB829]/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#FFB829]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFB829]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block">Soroban Contracts</span>
                  <span className="text-[11px] text-[#A8A9AD]">XDR decoding, storage, events</span>
                </div>
              </Link>
              <Link href="/docs/portfolio" className="flex items-center gap-3 p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#40B8F4]/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#40B8F4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#40B8F4]/20 transition-colors">
                  <svg className="w-5 h-5 text-[#40B8F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium block">Portfolio Intelligence</span>
                  <span className="text-[11px] text-[#A8A9AD]">P&L tracking, risk scoring, yield</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Row 3.5: Popular Resources ── */}
        <div className="col-span-12">
          <div className="bg-[#262932] rounded-2xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h5 className="font-semibold text-sm">Popular Resources</h5>
                <Link href="/stellar" className="text-[11px] text-[#7366FF] hover:underline">View All</Link>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <Link href="/stellar-horizon-api" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Horizon API</span>
                <span className="text-[11px] text-[#A8A9AD]">REST endpoints for Stellar</span>
              </Link>
              <Link href="/soroban-rpc-api" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Soroban RPC</span>
                <span className="text-[11px] text-[#A8A9AD]">Smart contract queries</span>
              </Link>
              <Link href="/stellar-transaction-monitoring" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Transaction Monitoring</span>
                <span className="text-[11px] text-[#A8A9AD]">Real-time alerts</span>
              </Link>
              <Link href="/xlm-whale-alerts" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Whale Alerts</span>
                <span className="text-[11px] text-[#A8A9AD]">Large XLM movements</span>
              </Link>
              <Link href="/stellar-blockchain-analytics-api" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Analytics API</span>
                <span className="text-[11px] text-[#A8A9AD]">Network metrics & data</span>
              </Link>
              <Link href="/stellar-rpc-provider" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">RPC Provider</span>
                <span className="text-[11px] text-[#A8A9AD]">Managed infrastructure</span>
              </Link>
              <Link href="/enterprise" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Enterprise</span>
                <span className="text-[11px] text-[#A8A9AD]">Custom solutions</span>
              </Link>
              <Link href="/stellar-api-provider-comparison" className="p-3 rounded-xl bg-[#1D1E26] border border-white/5 hover:border-[#7366FF]/30 transition-colors">
                <span className="text-sm font-medium block mb-1">Provider Comparison</span>
                <span className="text-[11px] text-[#A8A9AD]">Side-by-side analysis</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── Row 4: CTA Banner ── */}
        <div className="col-span-12">
          <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Ready to Build on Stellar?</h3>
              <p className="text-white/70 text-sm">Join developers building the future of finance with LumenQuery.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/auth/signup" className="px-6 py-3 rounded-lg bg-white text-[#7366FF] font-semibold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                Start Building Free
              </Link>
              <Link href="/docs" className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                Read Docs
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-8 pt-8 border-t border-white/5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h6 className="text-sm font-semibold text-white mb-3">Product</h6>
            <div className="space-y-2">
              <Link href="/analytics" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Analytics</Link>
              <Link href="/contracts" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Contracts Explorer</Link>
              <Link href="/query" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Query Builder</Link>
              <Link href="/pricing" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-white mb-3">Resources</h6>
            <div className="space-y-2">
              <Link href="/docs" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Documentation</Link>
              <Link href="/blog" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Blog</Link>
              <Link href="/stellar-horizon-api" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Horizon API</Link>
              <Link href="/soroban-rpc-api" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Soroban RPC</Link>
            </div>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-white mb-3">Company</h6>
            <div className="space-y-2">
              <Link href="/enterprise" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Enterprise</Link>
              <Link href="/security" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Security</Link>
              <Link href="/contact" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Contact</Link>
              <Link href="/changelog" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Changelog</Link>
            </div>
          </div>
          <div>
            <h6 className="text-sm font-semibold text-white mb-3">Trust</h6>
            <div className="space-y-2">
              <Link href="/status" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Status</Link>
              <Link href="/sla" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">SLA</Link>
              <Link href="/stellar-api-rate-limits" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Rate Limits</Link>
              <Link href="/stellar-api-provider-comparison" className="block text-xs text-[#A8A9AD] hover:text-white transition-colors">Comparison</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A9AD] pt-6 border-t border-white/5">
          <p>&copy; {new Date().getFullYear()} LumenQuery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/security" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/sla" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/status" className="hover:text-white transition-colors">Status</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
