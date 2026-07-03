import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Follow LumenQuery product updates, API improvements, documentation changes, analytics releases, and Stellar infrastructure enhancements.',
  openGraph: {
    title: 'Changelog',
    description:
      'Follow LumenQuery product updates, API improvements, documentation changes, analytics releases, and Stellar infrastructure enhancements.',
    url: 'https://lumenquery.io/changelog',
    type: 'website',
  },
  alternates: { canonical: 'https://lumenquery.io/changelog' },
};

const categoryColors: Record<string, string> = {
  Platform: 'bg-[#7366FF]/20 text-[#7366FF]',
  Docs: 'bg-green-400/20 text-green-400',
  Analytics: 'bg-[#FFB829]/20 text-[#FFB829]',
  Monitoring: 'bg-[#FC564A]/20 text-[#FC564A]',
  Security: 'bg-[#40B8F4]/20 text-[#40B8F4]',
  Query: 'bg-purple-400/20 text-purple-400',
  'Soroban RPC': 'bg-pink-400/20 text-pink-400',
  'Horizon API': 'bg-[#7366FF]/20 text-[#7366FF]',
};

const entries = [
  {
    date: '2026-07-03',
    title: 'SEO Landing Pages',
    category: 'Platform',
    summary:
      'Added 8 keyword-focused landing pages for Stellar Horizon API, Soroban RPC, analytics, transaction monitoring, whale alerts, rate limits, and provider comparison.',
  },
  {
    date: '2026-07-03',
    title: 'New Blog Posts',
    category: 'Docs',
    summary:
      'Published 4 new articles covering quantum preparedness, Open USD Consortium, ERC-3643 security tokens, and RWA analytics dashboard.',
  },
  {
    date: '2026-07-03',
    title: 'Infrastructure Cleanup',
    category: 'Platform',
    summary:
      'Removed unused stellar-horizon container, cleaned up orphaned database tables, freed 115GB disk space.',
  },
  {
    date: '2026-06-09',
    title: 'Protocol 27 Coverage',
    category: 'Docs',
    summary:
      'Published developer guide for Stellar Protocol 27 "Zipper" upgrade preparation.',
  },
  {
    date: '2026-06-08',
    title: 'Developer Guides',
    category: 'Docs',
    summary:
      'Added 4 new developer guides covering payment status pages, API rate limits, token velocity tracking, and compliance-friendly apps.',
  },
  {
    date: '2026-06-05',
    title: 'Expanded Blog Content',
    category: 'Docs',
    summary:
      'Published 8 new articles on Soroban RPC, stablecoin payments, smart contract events, and natural language search.',
  },
  {
    date: '2026-03-13',
    title: 'Natural Language Query',
    category: 'Query',
    summary:
      'Launched plain-English blockchain query interface supporting 9 query types against the Stellar Horizon API.',
  },
  {
    date: '2026-03-07',
    title: 'New Branding',
    category: 'Platform',
    summary: 'Updated website logo and branding across all pages.',
  },
  {
    date: '2026-02-22',
    title: 'Authentication Upgrade',
    category: 'Security',
    summary:
      'Migrated from NextAuth v4 to v5 for improved session management and security.',
  },
  {
    date: '2026-02-21',
    title: 'Contract Deployment',
    category: 'Soroban RPC',
    summary:
      'Added Soroban smart contract deployment wizard with Freighter wallet integration.',
  },
  {
    date: '2026-02-14',
    title: 'Live Transaction Viewer',
    category: 'Monitoring',
    summary:
      'Launched real-time transaction viewer with decoded XDR operations and SSE streaming.',
  },
  {
    date: '2026-02-14',
    title: 'Admin Console',
    category: 'Platform',
    summary:
      'Built administrative console with user management, usage analytics, and audit logging.',
  },
  {
    date: '2026-02-13',
    title: 'Portfolio Intelligence',
    category: 'Analytics',
    summary:
      'Launched multi-account portfolio tracking with P&L, yield monitoring, and trustline risk assessment.',
  },
  {
    date: '2026-02-13',
    title: 'Forgot Password',
    category: 'Security',
    summary:
      'Added secure password reset flow with rate limiting and token-based verification.',
  },
  {
    date: '2026-02-12',
    title: 'SEO Optimization',
    category: 'Platform',
    summary:
      'Implemented comprehensive sitemap, canonical URLs, meta tags, JSON-LD structured data, and gzip compression.',
  },
  {
    date: '2026-02-09',
    title: 'Soroban Pro Explorer',
    category: 'Soroban RPC',
    summary:
      'Launched smart contract explorer with decoded calls, storage viewer, and event streaming.',
  },
  {
    date: '2026-02-08',
    title: 'Analytics Dashboard',
    category: 'Analytics',
    summary:
      'Added public Stellar network analytics with real-time metrics, TPS, fees, and token data.',
  },
  {
    date: '2026-02-07',
    title: 'Mobile Responsive Design',
    category: 'Platform',
    summary:
      'Made all pages mobile-friendly with responsive navigation and touch-friendly controls.',
  },
  {
    date: '2026-02-03',
    title: 'Platform Launch',
    category: 'Platform',
    summary:
      'Initial launch of LumenQuery with Horizon API proxy, Soroban RPC gateway, and developer portal.',
  },
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function ChangelogPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'LumenQuery Changelog',
    description:
      'Follow LumenQuery product updates, API improvements, documentation changes, analytics releases, and Stellar infrastructure enhancements.',
    url: 'https://lumenquery.io/changelog',
    publisher: {
      '@type': 'Organization',
      name: 'LumenQuery',
      url: 'https://lumenquery.io',
    },
    breadcrumb: {
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
          name: 'Changelog',
          item: 'https://lumenquery.io/changelog',
        },
      ],
    },
  };

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const month = new Date(entry.date + 'T00:00:00Z').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(entry);
    return acc;
  }, {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7366FF]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Changelog
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#A8A9AD]">
            Product updates, API improvements, and platform releases.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-white/10 md:left-6 md:block" />

          {Object.entries(grouped).map(([month, monthEntries]) => (
            <div key={month} className="mb-12">
              <h2 className="mb-6 text-xl font-semibold text-white md:pl-14">{month}</h2>

              <div className="space-y-4">
                {monthEntries.map((entry, idx) => (
                  <div key={`${entry.date}-${idx}`} className="relative md:pl-14">
                    <div className="absolute left-2.5 top-5 hidden h-3 w-3 rounded-full border-2 border-[#7366FF] bg-[#262932] md:left-4.5 md:block" />

                    <div className="rounded-2xl border border-white/5 bg-[#262932] p-5 transition-colors hover:border-white/10">
                      <div className="flex flex-wrap items-center gap-3">
                        <time className="text-sm text-[#A8A9AD]" dateTime={entry.date}>
                          {formatDate(entry.date)}
                        </time>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            categoryColors[entry.category] || 'bg-white/10 text-white'
                          }`}
                        >
                          {entry.category}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#A8A9AD]">
                        {entry.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-white/5 bg-[#262932] p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Stay Up to Date</h2>
          <p className="mx-auto mt-3 max-w-lg text-[#A8A9AD]">
            Explore our documentation for detailed guides or get in touch to discuss your
            requirements.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#7366FF] transition-opacity hover:opacity-90"
            >
              Read the Docs
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
