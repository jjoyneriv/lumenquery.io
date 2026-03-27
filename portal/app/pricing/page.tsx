'use client';

import Link from 'next/link';

const sorobanTiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic contract exploration',
    features: [
      '10 contracts/month',
      '7 days call history',
      'Basic storage view',
      'Event stream',
      'Community support',
    ],
    notIncluded: [
      'Export (CSV/JSON)',
      'Real-time streaming',
      'Version comparison',
      'API access',
    ],
    cta: 'Get Started',
    ctaLink: '/auth/signup',
    highlighted: false,
  },
  {
    name: 'Developer',
    price: '$25',
    period: '/month',
    description: 'For individual developers building on Soroban',
    features: [
      '50 contracts/month',
      '30 days call history',
      'Export (CSV/JSON)',
      'Version comparison',
      'API access',
      'Email support',
    ],
    notIncluded: [
      'Real-time streaming',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/auth/signup?tier=developer',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$99',
    period: '/month',
    description: 'For teams and growing projects',
    features: [
      'Unlimited contracts',
      '90 days call history',
      'Real-time event streaming',
      'Export (CSV/JSON)',
      'Version comparison',
      'Full API access',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Start Free Trial',
    ctaLink: '/auth/signup?tier=team',
    highlighted: false,
  },
  {
    name: 'Auditor',
    price: 'Custom',
    period: '/engagement',
    description: 'For security auditors and compliance teams',
    features: [
      'Unlimited contracts',
      'Full call history',
      'Real-time streaming',
      'PDF audit reports',
      'Version comparison',
      'Full API access',
      'Dedicated support',
      'Custom data retention',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    ctaLink: 'mailto:sales@lumenquery.io',
    highlighted: false,
  },
];

const intelligenceTiers = [
  {
    name: 'Solo',
    price: '$49',
    period: '/month',
    description: 'For individual traders and analysts',
    features: [
      '2 concurrent streams',
      '50 watchlist accounts',
      '10 alert configurations',
      '100K XLM whale threshold',
      'Email notifications',
    ],
    notIncluded: ['Webhook notifications'],
    cta: 'Get Solo',
    ctaLink: '/intelligence/upgrade',
    highlighted: false,
  },
  {
    name: 'Teams',
    price: '$199',
    period: '/month',
    description: 'For funds, compliance teams, and DAOs',
    features: [
      '10 concurrent streams',
      '500 watchlist accounts',
      '50 alert configurations',
      '50K XLM whale threshold',
      'Email + Webhook notifications',
      'Anomaly detection',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Get Teams',
    ctaLink: '/intelligence/upgrade',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For exchanges and large organizations',
    features: [
      'Unlimited streams',
      'Unlimited watchlist accounts',
      'Unlimited alert configurations',
      'Custom whale thresholds',
      'All notification channels',
      'Dedicated support + SLA',
      'Custom integrations',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    ctaLink: 'mailto:sales@lumenquery.io',
    highlighted: false,
  },
];

const faqs = [
  {
    question: 'What counts as a contract exploration?',
    answer: 'Each unique contract you view counts towards your monthly limit. Viewing the same contract multiple times only counts once per month.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, processed securely through Stripe. Enterprise customers can also pay via invoice.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Developer and Team plans include a 14-day free trial with full access to all features. No credit card required to start.',
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#7366FF] to-[#5A4FCF] text-white">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Simple, Transparent Pricing</h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto">
            Choose the plan that fits your needs. All plans include access to the Stellar network analytics dashboard.
          </p>
        </div>
      </div>

      {/* Soroban Pro Section */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">Soroban Pro</h2>
            <p className="text-xs text-gray-400">Smart contract explorer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sorobanTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border-2 ${
                tier.highlighted
                  ? 'border-[#7366FF] shadow-lg shadow-[#7366FF]/10'
                  : 'border-white/10'
              } p-4 flex flex-col bg-[#262932]`}
            >
              {tier.highlighted && (
                <div className="text-center mb-3">
                  <span className="inline-block px-2 py-0.5 bg-[#7366FF] text-white text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">{tier.price}</span>
                <span className="text-gray-400 text-sm">{tier.period}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">{tier.description}</p>

              <ul className="space-y-2 mb-4 flex-1 text-xs">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-gray-400">
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaLink}
                className={`w-full py-2 rounded-lg text-center font-medium text-sm transition-colors ${
                  tier.highlighted
                    ? 'bg-[#7366FF] text-white hover:bg-[#1e44cc]'
                    : 'bg-[#1D1E26] text-white hover:bg-white/10'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Intelligence Section */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">Transaction Intelligence</h2>
            <p className="text-xs text-gray-400">Real-time monitoring & alerts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {intelligenceTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border-2 ${
                tier.highlighted
                  ? 'border-[#7366FF] shadow-lg shadow-[#7366FF]/10'
                  : 'border-white/10'
              } p-4 flex flex-col bg-[#262932]`}
            >
              {tier.highlighted && (
                <div className="text-center mb-3">
                  <span className="inline-block px-2 py-0.5 bg-[#7366FF] text-white text-xs font-medium rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-gray-400 text-sm">{tier.period}</span>}
              </div>
              <p className="text-xs text-gray-400 mb-4">{tier.description}</p>

              <ul className="space-y-2 mb-4 flex-1 text-xs">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
                {tier.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-gray-400">
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaLink}
                className={`w-full py-2 rounded-lg text-center font-medium text-sm transition-colors ${
                  tier.highlighted
                    ? 'bg-[#7366FF] text-white hover:bg-[#1e44cc]'
                    : 'bg-[#1D1E26] text-white hover:bg-white/10'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <h2 className="text-lg font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-4 rounded-lg bg-[#1D1E26]">
              <h3 className="font-semibold text-sm mb-2">{faq.question}</h3>
              <p className="text-xs text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Ready to explore Soroban contracts?</h2>
          <p className="text-white/80 text-sm mb-4">Start with the free plan and upgrade when you need more.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contracts"
              className="px-6 py-2 bg-white text-[#7366FF] rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
            >
              Start Exploring
            </Link>
            <Link
              href="/docs"
              className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
