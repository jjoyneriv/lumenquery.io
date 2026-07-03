import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar API Provider Comparison',
  description: 'Compare Stellar API provider options across Horizon support, Soroban RPC, rate limits, analytics, monitoring, reliability, and pricing.',
  keywords: ['Stellar API provider comparison', 'Stellar API providers', 'Stellar Horizon provider', 'Soroban RPC provider', 'Stellar infrastructure comparison', 'best Stellar API'],
  alternates: { canonical: 'https://lumenquery.io/stellar-api-provider-comparison' },
  openGraph: {
    title: 'Stellar API Provider Comparison',
    description: 'Compare Stellar API provider options across Horizon support, Soroban RPC, rate limits, analytics, monitoring, reliability, and pricing.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-api-provider-comparison',
  },
  robots: { index: true, follow: true },
};

export default function StellarApiProviderComparisonPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar API Provider Comparison',
    description: 'Compare Stellar API provider options across Horizon support, Soroban RPC, rate limits, analytics, monitoring, reliability, and pricing.',
    url: 'https://lumenquery.io/stellar-api-provider-comparison',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the main Stellar API provider options?',
        acceptedAnswer: { '@type': 'Answer', text: 'The main options are: (1) the SDF-operated public Horizon and Soroban RPC endpoints, (2) self-hosting your own Horizon and Stellar Core instances, (3) generic blockchain API providers that include Stellar as one of many chains, and (4) Stellar-specialized providers like LumenQuery that focus exclusively on the Stellar ecosystem.' },
      },
      {
        '@type': 'Question',
        name: 'Is the public Stellar Horizon API suitable for production?',
        acceptedAnswer: { '@type': 'Answer', text: 'The SDF public Horizon endpoint is intended for development and testing. It has no SLA, variable rate limits, and no support channel. Most production applications eventually hit reliability or rate limit issues that require migrating to a managed provider or self-hosted infrastructure.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to self-host a Stellar Horizon node?',
        acceptedAnswer: { '@type': 'Answer', text: 'A production-grade Horizon instance requires a PostgreSQL database with significant storage (500GB+), a Stellar Core instance for ingestion, monitoring, and regular maintenance. Infrastructure costs typically range from $200-$500/month, plus engineering time for operations, upgrades, and troubleshooting.' },
      },
      {
        '@type': 'Question',
        name: 'What makes LumenQuery different from generic blockchain providers?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery is built exclusively for the Stellar ecosystem. This means native support for both Horizon and Soroban RPC, Stellar-specific analytics (TPS, fee stats, token velocity), decoded transaction operations, smart contract exploration, and features like natural language querying that are tailored to Stellar data models.' },
      },
      {
        '@type': 'Question',
        name: 'Do generic blockchain API providers support Soroban?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most generic providers have limited or no support for Soroban smart contracts. They typically offer basic Horizon proxy access but lack Soroban RPC endpoints, contract event streaming, storage state queries, and the specialized tooling needed for Soroban development.' },
      },
      {
        '@type': 'Question',
        name: 'How should I choose a Stellar API provider?',
        acceptedAnswer: { '@type': 'Answer', text: 'Consider your specific needs: rate limits and throughput requirements, whether you need Soroban RPC access, the importance of analytics and monitoring features, your budget, and the level of support you need. For most production applications, a Stellar-specialized provider offers the best balance of features, reliability, and cost.' },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io/' },
      { '@type': 'ListItem', position: 2, name: 'Stellar API Provider Comparison', item: 'https://lumenquery.io/stellar-api-provider-comparison' },
    ],
  };

  const comparisonRows = [
    { feature: 'Horizon API Access', public: 'Yes', self: 'Yes', generic: 'Yes (proxy)', lq: 'Yes (enhanced)', highlight: false },
    { feature: 'Soroban RPC Access', public: 'Separate endpoint', self: 'Requires setup', generic: 'Limited/None', lq: 'Yes (unified)', highlight: true },
    { feature: 'Rate Limits', public: '~1 req/s (variable)', self: 'Unlimited (self-managed)', generic: '100-1000 req/min', lq: '10K-100K+ req/mo', highlight: false },
    { feature: 'Uptime SLA', public: 'None', self: 'Self-managed', generic: '99-99.9%', lq: '99.9% (Pro+)', highlight: false },
    { feature: 'Latency', public: 'Variable', self: 'Low (co-located)', generic: 'Moderate', lq: 'Low (cached)', highlight: false },
    { feature: 'Response Caching', public: 'None', self: 'DIY', generic: 'Basic', lq: 'Redis (30s-10m TTL)', highlight: true },
    { feature: 'Analytics Dashboard', public: 'None', self: 'DIY', generic: 'None', lq: 'Full (TPS, fees, tokens)', highlight: true },
    { feature: 'Transaction Monitoring', public: 'SSE only', self: 'SSE only', generic: 'Basic webhooks', lq: 'SSE + alerts + decoded ops', highlight: true },
    { feature: 'Natural Language Querying', public: 'No', self: 'No', generic: 'No', lq: 'Yes', highlight: true },
    { feature: 'Smart Contract Explorer', public: 'No', self: 'No', generic: 'No', lq: 'Yes (Soroban Pro)', highlight: true },
    { feature: 'Documentation Quality', public: 'Good (SDF docs)', self: 'SDF docs + DIY', generic: 'Variable', lq: 'Comprehensive', highlight: false },
    { feature: 'Developer Onboarding', public: 'Instant (no signup)', self: '2-5 days setup', generic: '< 1 hour', lq: '< 5 minutes', highlight: false },
    { feature: 'Infrastructure Cost', public: 'Free', self: '$200-500+/mo', generic: '$49-299/mo', lq: 'Free tier available', highlight: false },
    { feature: 'Maintenance Burden', public: 'None', self: 'High (upgrades, monitoring)', generic: 'None', lq: 'None', highlight: false },
    { feature: 'Enterprise Support', public: 'Community only', self: 'N/A', generic: 'Email/chat', lq: 'Priority + dedicated', highlight: false },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
            <Link href="/" className="hover:text-[#7366FF]">Home</Link>
            <span>/</span>
            <span className="text-white">Stellar API Provider Comparison</span>
          </div>
        </nav>

        {/* Hero */}
        <header className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7366FF]/10 border border-[#7366FF]/20 text-[#7366FF] text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            Comparison Guide
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stellar API Provider<br />
            <span className="text-[#7366FF]">Comparison</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mx-auto mb-8">
            Compare Stellar API provider options across Horizon support, Soroban RPC, rate limits, analytics, monitoring, reliability, and pricing to find the best fit for your application.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Try LumenQuery Free
            </Link>
            <Link href="/pricing" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              View Pricing
            </Link>
          </div>
        </header>

        {/* Comparison Dimensions */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">How We Compare Providers</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Choosing a Stellar API provider is not just about rate limits and pricing. The right provider depends on your technical requirements, team capacity, and product roadmap.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'API Coverage', desc: 'Which Stellar APIs are supported: Horizon REST, Soroban RPC, streaming, and historical data access.' },
              { title: 'Reliability', desc: 'Uptime guarantees, rate limit handling, burst capacity, and behavior during network congestion.' },
              { title: 'Developer Experience', desc: 'Onboarding speed, documentation quality, SDK support, and how fast you can go from signup to first request.' },
              { title: 'Value-Added Features', desc: 'Analytics, monitoring, decoded transactions, smart contract tools, and other capabilities beyond raw API proxy.' },
            ].map((d) => (
              <div key={d.title} className="p-5 rounded-2xl bg-[#262932] border border-white/5">
                <h3 className="font-bold mb-2">{d.title}</h3>
                <p className="text-sm text-[#A8A9AD]">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Provider Overview Cards */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Provider Options at a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-1">Public Stellar</h3>
              <p className="text-xs text-[#A8A9AD] mb-3">SDF-operated free endpoints</p>
              <div className="text-2xl font-bold text-white mb-1">Free</div>
              <p className="text-xs text-[#A8A9AD]">No SLA, variable rate limits</p>
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Zero cost</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Instant access</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> No guarantees</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> No analytics</div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-1">Self-Hosted</h3>
              <p className="text-xs text-[#A8A9AD] mb-3">Run your own Horizon + Core</p>
              <div className="text-2xl font-bold text-white mb-1">$200+/mo</div>
              <p className="text-xs text-[#A8A9AD]">Server + maintenance costs</p>
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Full control</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> No rate limits</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> High maintenance</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> Slow setup</div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-1">Generic Provider</h3>
              <p className="text-xs text-[#A8A9AD] mb-3">Multi-chain API services</p>
              <div className="text-2xl font-bold text-white mb-1">$49-299/mo</div>
              <p className="text-xs text-[#A8A9AD]">Per-chain pricing varies</p>
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> SLA included</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Multi-chain</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> Limited Soroban</div>
                <div className="flex items-center gap-2 text-xs text-red-400"><span>-</span> No Stellar analytics</div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#262932] border border-[#7366FF]/30 ring-1 ring-[#7366FF]/20">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold">LumenQuery</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF]">Stellar-Native</span>
              </div>
              <p className="text-xs text-[#A8A9AD] mb-3">Stellar-specialized platform</p>
              <div className="text-2xl font-bold text-white mb-1">Free tier</div>
              <p className="text-xs text-[#A8A9AD]">Pro plans from $25/mo</p>
              <div className="mt-4 space-y-1">
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Horizon + Soroban</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Full analytics</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> Fast onboarding</div>
                <div className="flex items-center gap-2 text-xs text-green-400"><span>+</span> NL querying</div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Comparison Table */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-[#262932]">
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD] min-w-[180px]">Feature</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD] min-w-[140px]">Public Stellar</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD] min-w-[140px]">Self-Hosted</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD] min-w-[140px]">Generic Provider</th>
                  <th className="py-3 px-4 font-semibold text-[#7366FF] min-w-[160px]">LumenQuery</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className={`border-t border-white/5 ${row.highlight ? 'bg-[#7366FF]/5' : ''}`}>
                    <td className="py-3 px-4 font-medium text-white">{row.feature}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.public}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.self}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.generic}</td>
                    <td className="py-3 px-4 text-white font-medium">{row.lq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decision Guide */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Decision Guide</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Use this guide to determine which option best fits your specific requirements and constraints.
          </p>
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-2">Choose Public Stellar Endpoints If...</h3>
              <ul className="space-y-1 text-sm text-[#A8A9AD]">
                <li>- You are building a prototype or proof of concept</li>
                <li>- Your application has very low traffic (under 1,000 requests/day)</li>
                <li>- You do not need an uptime guarantee or SLA</li>
                <li>- You are comfortable handling rate limit errors in your code</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-2">Choose Self-Hosted Infrastructure If...</h3>
              <ul className="space-y-1 text-sm text-[#A8A9AD]">
                <li>- You have strict data residency requirements</li>
                <li>- Your team has experienced DevOps/SRE engineers available</li>
                <li>- You need unlimited throughput with zero external dependencies</li>
                <li>- You are already running Stellar Core for validation or anchoring</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-2">Choose a Generic Provider If...</h3>
              <ul className="space-y-1 text-sm text-[#A8A9AD]">
                <li>- You are building a multi-chain application and need a single vendor</li>
                <li>- You only need basic Horizon API proxy access (no analytics or Soroban)</li>
                <li>- Your primary chain is not Stellar but you need occasional Stellar data</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-[#7366FF]/20">
              <h3 className="font-bold mb-2">Choose LumenQuery If...</h3>
              <ul className="space-y-1 text-sm text-[#A8A9AD]">
                <li>- You are building a Stellar-first application and need deep ecosystem support</li>
                <li>- You need both Horizon and Soroban RPC access from a single endpoint</li>
                <li>- You want built-in analytics, transaction monitoring, and decoded operations</li>
                <li>- You want to start free and scale as your application grows</li>
                <li>- You need features like natural language querying, whale alerts, or portfolio tracking</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Explore LumenQuery</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/pricing" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 text-sm group-hover:text-[#7366FF] transition-colors">Pricing</h3>
              <p className="text-xs text-[#A8A9AD]">Plans and rate limits</p>
            </Link>
            <Link href="/docs" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 text-sm group-hover:text-[#7366FF] transition-colors">Documentation</h3>
              <p className="text-xs text-[#A8A9AD]">API reference</p>
            </Link>
            <Link href="/stellar-horizon-api" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 text-sm group-hover:text-[#7366FF] transition-colors">Horizon API</h3>
              <p className="text-xs text-[#A8A9AD]">REST endpoints</p>
            </Link>
            <Link href="/soroban-rpc-api" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 text-sm group-hover:text-[#7366FF] transition-colors">Soroban RPC</h3>
              <p className="text-xs text-[#A8A9AD]">Smart contract access</p>
            </Link>
            <Link href="/stellar-rpc-provider" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 text-sm group-hover:text-[#7366FF] transition-colors">RPC Provider</h3>
              <p className="text-xs text-[#A8A9AD]">Infrastructure details</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group rounded-2xl bg-[#262932] border border-white/5 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm sm:text-base">
                  <span>{faq.name}</span>
                  <svg className="w-5 h-5 text-[#A8A9AD] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-[#A8A9AD] leading-relaxed">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-[#7366FF] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Try LumenQuery for Free</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get unified Horizon + Soroban RPC access, built-in analytics, and developer-friendly tools. Start with the free tier and scale when you are ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/pricing" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              Compare Plans
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
