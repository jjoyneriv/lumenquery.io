import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Level Agreement',
  description: 'Review LumenQuery service reliability targets, support expectations, maintenance communication, and enterprise SLA options.',
  keywords: ['LumenQuery SLA', 'service level agreement', 'Stellar API uptime', 'API reliability', 'enterprise SLA', 'support response time'],
  alternates: { canonical: 'https://lumenquery.io/sla' },
  openGraph: {
    title: 'Service Level Agreement',
    description: 'Review LumenQuery service reliability targets, support expectations, maintenance communication, and enterprise SLA options.',
    type: 'website',
    url: 'https://lumenquery.io/sla',
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: 'What does "best effort" mean for the Free tier?',
    answer: 'The Free tier provides access to all public API endpoints without a contractual availability guarantee. We aim to keep all services running at all times, but Free-tier users do not receive priority during incidents or capacity constraints.',
  },
  {
    question: 'How is uptime percentage calculated?',
    answer: 'Uptime is calculated as the total number of minutes in a billing month minus downtime minutes, divided by total minutes. Scheduled maintenance windows that are communicated at least 48 hours in advance are excluded from downtime calculations.',
  },
  {
    question: 'What happens if the SLA target is not met?',
    answer: 'Enterprise customers with contractual SLAs may be eligible for service credits as defined in their agreement. For Starter and Professional tiers, availability targets are goals rather than contractual commitments.',
  },
  {
    question: 'Does the SLA cover third-party dependencies?',
    answer: 'No. The SLA covers LumenQuery-operated infrastructure only. Downtime caused by the public Stellar network, upstream Horizon nodes operated by the Stellar Development Foundation, DNS providers, or other third-party services is excluded.',
  },
  {
    question: 'Can I get a custom SLA for my organization?',
    answer: 'Yes. Enterprise plans support custom SLA terms including specific uptime guarantees, dedicated infrastructure, priority incident response, and service credit policies. Contact our sales team to discuss your requirements.',
  },
];

export default function SlaPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'LumenQuery Service Level Agreement',
    description: 'Review LumenQuery service reliability targets, support expectations, maintenance communication, and enterprise SLA options.',
    url: 'https://lumenquery.io/sla',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Service Level Agreement', item: 'https://lumenquery.io/sla' },
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
              <span className="text-white">Service Level Agreement</span>
            </div>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Service Level Agreement
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl">
            This page summarizes LumenQuery&apos;s service reliability targets,
            support expectations, and maintenance communication practices.
            Enterprise SLA terms are available by contract.
          </p>
        </section>

        {/* Availability Targets */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-2">Availability Targets</h2>
          <p className="text-[#A8A9AD] mb-6">
            Availability targets represent the expected percentage of time that LumenQuery
            API endpoints and services are accessible within a given billing month.
          </p>

          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-semibold text-[#A8A9AD]">
              <div className="col-span-3">Plan</div>
              <div className="col-span-3">Availability</div>
              <div className="col-span-3">Monthly Downtime</div>
              <div className="col-span-3">Type</div>
            </div>

            {[
              { plan: 'Free', availability: 'Best effort', downtime: 'N/A', type: 'No guarantee' },
              { plan: 'Starter', availability: '99.5%', downtime: '~3.6 hours', type: 'Target' },
              { plan: 'Professional', availability: '99.9%', downtime: '~43 minutes', type: 'Target' },
              { plan: 'Enterprise', availability: 'Custom', downtime: 'Per contract', type: 'Contractual SLA' },
            ].map((row, i, arr) => (
              <div
                key={row.plan}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 ${
                  i < arr.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="sm:col-span-3 font-semibold text-white">{row.plan}</div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Availability:</span>
                  {row.availability}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Max downtime:</span>
                  {row.downtime}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Type:</span>
                  {row.type}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* API Rate Limits */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-2">API Reliability</h2>
          <p className="text-[#A8A9AD] mb-6">
            Rate limits protect platform stability and ensure fair access across all users.
            Requests exceeding the rate limit receive an HTTP 429 response with a Retry-After header.
          </p>

          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-semibold text-[#A8A9AD]">
              <div className="col-span-3">Plan</div>
              <div className="col-span-3">Rate Limit</div>
              <div className="col-span-3">Monthly Quota</div>
              <div className="col-span-3">Burst Allowance</div>
            </div>

            {[
              { plan: 'Free', rate: '60 req/min', quota: '10,000 requests', burst: 'None' },
              { plan: 'Starter', rate: '300 req/min', quota: '100,000 requests', burst: 'Up to 500/min' },
              { plan: 'Professional', rate: '1,000 req/min', quota: '1,000,000 requests', burst: 'Up to 2,000/min' },
              { plan: 'Enterprise', rate: 'Custom', quota: 'Unlimited', burst: 'Custom' },
            ].map((row, i, arr) => (
              <div
                key={row.plan}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 ${
                  i < arr.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="sm:col-span-3 font-semibold text-white">{row.plan}</div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Rate:</span>
                  {row.rate}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Quota:</span>
                  {row.quota}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Burst:</span>
                  {row.burst}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Response Targets */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-2">Support Response Targets</h2>
          <p className="text-[#A8A9AD] mb-6">
            Response targets indicate how quickly you can expect an initial reply from the
            LumenQuery team. Resolution times vary based on issue complexity.
          </p>

          <div className="bg-[#262932] border border-white/5 rounded-2xl overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-sm font-semibold text-[#A8A9AD]">
              <div className="col-span-3">Plan</div>
              <div className="col-span-3">Channels</div>
              <div className="col-span-3">Initial Response</div>
              <div className="col-span-3">Priority</div>
            </div>

            {[
              { plan: 'Free', channels: 'Docs & community', response: 'Best effort', priority: 'Standard' },
              { plan: 'Starter', channels: 'Email', response: 'Within 24 hours', priority: 'Normal' },
              { plan: 'Professional', channels: 'Priority email', response: 'Within 4 hours', priority: 'High' },
              { plan: 'Enterprise', channels: 'Dedicated support', response: 'Within 1 hour', priority: 'Critical' },
            ].map((row, i, arr) => (
              <div
                key={row.plan}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 ${
                  i < arr.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="sm:col-span-3 font-semibold text-white">{row.plan}</div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Channels:</span>
                  {row.channels}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Response:</span>
                  {row.response}
                </div>
                <div className="sm:col-span-3 text-[#A8A9AD]">
                  <span className="sm:hidden text-white/40 text-xs mr-2">Priority:</span>
                  {row.priority}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance Windows */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Maintenance & Communication</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">Planned Maintenance</h3>
              <ul className="space-y-3 text-sm text-[#A8A9AD]">
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Communicated at least 48 hours in advance via the status page
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Scheduled during low-traffic windows when possible
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Excluded from SLA downtime calculations for all tiers
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Enterprise customers receive direct notification via their preferred channel
                </li>
              </ul>
            </div>
            <div className="bg-[#262932] border border-white/5 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">Incident Communication</h3>
              <ul className="space-y-3 text-sm text-[#A8A9AD]">
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Incidents are posted to the status page as soon as they are identified
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Updates provided at regular intervals until resolution
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Post-incident summaries published for significant events
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7366FF] flex-shrink-0 mt-0.5">&#8226;</span>
                  Emergency maintenance may occur without prior notice if required for security or stability
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Exclusions */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Exclusions</h2>

          <div className="bg-[#262932] border border-white/5 rounded-2xl p-6 sm:p-8">
            <p className="text-[#A8A9AD] mb-4">
              The following are excluded from availability calculations and SLA commitments:
            </p>
            <ul className="space-y-3 text-sm text-[#A8A9AD]">
              <li className="flex gap-3">
                <span className="text-white/40 flex-shrink-0 font-mono text-xs mt-0.5">1.</span>
                <span><span className="text-white font-medium">Force majeure events</span> including natural disasters, war, government actions, and other events beyond reasonable control.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/40 flex-shrink-0 font-mono text-xs mt-0.5">2.</span>
                <span><span className="text-white font-medium">Scheduled maintenance</span> that has been communicated at least 48 hours in advance via the status page.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/40 flex-shrink-0 font-mono text-xs mt-0.5">3.</span>
                <span><span className="text-white font-medium">Third-party dependencies</span> including the public Stellar network, Stellar Development Foundation infrastructure, DNS providers, and certificate authorities.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/40 flex-shrink-0 font-mono text-xs mt-0.5">4.</span>
                <span><span className="text-white font-medium">Customer-caused issues</span> including exceeding rate limits, misconfigured API keys, or abuse that triggers protective measures.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-white/40 flex-shrink-0 font-mono text-xs mt-0.5">5.</span>
                <span><span className="text-white font-medium">Beta features</span> and preview endpoints that are explicitly marked as non-production.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-[#262932] border border-white/5 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="bg-[#262932] border border-white/10 rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Need a contractual SLA?
            </h2>
            <p className="text-[#A8A9AD] max-w-2xl mx-auto mb-6">
              Enterprise plans include binding SLA terms with service credits, dedicated infrastructure,
              custom rate limits, and priority incident response tailored to your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="bg-white text-[#7366FF] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors text-center"
              >
                View Enterprise Plan
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
