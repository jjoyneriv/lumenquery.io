'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send reset email');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#1D1E26] flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <header className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6" aria-label="LumenQuery home">
              <Image
                src="/logo.png"
                alt="LumenQuery"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </Link>
          </header>

          <section className="bg-[#262932] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. The link will expire in 1 hour.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
                className="text-[#7366FF] hover:underline"
              >
                try again
              </button>
              .
            </p>
            <Link
              href="/auth/signin"
              className="text-[#7366FF] hover:underline text-sm font-medium"
            >
              Back to sign in
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#1D1E26] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <header className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6" aria-label="LumenQuery home">
            <Image
              src="/logo.png"
              alt="LumenQuery"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Forgot password?</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </header>

        <section className="bg-[#262932] rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5 sm:mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/10 focus:border-[#7366FF] focus:ring-2 focus:ring-[#7366FF]/20 outline-none transition-all text-base"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/signin" className="text-gray-400 hover:text-[#7366FF] text-sm">
              <span className="mr-1">←</span> Back to sign in
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
