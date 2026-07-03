import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar Transaction Monitoring API',
  description: 'Monitor Stellar transactions, payments, accounts, ledgers, and asset movements with developer-friendly APIs and analytics workflows.',
  keywords: ['Stellar transaction monitoring', 'Stellar payment tracking', 'Stellar account monitoring', 'XLM transaction alerts', 'Stellar ledger monitoring', 'blockchain transaction monitoring'],
  alternates: { canonical: 'https://lumenquery.io/stellar-transaction-monitoring' },
  openGraph: {
    title: 'Stellar Transaction Monitoring API',
    description: 'Monitor Stellar transactions, payments, accounts, ledgers, and asset movements with developer-friendly APIs and analytics workflows.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-transaction-monitoring',
  },
  robots: { index: true, follow: true },
};

export default function StellarTransactionMonitoringPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar Transaction Monitoring API',
    description: 'Monitor Stellar transactions, payments, accounts, ledgers, and asset movements with developer-friendly APIs and analytics workflows.',
    url: 'https://lumenquery.io/stellar-transaction-monitoring',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Stellar transaction monitoring?',
        acceptedAnswer: { '@type': 'Answer', text: 'Stellar transaction monitoring is the process of tracking and analyzing transactions, payments, account activity, and asset movements on the Stellar blockchain network in real time or near-real time using APIs and analytics tools.' },
      },
      {
        '@type': 'Question',
        name: 'How do I monitor Stellar transactions in real time?',
        acceptedAnswer: { '@type': 'Answer', text: 'You can monitor Stellar transactions in real time using LumenQuery\'s Server-Sent Events (SSE) streaming API. The /api/transactions/stream endpoint delivers decoded transactions as they are confirmed on the network, including human-readable operation descriptions.' },
      },
      {
        '@type': 'Question',
        name: 'Can I set up alerts for large Stellar payments?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. LumenQuery\'s Transaction Intelligence platform lets you configure alerts for large payments, unusual activity, balance changes, and specific account movements. Alerts can be delivered via email, Slack, or webhooks.' },
      },
      {
        '@type': 'Question',
        name: 'What types of Stellar operations can be monitored?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery decodes and monitors over 25 Stellar operation types including payments, path payments, account creation, trustline changes, DEX offers, account merges, Soroban contract invocations, and more.' },
      },
      {
        '@type': 'Question',
        name: 'Is transaction monitoring useful for compliance?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Transaction monitoring is a core requirement for exchanges, custodians, and financial institutions subject to AML/KYC regulations. LumenQuery provides tools to track suspicious patterns, flag high-value transfers, and generate audit trails.' },
      },
      {
        '@type': 'Question',
        name: 'How does LumenQuery differ from using the public Horizon API for monitoring?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery adds decoded operation descriptions, configurable alerting, historical analytics, caching for performance, and higher rate limits on top of the raw Horizon data. The public Horizon endpoint has strict rate limits and no built-in alerting or analytics layer.' },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io/' },
      { '@type': 'ListItem', position: 2, name: 'Stellar Transaction Monitoring', item: 'https://lumenquery.io/stellar-transaction-monitoring' },
    ],
  };

  const useCases = [
    {
      title: 'Wallet Providers',
      description: 'Track incoming and outgoing payments for user accounts in real time. Display transaction history with decoded operation details and push notifications for balance changes.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>
      ),
    },
    {
      title: 'Exchanges',
      description: 'Monitor deposit and withdrawal addresses, detect double-spend attempts, flag large or unusual transfers, and maintain a complete audit trail of all movements for regulatory reporting.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
      ),
    },
    {
      title: 'Fintech Applications',
      description: 'Build payment confirmation flows, reconcile cross-border settlements, and track Stellar-based remittance pipelines with sub-second latency on transaction status updates.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
      ),
    },
    {
      title: 'Compliance Teams',
      description: 'Screen transactions against watchlists, detect structuring patterns, monitor high-risk accounts, and generate compliance reports with immutable audit logs for regulators.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      ),
    },
  ];

  const alertExamples = [
    { label: 'Large Payment', condition: 'Payment amount > 500,000 XLM', severity: 'HIGH', color: 'text-red-400 bg-red-900/20' },
    { label: 'Failed Transaction', condition: 'Transaction successful = false', severity: 'MEDIUM', color: 'text-yellow-400 bg-yellow-900/20' },
    { label: 'Suspicious Activity', condition: 'Velocity > 50 txns in 10 minutes', severity: 'HIGH', color: 'text-red-400 bg-red-900/20' },
    { label: 'Asset Movement Spike', condition: 'USDC volume > 2x daily average', severity: 'MEDIUM', color: 'text-yellow-400 bg-yellow-900/20' },
    { label: 'Balance Change', condition: 'Account balance drops below threshold', severity: 'LOW', color: 'text-blue-400 bg-blue-900/20' },
  ];

  return (
    <>
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
          url: 'https://lumenquery.io/stellar-transaction-monitoring',
          description: 'Stellar transaction monitoring API for real-time payment tracking, alerts, and compliance workflows.',
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
            <Link href="/" className="hover:text-[#7366FF]">Home</Link>
            <span>/</span>
            <span className="text-white">Stellar Transaction Monitoring</span>
          </div>
        </nav>

        {/* Hero */}
        <header className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7366FF]/10 border border-[#7366FF]/20 text-[#7366FF] text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Real-Time Monitoring
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stellar Transaction<br />
            <span className="text-[#7366FF]">Monitoring API</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mx-auto mb-8">
            Monitor Stellar transactions, payments, accounts, ledgers, and asset movements with developer-friendly APIs, decoded operations, and configurable alert workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/transactions" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              View Live Transactions
            </Link>
            <Link href="/docs" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              API Documentation
            </Link>
          </div>
        </header>

        {/* Why Transaction Monitoring Matters */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Why Stellar Transaction Monitoring Matters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#7366FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Real-Time Visibility</h3>
              <p className="text-sm text-[#A8A9AD]">
                The Stellar network closes ledgers every 5-7 seconds. Without real-time monitoring, you miss critical account activity, failed transactions, and unusual patterns until it is too late to act.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#7366FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Fraud Prevention</h3>
              <p className="text-sm text-[#A8A9AD]">
                Detect suspicious activity like rapid-fire transactions, circular payment loops, and structuring attempts as they happen. Automated alerts let compliance teams respond before funds leave the network.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-[#7366FF]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Operational Intelligence</h3>
              <p className="text-sm text-[#A8A9AD]">
                Understand transaction throughput, fee trends, asset flow volumes, and account behavior over time. Monitoring data feeds directly into dashboards, reports, and automated decision-making workflows.
              </p>
            </div>
          </div>
        </section>

        {/* Real-Time Monitoring Features */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">What You Can Monitor</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            LumenQuery decodes and surfaces every operation type on the Stellar network, giving you human-readable transaction data instead of raw XDR blobs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Payments', desc: 'XLM and asset transfers between accounts' },
              { label: 'Path Payments', desc: 'Multi-hop cross-asset conversions' },
              { label: 'Account Creation', desc: 'New accounts funded on the network' },
              { label: 'Trustline Changes', desc: 'Assets added, removed, or modified' },
              { label: 'DEX Orders', desc: 'Buy and sell offers on the Stellar DEX' },
              { label: 'Account Merges', desc: 'Accounts closed and balances absorbed' },
              { label: 'Soroban Calls', desc: 'Smart contract invocations and state changes' },
              { label: 'Claimable Balances', desc: 'Pending balances created or claimed' },
              { label: 'Liquidity Pool Ops', desc: 'Deposits, withdrawals, and swaps' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-[#262932] border border-white/5">
                <h4 className="font-semibold mb-1">{item.label}</h4>
                <p className="text-sm text-[#A8A9AD]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Who Uses Stellar Transaction Monitoring</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            From wallet teams tracking user balances to compliance officers screening for suspicious patterns, transaction monitoring is essential across the Stellar ecosystem.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div key={uc.title} className="p-6 rounded-2xl bg-[#262932] border border-white/5">
                <div className="mb-4">{uc.icon}</div>
                <h3 className="text-lg font-bold mb-2">{uc.title}</h3>
                <p className="text-sm text-[#A8A9AD]">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alert Examples */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Configurable Alert Examples</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Define rules that trigger alerts when specific conditions are met. Alerts are delivered via email, Slack, or webhooks so your team can respond immediately.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD]">Alert Type</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD]">Condition</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD]">Severity</th>
                </tr>
              </thead>
              <tbody>
                {alertExamples.map((alert) => (
                  <tr key={alert.label} className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium text-white">{alert.label}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]"><code className="text-xs bg-white/5 px-2 py-1 rounded">{alert.condition}</code></td>
                    <td className="py-3 px-4"><span className={`text-xs font-medium px-2 py-1 rounded ${alert.color}`}>{alert.severity}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">How LumenQuery Monitoring Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Connect', desc: 'Subscribe to the SSE transaction stream or poll the REST API for recent transactions.' },
              { step: '2', title: 'Decode', desc: 'LumenQuery decodes XDR operations into human-readable descriptions for 25+ operation types.' },
              { step: '3', title: 'Analyze', desc: 'Filter by account, asset, operation type, or amount. Aggregate metrics over time ranges.' },
              { step: '4', title: 'Alert', desc: 'Configure rules that trigger notifications when thresholds are crossed or patterns are detected.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#7366FF] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">{item.step}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A8A9AD]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SSE Code Example */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Stream Transactions with SSE</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-6">
            Connect to the real-time transaction stream and receive decoded operations as they are confirmed on the Stellar network.
          </p>
          <div className="bg-[#1D1E26] rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// Connect to LumenQuery's SSE transaction stream
const eventSource = new EventSource(
  'https://lumenquery.io/api/transactions/stream'
);

eventSource.onmessage = (event) => {
  const tx = JSON.parse(event.data);

  console.log('Transaction:', tx.hash);
  console.log('Ledger:', tx.ledger);
  console.log('Operations:');

  tx.operations.forEach((op) => {
    // Human-readable descriptions, not raw XDR
    console.log(' -', op.description);
    // e.g. "Payment of 1,500 XLM from GAXJ...ABC to GBCD...XYZ"
  });
};

eventSource.onerror = () => {
  console.error('Stream disconnected, reconnecting...');
};`}</code></pre>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Explore Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/transactions" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Live Transaction Viewer</h3>
              <p className="text-xs text-[#A8A9AD]">Watch decoded transactions in real time</p>
            </Link>
            <Link href="/intelligence" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Transaction Intelligence</h3>
              <p className="text-xs text-[#A8A9AD]">Alerts, watchlists, and account profiling</p>
            </Link>
            <Link href="/xlm-whale-alerts" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">XLM Whale Alerts</h3>
              <p className="text-xs text-[#A8A9AD]">Track large XLM movements and exchange flows</p>
            </Link>
            <Link href="/stellar-blockchain-analytics-api" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Analytics API</h3>
              <p className="text-xs text-[#A8A9AD]">Network metrics, TPS, fees, and trends</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Start Monitoring Stellar Transactions</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Create a free account and connect to the live transaction stream in under a minute. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/dashboard/transactions" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              View Live Transactions
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
