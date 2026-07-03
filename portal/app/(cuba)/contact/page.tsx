import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact LumenQuery',
  description:
    'Contact LumenQuery for sales, support, enterprise API access, higher rate limits, security reviews, partnerships, and Stellar infrastructure questions.',
  openGraph: {
    title: 'Contact LumenQuery',
    description:
      'Contact LumenQuery for sales, support, enterprise API access, higher rate limits, security reviews, partnerships, and Stellar infrastructure questions.',
    url: 'https://lumenquery.io/contact',
    type: 'website',
  },
  alternates: { canonical: 'https://lumenquery.io/contact' },
};

const contactCards = [
  {
    label: 'Sales',
    email: 'sales@lumenquery.io',
    description: 'Enterprise plans, custom pricing, higher limits',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797-2.101c.727.198 1.453.406 2.168.624M2.25 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h15a2.25 2.25 0 0 1 2.25 2.25v1.294M2.25 18.75l9.056-5.252a1.5 1.5 0 0 1 1.388 0l9.056 5.252" />
      </svg>
    ),
  },
  {
    label: 'Support',
    email: 'support@lumenquery.io',
    description: 'Technical help, API questions, troubleshooting',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    label: 'Security',
    email: 'support@lumenquery.io',
    description: 'Security inquiries, responsible disclosure',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: 'Partnerships',
    email: 'sales@lumenquery.io',
    description: 'Integration partnerships, ecosystem collaboration',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

const useCases = [
  'API Access',
  'Enterprise Plan',
  'Higher Rate Limits',
  'Transaction Monitoring',
  'Analytics',
  'Soroban RPC',
  'Security Review',
  'Partnership',
  'Other',
];

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Contact LumenQuery',
    description:
      'Contact LumenQuery for sales, support, enterprise API access, higher rate limits, security reviews, partnerships, and Stellar infrastructure questions.',
    url: 'https://lumenquery.io/contact',
    publisher: {
      '@type': 'Organization',
      name: 'LumenQuery',
      url: 'https://lumenquery.io',
    },
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@lumenquery.io',
      availableLanguage: 'English',
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
          name: 'Contact',
          item: 'https://lumenquery.io/contact',
        },
      ],
    },
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
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#A8A9AD]">
            Whether you need enterprise API access, higher rate limits, security reviews, or
            have questions about Stellar infrastructure.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={`mailto:${card.email}`}
              className="group rounded-2xl border border-white/5 bg-[#262932] p-6 transition-colors hover:border-[#7366FF]/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7366FF]/15 text-[#7366FF]">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-white">{card.label}</h2>
              <p className="mt-1 text-sm text-[#A8A9AD]">{card.description}</p>
              <p className="mt-3 text-sm font-medium text-[#7366FF] transition-colors group-hover:text-white">
                {card.email}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <div className="rounded-2xl border border-white/5 bg-[#262932] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
          <p className="mt-2 text-sm text-[#A8A9AD]">
            Fill out the details below and email your inquiry to our sales team. Clicking
            &quot;Open Email Client&quot; will compose a pre-filled email for you.
          </p>

          <div className="mt-8 space-y-6">
            {/* Name + Email */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Name</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#A8A9AD]">
                  Your full name
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">
                  Work Email
                </label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#A8A9AD]">
                  you@company.com
                </div>
              </div>
            </div>

            {/* Company + Use Case */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Company</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#A8A9AD]">
                  Company name
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-white">Use Case</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#A8A9AD]">
                  <span className="flex items-center justify-between">
                    Select a use case
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {useCases.map((uc) => (
                    <span
                      key={uc}
                      className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-[#A8A9AD]"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white">Message</label>
              <div className="h-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#A8A9AD]">
                Describe your project, requirements, and any questions...
              </div>
            </div>

            {/* Submit via mailto */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="mailto:sales@lumenquery.io?subject=LumenQuery%20Inquiry&body=Hi%20LumenQuery%20team%2C%0A%0AName%3A%20%0ACompany%3A%20%0AUse%20Case%3A%20%0A%0AMessage%3A%0A"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-sm font-bold text-[#7366FF] transition-opacity hover:opacity-90"
              >
                Open Email Client
              </a>
              <p className="text-sm text-[#A8A9AD]">
                Or email us directly at{' '}
                <a
                  href="mailto:sales@lumenquery.io"
                  className="font-medium text-[#7366FF] hover:underline"
                >
                  sales@lumenquery.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Expected Response Times
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Sales Inquiries', time: 'Within 24 hours', color: 'text-[#7366FF]' },
            { label: 'Technical Support', time: 'Within 48 hours', color: 'text-[#40B8F4]' },
            { label: 'Security Reports', time: 'Within 24 hours', color: 'text-[#FC564A]' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/5 bg-[#262932] p-6 text-center"
            >
              <p className={`text-2xl font-bold ${item.color}`}>{item.time}</p>
              <p className="mt-2 text-sm text-[#A8A9AD]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Before You Reach Out
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-[#A8A9AD]">
          You might find what you need in our existing resources.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Enterprise Plans',
              description: 'Custom infrastructure for production teams',
              href: '/enterprise',
            },
            {
              title: 'Pricing',
              description: 'Explore tiers and feature comparison',
              href: '/pricing',
            },
            {
              title: 'Documentation',
              description: 'API guides, endpoints, and examples',
              href: '/docs',
            },
            {
              title: 'Service Level Agreement',
              description: 'Uptime guarantees and support levels',
              href: '/sla',
            },
          ].map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group rounded-2xl border border-white/5 bg-[#262932] p-6 transition-colors hover:border-[#7366FF]/40"
            >
              <h3 className="font-semibold text-white group-hover:text-[#7366FF]">
                {link.title}
              </h3>
              <p className="mt-1 text-sm text-[#A8A9AD]">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
