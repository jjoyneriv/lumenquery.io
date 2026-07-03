import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Stellar API Infrastructure',
  description:
    'Explore enterprise Stellar API infrastructure for production teams needing Horizon API access, Soroban RPC, monitoring, analytics, support, and SLA options.',
  openGraph: {
    title: 'Enterprise Stellar API Infrastructure',
    description:
      'Explore enterprise Stellar API infrastructure for production teams needing Horizon API access, Soroban RPC, monitoring, analytics, support, and SLA options.',
    url: 'https://lumenquery.io/enterprise',
    type: 'website',
  },
  alternates: { canonical: 'https://lumenquery.io/enterprise' },
};

const features = [
  {
    title: 'Higher Throughput',
    description:
      'Custom rate limits tailored to your traffic patterns. Dedicated endpoints with burst capacity for high-volume workloads.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Production Horizon API',
    description:
      'Reliable access to accounts, transactions, payments, assets, and effects. Full Horizon API compatibility with enhanced uptime.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: 'Soroban RPC Support',
    description:
      'Smart contract deployment, event streaming, transaction simulation, and state queries through a managed Soroban RPC gateway.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Transaction Monitoring',
    description:
      'Real-time alerts for whale movements, compliance violations, and suspicious activity. Configurable rules and notification channels.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description:
      'Priority response from our engineering team. Technical guidance, onboarding assistance, and architecture reviews.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: 'Security & Compliance',
    description:
      'Security reviews, immutable audit logs, AML rule engines, and enterprise SLA guarantees for regulated environments.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const useCases = [
  {
    title: 'Wallets',
    description: 'Account balances, payment history, and trustline management for mobile and web wallets.',
  },
  {
    title: 'Exchanges',
    description: 'High-throughput transaction monitoring, order book data, and compliance screening.',
  },
  {
    title: 'Fintech Apps',
    description: 'Cross-border payments, remittances, and stablecoin rails built on Stellar.',
  },
  {
    title: 'Token Issuers',
    description: 'Asset issuance tracking, holder analytics, and trustline monitoring.',
  },
  {
    title: 'RWA Platforms',
    description: 'Real-world asset tokenization with compliance workflows and audit trails.',
  },
  {
    title: 'Analytics Teams',
    description: 'Network metrics, token velocity, whale tracking, and custom dashboards.',
  },
];

const comparisonRows = [
  { feature: 'Horizon API Access', pub: 'Shared', self: 'Full', generic: 'Shared', lq: 'Dedicated' },
  { feature: 'Soroban RPC', pub: 'Limited', self: 'Full', generic: 'Varies', lq: 'Full + Managed' },
  { feature: 'Rate Limits', pub: 'Low', self: 'Unlimited', generic: 'Moderate', lq: 'Custom' },
  { feature: 'Uptime SLA', pub: 'None', self: 'Self-managed', generic: '99.5%', lq: '99.9%+' },
  { feature: 'Transaction Monitoring', pub: 'No', self: 'DIY', generic: 'Basic', lq: 'Advanced + AML' },
  { feature: 'Whale Alerts', pub: 'No', self: 'DIY', generic: 'No', lq: 'Built-in' },
  { feature: 'Compliance Tools', pub: 'No', self: 'DIY', generic: 'No', lq: 'Full Suite' },
  { feature: 'Portfolio Analytics', pub: 'No', self: 'DIY', generic: 'No', lq: 'Multi-account' },
  { feature: 'Dedicated Support', pub: 'Community', self: 'None', generic: 'Email', lq: 'Priority + Slack' },
  { feature: 'Infrastructure Ops', pub: 'N/A', self: 'Your team', generic: 'Provider', lq: 'Fully Managed' },
];

const faqItems = [
  {
    question: 'What rate limits are available on enterprise plans?',
    answer:
      'Enterprise rate limits are fully customizable. We work with your team to determine the right throughput based on your traffic patterns, peak load requirements, and use case. Typical enterprise plans start at 1,000 requests per minute.',
  },
  {
    question: 'Do I need to run my own Stellar infrastructure?',
    answer:
      'No. LumenQuery Enterprise provides fully managed Horizon API and Soroban RPC access. We handle node operations, upgrades, database management, and monitoring so your team can focus on building.',
  },
  {
    question: 'How does the onboarding process work?',
    answer:
      'After an initial requirements discussion, we configure your dedicated endpoints, set up API credentials, and provide integration guidance. Most teams are fully onboarded within a week.',
  },
  {
    question: 'What compliance features are included?',
    answer:
      'Enterprise plans include access to our Compliance and AML suite with sanctions screening, velocity limits, circular payment detection, and audit logging. Rule types and retention periods depend on your compliance tier.',
  },
  {
    question: 'Can I migrate from a public Horizon endpoint?',
    answer:
      'Yes. Our API is fully compatible with the standard Stellar Horizon API. In most cases, migration is as simple as updating your base URL. We provide migration guides and support throughout the process.',
  },
];

const processSteps = [
  { step: '1', title: 'Contact Sales', description: 'Reach out with your project details and requirements.' },
  { step: '2', title: 'Requirements Discussion', description: 'We assess throughput, compliance needs, and integration scope.' },
  { step: '3', title: 'Custom Plan', description: 'Receive a tailored proposal with pricing and SLA terms.' },
  { step: '4', title: 'Onboarding', description: 'Dedicated endpoints, API keys, and integration support.' },
];

export default function EnterprisePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Enterprise Stellar API Infrastructure',
        description:
          'Explore enterprise Stellar API infrastructure for production teams needing Horizon API access, Soroban RPC, monitoring, analytics, support, and SLA options.',
        url: 'https://lumenquery.io/enterprise',
        publisher: {
          '@type': 'Organization',
          name: 'LumenQuery',
          url: 'https://lumenquery.io',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
            { '@type': 'ListItem', position: 2, name: 'Enterprise', item: 'https://lumenquery.io/enterprise' },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'LumenQuery Enterprise',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Custom enterprise pricing - contact sales',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7366FF]/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-[#7366FF]/30 bg-[#7366FF]/10 px-4 py-1 text-xs font-medium tracking-wide text-[#7366FF]">
            ENTERPRISE
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Enterprise Stellar API Infrastructure
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#A8A9AD]">
            For teams building production applications on Stellar and Soroban.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-[#7366FF] transition-opacity hover:opacity-90"
            >
              Contact Sales
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          Built for Production
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#A8A9AD]">
          Everything your team needs to build, monitor, and scale Stellar applications
          without managing infrastructure.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/5 bg-[#262932] p-6 transition-colors hover:border-white/10"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7366FF]/15 text-[#7366FF]">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A8A9AD]">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          Who Uses LumenQuery Enterprise
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#A8A9AD]">
          Teams across the Stellar ecosystem rely on our infrastructure for
          mission-critical workloads.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="rounded-2xl border border-white/5 bg-[#262932] p-6"
            >
              <h3 className="text-lg font-semibold text-white">{uc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A8A9AD]">{uc.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          How We Compare
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#A8A9AD]">
          See how LumenQuery Enterprise stacks up against alternative approaches to
          Stellar infrastructure.
        </p>
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-[#262932]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 py-4 text-left font-semibold text-white">Feature</th>
                <th className="px-5 py-4 text-center font-semibold text-[#A8A9AD]">
                  Public Endpoints
                </th>
                <th className="px-5 py-4 text-center font-semibold text-[#A8A9AD]">
                  Self-Hosted
                </th>
                <th className="px-5 py-4 text-center font-semibold text-[#A8A9AD]">
                  Generic Provider
                </th>
                <th className="px-5 py-4 text-center font-semibold text-[#7366FF]">
                  LumenQuery Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={idx < comparisonRows.length - 1 ? 'border-b border-white/5' : ''}
                >
                  <td className="px-5 py-3 font-medium text-white">{row.feature}</td>
                  <td className="px-5 py-3 text-center text-[#A8A9AD]">{row.pub}</td>
                  <td className="px-5 py-3 text-center text-[#A8A9AD]">{row.self}</td>
                  <td className="px-5 py-3 text-center text-[#A8A9AD]">{row.generic}</td>
                  <td className="px-5 py-3 text-center font-medium text-[#7366FF]">{row.lq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-4 text-center text-3xl font-bold text-white">
          Getting Started
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#A8A9AD]">
          From first conversation to production in as little as one week.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-white/5 bg-[#262932] p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#7366FF] text-sm font-bold text-white">
                {s.step}
              </div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-[#A8A9AD]">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-white/5 bg-[#262932] p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A8A9AD]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="rounded-2xl border border-[#7366FF]/20 bg-gradient-to-br from-[#7366FF]/10 to-transparent p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold text-white">
            Ready to Build on Stellar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#A8A9AD]">
            Talk to our team about your requirements. We will put together a plan that
            matches your throughput, compliance, and support needs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-8 py-3 text-sm font-bold text-[#7366FF] transition-opacity hover:opacity-90"
            >
              Contact Sales
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border-2 border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              View Pricing
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[#A8A9AD]">
            <Link href="/sla" className="hover:text-white">
              SLA Details
            </Link>
            <Link href="/security" className="hover:text-white">
              Security
            </Link>
            <Link href="/stellar-api-provider-comparison" className="hover:text-white">
              Provider Comparison
            </Link>
            <Link href="/docs" className="hover:text-white">
              Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
