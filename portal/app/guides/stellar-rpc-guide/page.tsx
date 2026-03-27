import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'What is Stellar RPC? Complete Guide to the Stellar RPC API Service | LumenQuery',
  description: 'Complete guide to the Stellar RPC API service. Learn how this Stellar blockchain data API powers real-time queries, smart contract interactions, and transaction simulation for developers.',
  keywords: ['Stellar RPC API service', 'Stellar blockchain data API', 'Stellar smart contract API', 'Stellar API for developers', 'Stellar transaction query API', 'Soroban RPC'],
  alternates: { canonical: 'https://lumenquery.io/guides/stellar-rpc-guide' },
  openGraph: {
    title: 'What is Stellar RPC? Complete Guide | LumenQuery',
    description: 'Complete guide to the Stellar RPC API service for developers building on the Stellar blockchain.',
    type: 'article',
    url: 'https://lumenquery.io/guides/stellar-rpc-guide',
  },
  robots: { index: true, follow: true },
};

export default function StellarRpcGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Stellar RPC? Complete Guide to the Stellar RPC API Service',
    datePublished: '2026-03-27',
    dateModified: '2026-03-27',
    author: { '@type': 'Organization', name: 'LumenQuery' },
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
    description: 'Complete guide to the Stellar RPC API service for developers building on the Stellar blockchain.',
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
            <span className="px-3 py-1 rounded-full bg-[rgba(40,85,255,0.1)] text-[#7366FF] text-xs font-medium">Complete Guide</span>
            <span className="text-gray-400 text-xs">Updated March 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            What is Stellar RPC? Complete Guide to the Stellar RPC API Service
          </h1>
          <p className="text-lg text-gray-400">
            Everything developers need to know about the Stellar RPC API service, from core concepts to production-ready implementation patterns.
          </p>
        </header>

        <section className="prose prose-gray max-w-none" aria-label="Guide content">
          {/* First 100 words - keywords front-loaded */}
          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar RPC API service</strong> is the primary interface for accessing real-time blockchain data on the Stellar network. As a purpose-built <strong className="font-semibold text-white">Stellar blockchain data API</strong>, it provides developers with JSON-RPC 2.0 endpoints for querying ledger state, simulating transactions, reading smart contract storage, and streaming events. Whether you&apos;re building payment applications, DeFi protocols, or <strong className="font-semibold text-white">Stellar smart contract</strong> interactions, the Stellar RPC is the foundational data layer your application needs. This guide covers everything from basic concepts to advanced production patterns used by the <strong className="font-semibold text-white">Stellar API for developers</strong> community.
          </p>

          <div className="my-8 p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-base font-bold mb-3">In This Guide</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">1.</span> What is Stellar RPC?</li>
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">2.</span> Core RPC Methods</li>
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">3.</span> Smart Contract Queries</li>
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">4.</span> Transaction Simulation</li>
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">5.</span> Event Streaming</li>
              <li className="flex items-center gap-2"><span className="text-[#7366FF]">6.</span> Production Best Practices</li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-4">Understanding the Stellar RPC API Service</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The Stellar RPC (formerly known as Soroban RPC) was <Link href="/blog/soroban-to-stellar-rpc-rebrand" className="text-[#7366FF] hover:underline">rebranded in 2026</Link> to reflect its expanded role as the unified real-time data access layer for the entire Stellar network. Unlike the <Link href="/docs" className="text-[#7366FF] hover:underline">Horizon API</Link>, which focuses on historical data and deep indexing, the Stellar RPC is optimized for real-time state queries and transaction processing.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar RPC API service</strong> uses the JSON-RPC 2.0 protocol, making it compatible with standard HTTP clients in any programming language. Every request follows the same structure:
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`curl -X POST https://rpc.lumenquery.io \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: lq_your_key" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getHealth"
  }'`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Core RPC Methods for Stellar Blockchain Data</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar blockchain data API</strong> exposes several core methods that every developer should know. Here&apos;s a complete reference:
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Method</th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Purpose</th>
                  <th className="text-left py-3 px-4 font-semibold border-b border-white/10">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getHealth</td><td className="py-3 px-4 text-gray-400">Server status</td><td className="py-3 px-4 text-gray-400">Health checks, monitoring</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getLatestLedger</td><td className="py-3 px-4 text-gray-400">Current ledger</td><td className="py-3 px-4 text-gray-400">Dashboard displays</td></tr>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getLedgerEntries</td><td className="py-3 px-4 text-gray-400">Read state</td><td className="py-3 px-4 text-gray-400">Contract storage queries</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">simulateTransaction</td><td className="py-3 px-4 text-gray-400">Test transactions</td><td className="py-3 px-4 text-gray-400">Fee estimation, debugging</td></tr>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">sendTransaction</td><td className="py-3 px-4 text-gray-400">Submit transactions</td><td className="py-3 px-4 text-gray-400">Payments, contract calls</td></tr>
                <tr className="border-b border-white/10 bg-white/5/50"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getTransaction</td><td className="py-3 px-4 text-gray-400">Transaction status</td><td className="py-3 px-4 text-gray-400">Confirmation polling</td></tr>
                <tr className="border-b border-white/10"><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getEvents</td><td className="py-3 px-4 text-gray-400">Contract events</td><td className="py-3 px-4 text-gray-400">Event monitoring</td></tr>
                <tr><td className="py-3 px-4 font-mono text-[#7366FF] text-xs">getFeeStats</td><td className="py-3 px-4 text-gray-400">Fee statistics</td><td className="py-3 px-4 text-gray-400">Transaction pricing</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            You can see these methods in action on our <Link href="/analytics" className="text-[#7366FF] hover:underline">Stellar Network Analytics Dashboard</Link>, which uses <code className="px-2 py-1 rounded bg-white/5 text-[#7366FF] text-xs border border-white/10">getLatestLedger</code> and Horizon endpoints to display live network metrics.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Querying Smart Contracts with the Stellar Smart Contract API</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Soroban smart contracts store their state on-ledger, and the <strong className="font-semibold text-white">Stellar smart contract API</strong> methods let you read this data directly. The <code className="px-2 py-1 rounded bg-white/5 text-[#7366FF] text-xs border border-white/10">getLedgerEntries</code> method is the primary tool for querying contract storage.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            LumenQuery&apos;s <Link href="/contracts" className="text-[#7366FF] hover:underline">Smart Contract Explorer</Link> uses these RPC methods under the hood to decode and display contract state. For a hands-on tutorial, see our guide on <Link href="/blog/soroban-json-rpc-explained" className="text-[#7366FF] hover:underline">Soroban JSON RPC Explained</Link>.
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">TypeScript</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`import { Server } from '@stellar/stellar-sdk/rpc';

const rpc = new Server('https://rpc.lumenquery.io');

// Read contract storage entry
const entries = await rpc.getLedgerEntries(
  contractStorageKey(contractId, 'balance', userAddress)
);

console.log('Contract state:', entries);`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Transaction Simulation: The Stellar Transaction Query API</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar transaction query API</strong> includes <code className="px-2 py-1 rounded bg-white/5 text-[#7366FF] text-xs border border-white/10">simulateTransaction</code>, which is essential for any application that submits transactions. It previews the result, estimates resource usage, and calculates fees—all without spending XLM. This is the same pattern used in LumenQuery&apos;s <Link href="/contracts/deploy" className="text-[#7366FF] hover:underline">contract deployment feature</Link>.
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// Simulate before submitting
const simResult = await rpc.simulateTransaction(tx);

if (simResult.error) {
  console.error('Simulation failed:', simResult.error);
} else {
  console.log('Estimated fee:', simResult.minResourceFee);
  console.log('CPU instructions:', simResult.cost?.cpuInsns);
  // Safe to sign and submit
}`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Event Streaming and Real-Time Data</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <code className="px-2 py-1 rounded bg-white/5 text-[#7366FF] text-xs border border-white/10">getEvents</code> method lets you query historical events emitted by smart contracts. Combined with polling, you can build real-time monitoring dashboards—like our <Link href="/dashboard/transactions" className="text-[#7366FF] hover:underline">Live Transaction Viewer</Link> which streams decoded transactions as they happen.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            For detailed event streaming documentation, see the <Link href="/docs/contracts" className="text-[#7366FF] hover:underline">Soroban Smart Contracts Explorer docs</Link>.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Stellar RPC vs Horizon: When to Use Which</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Understanding when to use the Stellar RPC vs the <Link href="/docs" className="text-[#7366FF] hover:underline">Horizon API</Link> is critical. For a deep dive, read our <Link href="/guides/horizon-vs-rpc-vs-indexers" className="text-[#7366FF] hover:underline">Horizon vs RPC vs Indexers comparison</Link>. The short version:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-sm mb-2">Use Stellar RPC for:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Real-time ledger state</li>
                <li>- Transaction simulation</li>
                <li>- Smart contract storage</li>
                <li>- Event queries</li>
                <li>- Fee estimation</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="font-bold text-sm mb-2">Use Horizon for:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>- Transaction history</li>
                <li>- Account balances</li>
                <li>- Payment streams</li>
                <li>- Offer books & trades</li>
                <li>- Asset metadata</li>
              </ul>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Production Best Practices for Stellar API Developers</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            As a <strong className="font-semibold text-white">Stellar API for developers</strong> platform, LumenQuery has processed millions of RPC requests. Here are the patterns that work best in production:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">1. Always simulate before submitting</h4>
              <p className="text-sm text-gray-400">Simulation catches errors, estimates fees, and prevents failed transactions from costing you XLM.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">2. Cache responses with appropriate TTLs</h4>
              <p className="text-sm text-gray-400">Ledger data is immutable once closed (~5s). Cache aggressively for read-heavy applications.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">3. Handle rate limits gracefully</h4>
              <p className="text-sm text-gray-400">Implement exponential backoff on 429 responses. See our <Link href="/docs" className="text-[#7366FF] hover:underline">API docs</Link> for rate limit tiers.</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-sm mb-1">4. Use managed infrastructure</h4>
              <p className="text-sm text-gray-400">Running your own RPC node requires significant ops overhead. <Link href="/blog/best-stellar-api-providers-2026" className="text-[#7366FF] hover:underline">Compare Stellar API providers</Link> to find the best fit.</p>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Getting Started with Stellar RPC</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Ready to start building? LumenQuery provides managed access to the <strong className="font-semibold text-white">Stellar RPC API service</strong> with free tier included:
          </p>

          <div className="space-y-3 my-6">
            <p className="text-sm text-gray-400"><strong className="text-white">Step 1:</strong> <Link href="/auth/signup" className="text-[#7366FF] hover:underline">Create a free LumenQuery account</Link></p>
            <p className="text-sm text-gray-400"><strong className="text-white">Step 2:</strong> Get your API key from the <Link href="/dashboard" className="text-[#7366FF] hover:underline">Dashboard</Link></p>
            <p className="text-sm text-gray-400"><strong className="text-white">Step 3:</strong> Follow our <Link href="/guides/stellar-api-tutorial" className="text-[#7366FF] hover:underline">Stellar API Tutorial</Link> for step-by-step instructions</p>
            <p className="text-sm text-gray-400"><strong className="text-white">Step 4:</strong> Explore live data with the <Link href="/query" className="text-[#7366FF] hover:underline">Natural Language Query Interface</Link></p>
          </div>

          <div className="my-8 p-5 sm:p-8 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-3">Further Reading</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog/using-stellar-rpc-access-blockchain-data" className="text-[#7366FF] hover:underline">Using the Stellar RPC to Access Real-Time Blockchain Data</Link></li>
              <li><Link href="/blog/horizon-api-vs-stellar-rpc" className="text-[#7366FF] hover:underline">Building Real-Time Apps: Horizon API vs Stellar RPC</Link></li>
              <li><Link href="/blog/stellar-foundation-roadmap-2026" className="text-[#7366FF] hover:underline">The Stellar Foundation Roadmap for 2026</Link></li>
              <li><Link href="/guides/lumenquery-tutorial" className="text-[#7366FF] hover:underline">LumenQuery Tutorial: Getting Started</Link></li>
              <li><Link href="/docs/analytics" className="text-[#7366FF] hover:underline">Stellar Network Analytics Documentation</Link></li>
            </ul>
          </div>
        </section>

        <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Start Using the Stellar RPC API</h2>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Free tier includes 10,000 requests/month. No credit card required.</p>
          <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#7366FF] font-medium hover:bg-white/10 transition-colors text-sm sm:text-base">
            Get Free API Key
          </Link>
        </aside>
      </article>
    </>
  );
}
