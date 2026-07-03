import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar RPC Provider for Production Apps',
  description: 'LumenQuery provides managed Stellar API and RPC infrastructure for developers building wallets, analytics apps, fintech products, and tokenization platforms.',
  keywords: ['Stellar RPC provider', 'Stellar API provider', 'Stellar node provider', 'managed Stellar infrastructure', 'Stellar RPC endpoint', 'Stellar API hosting', 'Stellar developer tools'],
  alternates: { canonical: 'https://lumenquery.io/stellar-rpc-provider' },
  openGraph: {
    title: 'Stellar RPC Provider for Production Apps',
    description: 'LumenQuery provides managed Stellar API and RPC infrastructure for developers building wallets, analytics apps, fintech products, and tokenization platforms.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-rpc-provider',
  },
  robots: { index: true, follow: true },
};

export default function StellarRpcProviderPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar RPC Provider for Production Apps',
    description: 'LumenQuery provides managed Stellar API and RPC infrastructure for developers building wallets, analytics apps, fintech products, and tokenization platforms.',
    url: 'https://lumenquery.io/stellar-rpc-provider',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a Stellar RPC provider?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Stellar RPC provider gives developers managed access to Stellar network APIs without running their own infrastructure. This includes Horizon REST API for querying blockchain data and Soroban RPC for smart contract interactions. LumenQuery handles node operation, database management, and protocol upgrades.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I use a managed Stellar RPC provider instead of self-hosting?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Self-hosting Stellar infrastructure requires running Stellar Core, PostgreSQL, and Horizon or Soroban RPC. This means server costs, database tuning, disk management, and manual protocol upgrades. A managed provider like LumenQuery eliminates this overhead so your team can focus on building your application.',
        },
      },
      {
        '@type': 'Question',
        name: 'What APIs does LumenQuery provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery provides Horizon REST API (accounts, transactions, payments, assets, ledgers, operations, DEX), Soroban JSON-RPC (smart contract invocation, simulation, event queries), analytics APIs (network metrics, token velocity, whale tracking), and natural language query capabilities.',
        },
      },
      {
        '@type': 'Question',
        name: 'What uptime does LumenQuery guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery targets 99.9% uptime for all API endpoints. Infrastructure is monitored with Prometheus and Grafana, with automated alerting for latency spikes, error rate increases, and resource usage anomalies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How fast are LumenQuery API responses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most API requests complete in under 300ms. Frequently accessed data is served from Redis cache with sub-50ms response times. Streaming endpoints (SSE) deliver events within seconds of ledger close.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does LumenQuery support Soroban smart contracts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. LumenQuery provides both Horizon API for general Stellar queries and Soroban JSON-RPC for smart contract development. You can simulate transactions, invoke contracts, query contract events, and explore contract storage through a single provider.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Stellar RPC Provider', item: 'https://lumenquery.io/stellar-rpc-provider' },
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
              <span className="text-white">Stellar RPC Provider</span>
            </div>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">Managed Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            Stellar RPC Provider for Production Apps
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mb-8">
            Managed Stellar API and RPC infrastructure for developers building wallets, analytics apps, fintech products, and tokenization platforms. Skip the node operations and start building.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
              Get Your API Key
            </Link>
            <Link href="/docs" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              View Documentation
            </Link>
          </div>
        </section>

        {/* Managed Infrastructure */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Managed Stellar Infrastructure</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            LumenQuery operates the full Stellar stack so you do not have to. Our infrastructure includes Horizon API servers, Soroban RPC nodes, PostgreSQL databases, Redis caching, and monitoring with Prometheus and Grafana.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl font-bold text-[#7366FF] mb-2">99.9%</div>
              <div className="text-sm text-[#A8A9AD]">Uptime Target</div>
              <p className="text-xs text-[#A8A9AD] mt-2">Monitored 24/7 with automated failover and alerting</p>
            </div>
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">&lt;300ms</div>
              <div className="text-sm text-[#A8A9AD]">API Latency</div>
              <p className="text-xs text-[#A8A9AD] mt-2">Sub-50ms for cached data, sub-300ms for live queries</p>
            </div>
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 text-center">
              <div className="text-3xl font-bold text-[#FFB829] mb-2">Auto</div>
              <div className="text-sm text-[#A8A9AD]">Scaling</div>
              <p className="text-xs text-[#A8A9AD] mt-2">Infrastructure scales with your traffic, no manual intervention</p>
            </div>
          </div>
        </section>

        {/* What&apos;s Included */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Everything You Need in One Provider</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            Most Stellar RPC providers stop at raw API access. LumenQuery gives you the full developer platform.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Horizon REST API',
                desc: 'Full access to accounts, transactions, payments, assets, ledgers, operations, effects, offers, and trade aggregations. Supports SSE streaming for real-time events.',
                link: '/stellar-horizon-api',
                linkText: 'Horizon API details',
              },
              {
                title: 'Soroban JSON-RPC',
                desc: 'Invoke smart contracts, simulate transactions, query contract events, and browse contract storage. Full JSON-RPC 2.0 compliant endpoint for Soroban development.',
                link: '/soroban-rpc-api',
                linkText: 'Soroban RPC details',
              },
              {
                title: 'Network Analytics',
                desc: 'Pre-built analytics dashboards for network metrics, token velocity, whale movements, and smart contract activity. Available as both UI and API.',
                link: '/analytics',
                linkText: 'View analytics',
              },
              {
                title: 'Smart Contract Explorer',
                desc: 'Decoded Soroban contract calls, storage viewer, event streams, and gas analytics. Understand what contracts are doing without reading XDR.',
                link: '/contracts',
                linkText: 'Explore contracts',
              },
              {
                title: 'Natural Language Queries',
                desc: 'Ask questions about the Stellar network in plain English. Get answers powered by AI that queries the blockchain for you.',
                link: '/query',
                linkText: 'Try querying',
              },
              {
                title: 'Portfolio Intelligence',
                desc: 'Multi-account portfolio aggregation, asset P&L tracking, trustline risk assessment, and yield monitoring for power users and funds.',
                link: '/portfolio',
                linkText: 'Portfolio tools',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed mb-3">{item.desc}</p>
                <Link href={item.link} className="text-xs text-[#7366FF] hover:underline">{item.linkText}</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Ideal User Segments */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Who Uses LumenQuery</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            LumenQuery serves developers and teams across the Stellar ecosystem with different needs and scale requirements.
          </p>
          <div className="space-y-4">
            {[
              {
                segment: 'Wallet Developers',
                desc: 'Build custodial and non-custodial wallets with reliable balance queries, payment streaming, and transaction submission. No infrastructure management needed.',
                icon: (
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                ),
              },
              {
                segment: 'Fintech Companies',
                desc: 'Power cross-border payments, remittance tracking, and fiat on/off ramps with Stellar API access. Compliance-ready with transaction monitoring capabilities.',
                icon: (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                segment: 'Analytics Platforms',
                desc: 'Build blockchain analytics dashboards with network metrics, token tracking, and whale movement detection. Use our pre-built analytics or query raw data.',
                icon: (
                  <svg className="w-5 h-5 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                segment: 'Tokenization Platforms',
                desc: 'Issue and manage tokenized assets on Stellar. Track holder counts, enforce authorization, and monitor transfers with comprehensive API access.',
                icon: (
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
              },
              {
                segment: 'Smart Contract Developers',
                desc: 'Develop and deploy Soroban smart contracts with reliable RPC access. Simulate transactions, monitor events, and debug contract interactions.',
                icon: (
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
            ].map((seg) => (
              <div key={seg.segment} className="bg-[#262932] rounded-2xl p-6 border border-white/5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  {seg.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{seg.segment}</h3>
                  <p className="text-sm text-[#A8A9AD] leading-relaxed">{seg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Provider Comparison</h2>
          <p className="text-[#A8A9AD] mb-8">
            How LumenQuery compares to self-hosting and other generic RPC providers.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#A8A9AD] font-medium">Capability</th>
                  <th className="text-left py-3 px-4 text-[#A8A9AD] font-medium">Self-Hosted</th>
                  <th className="text-left py-3 px-4 text-[#A8A9AD] font-medium">Generic Provider</th>
                  <th className="text-left py-3 px-4 text-[#7366FF] font-medium">LumenQuery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Horizon API', 'Yes (manual setup)', 'Usually', 'Yes'],
                  ['Soroban RPC', 'Separate setup', 'Sometimes', 'Yes'],
                  ['Network Analytics', 'No', 'No', 'Yes'],
                  ['Contract Explorer', 'No', 'No', 'Yes'],
                  ['Portfolio Tracking', 'No', 'No', 'Yes'],
                  ['Natural Language Query', 'No', 'No', 'Yes'],
                  ['Uptime SLA', 'Self-managed', 'Varies', '99.9%'],
                  ['Setup Time', 'Days', 'Hours', 'Minutes'],
                  ['Stellar-Specific Tooling', 'DIY', 'Minimal', 'Comprehensive'],
                  ['Pricing', '$200+/mo infra', 'Pay-per-request', 'Free tier + plans from $25/mo'],
                ].map(([cap, self, generic, lq]) => (
                  <tr key={cap} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-medium">{cap}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{self}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{generic}</td>
                    <td className="py-3 px-4 text-green-400">{lq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Developer Onboarding */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get Started in 3 Steps</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            From signup to your first API call in under 5 minutes.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Create Your Account',
                desc: 'Sign up with your email. No credit card required for the free tier. You get 10,000 API requests per month immediately.',
                cta: { href: '/auth/signup', label: 'Sign Up Free' },
              },
              {
                step: '2',
                title: 'Get Your API Key',
                desc: 'Generate an API key from your dashboard. Use it in the X-API-Key header for authenticated requests with higher rate limits.',
                cta: { href: '/dashboard', label: 'Go to Dashboard' },
              },
              {
                step: '3',
                title: 'Make Your First Call',
                desc: 'Query an account, fetch transactions, or stream payments. Use our docs and tutorials to explore all available endpoints.',
                cta: { href: '/docs', label: 'Read the Docs' },
              },
            ].map((s) => (
              <div key={s.step} className="bg-[#262932] rounded-2xl p-6 border border-white/5 relative">
                <span className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-[#7366FF] flex items-center justify-center text-sm font-bold">{s.step}</span>
                <h3 className="font-semibold mb-2 mt-2">{s.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed mb-4">{s.desc}</p>
                <Link href={s.cta.href} className="text-xs text-[#7366FF] hover:underline font-medium">{s.cta.label}</Link>
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
                q: 'What is a Stellar RPC provider?',
                a: 'A Stellar RPC provider gives developers managed access to Stellar network APIs without running their own infrastructure. This includes Horizon REST API for querying blockchain data and Soroban RPC for smart contract interactions. LumenQuery handles node operation, database management, and protocol upgrades.',
              },
              {
                q: 'Why should I use a managed Stellar RPC provider instead of self-hosting?',
                a: 'Self-hosting Stellar infrastructure requires running Stellar Core, PostgreSQL, and Horizon or Soroban RPC servers. This means server costs starting at $200/month, database tuning, disk management for the growing ledger, and manual protocol upgrades every few months. A managed provider eliminates this overhead.',
              },
              {
                q: 'What APIs does LumenQuery provide?',
                a: 'LumenQuery provides Horizon REST API (accounts, transactions, payments, assets, ledgers, operations, DEX), Soroban JSON-RPC (smart contract invocation, simulation, event queries), analytics APIs (network metrics, token velocity, whale tracking), natural language query capabilities, and portfolio intelligence.',
              },
              {
                q: 'What uptime does LumenQuery guarantee?',
                a: 'LumenQuery targets 99.9% uptime for all API endpoints. Infrastructure is monitored with Prometheus and Grafana, with automated alerting for latency spikes, error rate increases, and resource usage anomalies.',
              },
              {
                q: 'How fast are LumenQuery API responses?',
                a: 'Most API requests complete in under 300ms. Frequently accessed data is served from Redis cache with sub-50ms response times. Streaming endpoints (SSE) deliver events within seconds of ledger close.',
              },
              {
                q: 'Does LumenQuery support Soroban smart contracts?',
                a: 'Yes. LumenQuery provides both Horizon API for general Stellar queries and Soroban JSON-RPC for smart contract development. You can simulate transactions, invoke contracts, query contract events, and explore contract storage through a single provider.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-3">{faq.q}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Stellar RPC Provider is Ready</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Stop managing infrastructure. Start building your application. Free tier available with 10,000 requests per month.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="px-8 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
                Start for Free
              </Link>
              <Link href="/pricing" className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                Compare Plans
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
          url: 'https://lumenquery.io/stellar-rpc-provider',
          description: 'Managed Stellar RPC provider with Horizon API and Soroban RPC access for production applications.',
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
