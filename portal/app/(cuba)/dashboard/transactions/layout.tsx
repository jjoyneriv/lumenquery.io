import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Stellar Transaction Monitoring',
  description: 'Monitor Stellar payments, operations, accounts, assets, and high-value transactions in real time with LumenQuery.',
  keywords: ['Stellar transaction monitoring', 'XLM payments', 'Stellar dashboard', 'transaction stream', 'whale alerts', 'Stellar operations', 'Horizon API', 'live transactions', 'XLM tracker', 'Stellar explorer'],
  alternates: {
    canonical: 'https://lumenquery.io/dashboard/transactions',
  },
  openGraph: {
    title: 'Live Stellar Transaction Monitoring',
    description: 'Monitor Stellar payments, operations, accounts, assets, and high-value transactions in real time with LumenQuery.',
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
      a: 'Stellar transaction monitoring is the practice of tracking payments, operations, and account activity on the Stellar blockchain in real time. LumenQuery provides a live transaction dashboard that decodes XDR operation data into plain English descriptions, so you can see exactly what is happening on the network as each ledger closes.',
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
      q: 'Can I detect large XLM transactions?',
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
    name: 'Live Stellar Transaction Monitoring',
    description: 'Monitor Stellar payments, operations, accounts, assets, and high-value transactions in real time with LumenQuery.',
    url: 'https://lumenquery.io/dashboard/transactions',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
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

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Live Stellar Transaction Monitoring
          </h1>
          <p className="text-lg text-[#A8A9AD] max-w-3xl mb-8">
            Monitor Stellar payments, operations, accounts, assets, and high-value transactions in real
            time with LumenQuery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#7366FF] font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-colors"
            >
              Read Transaction API Docs
            </Link>
          </div>
        </div>

        {/* Interactive App Content */}
        {children}

        {/* Monitor in Real Time */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Monitor Stellar Transactions in Real Time</h2>
          <p className="text-[#A8A9AD] max-w-3xl leading-relaxed">
            The LumenQuery transaction monitoring dashboard streams live transactions from the Stellar
            network as each ledger closes. Every transaction is decoded from raw XDR into structured,
            human-readable data showing operation types, payment amounts, source and destination accounts,
            asset details, and memo fields. You can pause and resume the stream, expand individual
            transactions to inspect the full JSON payload, and use the dashboard to track deposits,
            monitor withdrawals, detect large movements, and debug failed operations in real time.
          </p>
        </section>

        {/* Transaction Feed Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Transaction Feed Preview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-sm font-semibold text-white">Time</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Type</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Asset</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Amount</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Source</th>
                  <th className="py-3 px-4 text-sm font-semibold text-white">Destination</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '12:04:21 UTC', type: 'Payment', asset: 'XLM', amount: '2,450', source: 'GABC...92F', dest: 'GDEF...18A' },
                  { time: '12:04:18 UTC', type: 'Path Payment', asset: 'USDC', amount: '1,200', source: 'GHTR...A22', dest: 'GQWE...981' },
                  { time: '12:04:12 UTC', type: 'Create Account', asset: 'XLM', amount: '10', source: 'GAAA...771', dest: 'GBBB...492' },
                  { time: '12:04:08 UTC', type: 'Manage Offer', asset: 'USDC/XLM', amount: '\u2014', source: 'GCDE...F33', dest: '\u2014' },
                  { time: '12:04:05 UTC', type: 'Change Trust', asset: 'yXLM', amount: '\u2014', source: 'GFGH...H44', dest: '\u2014' },
                ].map((row) => (
                  <tr key={row.time} className="border-b border-white/5">
                    <td className="py-3 px-4 text-sm text-[#A8A9AD] font-mono">{row.time}</td>
                    <td className="py-3 px-4 text-sm text-[#7366FF] font-medium">{row.type}</td>
                    <td className="py-3 px-4 text-sm text-white">{row.asset}</td>
                    <td className="py-3 px-4 text-sm text-white">{row.amount}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD] font-mono">{row.source}</td>
                    <td className="py-3 px-4 text-sm text-[#A8A9AD] font-mono">{row.dest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#A8A9AD] text-xs mt-4 italic">Sample preview data. Live transactions stream above when signed in.</p>
        </section>

        {/* Use Cases */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Use Cases for Transaction Monitoring</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Monitor Deposits', desc: 'Track incoming payments to your exchange, application, or treasury accounts. See deposit amounts, asset types, and sender addresses in real time.' },
              { title: 'Track Withdrawals', desc: 'Watch outgoing transfers from custodial wallets. Verify withdrawal amounts and destinations match expected values.' },
              { title: 'Watch Settlement', desc: 'Monitor cross-border payment settlement on Stellar. Track payment paths, intermediate assets, and final delivery confirmations.' },
              { title: 'Detect Large Payments', desc: 'Surface whale transactions and high-value XLM movements above configurable thresholds. Identify market-moving transfers.' },
              { title: 'Build Compliance Workflows', desc: 'Feed transaction data into compliance pipelines. Monitor counterparty activity, flag suspicious patterns, and generate audit trails.' },
              { title: 'Create Account Alerts', desc: 'Set up alerts for specific Stellar accounts. Get notified when a watched address sends or receives payments.' },
              { title: 'Power Explorer Feeds', desc: 'Use the SSE streaming API to build custom blockchain explorer interfaces, analytics dashboards, or notification services.' },
            ].map((item) => (
              <div key={item.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction Search and Filtering */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Transaction Search and Filtering</h2>
          <p className="text-[#A8A9AD] mb-8 max-w-3xl leading-relaxed">
            Filter the transaction stream to find exactly what you are looking for. LumenQuery supports
            multiple filter dimensions that can be combined to narrow results to specific accounts,
            assets, operation types, or time windows.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Account', desc: 'Filter by source or destination Stellar address' },
              { label: 'Asset', desc: 'Filter by asset code (XLM, USDC, yXLM, etc.)' },
              { label: 'Operation Type', desc: 'Payment, create account, manage offer, change trust, etc.' },
              { label: 'Amount', desc: 'Set minimum or maximum thresholds for payment amounts' },
              { label: 'Memo', desc: 'Search by transaction memo text or memo hash' },
              { label: 'Ledger', desc: 'Filter by specific ledger number or range' },
              { label: 'Time Window', desc: 'Restrict results to a specific date or time range' },
              { label: 'Status', desc: 'Show only successful or failed transactions' },
            ].map((filter) => (
              <div key={filter.label} className="bg-[#262932] rounded-2xl p-5 border border-white/5">
                <h3 className="text-base font-semibold text-white mb-1">{filter.label}</h3>
                <p className="text-[#A8A9AD] text-sm leading-relaxed">{filter.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample API Response */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Sample API Response</h2>
          <p className="text-[#A8A9AD] mb-6 max-w-3xl">
            The transaction stream API delivers decoded transactions as Server-Sent Events. Each event
            contains the transaction hash, ledger, timestamp, decoded operations, and fee details.
          </p>
          <div className="bg-[#262932] rounded-2xl p-6 border border-white/5 overflow-x-auto max-w-3xl">
            <pre className="text-sm text-[#A8A9AD] font-mono leading-relaxed whitespace-pre">{`{
  "hash": "a1b2c3...f4e5d6",
  "ledger": 63312024,
  "created_at": "2026-07-03T12:04:21Z",
  "fee_charged": "100",
  "operation_count": 1,
  "successful": true,
  "operations": [
    {
      "type": "payment",
      "description": "Payment of 2,450 XLM to GDEF...18A",
      "asset": "native",
      "amount": "2450.0000000",
      "from": "GABC...92F",
      "to": "GDEF...18A"
    }
  ]
}`}</pre>
          </div>
        </section>

        {/* Built on Stellar Horizon and LumenQuery APIs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Built on Stellar Horizon and LumenQuery APIs</h2>
          <p className="text-[#A8A9AD] mb-8 max-w-3xl">
            The transaction monitoring dashboard is powered by the Stellar Horizon API and LumenQuery
            infrastructure. Explore our other tools and resources for building on Stellar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/docs', label: 'Documentation', desc: 'Guides and API reference for LumenQuery' },
              { href: '/analytics', label: 'Network Analytics', desc: 'Stellar network metrics and historical charts' },
              { href: '/query', label: 'Query Explorer', desc: 'Query the Stellar network with natural language' },
              { href: '/pricing', label: 'Pricing', desc: 'Plans for developers, teams, and enterprises' },
              { href: '/stellar-transaction-monitoring', label: 'Transaction Monitoring API', desc: 'API reference for monitoring Stellar transactions' },
              { href: '/xlm-whale-alerts', label: 'XLM Whale Alerts', desc: 'Large transaction detection and alerting' },
              { href: '/stellar-horizon-api', label: 'Stellar Horizon API', desc: 'REST API for Stellar blockchain data' },
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
                Create Free Account
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:border-white/60 transition-colors"
              >
                View API Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
