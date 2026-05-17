'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IntelligenceNav } from '@/components/intelligence';

const tiers = [
  {
    name: 'Solo',
    price: '$49',
    period: '/month',
    description: 'For individual traders and analysts',
    features: [
      '2 concurrent streams',
      '50 watchlist accounts',
      '10 alert configurations',
      '30-day alert retention',
      '100K XLM whale threshold',
      '30-day historical data',
      'Email notifications',
    ],
    cta: 'Start Solo',
    popular: false,
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
      '90-day alert retention',
      '50K XLM whale threshold',
      '90-day historical data',
      'Email + Webhook notifications',
      'Anomaly detection',
      'Priority support',
    ],
    cta: 'Start Teams',
    popular: true,
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
      '1-year+ alert retention',
      'Custom whale thresholds',
      'Unlimited historical data',
      'All notification channels',
      'Advanced anomaly detection',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function UpgradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/upgrade');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[#262932] rounded-xl border border-white/10 p-4 sticky top-8">
            <h2 className="font-semibold text-white mb-4">Intelligence</h2>
            <IntelligenceNav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <header className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Upgrade Your Intelligence
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to
              real-time transaction streaming, account profiling, and custom alerts.
            </p>
          </header>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-[#262932] rounded-xl border p-6 relative ${
                  tier.popular
                    ? 'border-[#7366FF] shadow-lg'
                    : 'border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#7366FF] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400">{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    tier.popular
                      ? 'bg-[#7366FF] text-white hover:bg-[#5A4FCF]'
                      : 'bg-[#1D1E26] text-white hover:bg-white/10'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-white">
                  What counts as a concurrent stream?
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Each active SSE connection to the live transaction stream counts as one
                  concurrent stream. Multiple browser tabs each count separately.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white">
                  How does the whale threshold work?
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Whale alerts trigger for XLM transfers exceeding your threshold.
                  Lower thresholds (Teams/Enterprise) help you catch more significant movements.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-white">
                  Can I upgrade or downgrade at any time?
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Yes, you can change your plan at any time. Upgrades take effect immediately,
                  and downgrades apply at the end of your billing cycle.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center text-gray-400">
            <p>
              Have questions? {' '}
              <a
                href="mailto:support@lumenquery.io"
                className="text-[#7366FF] hover:text-[#5A4FCF]"
              >
                Contact our sales team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
