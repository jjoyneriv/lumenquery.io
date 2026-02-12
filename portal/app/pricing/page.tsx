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

        {/* Intelligence Tiers */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Transaction Intelligence
              </h2>
              <p className="text-[#6A6A6A] max-w-2xl mx-auto">
                Real-time monitoring, whale alerts, and account behavior analytics.
                Built for funds, exchanges, DAOs, and compliance teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Solo */}
              <div className="bg-[#F5F6F7] rounded-xl border border-[#E6E7E9] p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Solo</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-[#6A6A6A]">/month</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For individual traders and analysts
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2 concurrent streams
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    50 watchlist accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    10 alert configurations
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100K XLM whale threshold
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email notifications
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#6A6A6A]">
                    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Webhook notifications
                  </li>
                </ul>

                <Link
                  href="/intelligence/upgrade"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#E6E7E9] text-black hover:bg-[#D4D5D7] transition-colors"
                >
                  Get Solo
                </Link>
              </div>

              {/* Teams */}
              <div className="bg-white rounded-xl border-2 border-[#2855FF] shadow-lg shadow-[#2855FF]/10 p-6 flex flex-col">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-[#2855FF] text-white text-xs font-medium rounded-full">
                    Recommended
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">Teams</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$199</span>
                  <span className="text-[#6A6A6A]">/month</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For funds, compliance teams, and DAOs
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    10 concurrent streams
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    500 watchlist accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    50 alert configurations
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    50K XLM whale threshold
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email + Webhook notifications
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Anomaly detection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>

                <Link
                  href="/intelligence/upgrade"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#2855FF] text-white hover:bg-[#1E44CC] transition-colors"
                >
                  Get Teams
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-[#F5F6F7] rounded-xl border border-[#E6E7E9] p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For exchanges and large organizations
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited streams
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited watchlist accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited alert configurations
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom whale thresholds
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All notification channels
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support + SLA
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </li>
                </ul>

                <Link
                  href="mailto:sales@lumenquery.io"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#E6E7E9] text-black hover:bg-[#D4D5D7] transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & AML */}
        <section className="py-16 px-4 bg-[#F5F6F7]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Compliance & AML Monitoring
              </h2>
              <p className="text-[#6A6A6A] max-w-2xl mx-auto">
                Enterprise-grade compliance monitoring with sanctions screening,
                circular payment detection, and audit-ready reporting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Basic */}
              <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-[#6A6A6A]">/month</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For small teams starting with compliance
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100 monitored accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    10 custom rules
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Velocity & volume monitoring
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly compliance reports
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    90-day audit retention
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#6A6A6A]">
                    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Sanctions screening
                  </li>
                  <li className="flex items-start gap-2 text-sm text-[#6A6A6A]">
                    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cycle detection
                  </li>
                </ul>

                <Link
                  href="/compliance/upgrade"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#F5F6F7] text-black hover:bg-[#E6E7E9] transition-colors"
                >
                  Get Basic
                </Link>
              </div>

              {/* Standard */}
              <div className="bg-white rounded-xl border-2 border-[#2855FF] shadow-lg shadow-[#2855FF]/10 p-6 flex flex-col">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-[#2855FF] text-white text-xs font-medium rounded-full">
                    Recommended
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2">Standard</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$149</span>
                  <span className="text-[#6A6A6A]">/month</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For growing compliance teams
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    500 monitored accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    50 custom rules
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    OFAC/SDN sanctions screening
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Circular payment detection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mixer pattern detection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All compliance reports
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Webhook notifications
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    1-year audit retention
                  </li>
                </ul>

                <Link
                  href="/compliance/upgrade"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#2855FF] text-white hover:bg-[#1E44CC] transition-colors"
                >
                  Get Standard
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-white rounded-xl border border-[#E6E7E9] p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-[#6A6A6A] mb-6">
                  For large organizations with advanced needs
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited monitored accounts
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited custom rules
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full sanctions screening
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced cycle detection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contract abuse monitoring
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Anomaly detection
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Slack integration
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited audit retention
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support + SLA
                  </li>
                </ul>

                <Link
                  href="mailto:sales@lumenquery.io"
                  className="w-full py-3 rounded-lg text-center font-medium bg-[#F5F6F7] text-black hover:bg-[#E6E7E9] transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
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
