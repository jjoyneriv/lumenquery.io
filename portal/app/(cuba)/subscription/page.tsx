'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface SubscriptionData {
  plan: string;
  isActive: boolean;
  hasSubscription: boolean;
  currentPeriodEnd: string | null;
  features: {
    monthlyRequests: number;
    sorobanPro: boolean;
    intelligence: boolean;
    portfolio: boolean;
    export: boolean;
    realTimeStream: boolean;
    contractsLimit: number;
  };
}

const planDetails: Record<string, { name: string; price: string; color: string }> = {
  FREE: { name: 'Free', price: '$0/mo', color: 'bg-white/5 text-[#A8A9AD]' },
  DEVELOPER: { name: 'Starter', price: '$29/mo', color: 'bg-[#40B8F4]/10 text-[#40B8F4]' },
  TEAM: { name: 'Professional', price: '$49/mo', color: 'bg-[#7366FF]/10 text-[#7366FF]' },
  ENTERPRISE: { name: 'Enterprise', price: 'Custom', color: 'bg-[#FFB829]/10 text-[#FFB829]' },
};

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" /></div>}>
      <SubscriptionContent />
    </Suspense>
  );
}

function SubscriptionContent() {
  const { data: session, status: authStatus } = useSession();
  const searchParams = useSearchParams();
  const [sub, setSub] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<'XLM' | 'USDC'>('USDC');
  const success = searchParams.get('success');

  useEffect(() => {
    if (authStatus === 'authenticated') fetchSubscription();
    else if (authStatus === 'unauthenticated') setLoading(false);
  }, [authStatus]);

  async function fetchSubscription() {
    try {
      const res = await fetch('/api/subscription');
      if (res.ok) {
        const data = await res.json();
        setSub(data.subscription);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout(plan: string) {
    setActionLoading(plan);
    try {
      const res = await fetch('/api/crypto/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, currency: selectedCurrency }),
      });
      const data = await res.json();
      if (data.payment?.id) {
        window.location.href = `/pay/${data.payment.id}`;
      } else {
        alert(data.error || 'Failed to create payment');
      }
    } catch {
      alert('Failed to start checkout');
    } finally {
      setActionLoading(null);
    }
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="text-white max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold mb-3">Subscription</h1>
        <p className="text-[#A8A9AD] mb-6">Sign in to manage your subscription.</p>
        <Link href="/auth/signin" className="px-6 py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  const currentPlan = planDetails[sub?.plan || 'FREE'] || planDetails.FREE;

  return (
    <div className="text-white max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subscription & Billing</h1>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
          <p className="text-green-400 text-sm">Subscription activated successfully! Your account has been upgraded.</p>
        </div>
      )}

      {/* Current Plan */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#A8A9AD] uppercase tracking-wider mb-2">Current Plan</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${currentPlan.color}`}>
                {currentPlan.name}
              </span>
              <span className="text-lg font-bold">{currentPlan.price}</span>
            </div>
            {sub?.currentPeriodEnd && (
              <p className="text-xs text-[#A8A9AD] mt-2">
                {sub.isActive ? 'Renews' : 'Expired'}: {new Date(sub.currentPeriodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
          {sub?.hasSubscription && (
            <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium">
              Paid with Crypto
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 p-6 mb-6">
        <h2 className="font-semibold text-sm mb-4">Your Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <FeatureItem label="Monthly API Requests" value={sub?.features.monthlyRequests?.toLocaleString() || '10,000'} />
          <FeatureItem label="Soroban Pro" value={sub?.features.sorobanPro ? 'Enabled' : 'Disabled'} enabled={sub?.features.sorobanPro} />
          <FeatureItem label="Intelligence" value={sub?.features.intelligence ? 'Enabled' : 'Disabled'} enabled={sub?.features.intelligence} />
          <FeatureItem label="Portfolio" value={sub?.features.portfolio ? 'Enabled' : 'Disabled'} enabled={sub?.features.portfolio} />
          <FeatureItem label="CSV/JSON Export" value={sub?.features.export ? 'Enabled' : 'Disabled'} enabled={sub?.features.export} />
          <FeatureItem label="Real-Time Streaming" value={sub?.features.realTimeStream ? 'Enabled' : 'Disabled'} enabled={sub?.features.realTimeStream} />
        </div>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{sub?.plan === 'FREE' ? 'Upgrade Your Plan' : 'Change Plan'}</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#A8A9AD]">Pay with:</span>
          <button
            onClick={() => setSelectedCurrency('USDC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCurrency === 'USDC' ? 'bg-[#40B8F4]/10 text-[#40B8F4] border border-[#40B8F4]/30' : 'bg-white/5 text-[#A8A9AD] border border-white/10'}`}
          >
            USDC
          </button>
          <button
            onClick={() => setSelectedCurrency('XLM')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCurrency === 'XLM' ? 'bg-[#7366FF]/10 text-[#7366FF] border border-[#7366FF]/30' : 'bg-white/5 text-[#A8A9AD] border border-white/10'}`}
          >
            XLM
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Starter */}
        <PlanCard
          name="Starter"
          price="$29"
          period="/mo"
          features={['100K requests/month', '300 req/min', 'Soroban Pro access', 'CSV/JSON export', 'Email support']}
          current={sub?.plan === 'DEVELOPER'}
          highlighted={false}
          onSelect={() => handleCheckout('starter')}
          loading={actionLoading === 'starter'}
          disabled={sub?.plan === 'DEVELOPER' || sub?.plan === 'TEAM' || sub?.plan === 'ENTERPRISE'}
        />

        {/* Professional */}
        <PlanCard
          name="Professional"
          price="$49"
          period="/mo"
          features={['1M requests/month', '1K req/min', 'All Starter features', 'Transaction Intelligence', 'Portfolio tracking', 'Real-time streaming', 'Priority support']}
          current={sub?.plan === 'TEAM'}
          highlighted={true}
          onSelect={() => handleCheckout('professional')}
          loading={actionLoading === 'professional'}
          disabled={sub?.plan === 'TEAM' || sub?.plan === 'ENTERPRISE'}
        />

        {/* Enterprise */}
        <PlanCard
          name="Enterprise"
          price="Custom"
          period=""
          features={['Unlimited requests', 'Custom rate limits', 'Dedicated infrastructure', 'SLA guarantee', 'Custom integrations', '24/7 phone support']}
          current={sub?.plan === 'ENTERPRISE'}
          highlighted={false}
          ctaText="Contact Sales"
          ctaHref="mailto:sales@lumenquery.io"
          disabled={sub?.plan === 'ENTERPRISE'}
        />
      </div>

      {/* Billing FAQ */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 p-6">
        <h2 className="font-semibold text-sm mb-4">Billing FAQ</h2>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium mb-1">What currencies do you accept?</p>
            <p className="text-[#A8A9AD]">We accept XLM (Stellar Lumens) and USDC on the Stellar network. USDC is priced 1:1 with USD. XLM price is calculated at checkout.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How does subscription renewal work?</p>
            <p className="text-[#A8A9AD]">Subscriptions are valid for 30 days from payment confirmation. To renew, simply make a new payment before your subscription expires.</p>
          </div>
          <div>
            <p className="font-medium mb-1">What wallets can I use?</p>
            <p className="text-[#A8A9AD]">Any Stellar wallet works: LOBSTR, StellarX, Solar, Freighter, or any wallet that supports Stellar (XLM) and USDC on Stellar.</p>
          </div>
          <div>
            <p className="font-medium mb-1">How long does payment take?</p>
            <p className="text-[#A8A9AD]">Stellar transactions confirm in 3-5 seconds. Your subscription activates immediately upon payment detection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ label, value, enabled }: { label: string; value: string; enabled?: boolean }) {
  return (
    <div className="p-3 rounded-xl bg-[#1D1E26] border border-white/5">
      <p className="text-[11px] text-[#A8A9AD] mb-1">{label}</p>
      <p className={`text-sm font-semibold ${enabled === false ? 'text-[#A8A9AD]' : enabled ? 'text-green-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  );
}

function PlanCard({
  name, price, period, features, current, highlighted, onSelect, loading, disabled, ctaText, ctaHref,
}: {
  name: string; price: string; period: string; features: string[];
  current: boolean; highlighted: boolean;
  onSelect?: () => void; loading?: boolean; disabled?: boolean;
  ctaText?: string; ctaHref?: string;
}) {
  return (
    <div className={`bg-[#262932] rounded-2xl border p-5 flex flex-col ${highlighted ? 'border-[#7366FF]/40 ring-1 ring-[#7366FF]/20' : 'border-white/5'}`}>
      {highlighted && (
        <span className="self-start px-2 py-0.5 rounded bg-[#7366FF] text-white text-[9px] font-bold uppercase mb-3">Most Popular</span>
      )}
      {current && (
        <span className="self-start px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-bold uppercase mb-3">Current Plan</span>
      )}
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <div className="mb-3">
        <span className="text-2xl font-bold">{price}</span>
        {period && <span className="text-sm text-[#A8A9AD]">{period}</span>}
      </div>
      <ul className="space-y-2 mb-5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs">
            <svg className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[#A8A9AD]">{f}</span>
          </li>
        ))}
      </ul>
      {ctaHref ? (
        <a href={ctaHref} className="block text-center py-2.5 rounded-lg border border-white/10 text-sm font-medium text-[#A8A9AD] hover:text-white hover:bg-white/5 transition-colors">
          {ctaText || 'Select'}
        </a>
      ) : current ? (
        <span className="block text-center py-2.5 rounded-lg bg-white/5 text-sm font-medium text-[#A8A9AD]">
          Current Plan
        </span>
      ) : (
        <button
          onClick={onSelect}
          disabled={disabled || loading}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
            highlighted
              ? 'bg-[#7366FF] hover:bg-[#5A4FCF] text-white'
              : 'border border-white/10 text-white hover:bg-white/5'
          }`}
        >
          {loading ? 'Redirecting...' : disabled ? 'Included' : 'Upgrade'}
        </button>
      )}
    </div>
  );
}
