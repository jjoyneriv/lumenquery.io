import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stellar Blockchain Analytics',
  description: 'Analyze Stellar blockchain activity with LumenQuery. Track transactions, accounts, assets, payment flows, XLM movement, token velocity, and network activity.',
  keywords: ['Stellar analytics', 'XLM analytics', 'blockchain analytics', 'Stellar data analytics', 'Stellar network stats'],
  alternates: { canonical: 'https://lumenquery.io/analytics' },
  openGraph: {
    title: 'Stellar Blockchain Analytics',
    description: 'Analyze Stellar blockchain activity with LumenQuery.',
    url: 'https://lumenquery.io/analytics',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const analyzeCards = [
  { title: 'Transaction Volume', desc: 'Track total transactions, successful vs failed operations, and throughput over time across the Stellar network.' },
  { title: 'Account Activity', desc: 'Monitor new account creation, active accounts per ledger, and account merge events on Stellar.' },
  { title: 'Asset Movement', desc: 'Analyze transfers of USDC, yXLM, AQUA, and other Stellar assets including issued token flows.' },
  { title: 'XLM Payment Flows', desc: 'Follow XLM payments between accounts, track large transfers, and identify payment corridors on Stellar.' },
  { title: 'Token Velocity', desc: 'Measure how quickly tokens change hands. High velocity can signal active trading or wash activity.' },
  { title: 'Whale Activity', desc: 'Detect large XLM and token movements above configurable thresholds to spot institutional flows.' },
  { title: 'Ledger Activity', desc: 'Monitor ledger close times, operation counts per ledger, and base fee trends across the Stellar network.' },
  { title: 'Smart Contract Activity', desc: 'Track Soroban contract invocations, gas usage, and event emissions on the Stellar network.' },
];

const useCases = [
  { title: 'Wallet Dashboards', desc: 'Embed Stellar analytics into wallet apps to show users real-time network stats and transaction trends.' },
  { title: 'Exchange Monitoring', desc: 'Track deposit and withdrawal flows, detect unusual activity, and monitor trading pair liquidity on Stellar DEX.' },
  { title: 'Token Issuer Reporting', desc: 'Generate distribution reports, track holder counts, and monitor trustline growth for Stellar-issued tokens.' },
  { title: 'RWA Monitoring', desc: 'Track real-world asset tokenization on Stellar, monitor compliance events, and report on asset-backed token flows.' },
  { title: 'Compliance Operations', desc: 'Screen transactions against watchlists, flag unusual patterns, and generate regulatory reports from Stellar data.' },
  { title: 'Market Intelligence', desc: 'Analyze DEX orderbook depth, track price movements, and detect arbitrage opportunities across Stellar markets.' },
];

const faqs = [
  {
    q: 'What is Stellar blockchain analytics?',
    a: 'Stellar blockchain analytics is the process of collecting, aggregating, and visualizing on-chain data from the Stellar network. LumenQuery provides real-time dashboards and APIs that let you track transactions, account activity, asset movements, fees, and smart contract usage without running your own infrastructure.',
  },
  {
    q: 'Can I track XLM activity with LumenQuery analytics?',
    a: 'Yes. LumenQuery tracks all XLM activity including payments, account creation funding, fee spending, DEX trades, and path payments. You can filter by time range, monitor whale movements above custom thresholds, and export data for further analysis.',
  },
  {
    q: 'Can I monitor Stellar assets like USDC and custom tokens?',
    a: 'Yes. LumenQuery analytics covers all Stellar-issued assets including USDC, yXLM, AQUA, SHX, and any custom token. You can track transfer volume, holder counts, trustline growth, issuer activity, and token velocity for any asset on the network.',
  },
  {
    q: 'Do I need to run my own Stellar node to use analytics?',
    a: 'No. LumenQuery connects to Stellar Horizon and Soroban RPC infrastructure on your behalf. You get analytics data through our dashboard and REST API without provisioning, syncing, or maintaining any blockchain nodes.',
  },
  {
    q: 'Can I export Stellar analytics data?',
    a: 'Yes. Analytics data is available through our REST API in JSON format. You can integrate it into your own dashboards, data pipelines, or reporting tools. CSV export is available on supported plan tiers.',
  },
  {
    q: 'Is this useful for wallets, exchanges, and token issuers?',
    a: 'Absolutely. Wallet developers use LumenQuery to show users network status and transaction history. Exchanges monitor deposit flows and detect anomalies. Token issuers track distribution metrics and trustline adoption. Our API and dashboards serve all of these use cases.',
  },
];

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Analytics', item: 'https://lumenquery.io/analytics' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[#1a1c23] text-white">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 pt-6 pb-2 text-sm text-[#A8A9AD]" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-white">Analytics</li>
          </ol>
        </nav>

        {/* Hero / Intro */}
        <header className="max-w-7xl mx-auto px-4 pt-4 pb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Stellar Blockchain Analytics</h1>
          <p className="text-[#A8A9AD] text-lg max-w-3xl leading-relaxed">
            LumenQuery gives you real-time and historical analytics for the Stellar network. Track transaction volume,
            monitor account activity, follow asset movements and XLM payment flows, measure token velocity, detect whale
            activity, and observe Soroban smart contract usage -- all without running your own node.
          </p>
        </header>

        {/* What You Can Analyze */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">What You Can Analyze</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyzeCards.map((c) => (
              <div key={c.title} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Dashboard (client component) */}
        {children}

        {/* Analytics Use Cases */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Analytics Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((c) => (
              <div key={c.title} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Analytics Queries */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Example Analytics Queries</h2>
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
            <p className="text-[#A8A9AD] text-sm mb-4">Use LumenQuery&apos;s natural-language query engine or REST API to answer questions like:</p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-[#7366FF] font-mono shrink-0">GET</span>
                <span className="text-[#A8A9AD]">/api/analytics/network?range=24h -- Transaction count, TPS, success rate, and fee stats for the last 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7366FF] font-mono shrink-0">GET</span>
                <span className="text-[#A8A9AD]">/api/analytics/tokens?range=7d -- Token velocity, whale movements, and issuer risk scores for the last 7 days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7366FF] font-mono shrink-0">GET</span>
                <span className="text-[#A8A9AD]">/api/analytics/contracts?range=30d -- Soroban invocation counts, gas usage, and event emissions over 30 days</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7366FF] font-mono shrink-0">NLQ</span>
                <span className="text-[#A8A9AD]">&quot;Show me the top 10 accounts by XLM payment volume this week&quot;</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7366FF] font-mono shrink-0">NLQ</span>
                <span className="text-[#A8A9AD]">&quot;How many new trustlines were created for USDC in the last 30 days?&quot;</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/query', label: 'Natural-Language Query' },
              { href: '/dashboard/transactions', label: 'Live Transaction Viewer' },
              { href: '/stellar-blockchain-analytics-api', label: 'Analytics API' },
              { href: '/stellar-transaction-monitoring', label: 'Transaction Monitoring' },
              { href: '/xlm-whale-alerts', label: 'XLM Whale Alerts' },
              { href: '/docs', label: 'Documentation' },
              { href: '/pricing', label: 'Pricing' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm border border-white/10 rounded-xl px-4 py-2 text-[#A8A9AD] hover:text-white hover:border-white/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start Analyzing the Stellar Network</h2>
            <p className="text-[#A8A9AD] mb-6 max-w-xl mx-auto">
              Create a free account to access analytics dashboards, REST APIs, and natural-language queries for Stellar blockchain data.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/auth/signup" className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Start Free
              </Link>
              <Link href="/docs" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl hover:border-white/60 transition-colors">
                View Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
