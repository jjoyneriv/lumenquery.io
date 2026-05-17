'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Payment {
  id: string;
  plan: string;
  currency: string;
  amount: string;
  amountUsd: number;
  memo: string;
  toAddress: string;
  status: string;
  txHash: string | null;
  expiresAt: string;
  subscriptionEnd: string | null;
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const paymentId = params.paymentId as string;
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  const fetchPayment = useCallback(async () => {
    const res = await fetch(`/api/crypto/verify/${paymentId}`);
    if (res.ok) {
      const data = await res.json();
      setPayment(data.payment);
    }
    setLoading(false);
  }, [paymentId]);

  useEffect(() => { fetchPayment(); }, [fetchPayment]);

  // Countdown timer
  useEffect(() => {
    if (!payment || payment.status !== 'PENDING') return;
    const interval = setInterval(() => {
      const remaining = new Date(payment.expiresAt).getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeft('Expired');
        fetchPayment();
        clearInterval(interval);
      } else {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [payment, fetchPayment]);

  // Auto-poll for confirmation every 10 seconds
  useEffect(() => {
    if (!payment || payment.status !== 'PENDING') return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/crypto/verify/${paymentId}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setPayment(data.payment);
        if (data.payment.status === 'CONFIRMED') {
          setMessage('Payment confirmed! Subscription activated.');
          clearInterval(interval);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [payment, paymentId]);

  async function handleVerify() {
    setVerifying(true);
    setMessage('');
    try {
      const res = await fetch(`/api/crypto/verify/${paymentId}`, { method: 'POST' });
      const data = await res.json();
      setPayment(data.payment);
      setMessage(data.message || data.error || '');
    } catch {
      setMessage('Verification failed. Try again.');
    } finally {
      setVerifying(false);
    }
  }

  function copyText(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) {
    return <div className="flex items-center justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" /></div>;
  }

  if (!payment) {
    return (
      <div className="text-white text-center py-16">
        <p className="text-[#A8A9AD] mb-4">Payment not found</p>
        <Link href="/subscription" className="text-[#7366FF] hover:underline">Back to Subscription</Link>
      </div>
    );
  }

  if (payment.status === 'CONFIRMED') {
    return (
      <div className="text-white max-w-xl mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Payment Confirmed!</h1>
        <p className="text-[#A8A9AD] mb-2">Your <span className="text-white font-medium">{payment.plan.charAt(0).toUpperCase() + payment.plan.slice(1)}</span> subscription is now active.</p>
        <p className="text-xs text-[#A8A9AD] mb-2">{payment.amount} {payment.currency} received</p>
        {payment.txHash && (
          <a href={`https://stellar.expert/explorer/public/tx/${payment.txHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#7366FF] hover:underline mb-6 inline-block">
            View transaction on Stellar Expert
          </a>
        )}
        {payment.subscriptionEnd && (
          <p className="text-xs text-[#A8A9AD] mb-6">Active until: {new Date(payment.subscriptionEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        )}
        <div className="flex justify-center gap-3 mt-6">
          <Link href="/subscription" className="px-5 py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors">
            View Subscription
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-[#A8A9AD] hover:text-white transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (payment.status === 'EXPIRED') {
    return (
      <div className="text-white max-w-xl mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#FFB829]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Payment Expired</h1>
        <p className="text-[#A8A9AD] mb-6">The payment window has closed. Please create a new payment.</p>
        <Link href="/subscription" className="px-5 py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors">
          Back to Subscription
        </Link>
      </div>
    );
  }

  // PENDING - show payment instructions
  return (
    <div className="text-white max-w-xl mx-auto">
      <Link href="/subscription" className="inline-flex items-center gap-1.5 text-sm text-[#A8A9AD] hover:text-white transition-colors mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back
      </Link>

      <div className="bg-[#262932] rounded-2xl border border-white/5 p-6 mb-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Send Payment</h1>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB829] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB829]"></span>
            </span>
            <span className="text-xs text-[#FFB829] font-medium">{timeLeft} remaining</span>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-xl p-5 mb-6 text-center">
          <p className="text-white/70 text-xs mb-1">Send exactly</p>
          <p className="text-3xl font-bold text-white">{payment.amount} {payment.currency}</p>
          <p className="text-white/60 text-xs mt-1">${payment.amountUsd.toFixed(2)} USD &middot; {payment.plan.charAt(0).toUpperCase() + payment.plan.slice(1)} Plan (30 days)</p>
        </div>

        {/* Payment Details */}
        <div className="space-y-4">
          {/* To Address */}
          <div>
            <label className="block text-xs text-[#A8A9AD] mb-1.5 uppercase tracking-wider">Destination Address</label>
            <div className="flex items-center gap-2 bg-[#1D1E26] border border-white/10 rounded-lg p-3">
              <code className="flex-1 text-xs text-white break-all font-mono">{payment.toAddress}</code>
              <button onClick={() => copyText(payment.toAddress, 'address')} className="flex-shrink-0 px-3 py-1.5 rounded bg-white/5 text-xs text-[#A8A9AD] hover:text-white transition-colors">
                {copied === 'address' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Memo (CRITICAL) */}
          <div>
            <label className="block text-xs text-[#A8A9AD] mb-1.5 uppercase tracking-wider">
              Memo <span className="text-[#FC564A]">(Required)</span>
            </label>
            <div className="flex items-center gap-2 bg-[#1D1E26] border border-[#FC564A]/30 rounded-lg p-3">
              <code className="flex-1 text-lg text-white font-mono font-bold tracking-wider">{payment.memo}</code>
              <button onClick={() => copyText(payment.memo, 'memo')} className="flex-shrink-0 px-3 py-1.5 rounded bg-white/5 text-xs text-[#A8A9AD] hover:text-white transition-colors">
                {copied === 'memo' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[10px] text-[#FC564A] mt-1">You MUST include this memo or your payment cannot be identified</p>
          </div>

          {/* Currency Info */}
          {payment.currency === 'USDC' && (
            <div className="bg-[#40B8F4]/10 border border-[#40B8F4]/20 rounded-lg p-3">
              <p className="text-xs text-[#40B8F4]">Send USDC on the <span className="font-semibold">Stellar network</span> (not Ethereum/Solana). Issuer: Circle (GA5ZSE...KZVN)</p>
            </div>
          )}
          {payment.currency === 'XLM' && (
            <div className="bg-[#7366FF]/10 border border-[#7366FF]/20 rounded-lg p-3">
              <p className="text-xs text-[#7366FF]">Send native XLM on the Stellar network. Price locked for the duration of this payment window.</p>
            </div>
          )}
        </div>
      </div>

      {/* Verify Button */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 p-5">
        <p className="text-xs text-[#A8A9AD] mb-3">After sending payment, click below to verify (auto-checks every 10 seconds).</p>
        {message && (
          <div className={`rounded-lg p-3 mb-3 text-sm ${payment.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-400' : 'bg-[#FFB829]/10 text-[#FFB829]'}`}>
            {message}
          </div>
        )}
        <button
          onClick={handleVerify}
          disabled={verifying}
          className="w-full py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors disabled:opacity-50"
        >
          {verifying ? 'Checking Stellar network...' : 'Verify Payment'}
        </button>
      </div>

      {/* Steps */}
      <div className="mt-6 bg-[#262932] rounded-2xl border border-white/5 p-5">
        <h3 className="font-semibold text-sm mb-3">How to Pay</h3>
        <ol className="space-y-2 text-xs text-[#A8A9AD]">
          <li className="flex gap-2"><span className="text-[#7366FF] font-bold">1.</span> Open your Stellar wallet (LOBSTR, StellarX, or any Stellar wallet)</li>
          <li className="flex gap-2"><span className="text-[#7366FF] font-bold">2.</span> Send <span className="text-white font-medium">{payment.amount} {payment.currency}</span> to the address above</li>
          <li className="flex gap-2"><span className="text-[#7366FF] font-bold">3.</span> Include memo: <span className="text-white font-mono font-medium">{payment.memo}</span></li>
          <li className="flex gap-2"><span className="text-[#7366FF] font-bold">4.</span> Click &quot;Verify Payment&quot; or wait for auto-detection</li>
        </ol>
      </div>
    </div>
  );
}
