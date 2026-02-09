'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const tiers = [
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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col">
      <Header activePage="pricing" />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-black to-[#1a1a2e] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to
              the Stellar network analytics dashboard.
            </p>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="py-12 px-4 -mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-white rounded-xl border-2 ${
                    tier.highlighted
                      ? 'border-[#2855FF] shadow-lg shadow-[#2855FF]/10'
                      : 'border-[#E6E7E9]'
                  } p-6 flex flex-col`}
                >
                  {tier.highlighted && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 bg-[#2855FF] text-white text-xs font-medium rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-[#6A6A6A]">{tier.period}</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A] mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {tier.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#6A6A6A]"
                      >
                        <svg
                          className="w-5 h-5 text-gray-300 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.ctaLink}
                    className={`w-full py-3 rounded-lg text-center font-medium transition-colors ${
                      tier.highlighted
                        ? 'bg-[#2855FF] text-white hover:bg-[#1e44cc]'
                        : 'bg-[#F5F6F7] text-black hover:bg-[#E6E7E9]'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What counts as a contract exploration?</h3>
                <p className="text-[#6A6A6A]">
                  Each unique contract you view counts towards your monthly limit. Viewing the
                  same contract multiple times only counts once per month.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-[#6A6A6A]">
                  Yes, you can change your plan at any time. Upgrades take effect immediately,
                  and downgrades take effect at the start of your next billing cycle.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-[#6A6A6A]">
                  We accept all major credit cards, processed securely through Stripe.
                  Enterprise customers can also pay via invoice.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-[#6A6A6A]">
                  Yes! Developer and Team plans include a 14-day free trial with full access
                  to all features. No credit card required to start.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to explore Soroban contracts?</h2>
            <p className="text-[#6A6A6A] mb-8">
              Start with the free plan and upgrade when you need more.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contracts"
                className="px-8 py-3 bg-[#2855FF] text-white rounded-lg font-medium hover:bg-[#1e44cc] transition-colors"
              >
                Start Exploring
              </Link>
              <Link
                href="/docs"
                className="px-8 py-3 bg-white border border-[#E6E7E9] rounded-lg font-medium hover:border-[#2855FF] transition-colors"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
