import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import TryQueryWidget from '@/components/TryQueryWidget';

export const metadata: Metadata = {
  title: 'LumenQuery - Enterprise Stellar Horizon API & Soroban RPC Infrastructure',
  description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure. Enterprise-grade Horizon API and Soroban RPC with sub-100ms response times.',
  keywords: ['Stellar', 'Horizon API', 'Soroban RPC', 'blockchain', 'XLM', 'cryptocurrency', 'smart contracts', 'Web3'],
  alternates: { canonical: 'https://lumenquery.io/homepage' },
  openGraph: {
    title: 'LumenQuery - Enterprise Stellar Horizon API & Soroban RPC',
    description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure.',
    type: 'website',
    url: 'https://lumenquery.io/homepage',
  },
  robots: { index: true, follow: true },
};

const blogPosts = [
  { slug: 'build-stellar-blockchain-explorer-horizon-api', title: 'How to Build a Stellar Blockchain Explorer Using Horizon API', category: 'Tutorial', categoryColor: 'bg-[#7366FF]/10 text-[#7366FF]', date: 'Feb 13, 2026' },
  { slug: 'soroban-json-rpc-explained', title: 'Soroban JSON RPC Explained: How to Query Smart Contracts on Stellar', category: 'Soroban', categoryColor: 'bg-purple-500/10 text-purple-400', date: 'Feb 13, 2026' },
  { slug: 'best-stellar-api-providers-2026', title: 'Best Stellar API Providers in 2026 (Comparison Guide)', category: 'Guide', categoryColor: 'bg-green-500/10 text-green-400', date: 'Feb 13, 2026' },
  { slug: 'monitor-stellar-validator-horizon-node', title: 'How to Monitor a Stellar Validator or Horizon Node in Production', category: 'DevOps', categoryColor: 'bg-[#FFB829]/10 text-[#FFB829]', date: 'Feb 13, 2026' },
  { slug: 'using-claude-code-with-json-rpc-api', title: 'Using Claude Code to Interface with JSON-RPC APIs', category: 'AI', categoryColor: 'bg-[#40B8F4]/10 text-[#40B8F4]', date: 'Feb 7, 2026' },
  { slug: 'getting-started-with-claude-code', title: 'Getting Started with Claude Code', category: 'AI', categoryColor: 'bg-[#40B8F4]/10 text-[#40B8F4]', date: 'Feb 7, 2026' },
];

const features = [
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Lightning Fast', desc: 'Sub-100ms response times with global edge caching and optimized infrastructure.', color: 'bg-[#7366FF]/10 text-[#7366FF]' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Secure by Default', desc: 'API key auth, HTTPS encryption, rate limiting, and CORS protection built in.', color: 'bg-green-500/10 text-green-400' },
  { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', title: 'Built to Scale', desc: 'From prototype to production. Handle millions of requests without changing code.', color: 'bg-[#FFB829]/10 text-[#FFB829]' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Soroban Ready', desc: 'Full Soroban RPC support for smart contract deployment, calls, and event streaming.', color: 'bg-[#40B8F4]/10 text-[#40B8F4]' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Real-Time Analytics', desc: 'Monitor Stellar network metrics, track whale movements, and analyze token velocity.', color: 'bg-[#FC564A]/10 text-[#FC564A]' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Natural Language Query', desc: 'Ask questions about the blockchain in plain English. No SQL needed.', color: 'bg-purple-500/10 text-purple-400' },
];

const pricingTiers = [
  { name: 'Free', price: '$0', period: '', desc: 'Get started building on Stellar', features: ['10,000 requests/month', '60 requests/min', 'Horizon API access', 'Soroban RPC access', 'Community support'], cta: 'Start Free', ctaStyle: 'border border-white/10 hover:border-[#7366FF] text-white', highlighted: false },
  { name: 'Starter', price: '$29', period: '/mo', desc: 'For growing applications', features: ['100,000 requests/month', '300 requests/min', 'Priority API access', 'Webhook notifications', 'Email support'], cta: 'Get Started', ctaStyle: 'border border-white/10 hover:border-[#7366FF] text-white', highlighted: false },
  { name: 'Professional', price: '$49', period: '/mo', desc: 'For production workloads', features: ['1,000,000 requests/month', '1,000 requests/min', 'Dedicated endpoints', 'Smart contract explorer', 'Transaction intelligence', 'Portfolio tracking', 'Priority support'], cta: 'Get Started', ctaStyle: 'bg-[#7366FF] hover:bg-[#5A4FCF] text-white', highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large-scale operations', features: ['Unlimited requests', 'Custom rate limits', 'Dedicated infrastructure', 'SLA guarantee', 'Custom integrations', '24/7 phone support'], cta: 'Contact Sales', ctaStyle: 'border border-white/10 hover:border-[#7366FF] text-white', highlighted: false },
];

const docLinks = [
  { href: '/docs', title: 'API Reference', desc: 'Complete Horizon API & Soroban RPC documentation', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-[#7366FF] bg-[#7366FF]/10' },
  { href: '/docs/analytics', title: 'Network Analytics', desc: 'Ledger metrics, TPS, fees, and stroops explained', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'text-green-400 bg-green-500/10' },
  { href: '/docs/intelligence', title: 'Transaction Intelligence', desc: 'Watchlists, alerts, whale tracking, and live stream', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'text-[#FFB829] bg-[#FFB829]/10' },
  { href: '/docs/contracts', title: 'Smart Contracts', desc: 'XDR decoding, storage viewer, event streaming', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', color: 'text-purple-400 bg-purple-500/10' },
  { href: '/docs/portfolio', title: 'Portfolio Intelligence', desc: 'P&L tracking, risk scoring, yield monitoring', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', color: 'text-[#40B8F4] bg-[#40B8F4]/10' },
];

export default function LandingPage() {
  return (
    <div className="text-white">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7366FF] via-[#8a7aff] to-[#a26cf8] p-8 sm:p-12 lg:p-16 mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="LumenQuery" width={52} height={52} className="w-13 h-13" />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">LumenQuery.io</h1>
              <span className="text-white/60 text-xs tracking-[0.2em] uppercase">RPC Builder</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl text-white/90 font-medium mb-3">
            Enterprise Stellar Infrastructure, Made Simple
          </p>
          <p className="text-base sm:text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
            Build blockchain applications on the Stellar network with reliable, scalable Horizon API and Soroban RPC infrastructure. From prototype to production in minutes.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/auth/signup" className="px-7 py-3.5 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors shadow-lg shadow-black/10">
              Start Building Free
            </Link>
            <Link href="/docs" className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              Read the Docs
            </Link>
            <Link href="/analytics" className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
              Live Analytics
            </Link>
          </div>
          <p className="text-sm text-white/50 mb-2">10,000 requests/month free &middot; No credit card required</p>
          <TryQueryWidget />
        </div>
        {/* Decorations */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -right-10 bottom-10 w-48 h-48 rounded-full bg-white/5" />
        <div className="absolute left-1/2 -bottom-16 w-64 h-64 rounded-full bg-white/[0.03]" />
      </section>

      {/* ── Endpoints Bar ── */}
      <section className="bg-[#262932] rounded-2xl border border-white/5 p-5 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] text-[#A8A9AD] uppercase tracking-wider">Horizon API</span>
            <p className="text-sm font-mono text-[#7366FF]">api.lumenquery.io</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-[10px] text-[#A8A9AD] uppercase tracking-wider">Soroban RPC</span>
            <p className="text-sm font-mono text-purple-400">rpc.lumenquery.io</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-green-400 font-medium">All Systems Operational</span>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Why LumenQuery?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-[#262932] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors">
              <div className={`w-10 h-10 rounded-xl ${f.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                <svg className={`w-5 h-5 ${f.color.split(' ')[1]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1.5">{f.title}</h3>
              <p className="text-xs text-[#A8A9AD] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing Section ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Pricing</h2>
          <Link href="/pricing" className="text-sm text-[#7366FF] hover:underline">View full details</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`bg-[#262932] rounded-2xl border p-5 flex flex-col ${tier.highlighted ? 'border-[#7366FF]/40 ring-1 ring-[#7366FF]/20' : 'border-white/5'}`}>
              {tier.highlighted && (
                <span className="self-start px-2 py-0.5 rounded bg-[#7366FF] text-white text-[9px] font-bold uppercase mb-3">Most Popular</span>
              )}
              <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
              <div className="mb-2">
                <span className="text-2xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-sm text-[#A8A9AD]">{tier.period}</span>}
              </div>
              <p className="text-xs text-[#A8A9AD] mb-4">{tier.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <svg className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#A8A9AD]">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/auth/signup" className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors ${tier.ctaStyle}`}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Documentation Section ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Documentation</h2>
          <Link href="/docs" className="text-sm text-[#7366FF] hover:underline">View all docs</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docLinks.map((doc) => (
            <Link key={doc.href} href={doc.href} className="bg-[#262932] rounded-2xl border border-white/5 p-5 hover:border-[#7366FF]/30 transition-colors group">
              <div className={`w-10 h-10 rounded-xl ${doc.color.split(' ')[1]} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <svg className={`w-5 h-5 ${doc.color.split(' ')[0]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={doc.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">{doc.title}</h3>
              <p className="text-xs text-[#A8A9AD]">{doc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Code Example Section ── */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-[#262932] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-[10px] font-semibold">REST</span>
              <span className="text-sm font-medium">Horizon API</span>
            </div>
            <div className="bg-[#1D1E26] rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs text-gray-300 leading-relaxed"><code>{`# Fetch latest ledger
curl -H "X-API-Key: lq_your_key" \\
  https://api.lumenquery.io/ledgers?limit=1&order=desc

# Get account balances
curl -H "X-API-Key: lq_your_key" \\
  https://api.lumenquery.io/accounts/{accountId}`}</code></pre>
            </div>
          </div>
          <div className="bg-[#262932] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-[10px] font-semibold">JSON-RPC</span>
              <span className="text-sm font-medium">Soroban RPC</span>
            </div>
            <div className="bg-[#1D1E26] rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs text-gray-300 leading-relaxed"><code>{`# Check Soroban RPC health
curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: lq_your_key" \\
  -d '{"jsonrpc":"2.0","id":1,
       "method":"getHealth"}'`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog Posts Section ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest from the Blog</h2>
          <Link href="/blog" className="text-sm text-[#7366FF] hover:underline">View all posts</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-[#262932] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors group">
              <span className={`inline-block px-2 py-0.5 rounded-full ${post.categoryColor} text-[10px] font-medium mb-3`}>
                {post.category}
              </span>
              <h3 className="text-sm font-semibold mb-2 group-hover:text-[#7366FF] transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#A8A9AD]">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Explore the Platform</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { href: '/analytics', label: 'Network Analytics', desc: 'Real-time metrics', color: 'text-[#7366FF]' },
            { href: '/contracts', label: 'Smart Contracts', desc: 'Soroban explorer', color: 'text-purple-400' },
            { href: '/dashboard/transactions', label: 'Live Transactions', desc: 'Real-time stream', color: 'text-[#FC564A]' },
            { href: '/query', label: 'Query', desc: 'Natural language', color: 'text-green-400' },
            { href: '/intelligence', label: 'Intelligence', desc: 'Monitoring & alerts', color: 'text-[#FFB829]' },
          ].map((p) => (
            <Link key={p.href} href={p.href} className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-white/10 transition-colors text-center group">
              <p className={`text-sm font-semibold mb-1 group-hover:${p.color} transition-colors`}>{p.label}</p>
              <p className="text-[11px] text-[#A8A9AD]">{p.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="rounded-2xl bg-gradient-to-r from-[#7366FF] to-[#a26cf8] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Ready to Build on Stellar?</h2>
          <p className="text-white/70 text-sm sm:text-base">Join developers building the future of finance with LumenQuery.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link href="/auth/signup" className="px-7 py-3.5 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
            Start Building Free
          </Link>
          <Link href="/docs" className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
            Read the Docs
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pt-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A9AD]">
          <p>&copy; {new Date().getFullYear()} LumenQuery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link>
            <Link href="/contracts" className="hover:text-white transition-colors">Contracts</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
