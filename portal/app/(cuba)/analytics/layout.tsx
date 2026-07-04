import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stellar Network Analytics Dashboard',
  description: 'Track Stellar ledger activity, TPS, transaction volume, asset movement, stablecoin flows, and whale activity from one developer-friendly analytics dashboard.',
  keywords: [
    'Stellar analytics',
    'Stellar network dashboard',
    'XLM analytics',
    'Stellar TPS',
    'Stellar ledger activity',
    'Stellar transaction volume',
    'XLM whale tracking',
    'Stellar stablecoin analytics',
    'Stellar USDC monitoring',
    'blockchain analytics dashboard',
  ],
  alternates: { canonical: 'https://lumenquery.io/analytics' },
  openGraph: {
    title: 'Stellar Network Analytics Dashboard',
    description: 'Track Stellar ledger activity, TPS, transaction volume, asset movement, stablecoin flows, and whale activity from one developer-friendly analytics dashboard.',
    url: 'https://lumenquery.io/analytics',
    siteName: 'LumenQuery',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const metricsTable = [
  { metric: 'Latest Ledger', value: '63,312,018', desc: 'Most recent closed Stellar ledger' },
  { metric: 'Transactions / Minute', value: '1,284', desc: 'Recent transaction throughput' },
  { metric: 'Operations / Minute', value: '4,921', desc: 'Stellar operations processed' },
  { metric: 'Average Ledger Close Time', value: '5.1s', desc: 'Recent network performance' },
  { metric: 'Active Assets', value: '12,480', desc: 'Assets with recent activity' },
  { metric: '24h Transaction Count', value: '1,284,021', desc: 'Total transactions in 24 hours' },
];

const whaleUseCases = [
  'Monitor large XLM payments above configurable thresholds in real time',
  'Track stablecoin treasury movement across issuer and exchange accounts',
  'Detect sudden spikes in transaction volume or account activity',
  'Watch exchange deposit and withdrawal flow patterns for anomalies',
  'Build automated alerting pipelines triggered by whale-sized transfers',
];

const devLinks = [
  { href: '/docs', label: 'API Documentation', desc: 'Full REST API reference for analytics endpoints' },
  { href: '/query', label: 'Natural-Language Query', desc: 'Ask questions about the Stellar network in plain English' },
  { href: '/dashboard/transactions', label: 'Live Transaction Viewer', desc: 'Watch decoded Stellar transactions stream in real time' },
  { href: '/pricing', label: 'Pricing Plans', desc: 'Compare free and paid analytics tiers' },
  { href: '/stellar-blockchain-analytics-api', label: 'Analytics API Guide', desc: 'Deep dive into the analytics REST API' },
  { href: '/xlm-whale-alerts', label: 'XLM Whale Alerts', desc: 'Set up large-transaction monitoring and alerts' },
];

const faqs = [
  {
    q: 'What is Stellar network analytics?',
    a: 'Stellar network analytics is the process of collecting, aggregating, and visualizing on-chain data from the Stellar blockchain. LumenQuery provides real-time dashboards and REST APIs that let you track ledger activity, transaction throughput, asset movements, fee trends, and Soroban smart contract usage without running your own Horizon or Captive Core infrastructure.',
  },
  {
    q: 'Can I track XLM whale transactions?',
    a: 'Yes. LumenQuery monitors all XLM payments across the network and surfaces large transfers above configurable thresholds. You can filter whale movements by amount, time range, and counterparty to identify institutional flows, exchange movements, and unusual activity patterns.',
  },
  {
    q: 'Can I monitor Stellar stablecoin activity?',
    a: 'Yes. LumenQuery tracks all Stellar-issued assets including USDC, EURC, yXLM, AQUA, and custom tokens. You can monitor payment volume, trustline growth, issuer activity, holder distribution, and token velocity for any asset on the network.',
  },
  {
    q: 'Does LumenQuery provide real-time Stellar metrics?',
    a: 'Yes. The analytics dashboard refreshes automatically every 30 seconds for the 24-hour view. Metrics include latest ledger sequence, transactions per second, operation counts, success rates, average fees, and protocol version. Longer time ranges (7-day, 30-day) are cached for 5 and 10 minutes respectively.',
  },
  {
    q: 'Can developers access analytics through an API?',
    a: 'Yes. Every metric displayed on the dashboard is available through the LumenQuery REST API. Endpoints include /api/analytics/network for ledger and transaction data, /api/analytics/tokens for asset analytics, and /api/analytics/contracts for Soroban activity. All responses are JSON and support time range parameters.',
  },
  {
    q: 'Do I need to run my own Stellar node?',
    a: 'No. LumenQuery connects to Stellar Horizon and Soroban RPC infrastructure on your behalf. You get analytics data through our dashboard and API without provisioning, syncing, or maintaining any blockchain nodes. Create a free account to start querying immediately.',
  },
];

const exampleApiResponse = `{
  "network": "stellar-public",
  "latest_ledger": 63312018,
  "avg_ledger_close_time_seconds": 5.1,
  "transactions_24h": 1284021,
  "operations_24h": 4921833,
  "active_accounts_24h": 84291,
  "top_assets": [
    { "asset_code": "USDC", "issuer": "GA5ZSE...", "payments_24h": 184203 }
  ]
}`;

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

        {/* Hero */}
        <header className="max-w-7xl mx-auto px-4 pt-4 pb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Stellar Network Analytics Dashboard</h1>
          <p className="text-[#A8A9AD] text-lg max-w-3xl leading-relaxed mb-8">
            Track Stellar ledger activity, TPS, transaction volume, asset movement, stablecoin flows, and whale
            activity from one developer-friendly analytics dashboard.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/auth/signup" className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
              Start Free
            </Link>
            <Link href="/docs" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl hover:border-white/60 transition-colors">
              View Docs
            </Link>
          </div>
        </header>

        {/* === CLIENT COMPONENT (interactive dashboard) === */}
        {children}

        {/* Real-Time Stellar Network Metrics */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-4">Real-Time Stellar Network Metrics</h2>
          <p className="text-[#A8A9AD] text-base leading-relaxed max-w-3xl mb-2">
            LumenQuery aggregates data directly from the Stellar Horizon API and Soroban RPC to give you a
            continuous view of network health. Monitor ledger close times, transaction throughput, operation
            counts, fee trends, asset activity, and smart contract invocations -- all from a single dashboard
            that refreshes automatically. Use the time range selector to switch between 24-hour, 7-day, and
            30-day views and spot trends as they develop.
          </p>
        </section>

        {/* Metrics Preview Table */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Track TPS, Ledger Growth, and Transaction Volume</h2>
          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3 text-[#A8A9AD] font-medium">Metric</th>
                    <th className="text-left px-5 py-3 text-[#A8A9AD] font-medium">Example Value</th>
                    <th className="text-left px-5 py-3 text-[#A8A9AD] font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {metricsTable.map((row) => (
                    <tr key={row.metric} className="border-b border-white/5 last:border-b-0">
                      <td className="px-5 py-3 font-medium text-white">{row.metric}</td>
                      <td className="px-5 py-3 font-mono text-[#7366FF]">{row.value}</td>
                      <td className="px-5 py-3 text-[#A8A9AD]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-5 py-3 text-xs text-[#A8A9AD] border-t border-white/5">
              Sample preview data. Live metrics update automatically above.
            </p>
          </div>
        </section>

        {/* Whale Tracking */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-4">XLM Whale Tracking and Large Payment Monitoring</h2>
          <p className="text-[#A8A9AD] text-base leading-relaxed max-w-3xl mb-6">
            Identify institutional-scale movements across the Stellar network. LumenQuery surfaces large XLM
            transfers, stablecoin treasury movements, and unusual payment patterns so you can react before
            the market does.
          </p>
          <ul className="space-y-3">
            {whaleUseCases.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#7366FF] shrink-0" />
                <span className="text-[#A8A9AD] text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Stablecoin Analytics */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-4">Stellar Stablecoin and Asset Analytics</h2>
          <p className="text-[#A8A9AD] text-base leading-relaxed max-w-3xl">
            Stellar is one of the most active networks for stablecoin settlement. LumenQuery tracks USDC,
            EURC, and other tokenized assets across the network, giving you visibility into payment volume,
            issuer activity, trustline growth, holder distribution, and token velocity. Whether you are
            monitoring a token you issued, tracking a competitor&apos;s adoption, or researching real-world
            asset tokenization trends, the analytics dashboard gives you the data you need without running
            custom indexers or writing SQL.
          </p>
        </section>

        {/* Example API Response */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Example API Response</h2>
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
            <p className="text-xs text-[#A8A9AD] mb-3 font-mono">GET /api/analytics/network?range=24h</p>
            <pre className="text-sm text-[#A8A9AD] overflow-x-auto leading-relaxed">
              <code>{exampleApiResponse}</code>
            </pre>
          </div>
        </section>

        {/* Built for Developers */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Built for Developers and Analysts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {devLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#262932] border border-white/5 rounded-2xl p-5 hover:border-[#7366FF]/30 transition-colors group"
              >
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#7366FF] transition-colors">{link.label}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{link.desc}</p>
              </Link>
            ))}
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start building with Stellar analytics today.</h2>
            <p className="text-[#A8A9AD] mb-6 max-w-xl mx-auto">
              Create a free account to access real-time dashboards, REST APIs, and natural-language queries
              for Stellar network data.
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
