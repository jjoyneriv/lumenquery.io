import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plain English Queries for Stellar Blockchain',
  description: 'Query the Stellar blockchain using natural language. No SQL required. Get instant insights on transactions, wallets, assets, and validators.',
  keywords: ['Stellar blockchain', 'natural language query', 'blockchain analytics', 'XLM', 'crypto data', 'SQL-free', 'Stellar query tool'],
  openGraph: {
    title: 'Plain English Queries for Stellar Blockchain | LumenQuery',
    description: 'Query the Stellar blockchain using natural language. No SQL required. Get instant insights on transactions, wallets, assets, and validators.',
    url: 'https://lumenquery.io/query',
    siteName: 'LumenQuery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain English Queries for Stellar Blockchain',
    description: 'Query the Stellar blockchain using natural language. No SQL required.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://lumenquery.io/query' },
};

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
        {/* Interactive Query Interface (client component) */}
        {children}

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 py-12">
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

        {/* Related Resources */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h2 className="text-2xl font-bold mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/analytics', label: 'Network Analytics' },
              { href: '/dashboard/transactions', label: 'Live Transaction Viewer' },
              { href: '/stellar-blockchain-analytics-api', label: 'Analytics API' },
              { href: '/docs', label: 'Documentation' },
              { href: '/pricing', label: 'Pricing' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm border border-white/10 rounded-xl px-4 py-2 text-[#A8A9AD] hover:text-white hover:border-white/30 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
