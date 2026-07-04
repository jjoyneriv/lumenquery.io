import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ask Questions About Stellar in Plain English',
  description: 'Use natural language to query Stellar accounts, transactions, payments, assets, ledgers, and network activity without writing SQL or custom indexer code.',
  keywords: [
    'Stellar query',
    'Stellar natural language',
    'blockchain query tool',
    'XLM query',
    'Stellar account lookup',
    'Stellar transaction search',
    'SQL-free blockchain',
    'Stellar data explorer',
    'Stellar payment search',
    'Stellar ledger query',
  ],
  alternates: { canonical: 'https://lumenquery.io/query' },
  openGraph: {
    title: 'Ask Questions About Stellar in Plain English',
    description: 'Use natural language to query Stellar accounts, transactions, payments, assets, ledgers, and network activity without writing SQL or custom indexer code.',
    url: 'https://lumenquery.io/query',
    siteName: 'LumenQuery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ask Questions About Stellar in Plain English',
    description: 'Use natural language to query Stellar accounts, transactions, payments, assets, ledgers, and network activity.',
  },
  robots: { index: true, follow: true },
};

const exampleQuestions = [
  { question: 'Show me the largest XLM payments in the last 24 hours', desc: 'Finds and ranks the biggest native XLM transfers across the entire network by amount.' },
  { question: 'How many new trustlines were created for USDC this week?', desc: 'Counts change_trust operations for the USDC asset over the past 7 days.' },
  { question: 'What is the current balance of account GABC...XYZ?', desc: 'Returns all balances, trustlines, and account flags for any Stellar address.' },
  { question: 'List recent Soroban contract invocations', desc: 'Shows the latest invoke_host_function operations with decoded parameters.' },
  { question: 'Which assets had the most payment volume today?', desc: 'Ranks all Stellar assets by total payment value in the last 24 hours.' },
  { question: 'Show failed transactions in the last hour', desc: 'Filters for transactions with non-success result codes and surfaces error details.' },
];

const resultPreview = [
  { question: 'Top XLM payments today', result: 'Ranked list of large XLM transfers with sender, recipient, and amount' },
  { question: 'Latest USDC payments', result: 'Recent USDC payment operations with timestamps and counterparties' },
  { question: 'Active Stellar assets', result: 'Assets ranked by transaction activity, holder count, and volume' },
  { question: 'Account activity summary', result: 'Payments, balances, operations, and ledger entries for any address' },
];

const useCases = [
  { title: 'Founder Dashboards', desc: 'Embed live Stellar data into internal tools. Track user adoption, payment volume, and asset distribution without building a custom indexer.' },
  { title: 'Token Issuer Analytics', desc: 'Monitor trustline growth, holder distribution, and payment velocity for tokens you have issued on Stellar.' },
  { title: 'Stablecoin Monitoring', desc: 'Track USDC, EURC, and other stablecoin flows across exchanges, anchors, and end-user wallets.' },
  { title: 'Compliance Research', desc: 'Quickly investigate account history, counterparty relationships, and transaction patterns during audits.' },
  { title: 'Developer Debugging', desc: 'Look up transaction results, operation details, and error codes when diagnosing failed Soroban calls or payments.' },
  { title: 'Transaction Investigations', desc: 'Trace payment paths, identify circular flows, and examine multi-operation transactions without writing code.' },
  { title: 'Network Growth Reporting', desc: 'Generate weekly reports on active accounts, transaction throughput, new trustlines, and fee trends across the network.' },
];

const devLinks = [
  { href: '/docs', label: 'API Documentation', desc: 'Full REST API reference and integration guides' },
  { href: '/analytics', label: 'Network Analytics', desc: 'Real-time Stellar network metrics and charts' },
  { href: '/dashboard/transactions', label: 'Live Transaction Viewer', desc: 'Watch decoded transactions stream in real time' },
  { href: '/contracts', label: 'Contract Explorer', desc: 'Browse Soroban smart contract calls and storage' },
  { href: '/pricing', label: 'Pricing Plans', desc: 'Compare query limits and features by tier' },
];

const faqs = [
  {
    q: 'What is natural-language blockchain querying?',
    a: 'Natural-language blockchain querying lets you ask questions about on-chain data in plain English instead of writing SQL or building API calls manually. LumenQuery translates your question into the right Horizon and Soroban RPC requests and returns structured results instantly.',
  },
  {
    q: 'Do I need to know SQL to use LumenQuery?',
    a: 'No. LumenQuery is designed for users who want blockchain data without writing SQL, GraphQL, or raw API requests. Just type a question like "Show me the largest XLM payments today" and get results in a readable table.',
  },
  {
    q: 'What Stellar data can I ask about?',
    a: 'You can query transactions, payments, account balances, trustlines, offers, effects, operations, ledger stats, asset issuance data, Soroban contract calls, and more. LumenQuery covers the full scope of data available through Stellar Horizon and Soroban RPC.',
  },
  {
    q: 'Can I export query results?',
    a: 'Yes. Query results can be exported as JSON through the API. CSV export is available on supported plan tiers. You can also integrate query results into your own dashboards and data pipelines using the LumenQuery REST API.',
  },
  {
    q: 'Can developers use this through an API?',
    a: 'Yes. LumenQuery provides a REST API that accepts natural-language queries programmatically. You can integrate it into bots, dashboards, alerting systems, or any application that needs Stellar data without managing Horizon infrastructure.',
  },
  {
    q: 'Is this useful for analytics and monitoring teams?',
    a: 'Absolutely. Analytics teams use LumenQuery to explore Stellar data without waiting for engineering to build custom queries. Monitoring teams use it to quickly investigate transactions, check account states, and verify on-chain activity during incidents.',
  },
];

const exampleApiResponse = `{
  "query": "Show me the largest XLM payments in the last 24 hours",
  "results": [
    { "rank": 1, "amount": "250000.0000000", "asset": "XLM", "from": "GABC...", "to": "GDEF...", "ledger": 63312018 }
  ]
}`;

export default function QueryLayout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Query', item: 'https://lumenquery.io/query' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="min-h-screen bg-[#1a1c23] text-white">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 pt-6 pb-2 text-sm text-[#A8A9AD]" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-white">Query</li>
          </ol>
        </nav>

        {/* === CLIENT COMPONENT (query interface with hero) === */}
        {children}

        {/* Query Without SQL */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-4">Query Stellar Without Writing SQL</h2>
          <p className="text-[#A8A9AD] text-base leading-relaxed max-w-3xl">
            LumenQuery translates plain-English questions into Stellar Horizon and Soroban RPC calls behind
            the scenes. You describe what you want to know -- account balances, recent payments, asset
            activity, contract invocations -- and get structured results in seconds. No SQL, no GraphQL,
            no custom indexer code. Just ask a question and get an answer.
          </p>
        </section>

        {/* Example Questions */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Example Questions You Can Ask</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleQuestions.map((item) => (
              <div key={item.question} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <p className="font-medium text-white mb-2 text-sm">&ldquo;{item.question}&rdquo;</p>
                <p className="text-xs text-[#A8A9AD] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Query Result Preview */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Query Result Preview</h2>
          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3 text-[#A8A9AD] font-medium">Question</th>
                    <th className="text-left px-5 py-3 text-[#A8A9AD] font-medium">Example Result</th>
                  </tr>
                </thead>
                <tbody>
                  {resultPreview.map((row) => (
                    <tr key={row.question} className="border-b border-white/5 last:border-b-0">
                      <td className="px-5 py-3 font-medium text-white">{row.question}</td>
                      <td className="px-5 py-3 text-[#A8A9AD]">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sample API Response */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Sample Query API Response</h2>
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
            <p className="text-xs text-[#A8A9AD] mb-3 font-mono">POST /api/query</p>
            <pre className="text-sm text-[#A8A9AD] overflow-x-auto leading-relaxed">
              <code>{exampleApiResponse}</code>
            </pre>
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((c) => (
              <div key={c.title} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Developer Links */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">From Natural Language to Developer APIs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {devLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-[#262932] border border-white/5 rounded-2xl p-5 hover:border-[#7366FF]/30 transition-colors group"
              >
                <h3 className="font-semibold text-white mb-2 group-hover:text-[#7366FF] transition-colors">{link.label}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#262932] border border-white/5 rounded-2xl p-5">
                <h3 className="font-semibold text-white mb-2">{f.q}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="bg-[#262932] border border-white/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start querying the Stellar network in plain English.</h2>
            <p className="text-[#A8A9AD] mb-6 max-w-xl mx-auto">
              Create a free account and ask your first question. No SQL, no infrastructure, no setup required.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/auth/signup" className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Start Free
              </Link>
              <Link href="/docs" className="border-2 border-white/30 text-white px-6 py-3 rounded-xl hover:border-white/60 transition-colors">
                View Docs
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
