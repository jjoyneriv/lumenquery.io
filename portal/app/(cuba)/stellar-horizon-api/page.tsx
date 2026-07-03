import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar Horizon API for Developers',
  description: 'Use LumenQuery\'s Stellar Horizon API to query accounts, transactions, payments, assets, ledgers, and operations with production-ready infrastructure.',
  keywords: ['Stellar Horizon API', 'Stellar API', 'Horizon API', 'Stellar blockchain API', 'Stellar account query', 'Stellar transaction API', 'Stellar ledger API', 'Stellar payment API'],
  alternates: { canonical: 'https://lumenquery.io/stellar-horizon-api' },
  openGraph: {
    title: 'Stellar Horizon API for Developers',
    description: 'Use LumenQuery\'s Stellar Horizon API to query accounts, transactions, payments, assets, ledgers, and operations with production-ready infrastructure.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-horizon-api',
  },
  robots: { index: true, follow: true },
};

export default function StellarHorizonApiPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar Horizon API for Developers',
    description: 'Use LumenQuery\'s Stellar Horizon API to query accounts, transactions, payments, assets, ledgers, and operations with production-ready infrastructure.',
    url: 'https://lumenquery.io/stellar-horizon-api',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Stellar Horizon API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Stellar Horizon API is a RESTful interface that allows developers to query the Stellar blockchain. It provides endpoints for accounts, transactions, payments, assets, ledgers, operations, effects, and more. Horizon translates raw blockchain data into developer-friendly JSON responses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the LumenQuery Horizon API free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery offers a free tier with 10,000 requests per month. Paid plans start at $25/month for higher rate limits, dedicated support, and additional features like analytics and smart contract exploration.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does LumenQuery differ from the public Horizon API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LumenQuery provides managed infrastructure with higher rate limits, monitoring, uptime SLAs, and additional tooling like analytics dashboards, smart contract exploration, and portfolio tracking that the public Horizon endpoint does not offer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What endpoints does the Stellar Horizon API provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Key endpoints include /accounts for balance queries, /transactions for transaction history, /payments for payment tracking, /assets for asset discovery, /ledgers for block data, /operations for operation details, and /offers for DEX order book data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the Horizon API for real-time streaming?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Stellar Horizon API supports Server-Sent Events (SSE) streaming on most endpoints. You can stream new transactions, payments, operations, and ledger closures in real time by adding ?cursor=now to any supported endpoint.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to run my own Horizon node?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. LumenQuery provides fully managed Horizon API access so you can skip the complexity of running your own infrastructure. Self-hosting requires a PostgreSQL database, Stellar Core, and ongoing maintenance. LumenQuery handles all of this for you.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Stellar Horizon API', item: 'https://lumenquery.io/stellar-horizon-api' },
    ],
  };

  return (
    <>
      <div className="text-white">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-12">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
              <Link href="/" className="hover:text-[#7366FF]">Home</Link>
              <span>/</span>
              <span className="text-white">Stellar Horizon API</span>
            </div>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-semibold">API Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            Stellar Horizon API for Developers
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mb-8">
            Query accounts, transactions, payments, assets, ledgers, and operations on the Stellar network with production-ready Horizon API infrastructure from LumenQuery.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
              Start Building Free
            </Link>
            <Link href="/docs" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              Read the Docs
            </Link>
          </div>
        </section>

        {/* What is Horizon API */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">What is the Stellar Horizon API?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#A8A9AD] leading-relaxed mb-4">
                The <strong className="text-white">Stellar Horizon API</strong> is the primary RESTful interface for interacting with the Stellar blockchain. It translates raw ledger data into JSON responses that developers can use to build wallets, exchanges, payment platforms, and analytics tools.
              </p>
              <p className="text-[#A8A9AD] leading-relaxed mb-4">
                Horizon sits between your application and Stellar Core, handling the complexity of reading blockchain state, indexing historical data, and providing real-time event streaming via Server-Sent Events (SSE).
              </p>
              <p className="text-[#A8A9AD] leading-relaxed">
                With LumenQuery, you get managed Horizon access without the operational burden of running your own node, database, and ingestion pipeline.
              </p>
            </div>
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5">
              <h3 className="font-semibold mb-4">Key Horizon Endpoints</h3>
              <div className="space-y-3">
                {[
                  { method: 'GET', path: '/accounts/{id}', desc: 'Account balances and metadata' },
                  { method: 'GET', path: '/transactions', desc: 'Transaction history and details' },
                  { method: 'GET', path: '/payments', desc: 'Payment operations stream' },
                  { method: 'GET', path: '/assets', desc: 'Issued asset discovery' },
                  { method: 'GET', path: '/ledgers', desc: 'Ledger (block) data' },
                  { method: 'GET', path: '/operations', desc: 'All operation types' },
                  { method: 'GET', path: '/offers', desc: 'DEX order book' },
                  { method: 'POST', path: '/transactions', desc: 'Submit signed transactions' },
                ].map((ep) => (
                  <div key={ep.path} className="flex items-start gap-3">
                    <span className="px-2 py-0.5 rounded bg-green-900/30 text-green-400 text-[10px] font-bold mt-0.5 flex-shrink-0">{ep.method}</span>
                    <div>
                      <code className="text-xs text-[#7366FF]">{ep.path}</code>
                      <p className="text-xs text-[#A8A9AD]">{ep.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Reliable Access Matters */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Reliable Horizon API Access Matters</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            Public Horizon endpoints are rate-limited and offer no guarantees. When your application depends on blockchain data for payments, compliance, or user-facing features, you need infrastructure that does not go down.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'High Availability',
                desc: 'Managed infrastructure with monitoring, failover, and uptime SLAs so your application never loses access to Stellar data.',
                icon: (
                  <svg className="w-6 h-6 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Higher Rate Limits',
                desc: 'Generous request limits that scale with your plan. No more 429 errors during peak traffic or batch operations.',
                icon: (
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                title: 'Low Latency',
                desc: 'Sub-300ms response times for most queries. Data served from optimized PostgreSQL with read replicas and Redis caching.',
                icon: (
                  <svg className="w-6 h-6 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'No Maintenance',
                desc: 'Skip running Stellar Core, managing PostgreSQL, and keeping up with protocol upgrades. We handle it all.',
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Built-in Analytics',
                desc: 'Go beyond raw data. Access network metrics, token velocity, whale tracking, and smart contract analytics out of the box.',
                icon: (
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: 'Developer Tools',
                desc: 'API keys, usage dashboards, natural language querying, portfolio tracking, and Soroban contract exploration included.',
                icon: (
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5 hover:border-[#7366FF]/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">What You Can Build with the Horizon API</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            The Stellar Horizon API powers a wide range of applications. Here are the most common use cases LumenQuery customers build.
          </p>
          <div className="space-y-6">
            {[
              {
                title: 'Wallet Applications',
                desc: 'Query account balances, trustlines, and transaction history to display user holdings. Stream payments in real time to update balances instantly without polling.',
                endpoints: '/accounts, /payments (SSE), /operations',
              },
              {
                title: 'Exchange Integrations',
                desc: 'Monitor deposit addresses for incoming payments, track transaction confirmations, and submit withdrawal transactions. Use the DEX endpoints to display order books and trade history.',
                endpoints: '/transactions, /payments, /offers, /trade_aggregations',
              },
              {
                title: 'Payment Tracking',
                desc: 'Build payment dashboards that show all inbound and outbound transfers for a set of accounts. Filter by asset, amount, or time range. Generate reports and export to CSV.',
                endpoints: '/payments, /operations, /effects',
              },
              {
                title: 'Account Monitoring',
                desc: 'Watch specific accounts for activity changes, trustline modifications, signer updates, and balance thresholds. Set up alerting based on streaming events.',
                endpoints: '/accounts/{id}, /effects (SSE), /operations',
              },
              {
                title: 'Asset Issuance Platforms',
                desc: 'Track assets you have issued, monitor holder counts, enforce authorization flags, and manage clawback operations. Query asset statistics across the entire network.',
                endpoints: '/assets, /accounts, /operations',
              },
            ].map((uc, i) => (
              <div key={uc.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#7366FF]/10 flex items-center justify-center text-[#7366FF] text-sm font-bold">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold mb-2">{uc.title}</h3>
                    <p className="text-sm text-[#A8A9AD] leading-relaxed mb-3">{uc.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#A8A9AD] uppercase tracking-wider">Endpoints:</span>
                      <code className="text-xs text-[#7366FF]">{uc.endpoints}</code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Example: Query an Account via Horizon API</h2>
          <p className="text-[#A8A9AD] mb-6">
            Fetch account balances, sequence number, and signers with a single API call. Replace the account ID with any valid Stellar public key.
          </p>
          <div className="bg-[#1D1E26] rounded-2xl p-4 sm:p-6 overflow-x-auto border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded bg-green-900/30 text-green-400 text-[10px] font-bold">GET</span>
              <span className="text-xs text-[#A8A9AD]">Horizon REST API</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// Fetch account details via LumenQuery Horizon API
const ACCOUNT_ID = 'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN7';

const response = await fetch(
  \`https://api.lumenquery.io/accounts/\${ACCOUNT_ID}\`,
  {
    headers: {
      'X-API-Key': 'YOUR_API_KEY',
      'Accept': 'application/json'
    }
  }
);

const account = await response.json();

// Account balances
account.balances.forEach(balance => {
  const asset = balance.asset_type === 'native'
    ? 'XLM'
    : \`\${balance.asset_code}:\${balance.asset_issuer.slice(0, 8)}...\`;
  console.log(\`\${asset}: \${balance.balance}\`);
});

// Output:
// XLM: 1,234.5678900
// USDC:GBBD47IF...: 500.0000000
// yXLM:GARDNV3Q...: 250.0000000`}</code></pre>
          </div>
          <p className="text-sm text-[#A8A9AD] mt-4">
            See the full <Link href="/docs" className="text-[#7366FF] hover:underline">API documentation</Link> for all available endpoints, query parameters, and response schemas.
          </p>
        </section>

        {/* Comparison Table */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Self-Hosted Horizon vs. LumenQuery</h2>
          <p className="text-[#A8A9AD] mb-8">
            Running your own Horizon instance requires significant infrastructure investment. Here is how it compares to using LumenQuery.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[#A8A9AD] font-medium">Factor</th>
                  <th className="text-left py-3 px-4 text-[#A8A9AD] font-medium">Self-Hosted Horizon</th>
                  <th className="text-left py-3 px-4 text-[#7366FF] font-medium">LumenQuery</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Setup Time', '2-5 days', '5 minutes'],
                  ['Monthly Cost', '$200-800+ (server + DB)', 'Free tier / from $25/mo'],
                  ['Maintenance', 'Manual upgrades, DB tuning', 'Fully managed'],
                  ['Uptime Guarantee', 'Self-managed', 'SLA-backed'],
                  ['Rate Limits', 'Uncapped (but resource-bound)', 'Plan-based, generous'],
                  ['Monitoring', 'DIY Prometheus/Grafana', 'Built-in dashboards'],
                  ['Analytics', 'None', 'Network, token, contract analytics'],
                  ['Support', 'Community forums', 'Dedicated support on paid plans'],
                  ['Soroban RPC', 'Separate setup required', 'Included'],
                  ['Protocol Upgrades', 'Manual intervention', 'Automatic, zero-downtime'],
                ].map(([factor, self, lq]) => (
                  <tr key={factor} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-medium">{factor}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{self}</td>
                    <td className="py-3 px-4 text-green-400">{lq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the Stellar Horizon API?',
                a: 'The Stellar Horizon API is a RESTful interface that allows developers to query the Stellar blockchain. It provides endpoints for accounts, transactions, payments, assets, ledgers, operations, effects, and more. Horizon translates raw blockchain data into developer-friendly JSON responses.',
              },
              {
                q: 'Is the LumenQuery Horizon API free to use?',
                a: 'Yes. LumenQuery offers a free tier with 10,000 requests per month. Paid plans start at $25/month for higher rate limits, dedicated support, and additional features like analytics, smart contract exploration, and portfolio tracking.',
              },
              {
                q: 'How does LumenQuery differ from the public Horizon API?',
                a: 'LumenQuery provides managed infrastructure with higher rate limits, monitoring, uptime SLAs, and additional tooling like analytics dashboards, natural language querying, smart contract exploration, and portfolio tracking that the public Horizon endpoint does not offer.',
              },
              {
                q: 'What endpoints does the Stellar Horizon API provide?',
                a: 'Key endpoints include /accounts for balance queries, /transactions for transaction history, /payments for payment tracking, /assets for asset discovery, /ledgers for block data, /operations for operation details, /offers for DEX order book data, and /trade_aggregations for OHLCV candles.',
              },
              {
                q: 'Can I use the Horizon API for real-time streaming?',
                a: 'Yes. The Stellar Horizon API supports Server-Sent Events (SSE) streaming on most endpoints. You can stream new transactions, payments, operations, and ledger closures in real time by adding ?cursor=now to any supported endpoint.',
              },
              {
                q: 'Do I need to run my own Horizon node?',
                a: 'No. LumenQuery provides fully managed Horizon API access so you can skip the complexity of running your own infrastructure. Self-hosting requires a PostgreSQL database, Stellar Core, and ongoing maintenance for protocol upgrades.',
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Explore More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/docs', label: 'API Documentation', desc: 'Full endpoint reference and guides' },
              { href: '/pricing', label: 'Pricing Plans', desc: 'Free tier and paid plan details' },
              { href: '/stellar-rpc-provider', label: 'Stellar RPC Provider', desc: 'Managed RPC infrastructure' },
              { href: '/soroban-rpc-api', label: 'Soroban RPC API', desc: 'Smart contract RPC access' },
              { href: '/stellar-blockchain-analytics-api', label: 'Analytics API', desc: 'Network and token analytics' },
              { href: '/blog/build-stellar-blockchain-explorer-horizon-api', label: 'Build a Blockchain Explorer', desc: 'Tutorial: Horizon API walkthrough' },
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Building with the Stellar Horizon API</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Get your API key in seconds. 10,000 free requests per month. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="px-8 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
                Create Free Account
              </Link>
              <Link href="/pricing" className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
