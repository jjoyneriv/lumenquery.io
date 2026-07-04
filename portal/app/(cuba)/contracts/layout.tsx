import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soroban Smart Contract Monitoring',
  description: 'Explore Soroban smart contract activity, contract events, transaction patterns, and Stellar smart contract monitoring workflows with LumenQuery.',
  keywords: ['Soroban smart contract monitoring', 'Soroban contract events', 'Stellar smart contracts', 'Soroban explorer', 'contract invocations', 'Soroban RPC', 'contract analytics'],
  alternates: {
    canonical: 'https://lumenquery.io/contracts',
  },
  openGraph: {
    title: 'Soroban Smart Contract Monitoring',
    description: 'Explore Soroban smart contract activity, contract events, transaction patterns, and Stellar smart contract monitoring workflows with LumenQuery.',
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
      q: 'What is Soroban smart contract monitoring?',
      a: 'Soroban smart contract monitoring is the practice of tracking contract events, invocations, storage changes, and error patterns on the Stellar network. LumenQuery provides a contract explorer that decodes XDR data into human-readable formats, letting you see exactly what your contracts are doing in production.',
    },
    {
      q: 'Can I track contract events?',
      a: 'Yes. LumenQuery indexes Soroban contract events and lets you filter by contract ID, event type (contract, system, diagnostic), topic, and ledger range. You can view events in the explorer UI or subscribe to real-time event streams via SSE for live monitoring.',
    },
    {
      q: 'Can I debug failed contract transactions?',
      a: 'Yes. The contract explorer shows transaction results including error codes, gas consumption, and decoded return values. You can inspect failed invocations to see exactly which operation failed, what error was returned, and how much gas was consumed before the failure.',
    },
    {
      q: 'Do I need to run a Soroban RPC node?',
      a: 'No. LumenQuery provides managed Soroban RPC access and a contract explorer so you can monitor contracts without running your own infrastructure. Self-hosting requires an embedded Captive Core instance, significant disk space, and ongoing protocol upgrade maintenance.',
    },
    {
      q: 'Can I use LumenQuery with a dashboard or API?',
      a: 'Yes. LumenQuery provides both a web-based contract explorer dashboard and REST API endpoints for programmatic access. You can search contracts, query call history, read storage state, stream events, and export data in CSV or JSON format.',
    },
    {
      q: 'Is AI explanation available for contracts?',
      a: 'AI-powered contract call explanations are coming soon. When available, you will be able to get plain-English summaries of contract invocations, parameter breakdowns, gas analysis, and security reviews powered by large language models.',
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
            Soroban Smart Contract Monitoring
          </h1>
          <p className="text-lg text-[#A8A9AD] max-w-3xl">
            Explore Soroban smart contract activity on the Stellar network. LumenQuery decodes XDR data into
            human-readable formats so you can monitor contract events, track invocations, inspect storage state,
            and debug failed transactions without running your own Soroban RPC node.
          </p>
        </div>

        {/* Interactive App Content */}
        {children}

        {/* What You Can Monitor */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">What You Can Monitor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Contract Events', desc: 'Track contract, system, and diagnostic events emitted by Soroban smart contracts. Filter by contract ID, topic, and ledger range.' },
              { title: 'Contract Invocations', desc: 'View decoded function calls with human-readable parameter names, values, and return data from contract transactions.' },
              { title: 'Transaction Results', desc: 'Inspect transaction outcomes including success status, error codes, gas consumption, and fee details for every invocation.' },
              { title: 'Contract Accounts', desc: 'Look up contract metadata, deployment details, creator accounts, and associated Stellar addresses for any Soroban contract.' },
              { title: 'Asset Interactions', desc: 'Monitor how contracts interact with Stellar assets including token transfers, trustline operations, and balance changes.' },
              { title: 'Error Patterns', desc: 'Identify recurring failure modes, gas limit issues, and error trends across contract invocations to improve reliability.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Use Cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Developer Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Monitor After Deployment', desc: 'Verify your contract is being called correctly after deploying to mainnet. Watch for unexpected errors or parameter misuse in real time.' },
              { title: 'Track Interactions', desc: 'See who is calling your contract, how often, and with what parameters. Understand adoption patterns and usage trends.' },
              { title: 'Debug Failures', desc: 'When transactions fail, inspect the decoded error codes and gas consumption to identify the root cause without replaying locally.' },
              { title: 'Analyze Protocol Usage', desc: 'Track how DeFi protocols, token contracts, and governance systems behave on-chain across thousands of invocations.' },
              { title: 'Build Dashboards', desc: 'Use the API endpoints to feed contract data into custom dashboards, alerting systems, or analytics pipelines.' },
              { title: 'Watch Event Streams', desc: 'Subscribe to real-time SSE streams for contract events. React to on-chain activity as it happens without polling.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Supported Operation Types */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Supported Soroban Operations</h2>
          <p className="text-[#A8A9AD] mb-6 max-w-3xl">
            LumenQuery decodes and monitors all Soroban-related operation types on the Stellar network.
            Each operation is translated from raw XDR into structured, human-readable data.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-sm font-semibold text-white">Operation</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Description</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Data Decoded</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { op: 'invoke_host_function', desc: 'Call a Soroban smart contract function', data: 'Function name, parameters, return value, gas used' },
                  { op: 'extend_footprint_ttl', desc: 'Extend the TTL of contract storage entries', data: 'Storage keys, new TTL, rent cost' },
                  { op: 'restore_footprint', desc: 'Restore archived contract storage entries', data: 'Restored keys, restoration cost' },
                  { op: 'upload_wasm', desc: 'Upload contract WASM bytecode', data: 'WASM hash, bytecode size' },
                  { op: 'create_contract', desc: 'Deploy a new contract instance', data: 'Contract ID, deployer, WASM reference' },
                ].map((row) => (
                  <tr key={row.op} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-[#7366FF] font-mono">{row.op}</td>
                    <td className="py-3 px-4 text-sm text-white">{row.desc}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD]">{row.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Soroban Workflow */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Soroban Monitoring Workflow</h2>
          <div className="space-y-6 max-w-3xl">
            {[
              { step: 1, title: 'Deploy or Identify a Contract', desc: 'Deploy your Soroban contract to the Stellar network or enter an existing contract ID into the LumenQuery explorer.' },
              { step: 2, title: 'Query Events and Calls', desc: 'Use the contract explorer to browse decoded invocations, storage entries, and emitted events. Filter by date, function, or status.' },
              { step: 3, title: 'Monitor Activity', desc: 'Track ongoing contract usage with real-time event streams. Watch for error spikes, gas anomalies, or unexpected call patterns.' },
              { step: 4, title: 'Export or Alert', desc: 'Export contract data in CSV or JSON format for further analysis. Build custom alerts using the API to notify your team of issues.' },
              { step: 5, title: 'Investigate and Optimize', desc: 'Drill into specific transactions to understand gas usage, identify optimization opportunities, and verify contract behavior.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#7366FF] flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
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

        {/* Data Export Formats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Data Export and API Access</h2>
          <p className="text-[#A8A9AD] mb-6 max-w-3xl">
            Export contract monitoring data for further analysis, reporting, or integration with your existing tools.
            All data is available through both the web dashboard and REST API endpoints.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-2">CSV Export</h3>
              <p className="text-[#A8A9AD] text-sm leading-relaxed">
                Export call history, events, and storage snapshots as CSV files. Import directly into
                spreadsheets, data warehouses, or BI tools for custom analysis.
              </p>
            </div>
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-2">JSON API</h3>
              <p className="text-[#A8A9AD] text-sm leading-relaxed">
                Access all contract data programmatically via REST endpoints. Build custom dashboards,
                alerting pipelines, or automated monitoring workflows with structured JSON responses.
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/soroban-rpc-api', label: 'Soroban RPC API', desc: 'JSON-RPC methods for smart contract interaction' },
              { href: '/stellar-rpc-provider', label: 'Stellar RPC Provider', desc: 'Managed RPC infrastructure for production apps' },
              { href: '/analytics', label: 'Network Analytics', desc: 'Stellar network metrics and historical data' },
              { href: '/query', label: 'Query Explorer', desc: 'Query the Stellar network with natural language' },
              { href: '/docs', label: 'Documentation', desc: 'Guides and API reference for LumenQuery' },
              { href: '/pricing', label: 'Pricing', desc: 'Plans for developers, teams, and enterprises' },
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

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <div className="bg-[#262932] rounded-2xl p-8 sm:p-12 border border-white/5 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Monitoring Soroban Contracts
            </h2>
            <p className="text-[#A8A9AD] mb-8 max-w-2xl mx-auto">
              Explore contract events, decoded invocations, and storage state on the Stellar network.
              No credit card required to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#7366FF] font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Free
              </Link>
              <Link
                href="/docs/contracts"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-colors"
              >
                View Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
