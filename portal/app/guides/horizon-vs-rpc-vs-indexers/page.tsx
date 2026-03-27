import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Horizon API vs RPC vs Indexers: Deep Comparison for Stellar Developers | LumenQuery',
  description: 'In-depth comparison of Horizon API vs RPC vs Indexers for Stellar blockchain data access. Find the best Stellar API providers and choose the right architecture for your application.',
  keywords: ['Horizon API vs RPC', 'Best Stellar API providers', 'Stellar blockchain data API', 'Stellar node monitoring tools', 'Stellar API for developers', 'Stellar RPC API service'],
  alternates: { canonical: 'https://lumenquery.io/guides/horizon-vs-rpc-vs-indexers' },
  openGraph: {
    title: 'Horizon vs RPC vs Indexers: Deep Comparison | LumenQuery',
    description: 'Choose the right Stellar data access pattern. Compare Horizon API, Stellar RPC, and custom indexers.',
    type: 'article',
    url: 'https://lumenquery.io/guides/horizon-vs-rpc-vs-indexers',
  },
  robots: { index: true, follow: true },
};

export default function HorizonVsRpcPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Horizon API vs RPC vs Indexers: Deep Comparison for Stellar Developers',
    datePublished: '2026-03-27',
    dateModified: '2026-03-27',
    author: { '@type': 'Organization', name: 'LumenQuery' },
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  return (
    <>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#7366FF]">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </div>
        </nav>

        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-orange-900/30 text-orange-700 text-xs font-medium">Deep Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Horizon API vs RPC vs Indexers: Deep Comparison for Stellar Developers
          </h1>
          <p className="text-lg text-gray-400">
            Choose the right data access architecture for your Stellar application.
          </p>
        </header>

        <section className="prose prose-gray max-w-none" aria-label="Comparison content">
          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Choosing between <strong className="font-semibold text-white">Horizon API vs RPC</strong> is one of the first architectural decisions Stellar developers face. Add custom indexers to the mix, and the options multiply. This guide compares all three approaches, helps you find the <strong className="font-semibold text-white">best Stellar API providers</strong>, and provides concrete recommendations based on your use case. Whether you need a <strong className="font-semibold text-white">Stellar blockchain data API</strong> for real-time trading, historical analytics, or smart contract monitoring, this comparison will help you choose the right approach.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">The Three Approaches to Stellar Blockchain Data</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The Stellar ecosystem provides three primary ways to access blockchain data. Understanding the tradeoffs between <strong className="font-semibold text-white">Horizon API vs RPC</strong> and custom indexers is critical for building performant applications.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Horizon API</th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Stellar RPC</th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Custom Indexer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-semibold">Data Type</td><td className="py-3 px-4 text-gray-400">Historical + indexed</td><td className="py-3 px-4 text-gray-400">Real-time state</td><td className="py-3 px-4 text-gray-400">Custom aggregations</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-semibold">Protocol</td><td className="py-3 px-4 text-gray-400">REST + SSE</td><td className="py-3 px-4 text-gray-400">JSON-RPC 2.0</td><td className="py-3 px-4 text-gray-400">Custom (SQL, GraphQL)</td></tr>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-semibold">Latency</td><td className="py-3 px-4 text-gray-400">~100-500ms</td><td className="py-3 px-4 text-gray-400">~50-200ms</td><td className="py-3 px-4 text-gray-400">~10-100ms</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-semibold">Smart Contracts</td><td className="py-3 px-4 text-gray-400">Limited</td><td className="py-3 px-4 text-gray-400">Full support</td><td className="py-3 px-4 text-gray-400">Custom</td></tr>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-semibold">Ops Burden</td><td className="py-3 px-4 text-gray-400">Low (managed)</td><td className="py-3 px-4 text-gray-400">Low (managed)</td><td className="py-3 px-4 text-gray-400">High (self-managed)</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-semibold">Tx Simulation</td><td className="py-3 px-4 text-gray-400">No</td><td className="py-3 px-4 text-gray-400">Yes</td><td className="py-3 px-4 text-gray-400">No</td></tr>
                <tr><td className="py-3 px-4 font-semibold">Cost</td><td className="py-3 px-4 text-gray-400">Free-$99/mo</td><td className="py-3 px-4 text-gray-400">Free-$99/mo</td><td className="py-3 px-4 text-gray-400">$200-2000+/mo</td></tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Horizon API: The Stellar Blockchain Data API Standard</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Horizon is the original <strong className="font-semibold text-white">Stellar blockchain data API</strong>. It ingests every ledger, indexes it in PostgreSQL, and exposes a RESTful interface. You can explore it through our <Link href="/docs" className="text-[#7366FF] hover:underline">API documentation</Link>.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base"><strong className="font-semibold text-white">Best for:</strong> Account balances, transaction history, payment streams, offer book queries, asset metadata, and building <Link href="/blog/build-stellar-blockchain-explorer-horizon-api" className="text-[#7366FF] hover:underline">blockchain explorers</Link>.</p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Our <Link href="/analytics" className="text-[#7366FF] hover:underline">Stellar Network Analytics Dashboard</Link> and <Link href="/query" className="text-[#7366FF] hover:underline">Natural Language Query Interface</Link> both use Horizon as their primary data source for historical queries.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Stellar RPC: Real-Time State and Smart Contracts</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar RPC API service</strong> is optimized for real-time operations. Read our <Link href="/guides/stellar-rpc-guide" className="text-[#7366FF] hover:underline">complete Stellar RPC guide</Link> for the full method reference.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base"><strong className="font-semibold text-white">Best for:</strong> Transaction simulation, smart contract storage, event queries, fee estimation, and real-time state. Essential for any app using <Link href="/contracts" className="text-[#7366FF] hover:underline">Soroban smart contracts</Link>.</p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Custom Indexers: When You Need More</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Custom indexers ingest raw Stellar data and store it in your own database with custom schemas. They&apos;re powerful but require significant infrastructure investment, including <strong className="font-semibold text-white">Stellar node monitoring tools</strong> to ensure your ingestion pipeline stays healthy.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base"><strong className="font-semibold text-white">Best for:</strong> Complex analytics, custom aggregations, cross-entity queries, and applications requiring sub-10ms latency. See our guide on <Link href="/blog/monitor-stellar-validator-horizon-node" className="text-[#7366FF] hover:underline">monitoring Stellar nodes in production</Link> if you go this route.</p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Finding the Best Stellar API Providers</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            When evaluating the <strong className="font-semibold text-white">best Stellar API providers</strong>, consider these factors:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">Reliability & Uptime</h4>
              <p className="text-sm text-gray-400">Look for providers with SLA guarantees and redundant infrastructure. LumenQuery provides 99.9% uptime with automatic failover.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">Dual API Support</h4>
              <p className="text-sm text-gray-400">The <strong className="text-white">best Stellar API providers</strong> offer both Horizon and RPC through a single account. LumenQuery provides both at <Link href="/pricing" className="text-[#7366FF] hover:underline">transparent pricing</Link>.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">Developer Experience</h4>
              <p className="text-sm text-gray-400">Good documentation, SDKs, and support make a difference. Check our <Link href="/docs" className="text-[#7366FF] hover:underline">API docs</Link> and <Link href="/blog/best-stellar-api-providers-2026" className="text-[#7366FF] hover:underline">2026 provider comparison</Link>.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">Monitoring & Observability</h4>
              <p className="text-sm text-gray-400">Providers should offer usage dashboards and <strong className="text-white">Stellar node monitoring tools</strong> integration. See our <Link href="/docs/analytics" className="text-[#7366FF] hover:underline">analytics documentation</Link>.</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Decision Framework: Which Approach to Use</h2>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-800/50">
              <h4 className="font-bold text-sm mb-1 text-blue-300">Building a payment app?</h4>
              <p className="text-sm text-blue-400">Use <strong>Horizon API</strong> for account lookups, path finding, and payment history. Add Stellar RPC only for transaction simulation.</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-800/50">
              <h4 className="font-bold text-sm mb-1 text-purple-300">Building a DeFi protocol?</h4>
              <p className="text-sm text-purple-400">Use <strong>Stellar RPC</strong> as your primary interface for contract interactions, simulation, and events. Use Horizon for trade history.</p>
            </div>
            <div className="p-4 rounded-xl bg-green-900/20 border border-green-800/50">
              <h4 className="font-bold text-sm mb-1 text-green-300">Building analytics?</h4>
              <p className="text-sm text-green-400">Start with <strong>Horizon API</strong> (like our <Link href="/analytics" className="text-[#7366FF] hover:underline">analytics dashboard</Link>). Graduate to a custom indexer when you need complex aggregations.</p>
            </div>
            <div className="p-4 rounded-xl bg-orange-900/20 border border-orange-800/50">
              <h4 className="font-bold text-sm mb-1 text-orange-300">Building a portfolio tracker?</h4>
              <p className="text-sm text-orange-400">Use <strong>both APIs</strong> together. Horizon for balances and history, RPC for DeFi positions. See our <Link href="/docs/portfolio" className="text-[#7366FF] hover:underline">Portfolio Intelligence docs</Link>.</p>
            </div>
          </div>

          <div className="my-8 p-5 sm:p-8 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-3">Related Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides/stellar-rpc-guide" className="text-[#7366FF] hover:underline">What is Stellar RPC? (Complete Guide)</Link></li>
              <li><Link href="/guides/stellar-api-tutorial" className="text-[#7366FF] hover:underline">Stellar API Tutorial (Step-by-Step)</Link></li>
              <li><Link href="/guides/lumenquery-tutorial" className="text-[#7366FF] hover:underline">LumenQuery Tutorial</Link></li>
              <li><Link href="/blog/horizon-api-vs-stellar-rpc" className="text-[#7366FF] hover:underline">Building Real-Time Apps: Horizon API vs Stellar RPC</Link></li>
              <li><Link href="/blog/stellar-5000-tps-roadmap-api-impact" className="text-[#7366FF] hover:underline">How Stellar&apos;s 5000 TPS Roadmap Impacts Your API</Link></li>
              <li><Link href="/blog/best-stellar-api-providers-2026" className="text-[#7366FF] hover:underline">Best Stellar API Providers in 2026</Link></li>
              <li><Link href="/blog/stellar-foundation-roadmap-2026" className="text-[#7366FF] hover:underline">Stellar Foundation Roadmap for 2026</Link></li>
            </ul>
          </div>
        </section>

        <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Both Horizon and RPC in One Platform</h2>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">LumenQuery provides managed access to both APIs. Start free.</p>
          <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#7366FF] font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
            Get Free API Key
          </Link>
        </aside>
      </article>
    </>
  );
}
