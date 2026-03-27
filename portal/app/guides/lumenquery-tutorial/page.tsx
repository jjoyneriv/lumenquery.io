import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LumenQuery Tutorial: How to Use the Stellar Web3 Developer Platform | LumenQuery',
  description: 'Complete LumenQuery tutorial. Learn to use this Stellar Web3 developer platform for network analytics, transaction queries, smart contract exploration, and real-time monitoring tools.',
  keywords: ['Stellar Web3 developer platform', 'Stellar network analytics tools', 'Stellar transaction query API', 'Stellar node monitoring tools', 'Stellar API for developers', 'Stellar RPC API service'],
  alternates: { canonical: 'https://lumenquery.io/guides/lumenquery-tutorial' },
  openGraph: {
    title: 'LumenQuery Tutorial: Stellar Web3 Developer Platform | LumenQuery',
    description: 'Learn to use LumenQuery for Stellar network analytics, transaction queries, and smart contract exploration.',
    type: 'article',
    url: 'https://lumenquery.io/guides/lumenquery-tutorial',
  },
  robots: { index: true, follow: true },
};

export default function LumenQueryTutorialPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'LumenQuery Tutorial: How to Use the Stellar Web3 Developer Platform',
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
            <Link href="/" className="hover:text-[#2855FF]">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </div>
        </nav>

        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[rgba(40,85,255,0.1)] text-[#2855FF] text-xs font-medium">Platform Tutorial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            LumenQuery Tutorial: How to Use the Stellar Web3 Developer Platform
          </h1>
          <p className="text-lg text-gray-400">
            A complete walkthrough of every feature in the LumenQuery platform.
          </p>
        </header>

        <section className="prose prose-gray max-w-none" aria-label="Tutorial content">
          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            LumenQuery is a comprehensive <strong className="font-semibold text-white">Stellar Web3 developer platform</strong> that provides <strong className="font-semibold text-white">Stellar network analytics tools</strong>, a <strong className="font-semibold text-white">Stellar transaction query API</strong>, smart contract exploration, real-time monitoring, and portfolio intelligence—all through a single platform. This tutorial walks you through every feature, from setting up your account to building production applications with <strong className="font-semibold text-white">Stellar node monitoring tools</strong> and the <strong className="font-semibold text-white">Stellar API for developers</strong>.
          </p>

          <div className="my-8 p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-base font-bold mb-3">Platform Features Covered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">1.</span> Account Setup & API Keys</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">2.</span> Natural Language Query</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">3.</span> Network Analytics Dashboard</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">4.</span> Smart Contract Explorer</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">5.</span> Live Transaction Viewer</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">6.</span> Portfolio Intelligence</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">7.</span> API Integration</div>
              <div className="flex items-center gap-2"><span className="text-[#2855FF]">8.</span> Horizon API & Stellar RPC</div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">1. Getting Started with the Stellar Web3 Developer Platform</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            <Link href="/auth/signup" className="text-[#2855FF] hover:underline">Create a free account</Link> to get started. The free tier includes 10,000 API requests per month and full access to all dashboard features.
          </p>

          <div className="bg-[#0D0D0D] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`# After signing up, get your API key from the dashboard
export LUMENQUERY_API_KEY="lq_your_key"

# Test your connection
curl -H "X-API-Key: $LUMENQUERY_API_KEY" \\
  https://api.lumenquery.io/ledgers?limit=1`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">2. Natural Language Query: The Stellar Transaction Query API Made Easy</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <Link href="/query" className="text-[#2855FF] hover:underline">Natural Language Query Interface</Link> lets you explore the <strong className="font-semibold text-white">Stellar transaction query API</strong> without writing code. Just type your question in plain English:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400">&quot;Show the top 10 XLM holders&quot;</div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400">&quot;Recent payments larger than 100K XLM&quot;</div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400">&quot;What assets are on Stellar?&quot;</div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400">&quot;Account info for GXXX...&quot;</div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Results are displayed as interactive tables with clickable account IDs. Every query also shows the equivalent SQL, helping you learn the underlying data model.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">3. Stellar Network Analytics Tools</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <Link href="/analytics" className="text-[#2855FF] hover:underline">Analytics Dashboard</Link> provides real-time <strong className="font-semibold text-white">Stellar network analytics tools</strong> with no authentication required. Monitor:
          </p>

          <ul className="space-y-2 my-4">
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><Link href="/analytics/network" className="text-[#2855FF] hover:underline">Network Overview</Link> — Ledger progression, TPS, success rates, base fees</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><Link href="/analytics/tokens" className="text-[#2855FF] hover:underline">Token Analytics</Link> — Asset velocity, whale movements, payment activity charts</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><Link href="/analytics/contracts" className="text-[#2855FF] hover:underline">Contract Analytics</Link> — Soroban invocation counts, gas usage, success rates</li>
          </ul>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Read the <Link href="/docs/analytics" className="text-[#2855FF] hover:underline">Analytics documentation</Link> for details on data sources, refresh rates, and understanding stroops.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">4. Smart Contract Explorer (Soroban Pro)</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <Link href="/contracts" className="text-[#2855FF] hover:underline">Smart Contract Explorer</Link> decodes Soroban contract data into human-readable format:
          </p>

          <ul className="space-y-2 my-4">
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><strong className="text-white">Decoded Calls</strong> — XDR translated to function names, parameters, return values</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><strong className="text-white">Storage Viewer</strong> — Browse persistent, temporary, and instance storage</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><strong className="text-white">Event Stream</strong> — Real-time contract event monitoring</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base"><strong className="text-white">Contract Deployment</strong> — <Link href="/contracts/deploy" className="text-[#2855FF] hover:underline">Deploy contracts</Link> directly from the browser with Freighter wallet</li>
          </ul>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            See the <Link href="/docs/contracts" className="text-[#2855FF] hover:underline">contracts documentation</Link> for the full feature reference.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">5. Live Transaction Viewer</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <Link href="/dashboard/transactions" className="text-[#2855FF] hover:underline">Live Transaction Viewer</Link> streams decoded transactions in real time via Server-Sent Events. Operations are translated into plain English (e.g., &quot;Payment of 100 XLM from GAXJ... to GBCD...&quot;). This is one of LumenQuery&apos;s most powerful <strong className="font-semibold text-white">Stellar network analytics tools</strong> for monitoring network activity.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">6. Portfolio Intelligence</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            <Link href="/portfolio" className="text-[#2855FF] hover:underline">Portfolio Intelligence</Link> lets you aggregate multiple Stellar accounts, track P&amp;L with FIFO cost basis, assess trustline risk, and monitor Soroban DeFi positions. See the <Link href="/docs/portfolio" className="text-[#2855FF] hover:underline">Portfolio documentation</Link> for details.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">7. API Integration: Stellar RPC API Service and Horizon</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            LumenQuery provides managed access to both the <strong className="font-semibold text-white">Stellar RPC API service</strong> and the Horizon REST API through a single account:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-xs">Horizon API</span>
              </div>
              <pre className="text-xs text-gray-300"><code>{`curl -H "X-API-Key: lq_..." \\
  api.lumenquery.io/accounts/GXXX

# Returns: balances, sequence,
# thresholds, signers, data`}</code></pre>
            </div>
            <div className="bg-[#0D0D0D] rounded-xl p-4 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">Stellar RPC</span>
              </div>
              <pre className="text-xs text-gray-300"><code>{`curl -X POST rpc.lumenquery.io \\
  -d '{"jsonrpc":"2.0",
  "method":"getLatestLedger",
  "id":1}'`}</code></pre>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            For a detailed comparison, read our <Link href="/guides/horizon-vs-rpc-vs-indexers" className="text-[#2855FF] hover:underline">Horizon vs RPC vs Indexers comparison</Link>. For RPC specifics, see our <Link href="/guides/stellar-rpc-guide" className="text-[#2855FF] hover:underline">Stellar RPC guide</Link>. For a hands-on coding tutorial, follow our <Link href="/guides/stellar-api-tutorial" className="text-[#2855FF] hover:underline">Stellar API Tutorial</Link>.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">8. Monitoring and Observability</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            LumenQuery also serves as one of the most comprehensive <strong className="font-semibold text-white">Stellar node monitoring tools</strong> available. The platform exposes Prometheus-compatible metrics for:
          </p>

          <ul className="space-y-2 my-4">
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">API response times and error rates</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">Request volumes per endpoint</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">Network health indicators</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">Cache hit rates and latency</li>
          </ul>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            For self-hosted infrastructure monitoring, our blog post on <Link href="/blog/monitor-stellar-validator-horizon-node" className="text-[#2855FF] hover:underline">monitoring Stellar validators and Horizon nodes</Link> covers Prometheus and Grafana setup in detail.
          </p>

          <div className="my-8 p-5 sm:p-8 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-3">Explore More</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="text-[#2855FF] hover:underline">API Documentation</Link> — Full Horizon and RPC endpoint reference</li>
              <li><Link href="/blog/getting-started-with-lumenquery" className="text-[#2855FF] hover:underline">Getting Started with LumenQuery</Link> — Original quick-start guide</li>
              <li><Link href="/blog/stellar-expanding-developer-ecosystem" className="text-[#2855FF] hover:underline">How Stellar Is Expanding the Developer Ecosystem</Link></li>
              <li><Link href="/blog/stellar-foundation-roadmap-2026" className="text-[#2855FF] hover:underline">Stellar Foundation Roadmap for 2026</Link></li>
              <li><Link href="/blog/using-stellar-rpc-access-blockchain-data" className="text-[#2855FF] hover:underline">Using Stellar RPC to Access Blockchain Data</Link></li>
              <li><Link href="/blog/stellar-api-use-cases-for-fintech" className="text-[#2855FF] hover:underline">5 Powerful Use Cases for the Stellar Horizon API</Link></li>
              <li><Link href="/pricing" className="text-[#2855FF] hover:underline">Pricing Plans</Link> — Free, Starter, Professional, Enterprise</li>
            </ul>
          </div>
        </section>

        <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Start Exploring Stellar</h2>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Free tier includes 10,000 requests/month and full dashboard access.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#2855FF] font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Create Free Account
            </Link>
            <Link href="/query" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white/20 text-white font-medium hover:bg-white/30 transition-colors text-sm sm:text-base">
              Try a Query Now
            </Link>
          </div>
        </aside>
      </article>
    </>
  );
}
