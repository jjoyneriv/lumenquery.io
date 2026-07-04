import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar Transaction Monitoring Dashboard',
  description: 'Monitor Stellar transactions, payments, accounts, assets, and large XLM movements with LumenQuery transaction monitoring dashboard and API workflows.',
  keywords: ['Stellar transaction monitoring', 'XLM payments', 'Stellar dashboard', 'transaction stream', 'whale alerts', 'Stellar operations', 'Horizon API'],
  alternates: {
    canonical: 'https://lumenquery.io/dashboard/transactions',
  },
  openGraph: {
    title: 'Stellar Transaction Monitoring Dashboard',
    description: 'Monitor Stellar transactions, payments, accounts, assets, and large XLM movements with LumenQuery transaction monitoring dashboard and API workflows.',
    type: 'website',
    url: 'https://lumenquery.io/dashboard/transactions',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqItems = [
    {
      q: 'What is Stellar transaction monitoring?',
      a: 'Stellar transaction monitoring is the practice of tracking payments, operations, and account activity on the Stellar blockchain in real time. LumenQuery provides a live transaction dashboard that decodes XDR operation data into plain English descriptions, so you can see exactly what is happening on the network.',
    },
    {
      q: 'Can I track XLM payments in real time?',
      a: 'Yes. The transaction monitoring dashboard streams live transactions from the Stellar network via Server-Sent Events (SSE). Each transaction is decoded to show payment amounts, source and destination accounts, asset types, and operation details as they are confirmed on-chain.',
    },
    {
      q: 'Can I monitor a specific Stellar account?',
      a: 'Yes. You can filter the transaction stream by account address to watch all operations involving a specific Stellar account. This is useful for tracking treasury wallets, exchange hot wallets, or your own application accounts.',
    },
    {
      q: 'Can I detect large transactions?',
      a: 'Yes. LumenQuery can identify large XLM movements and asset transfers. You can set threshold-based filters to surface whale transactions, unusual payment volumes, and large account balance changes in real time.',
    },
    {
      q: 'Can I use the API instead of the dashboard?',
      a: 'Yes. LumenQuery provides API endpoints for transaction data, including SSE streaming endpoints and REST queries for historical transaction lookup. You can integrate transaction monitoring directly into your applications, bots, or alerting pipelines.',
    },
    {
      q: 'Do I need to run my own Horizon server?',
      a: 'No. LumenQuery provides managed access to Stellar transaction data so you do not need to run your own Horizon instance. Self-hosting Horizon requires a PostgreSQL database, a Stellar Core node, and significant disk space for ledger history.',
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
        name: 'Dashboard',
        item: 'https://lumenquery.io/dashboard',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Transactions',
        item: 'https://lumenquery.io/dashboard/transactions',
      },
    ],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar Transaction Monitoring Dashboard',
    description: 'Monitor Stellar transactions, payments, accounts, assets, and large XLM movements with LumenQuery transaction monitoring dashboard and API workflows.',
    url: 'https://lumenquery.io/dashboard/transactions',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const alertScenarios = [
    { trigger: 'Large XLM Payment', condition: 'Payment exceeds 100,000 XLM', action: 'Flag and notify team' },
    { trigger: 'Account Balance Changed', condition: 'Watched account balance shifts by more than 10%', action: 'Log and alert via webhook' },
    { trigger: 'Asset Transfer Spike', condition: 'Token transfer volume exceeds daily average by 3x', action: 'Surface in dashboard' },
    { trigger: 'Failed Transaction Pattern', condition: '5+ consecutive failures from same account', action: 'Flag for investigation' },
    { trigger: 'Exchange Inflow/Outflow', condition: 'Known exchange address sends or receives large amount', action: 'Track in whale alerts' },
    { trigger: 'New High-Volume Account', condition: 'Previously inactive account processes 50+ operations', action: 'Add to watchlist' },
  ];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="min-h-screen bg-[#1a1d24]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="flex items-center gap-2 text-sm text-[#A8A9AD]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-white">Transactions</span>
          </nav>
        </div>

        {/* Interactive App Content */}
        {children}

        {/* What the Dashboard Monitors */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">What the Dashboard Monitors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: 'Payments', desc: 'XLM and token payments with decoded amounts, source, and destination accounts.' },
              { title: 'Operations', desc: 'All 25+ Stellar operation types decoded into plain English descriptions.' },
              { title: 'Account Activity', desc: 'Account creation, merges, option changes, and data entry modifications.' },
              { title: 'Asset Transfers', desc: 'Token movements including path payments, claimable balances, and trustline changes.' },
              { title: 'Large Transactions', desc: 'Whale movements and high-value transfers that exceed configurable thresholds.' },
              { title: 'Failed Transactions', desc: 'Transactions that failed with decoded error codes and gas consumption details.' },
              { title: 'Ledger Activity', desc: 'Ledger close times, transaction counts, and protocol version changes.' },
              { title: 'Exchange Wallets', desc: 'Activity from known exchange hot wallets and custodial addresses.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-5 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Monitoring Use Cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Monitoring Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Wallet Tracking', desc: 'Monitor your own wallets or customer wallets for incoming and outgoing payments. See every operation in real time.' },
              { title: 'Exchange Monitoring', desc: 'Track deposits and withdrawals on exchange hot wallets. Identify large inflows and outflows that may affect market dynamics.' },
              { title: 'Treasury Visibility', desc: 'Give finance teams real-time visibility into DAO or corporate treasury accounts. Track spending, funding, and asset allocation.' },
              { title: 'Whale Alerts', desc: 'Detect large XLM movements above configurable thresholds. Surface whale transactions for trading signals or risk management.' },
              { title: 'Compliance Review', desc: 'Monitor transaction patterns for compliance reporting. Track account interactions, payment volumes, and counterparty relationships.' },
              { title: 'Operational Debugging', desc: 'Debug failed transactions in your application by inspecting decoded error codes, gas usage, and operation sequences.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Alert Scenarios */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Example Alert Scenarios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-sm font-semibold text-white">Trigger</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Condition</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {alertScenarios.map((row) => (
                  <tr key={row.trigger} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-white font-medium">{row.trigger}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD]">{row.condition}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD]">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How Transaction Monitoring Works</h2>
          <div className="space-y-6 max-w-3xl">
            {[
              { step: 1, title: 'Connect to the Stream', desc: 'The dashboard opens an SSE (Server-Sent Events) connection to the Stellar network. Transactions are delivered as they are confirmed in each new ledger.' },
              { step: 2, title: 'Decode Operations', desc: 'Each transaction envelope is decoded from XDR format. All 25+ operation types are translated into plain English descriptions with structured parameter data.' },
              { step: 3, title: 'Display in Real Time', desc: 'Decoded transactions appear in the dashboard with expandable details. You can pause the stream, search transactions, or click to see the full JSON payload.' },
              { step: 4, title: 'Filter and Alert', desc: 'Apply filters by operation type, account, asset, or amount. Configure threshold-based alerts for large transactions or specific account activity.' },
              { step: 5, title: 'Export or Integrate', desc: 'Use the API to pipe transaction data into your own applications, alerting systems, or analytics pipelines for downstream processing.' },
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

        {/* Decoded Operation Types */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Decoded Operation Types</h2>
          <p className="text-[#A8A9AD] mb-6 max-w-3xl">
            The dashboard decodes all Stellar operation types from raw XDR into human-readable descriptions.
            Here are the most common operations you will see in the transaction stream.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
            {[
              { op: 'payment', example: 'Payment of 500 XLM to GBCD...XYZ' },
              { op: 'create_account', example: 'Create account GXYZ...123 with 10 XLM' },
              { op: 'path_payment_strict_send', example: 'Path payment: 50 USDC to 100 XLM' },
              { op: 'manage_sell_offer', example: 'Sell 500 XLM for USDC @ 0.12' },
              { op: 'change_trust', example: 'Add trustline for USDC:GBBD...' },
              { op: 'account_merge', example: 'Merge account into GABC...' },
              { op: 'invoke_host_function', example: 'Invoke Soroban contract CDAB...' },
              { op: 'set_options', example: 'Set home domain: example.com' },
            ].map((item) => (
              <div key={item.op} className="bg-[#262932] rounded-2xl p-4 border border-white/5">
                <span className="text-[#7366FF] font-mono text-sm">{item.op}</span>
                <p className="text-[#A8A9AD] text-sm mt-1">{item.example}</p>
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

        {/* Related Resources */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/stellar-transaction-monitoring', label: 'Transaction Monitoring API', desc: 'API reference for Stellar transaction monitoring' },
              { href: '/xlm-whale-alerts', label: 'XLM Whale Alerts', desc: 'Large transaction detection and alerting' },
              { href: '/stellar-horizon-api', label: 'Stellar Horizon API', desc: 'REST API for Stellar blockchain data' },
              { href: '/analytics', label: 'Network Analytics', desc: 'Stellar network metrics and historical charts' },
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
              Start Monitoring Stellar Transactions
            </h2>
            <p className="text-[#A8A9AD] mb-8 max-w-2xl mx-auto">
              Stream live transactions, decode operations, and track account activity on the Stellar network.
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
                href="/docs"
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
