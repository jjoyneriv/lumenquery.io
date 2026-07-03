import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'XLM Whale Alerts and Large Transaction Monitoring',
  description: 'Track large XLM transactions, exchange flows, whale wallets, and major Stellar asset movements with LumenQuery analytics.',
  keywords: ['XLM whale alerts', 'large XLM transactions', 'Stellar whale tracking', 'XLM exchange flows', 'Stellar large payment monitoring', 'XLM whale wallets'],
  alternates: { canonical: 'https://lumenquery.io/xlm-whale-alerts' },
  openGraph: {
    title: 'XLM Whale Alerts and Large Transaction Monitoring',
    description: 'Track large XLM transactions, exchange flows, whale wallets, and major Stellar asset movements with LumenQuery analytics.',
    type: 'website',
    url: 'https://lumenquery.io/xlm-whale-alerts',
  },
  robots: { index: true, follow: true },
};

export default function XlmWhaleAlertsPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'XLM Whale Alerts and Large Transaction Monitoring',
    description: 'Track large XLM transactions, exchange flows, whale wallets, and major Stellar asset movements with LumenQuery analytics.',
    url: 'https://lumenquery.io/xlm-whale-alerts',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What qualifies as a whale transaction on the Stellar network?',
        acceptedAnswer: { '@type': 'Answer', text: 'There is no universal definition, but LumenQuery defaults to flagging XLM payments above 100,000 XLM as whale-tier transactions. You can customize this threshold based on your needs, with some users tracking movements above 1,000,000 XLM for exchange-level monitoring.' },
      },
      {
        '@type': 'Question',
        name: 'How fast are whale alerts delivered?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery processes transactions within seconds of ledger close. Since Stellar closes ledgers every 5-7 seconds, whale alerts typically arrive within 10-15 seconds of the payment being confirmed on-chain.' },
      },
      {
        '@type': 'Question',
        name: 'Can I track whale alerts for Stellar assets other than XLM?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. LumenQuery supports whale alert tracking for any Stellar asset including USDC, EURC, yXLM, and custom tokens. You can set different thresholds per asset based on their market value and your monitoring needs.' },
      },
      {
        '@type': 'Question',
        name: 'How do exchange inflow and outflow alerts work?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery maintains a database of known exchange deposit and withdrawal addresses. When a large payment is sent to or from these addresses, the alert includes the exchange name and direction (inflow vs outflow) so you can assess the likely market impact.' },
      },
      {
        '@type': 'Question',
        name: 'Can whale alerts be used for trading signals?',
        acceptedAnswer: { '@type': 'Answer', text: 'Many traders use whale alerts as one input into their decision-making process. Large exchange inflows can signal upcoming sell pressure, while large outflows may indicate accumulation. However, whale alerts should be combined with other analysis and are not financial advice.' },
      },
      {
        '@type': 'Question',
        name: 'What notification channels are supported for whale alerts?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery delivers whale alerts via email, Slack webhooks, and custom HTTP webhooks. You can configure different channels for different severity levels, and set quiet hours to avoid alert fatigue during off-peak times.' },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io/' },
      { '@type': 'ListItem', position: 2, name: 'XLM Whale Alerts', item: 'https://lumenquery.io/xlm-whale-alerts' },
    ],
  };

  const whaleExamples = [
    {
      type: 'Large XLM Transfer',
      description: '5,000,000 XLM sent from GDQP...3FKL to GBVF...9XHR',
      detail: 'Unknown wallet to unknown wallet',
      amount: '5,000,000 XLM',
      severity: 'HIGH',
    },
    {
      type: 'Exchange Inflow',
      description: '2,300,000 XLM deposited to Binance hot wallet',
      detail: 'Potential sell pressure signal',
      amount: '2,300,000 XLM',
      severity: 'HIGH',
    },
    {
      type: 'Exchange Outflow',
      description: '1,800,000 XLM withdrawn from Coinbase',
      detail: 'Accumulation or cold storage movement',
      amount: '1,800,000 XLM',
      severity: 'MEDIUM',
    },
    {
      type: 'Large Stablecoin Movement',
      description: '10,000,000 USDC transferred via Stellar',
      detail: 'Major stablecoin settlement or treasury rebalance',
      amount: '10,000,000 USDC',
      severity: 'HIGH',
    },
    {
      type: 'Wallet Accumulation',
      description: 'Account GXYZ...ABC received 15 payments totaling 800,000 XLM in 24 hours',
      detail: 'Systematic accumulation pattern detected',
      amount: '800,000 XLM',
      severity: 'MEDIUM',
    },
    {
      type: 'Suspicious Movement',
      description: '3,000,000 XLM moved through 4 intermediary accounts in 2 minutes',
      detail: 'Possible layering or obfuscation pattern',
      amount: '3,000,000 XLM',
      severity: 'CRITICAL',
    },
  ];

  const audiences = [
    {
      title: 'Crypto Investors',
      description: 'Track whale wallet accumulation and distribution patterns to inform investment decisions. Monitor exchange flows for early signals of large-scale buying or selling activity.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
      ),
    },
    {
      title: 'Market Analysts',
      description: 'Analyze on-chain flow data to generate research reports on XLM market structure, whale behavior trends, and exchange balance changes over time.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>
      ),
    },
    {
      title: 'Exchanges',
      description: 'Monitor large deposits and withdrawals in real time. Flag whale-tier movements for manual review and correlate on-chain flows with order book activity.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
      ),
    },
    {
      title: 'Token Teams',
      description: 'Monitor distribution of your Stellar-issued asset, track large holder movements, and receive alerts when significant portions of your token supply change hands.',
      icon: (
        <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
      ),
    },
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
            <span className="text-white">XLM Whale Alerts</span>
          </div>
        </nav>

        {/* Hero */}
        <header className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7366FF]/10 border border-[#7366FF]/20 text-[#7366FF] text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
            Whale Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            XLM Whale Alerts &<br />
            <span className="text-[#7366FF]">Large Transaction Monitoring</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mx-auto mb-8">
            Track large XLM transactions, exchange inflows and outflows, whale wallet accumulation, and major Stellar asset movements with real-time analytics and configurable alerts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Start Tracking Whales
            </Link>
            <Link href="/analytics" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              View Network Analytics
            </Link>
          </div>
        </header>

        {/* What Are Whale Alerts */}
        <section className="mb-12 sm:mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">What Are XLM Whale Alerts?</h2>
              <p className="text-[#A8A9AD] mb-4">
                Whale alerts are automated notifications triggered when unusually large XLM or Stellar asset transfers occur on-chain. These movements often signal significant market events: institutional repositioning, exchange listings, treasury management, or large-scale accumulation.
              </p>
              <p className="text-[#A8A9AD] mb-4">
                Unlike services that only broadcast alerts on social media, LumenQuery gives you programmatic access to whale data through APIs, letting you integrate whale tracking directly into trading bots, dashboards, compliance workflows, and analytics pipelines.
              </p>
              <p className="text-[#A8A9AD]">
                Default threshold is <strong className="text-white">100,000 XLM</strong>, but you can customize this per alert rule to match your specific monitoring requirements.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <h3 className="font-bold mb-4 text-sm text-[#A8A9AD] uppercase tracking-wider">Example Alert Rule</h3>
              <div className="bg-[#1D1E26] rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs sm:text-sm text-gray-300"><code>{`{
  "name": "XLM Whale Alert",
  "type": "WHALE_MOVEMENT",
  "conditions": {
    "asset": "native",
    "min_amount": 1000000,
    "direction": "any"
  },
  "notifications": {
    "channels": ["email", "slack"],
    "cooldown_minutes": 5
  }
}`}</code></pre>
              </div>
              <p className="text-xs text-[#A8A9AD] mt-3">Alert when any payment exceeds 1,000,000 XLM. Notify via email and Slack with a 5-minute cooldown between alerts.</p>
            </div>
          </div>
        </section>

        {/* Who Cares */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Who Uses Whale Alerts</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Whale tracking provides actionable intelligence for anyone who needs to understand large-scale capital flows on the Stellar network.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {audiences.map((a) => (
              <div key={a.title} className="p-6 rounded-2xl bg-[#262932] border border-white/5">
                <div className="mb-4">{a.icon}</div>
                <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-sm text-[#A8A9AD]">{a.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Whale Examples */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Whale Alert Examples</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            These are the types of events LumenQuery detects and alerts on. Each alert includes the transaction hash, accounts involved, decoded operation description, and contextual analysis.
          </p>
          <div className="space-y-4">
            {whaleExamples.map((ex, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#262932] border border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      ex.severity === 'CRITICAL' ? 'text-red-300 bg-red-900/30' :
                      ex.severity === 'HIGH' ? 'text-orange-300 bg-orange-900/30' :
                      'text-yellow-300 bg-yellow-900/30'
                    }`}>{ex.severity}</span>
                    <h3 className="font-semibold text-sm">{ex.type}</h3>
                  </div>
                  <p className="text-sm text-[#A8A9AD]">{ex.description}</p>
                  <p className="text-xs text-[#A8A9AD]/60 mt-1">{ex.detail}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white whitespace-nowrap">{ex.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analytics Capabilities */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Whale Analytics Capabilities</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Go beyond simple alerts with analytics that contextualize whale movements within broader market trends and historical patterns.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Volume Distribution', desc: 'See how transaction volume is distributed across whale, mid-tier, and retail accounts over any time range.' },
              { title: 'Exchange Flow Analysis', desc: 'Track net inflow and outflow to known exchange addresses. Identify accumulation vs distribution phases.' },
              { title: 'Whale Wallet Profiling', desc: 'Build profiles of large wallets including their transaction history, asset holdings, and behavioral patterns.' },
              { title: 'Historical Patterns', desc: 'Compare current whale activity to historical baselines. Detect unusual spikes or anomalies in large-value transfers.' },
              { title: 'Asset-Specific Tracking', desc: 'Track whale movements for any Stellar asset: XLM, USDC, EURC, yXLM, or custom tokens issued on the network.' },
              { title: 'Query Interface', desc: 'Use natural language queries like "Show payments over 500K XLM in the last 24 hours" to explore whale data without code.' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-[#262932] border border-white/5">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A8A9AD]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Explore Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/analytics" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Network Analytics</h3>
              <p className="text-xs text-[#A8A9AD]">TPS, fees, ledger metrics, and token volumes</p>
            </Link>
            <Link href="/query" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Query Interface</h3>
              <p className="text-xs text-[#A8A9AD]">Search whale transactions in natural language</p>
            </Link>
            <Link href="/stellar-transaction-monitoring" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Transaction Monitoring</h3>
              <p className="text-xs text-[#A8A9AD]">Real-time SSE stream and decoded operations</p>
            </Link>
            <Link href="/stellar-blockchain-analytics-api" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Blockchain Analytics API</h3>
              <p className="text-xs text-[#A8A9AD]">Programmatic access to all analytics data</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Start Tracking XLM Whale Movements</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Set up whale alerts in minutes. Get notified when large XLM transfers, exchange flows, or unusual accumulation patterns occur on the Stellar network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/analytics" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              Explore Analytics
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
