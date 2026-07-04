import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soroban Smart Contract Explorer',
  description: 'Search, inspect, monitor, and understand Soroban smart contracts on Stellar with developer-friendly contract intelligence tools.',
  keywords: ['Soroban smart contract explorer', 'Soroban contract monitoring', 'Stellar smart contracts', 'Soroban explorer', 'contract invocations', 'Soroban RPC', 'contract analytics', 'Soroban events', 'smart contract search', 'XDR decoder'],
  alternates: {
    canonical: 'https://lumenquery.io/contracts',
  },
  openGraph: {
    title: 'Soroban Smart Contract Explorer',
    description: 'Search, inspect, monitor, and understand Soroban smart contracts on Stellar with developer-friendly contract intelligence tools.',
    type: 'website',
    url: 'https://lumenquery.io/contracts',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqItems = [
    {
      q: 'What is a Soroban smart contract explorer?',
      a: 'A Soroban smart contract explorer is a tool that lets you search for, inspect, and monitor smart contracts deployed on the Stellar network. LumenQuery decodes raw XDR data into human-readable formats, showing you function calls, parameters, return values, storage state, and emitted events for any contract ID on the public Stellar network.',
    },
    {
      q: 'Can I monitor contract activity in real time?',
      a: 'Yes. LumenQuery provides real-time event streaming via Server-Sent Events (SSE) for any Soroban contract. You can subscribe to a contract ID and receive decoded events as they are confirmed on-chain, without polling. This is available on Team tier and above.',
    },
    {
      q: 'Does LumenQuery support Soroban RPC methods?',
      a: 'Yes. LumenQuery provides managed Soroban RPC access at rpc.lumenquery.io. You can call standard Soroban RPC methods like simulateTransaction, getTransaction, getEvents, and getLedgerEntries without running your own node. The contract explorer uses these methods under the hood to fetch and decode contract data.',
    },
    {
      q: 'Can I search for a contract by its ID?',
      a: 'Yes. Enter any Soroban contract ID (starting with C) into the search bar on the contracts page. LumenQuery will fetch the contract metadata, recent invocations, storage entries, and event history. You can also search by deployer account or contract name if indexed.',
    },
    {
      q: 'Are AI explanations available for contract calls?',
      a: 'AI-powered contract call explanations are coming soon. When available, you will be able to get plain-English summaries of what a contract invocation did, including parameter breakdowns, gas analysis, security observations, and comparisons across multiple calls. Explanations will be cached for 7 days.',
    },
    {
      q: 'Can I export contract data as CSV or JSON?',
      a: 'Yes. LumenQuery supports exporting call history, event logs, and storage snapshots in both CSV and JSON formats. Export is available on Developer tier and above. You can also access all contract data programmatically via the REST API for integration with your own tools and pipelines.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://lumenquery.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contracts',
        item: 'https://lumenquery.io/contracts',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#1a1d24]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center gap-2 text-sm text-[#A8A9AD]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contracts</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Soroban Smart Contract Explorer
          </h1>
          <p className="text-lg text-[#A8A9AD] max-w-3xl mb-8">
            Search, inspect, monitor, and understand Soroban smart contracts on Stellar with developer-friendly
            contract intelligence tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#search"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#7366FF] font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Explore Contracts
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-colors"
            >
              View Soroban RPC Docs
            </Link>
          </div>
        </div>

        {/* Interactive App Content */}
        <div id="search">
          {children}
        </div>

        {/* Discover and Inspect */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Discover and Inspect Soroban Smart Contracts</h2>
          <p className="text-[#A8A9AD] max-w-3xl leading-relaxed">
            LumenQuery indexes Soroban smart contracts on the Stellar public network and decodes their on-chain
            activity into structured, human-readable data. You can look up any contract by its ID to review
            invocation history, inspect function parameters and return values, browse persistent and temporary
            storage entries, and monitor emitted events. Every contract call is decoded from raw XDR, so you
            see function names, typed arguments, gas consumption, and transaction results without needing to
            parse binary data yourself. Use the explorer to audit contract behavior, track DeFi protocol
            activity, debug failed transactions, or build monitoring workflows around production contracts.
          </p>
        </section>

        {/* Contract Activity Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Contract Activity Preview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-sm font-semibold text-white">Contract</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Network</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Invocations (24h)</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Last Active</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Category</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'CCQ2...9AF', network: 'Public', invocations: '18,402', lastActive: '2 min ago', category: 'DeFi' },
                  { id: 'CBZ8...7KD', network: 'Public', invocations: '4,918', lastActive: '8 min ago', category: 'Token' },
                  { id: 'CDK1...2LM', network: 'Public', invocations: '1,203', lastActive: '15 min ago', category: 'Payments' },
                  { id: 'CAB3...5NQ', network: 'Public', invocations: '892', lastActive: '22 min ago', category: 'Bridge' },
                  { id: 'CDF7...8RP', network: 'Public', invocations: '341', lastActive: '45 min ago', category: 'NFT' },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-[#7366FF] font-mono">{row.id}</td>
                    <td className="py-3 px-4 text-sm text-white">{row.network}</td>
                    <td className="py-3 px-4 text-sm text-white">{row.invocations}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD]">{row.lastActive}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD]">{row.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#A8A9AD] text-xs mt-4 italic">Sample preview data. Live contract activity is available above when using the explorer.</p>
        </section>

        {/* Soroban Contract Use Cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Soroban Contract Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Track Invocations', desc: 'Monitor how often a contract is called, by whom, and with what parameters. Understand adoption trends and usage patterns across your deployed contracts.' },
              { title: 'Monitor Events', desc: 'Subscribe to real-time contract event streams via SSE. Receive decoded events as they are confirmed on-chain without polling the network.' },
              { title: 'Audit Activity', desc: 'Review the complete invocation history for any contract. Inspect decoded function calls, gas consumption, error codes, and transaction results.' },
              { title: 'Build Dashboards', desc: 'Use the REST API to feed contract data into custom dashboards, monitoring tools, or alerting pipelines. Export data as CSV or JSON.' },
              { title: 'Analyze DeFi and Token Usage', desc: 'Track how DeFi protocols, token contracts, and AMMs behave on-chain. Monitor liquidity pool interactions, swap volumes, and fee patterns.' },
              { title: 'Debug Interactions', desc: 'When transactions fail, inspect decoded error codes, gas limits, and operation sequences to identify the root cause without replaying locally.' },
              { title: 'Watch Production Health', desc: 'Monitor your deployed contracts for error spikes, gas anomalies, or unexpected call patterns. Detect issues before they affect your users.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Contract Explanations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">AI Contract Explanations</h2>
          <div className="bg-[#262932] rounded-2xl p-8 border border-white/5 max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#7366FF]/20 text-[#7366FF] text-xs font-semibold rounded-full mb-4">
              Coming Soon
            </div>
            <p className="text-[#A8A9AD] leading-relaxed mb-4">
              We are building AI-powered explanations for Soroban contract calls. When available, you will
              be able to select any contract invocation and receive a plain-English summary of what it did,
              including parameter breakdowns, gas analysis, security observations, and pattern comparisons
              across multiple calls.
            </p>
            <p className="text-[#A8A9AD] leading-relaxed">
              Explanations will be generated on demand and cached for 7 days. Usage limits will vary by
              subscription tier: 50 explanations per month on Developer, 500 on Team, and unlimited on
              Auditor and Enterprise plans. This feature is not yet enabled in the explorer.
            </p>
          </div>
        </section>

        {/* Sample Contract API Response */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Sample Contract API Response</h2>
          <p className="text-[#A8A9AD] mb-6 max-w-3xl">
            The contract API returns structured JSON with decoded contract metadata, activity counts,
            and status information. Here is an example response from the contract detail endpoint.
          </p>
          <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 overflow-x-auto max-w-3xl">
            <pre className="text-sm text-[#A8A9AD] font-mono leading-relaxed whitespace-pre">{`{
  "contract_id": "CCQ2...9AF",
  "network": "public",
  "latest_ledger": 63312018,
  "invocations_24h": 18402,
  "events_24h": 98211,
  "last_active": "2026-07-03T18:04:21Z",
  "status": "active"
}`}</pre>
          </div>
        </section>

        {/* Built for Soroban Developers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Built for Soroban Developers</h2>
          <p className="text-[#A8A9AD] mb-8 max-w-3xl">
            LumenQuery provides the infrastructure and tools Soroban developers need to build, monitor,
            and scale smart contract applications on Stellar. Explore our platform to find the right
            tools for your workflow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/docs', label: 'Documentation', desc: 'Guides, API reference, and integration examples' },
              { href: '/pricing', label: 'Pricing', desc: 'Plans for developers, teams, and enterprises' },
              { href: '/query', label: 'Query Explorer', desc: 'Query the Stellar network with natural language' },
              { href: '/analytics', label: 'Network Analytics', desc: 'Stellar network metrics and historical charts' },
              { href: '/soroban-rpc-api', label: 'Soroban RPC API', desc: 'Managed Soroban RPC for contract interaction' },
              { href: '/stellar-rpc-provider', label: 'Stellar RPC Provider', desc: 'Production-grade RPC infrastructure' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#262932] rounded-2xl p-5 border border-white/5 hover:border-[#7366FF]/40 transition-colors group"
              >
                <span className="text-white font-semibold group-hover:text-[#7366FF] transition-colors">{link.label}</span>
                <p className="text-[#A8A9AD] text-sm mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl">
            {faqItems.map((item) => (
              <div key={item.q} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <div className="bg-[#262932] rounded-2xl p-8 sm:p-12 border border-white/5 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Exploring Soroban Contracts
            </h2>
            <p className="text-[#A8A9AD] mb-8 max-w-2xl mx-auto">
              Search any contract ID, inspect decoded invocations, browse storage state, and monitor
              events on the Stellar network. No credit card required to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#7366FF] font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Create Free Account
              </Link>
              <Link
                href="/docs/contracts"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-colors"
              >
                Read Contract Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
