import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar Blockchain Analytics API',
  description: 'Turn Stellar blockchain activity into analytics with APIs for transaction volume, account activity, asset movement, token velocity, and XLM insights.',
  keywords: ['Stellar blockchain analytics API', 'Stellar analytics', 'Stellar transaction analytics', 'XLM analytics', 'Stellar token velocity', 'Stellar whale tracking', 'Stellar network metrics'],
  alternates: { canonical: 'https://lumenquery.io/stellar-blockchain-analytics-api' },
  openGraph: {
    title: 'Stellar Blockchain Analytics API',
    description: 'Turn Stellar blockchain activity into analytics with APIs for transaction volume, account activity, asset movement, token velocity, and XLM insights.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-blockchain-analytics-api',
  },
  robots: { index: true, follow: true },
};

export default function StellarBlockchainAnalyticsApiPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar Blockchain Analytics API',
    description: 'Turn Stellar blockchain activity into analytics with APIs for transaction volume, account activity, asset movement, token velocity, and XLM insights.',
    url: 'https://lumenquery.io/stellar-blockchain-analytics-api',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What analytics does LumenQuery provide for the Stellar network?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery provides network-level analytics (TPS, ledger close times, success rates, fee statistics), token analytics (velocity, whale movements, issuer risk assessment), smart contract analytics (Soroban invocation counts, gas usage, event frequency), and account-level analytics (transaction patterns, balance history, counterparty analysis).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Stellar analytics dashboard free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The LumenQuery analytics dashboard at /analytics is completely free and does not require authentication. It displays network metrics, token statistics, and smart contract activity with 24h, 7d, and 30d time ranges. API access for programmatic queries is available on paid plans.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I query Stellar analytics data via API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. LumenQuery provides REST API endpoints for all analytics data: /api/analytics/network for network metrics, /api/analytics/tokens for token analytics, and /api/analytics/contracts for Soroban contract analytics. Data is cached with configurable TTLs for optimal performance.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does whale tracking work on Stellar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery tracks XLM transfers above 100,000 XLM as whale movements. The analytics API identifies large transfers, surfaces the source and destination accounts, and aggregates whale activity over configurable time periods. This data is available through both the dashboard and API.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use natural language to query the Stellar blockchain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. LumenQuery provides a natural language query interface at /query where you can ask questions about the Stellar network in plain English. The system interprets your question, queries the blockchain, and returns structured results. For example: "What are the top 10 assets by holder count?" or "Show me transactions over 1M XLM in the last 24 hours."',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Stellar Blockchain Analytics API', item: 'https://lumenquery.io/stellar-blockchain-analytics-api' },
    ],
  };

  return (
    <>
      <div className="text-white">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-12">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
              <Link href="/" className="hover:text-[#7366FF]">Home</Link>
              <span>/</span>
              <span className="text-white">Stellar Blockchain Analytics API</span>
            </div>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">Analytics</span>
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">Free Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            Stellar Blockchain Analytics API
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mb-8">
            Turn raw Stellar blockchain activity into actionable analytics. Track transaction volume, account activity, asset movement, token velocity, whale movements, and payment flows through dashboards and APIs.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/analytics" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
              View Live Dashboard
            </Link>
            <Link href="/query" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              Try Natural Language Query
            </Link>
          </div>
        </section>

        {/* Analytics Use Cases */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What You Can Analyze</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            LumenQuery transforms Stellar blockchain data into structured analytics across six key dimensions. Access everything through the free dashboard or programmatically via API.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Transaction Volume',
                desc: 'Track transactions per second (TPS), daily volume trends, operation counts, and success rates across the network. Identify congestion patterns and protocol capacity utilization.',
                metrics: 'TPS, daily txns, operations/sec, success rate',
                icon: (
                  <svg className="w-6 h-6 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: 'Account Activity',
                desc: 'Monitor active accounts, new account creation rates, and account classification. Identify patterns like dormant account reactivation or unusual account behavior.',
                metrics: 'Active accounts, new accounts, classifications',
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'Asset Movement',
                desc: 'Track payment flows by asset type, monitor stablecoin transfers (USDC, yUSDC), and analyze cross-asset path payments. Break down volume by native XLM vs. issued assets.',
                metrics: 'Volume by asset, payment counts, path payments',
                icon: (
                  <svg className="w-6 h-6 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                ),
              },
              {
                title: 'Whale Tracking',
                desc: 'Detect large XLM transfers above 100,000 XLM. Surface source and destination accounts, aggregate whale activity over time, and identify accumulation or distribution patterns.',
                metrics: 'Large transfers, whale accounts, flow direction',
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Token Velocity',
                desc: 'Measure how frequently tokens change hands. High velocity indicates active trading or utility; low velocity suggests holding behavior. Calculated across all issued assets.',
                metrics: 'Velocity ratio, turnover rate, holding duration',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: 'Payment Flows',
                desc: 'Analyze payment corridors, identify top counterparty pairs, and track cross-border flow patterns. Understand how value moves across the Stellar network at a macro level.',
                metrics: 'Corridors, counterparties, flow patterns',
                icon: (
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed mb-3">{card.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#A8A9AD] uppercase tracking-wider">Metrics:</span>
                  <span className="text-xs text-[#7366FF]">{card.metrics}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics Dashboard Preview */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Free Analytics Dashboard</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-8">
            The LumenQuery analytics dashboard is <strong className="text-white">completely free and public</strong>. No account required. View network health, token metrics, and smart contract activity across multiple time ranges.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Network Overview', href: '/analytics', desc: 'TPS, ledger close, fees' },
              { label: 'Network Detail', href: '/analytics/network', desc: 'Ledger history, trends' },
              { label: 'Token Analytics', href: '/analytics/tokens', desc: 'Velocity, whales, risk' },
              { label: 'Contract Analytics', href: '/analytics/contracts', desc: 'Soroban gas, events' },
            ].map((page) => (
              <Link key={page.href} href={page.href} className="bg-[#262932] rounded-2xl p-5 border border-white/5 hover:border-[#7366FF]/20 transition-colors group">
                <h3 className="font-semibold text-sm group-hover:text-[#7366FF] transition-colors mb-1">{page.label}</h3>
                <p className="text-xs text-[#A8A9AD]">{page.desc}</p>
              </Link>
            ))}
          </div>
          <div className="bg-[#262932] rounded-2xl p-6 border border-white/5">
            <h3 className="font-semibold mb-4">Time Range Options</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-[#A8A9AD] font-medium">Range</th>
                    <th className="text-left py-2 px-3 text-[#A8A9AD] font-medium">Data Points</th>
                    <th className="text-left py-2 px-3 text-[#A8A9AD] font-medium">Bucket Size</th>
                    <th className="text-left py-2 px-3 text-[#A8A9AD] font-medium">Cache TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-2 px-3">24 hours</td><td className="py-2 px-3 text-[#A8A9AD]">25</td><td className="py-2 px-3 text-[#A8A9AD]">Hourly</td><td className="py-2 px-3 text-[#A8A9AD]">30 seconds</td></tr>
                  <tr><td className="py-2 px-3">7 days</td><td className="py-2 px-3 text-[#A8A9AD]">43</td><td className="py-2 px-3 text-[#A8A9AD]">4-hour</td><td className="py-2 px-3 text-[#A8A9AD]">5 minutes</td></tr>
                  <tr><td className="py-2 px-3">30 days</td><td className="py-2 px-3 text-[#A8A9AD]">20</td><td className="py-2 px-3 text-[#A8A9AD]">Daily</td><td className="py-2 px-3 text-[#A8A9AD]">10 minutes</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Natural Language Querying */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Natural Language Blockchain Queries</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-8">
            Ask questions about the Stellar network in plain English. LumenQuery interprets your question, queries the blockchain, and returns structured results. No SQL, no API calls, no data parsing required.
          </p>
          <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 mb-6">
            <h3 className="font-semibold mb-4">Example Queries</h3>
            <div className="space-y-3">
              {[
                'What is the current Stellar TPS and success rate?',
                'Show me the top 10 assets by holder count',
                'How many transactions were submitted in the last 24 hours?',
                'What are the average fees on Stellar right now?',
                'Find large XLM payments over 500,000 XLM today',
                'What is the total supply of USDC on Stellar?',
              ].map((query) => (
                <div key={query} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <svg className="w-4 h-4 text-[#7366FF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm text-[#A8A9AD]">{query}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/query" className="text-sm text-[#7366FF] hover:underline font-medium">Try it yourself</Link>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Analytics API Endpoints</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-8">
            Access all analytics data programmatically. Results are cached for optimal performance with configurable time ranges.
          </p>
          <div className="space-y-4">
            {[
              {
                method: 'GET',
                path: '/api/analytics/network',
                desc: 'Network-level metrics including TPS, ledger sequence, success rate, fee statistics, and historical chart data. Supports 24h, 7d, and 30d time ranges.',
                params: '?range=24h|7d|30d',
              },
              {
                method: 'GET',
                path: '/api/analytics/tokens',
                desc: 'Token analytics including velocity calculations, whale movement tracking (transfers above 100K XLM), issuer risk assessment, and payment activity charts.',
                params: '?range=24h|7d|30d',
              },
              {
                method: 'GET',
                path: '/api/analytics/contracts',
                desc: 'Soroban smart contract analytics including invocation counts, gas usage statistics, event frequency, and contract activity trends.',
                params: '?range=24h|7d|30d',
              },
            ].map((ep) => (
              <div key={ep.path} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 rounded bg-green-900/30 text-green-400 text-[10px] font-bold">{ep.method}</span>
                  <code className="text-sm text-[#7366FF]">{ep.path}</code>
                </div>
                <p className="text-sm text-[#A8A9AD] leading-relaxed mb-2">{ep.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#A8A9AD] uppercase tracking-wider">Params:</span>
                  <code className="text-xs text-[#A8A9AD]">{ep.params}</code>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-[#A8A9AD] mt-4">
            See the full <Link href="/docs/analytics" className="text-[#7366FF] hover:underline">analytics documentation</Link> for response schemas, error codes, and advanced query parameters.
          </p>
        </section>

        {/* Data Export */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Export and Integrate</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-8">
            Analytics data is available as JSON via API for integration into your own dashboards, reports, and data pipelines. Use with any analytics or BI tool that supports REST APIs.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'JSON API',
                desc: 'All analytics endpoints return structured JSON. Integrate with any programming language, framework, or data pipeline.',
              },
              {
                title: 'Contract Export',
                desc: 'Export Soroban contract call history, events, and storage snapshots in CSV or JSON format for offline analysis.',
              },
              {
                title: 'Webhook Alerts',
                desc: 'Configure webhook notifications for whale movements, unusual transaction patterns, and threshold-based alerts.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What analytics does LumenQuery provide for the Stellar network?',
                a: 'LumenQuery provides network-level analytics (TPS, ledger close times, success rates, fee statistics), token analytics (velocity, whale movements, issuer risk assessment), smart contract analytics (Soroban invocation counts, gas usage, event frequency), and account-level analytics (transaction patterns, balance history, counterparty analysis).',
              },
              {
                q: 'Is the Stellar analytics dashboard free?',
                a: 'Yes. The LumenQuery analytics dashboard at /analytics is completely free and does not require authentication. It displays network metrics, token statistics, and smart contract activity with 24h, 7d, and 30d time ranges. API access for programmatic queries is available on paid plans.',
              },
              {
                q: 'Can I query Stellar analytics data via API?',
                a: 'Yes. LumenQuery provides REST API endpoints for all analytics data: /api/analytics/network for network metrics, /api/analytics/tokens for token analytics, and /api/analytics/contracts for Soroban contract analytics. Data is cached with configurable TTLs for optimal performance.',
              },
              {
                q: 'How does whale tracking work on Stellar?',
                a: 'LumenQuery tracks XLM transfers above 100,000 XLM as whale movements. The analytics API identifies large transfers, surfaces the source and destination accounts, and aggregates whale activity over configurable time periods. This data is available through both the dashboard and API.',
              },
              {
                q: 'Can I use natural language to query the Stellar blockchain?',
                a: 'Yes. LumenQuery provides a natural language query interface at /query where you can ask questions about the Stellar network in plain English. The system interprets your question, queries the blockchain, and returns structured results without requiring SQL or API knowledge.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-3">{faq.q}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/analytics', label: 'Live Analytics Dashboard', desc: 'Free public network analytics' },
              { href: '/query', label: 'Natural Language Query', desc: 'Ask questions in plain English' },
              { href: '/docs/analytics', label: 'Analytics Documentation', desc: 'API reference and guides' },
              { href: '/stellar-horizon-api', label: 'Horizon API', desc: 'Raw blockchain data access' },
              { href: '/stellar-rpc-provider', label: 'Stellar RPC Provider', desc: 'Full managed infrastructure' },
              { href: '/pricing', label: 'Pricing', desc: 'Free tier and paid plans' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-[#262932] rounded-2xl p-5 border border-white/5 hover:border-[#7366FF]/20 transition-colors group">
                <h3 className="font-semibold text-sm group-hover:text-[#7366FF] transition-colors mb-1">{link.label}</h3>
                <p className="text-xs text-[#A8A9AD]">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Unlock Stellar Blockchain Analytics</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              View the free analytics dashboard now, or create an account for API access. Track network health, whale movements, and smart contract activity in real time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/analytics" className="px-8 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
                View Dashboard
              </Link>
              <Link href="/auth/signup" className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                Get API Access
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'LumenQuery',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          url: 'https://lumenquery.io/stellar-blockchain-analytics-api',
          description: 'Stellar blockchain analytics API for transaction volume, account activity, token velocity, and whale tracking.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available',
            url: 'https://lumenquery.io/pricing',
          },
          softwareHelp: {
            '@type': 'CreativeWork',
            url: 'https://lumenquery.io/docs',
          },
        }) }}
      />
    </>
  );
}
