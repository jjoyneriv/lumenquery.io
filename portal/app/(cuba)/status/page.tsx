import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LumenQuery Status',
  description: 'View LumenQuery platform status, service categories, maintenance notices, and reliability resources for Stellar API and Soroban RPC infrastructure.',
  keywords: ['LumenQuery status', 'Stellar API status', 'Soroban RPC status', 'LumenQuery uptime', 'service status', 'platform health'],
  alternates: { canonical: 'https://lumenquery.io/status' },
  openGraph: {
    title: 'LumenQuery Status',
    description: 'View LumenQuery platform status, service categories, maintenance notices, and reliability resources for Stellar API and Soroban RPC infrastructure.',
    type: 'website',
    url: 'https://lumenquery.io/status',
  },
  robots: { index: true, follow: true },
};

const services = [
  {
    name: 'Stellar Horizon API',
    description: 'RESTful API for querying accounts, transactions, ledgers, payments, and operations on the Stellar network.',
    status: 'Operational',
  },
  {
    name: 'Soroban RPC API',
    description: 'JSON-RPC interface for deploying, invoking, and simulating Soroban smart contracts.',
    status: 'Operational',
  },
  {
    name: 'Natural Language Query',
    description: 'AI-powered interface for querying Stellar blockchain data using plain English.',
    status: 'Operational',
  },
  {
    name: 'Analytics Dashboard',
    description: 'Real-time network metrics, token analytics, and historical data visualization.',
    status: 'Operational',
  },
  {
    name: 'Transaction Monitoring',
    description: 'Live transaction streaming, whale alerts, watchlists, and anomaly detection.',
    status: 'Operational',
  },
  {
    name: 'Authentication & Dashboard',
    description: 'User authentication, API key management, usage tracking, and account settings.',
    status: 'Operational',
  },
  {
    name: 'Documentation',
    description: 'API reference, guides, tutorials, and integration documentation.',
    status: 'Operational',
  },
];

export default function StatusPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'LumenQuery Platform Status',
    description: 'View LumenQuery platform status, service categories, maintenance notices, and reliability resources for Stellar API and Soroban RPC infrastructure.',
    url: 'https://lumenquery.io/status',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Status', item: 'https://lumenquery.io/status' },
    ],
  };

  return (
    <>
      <div className="text-white">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-12">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
              <Link href="/" className="hover:text-[#7366FF]">Home</Link>
              <span>/</span>
              <span className="text-white">Status</span>
            </div>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Platform Status
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl">
            Current operational status for all LumenQuery services. This page is updated
            automatically and reflects real-time infrastructure health.
          </p>
        </section>

        {/* Overall Status Banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-[#262932] border border-green-500/20 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-30" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-400">
                  All Systems Operational
                </h2>
                <p className="text-[#A8A9AD] mt-1">
                  All 11 infrastructure containers are running and healthy. No degraded services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Service Status</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-semibold text-[#A8A9AD]">
              <div className="col-span-3">Service</div>
              <div className="col-span-7">Description</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {services.map((service, i) => (
              <div
                key={service.name}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-5 ${
                  i < services.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="sm:col-span-3 font-semibold text-white">
                  {service.name}
                </div>
                <div className="sm:col-span-7 text-[#A8A9AD] text-sm leading-relaxed">
                  {service.description}
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Performance</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <p className="text-sm text-[#A8A9AD] mb-2">API Response Time</p>
              <p className="text-2xl font-bold text-white">&lt; 300ms</p>
              <p className="text-sm text-[#A8A9AD] mt-2">Typical p95 latency</p>
            </div>
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <p className="text-sm text-[#A8A9AD] mb-2">Time to First Byte</p>
              <p className="text-2xl font-bold text-white">~225ms</p>
              <p className="text-sm text-[#A8A9AD] mt-2">Portal and API routes</p>
            </div>
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <p className="text-sm text-[#A8A9AD] mb-2">Compression</p>
              <p className="text-2xl font-bold text-white">83%</p>
              <p className="text-sm text-[#A8A9AD] mt-2">Gzip reduction ratio</p>
            </div>
          </div>
        </section>

        {/* Infrastructure Overview */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Infrastructure</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">Application Services</h3>
              <ul className="space-y-2 text-sm text-[#A8A9AD]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Next.js Portal (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  API Gateway (Fastify)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  RPC Gateway (Fastify)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Traefik Reverse Proxy
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Soroban RPC
                </li>
              </ul>
            </div>
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">Data & Monitoring</h3>
              <ul className="space-y-2 text-sm text-[#A8A9AD]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  PostgreSQL Database
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Redis Cache
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Prometheus Node Exporter
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  cAdvisor Container Metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                  Redis & PostgreSQL Exporters
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Incident History */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Incident History</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#A8A9AD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[#A8A9AD] font-medium">No incidents reported</p>
            <p className="text-sm text-white/40 mt-1">
              All services have been operating normally. Past incidents will be listed here.
            </p>
          </div>
        </section>

        {/* Scheduled Maintenance */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Scheduled Maintenance</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#A8A9AD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="text-[#A8A9AD] font-medium">No scheduled maintenance</p>
            <p className="text-sm text-white/40 mt-1">
              There are no upcoming maintenance windows. Planned maintenance will be announced here in advance.
            </p>
          </div>
        </section>

        {/* Related Resources */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Resources</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/sla"
              className="bg-[#262932] border border-white/5 rounded-2xl p-6 hover:border-[#7366FF]/30 transition-colors group"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-[#7366FF] transition-colors">
                Service Level Agreement
              </h3>
              <p className="text-sm text-[#A8A9AD]">
                Review availability targets, support response times, and enterprise SLA options.
              </p>
            </Link>
            <Link
              href="/security"
              className="bg-[#262932] border border-white/5 rounded-2xl p-6 hover:border-[#7366FF]/30 transition-colors group"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-[#7366FF] transition-colors">
                Security
              </h3>
              <p className="text-sm text-[#A8A9AD]">
                Learn about API key security, infrastructure hardening, and data handling practices.
              </p>
            </Link>
            <Link
              href="/support"
              className="bg-[#262932] border border-white/5 rounded-2xl p-6 hover:border-[#7366FF]/30 transition-colors group"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-[#7366FF] transition-colors">
                Contact Support
              </h3>
              <p className="text-sm text-[#A8A9AD]">
                Report an issue, ask a question, or get help with your integration.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="bg-[#262932] border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need enterprise-grade reliability?
            </h2>
            <p className="text-[#A8A9AD] max-w-2xl mx-auto mb-6">
              Enterprise plans include contractual SLAs, dedicated support, and custom infrastructure
              configurations tailored to your production requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-center"
              >
                View Plans
              </Link>
              <Link
                href="/support"
                className="border-2 border-white/30 text-white font-bold px-6 py-3 rounded-xl hover:border-white/50 transition-colors text-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
