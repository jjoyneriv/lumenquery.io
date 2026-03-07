'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    async function validateToken() {
      if (!token) {
        setValidating(false);
        return;
      }

      try {
        const response = await fetch(`/api/auth/reset-password?token=${token}`);
        const data = await response.json();
        setTokenValid(data.valid);
        if (!data.valid) {
          setError(data.error || 'Invalid or expired reset link');
        }
      } catch {
        setError('Failed to validate reset link');
      } finally {
        setValidating(false);
      }
    }

    validateToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to reset password');
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

  // Loading state while validating token
  if (validating) {
    return (
      <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2855FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A6A6A]">Validating reset link...</p>
        </div>
      </main>
    );
  }

  // No token provided
  if (!token) {
    return (
      <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-black mb-2">Invalid Reset Link</h1>
          <p className="text-[#6A6A6A] mb-6">No reset token was provided. Please request a new password reset.</p>
          <Link
            href="/auth/forgot-password"
            className="inline-block px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold transition-colors"
          >
            Request New Reset Link
          </Link>
        </div>
      </main>
    );
  }

  // Token is invalid or expired
  if (!tokenValid && !success) {
    return (
      <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-black mb-2">Link Expired or Invalid</h1>
          <p className="text-[#6A6A6A] mb-6">{error || 'This password reset link has expired or is invalid.'}</p>
          <Link
            href="/auth/forgot-password"
            className="inline-block px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold transition-colors"
          >
            Request New Reset Link
          </Link>
        </div>
      </main>
    );
  }

  // Success state
  if (success) {
    return (
      <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-black mb-2">Password Reset Successfully</h1>
          <p className="text-[#6A6A6A] mb-6">Your password has been updated. You can now sign in with your new password.</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  // Reset password form
  return (
    <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8 sm:py-12">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Create new password</h1>
          <p className="text-[#6A6A6A] mt-2 text-sm sm:text-base">
            Enter your new password below
          </p>
        </header>

        <section className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-[#E6E7E9]">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] focus:border-[#2855FF] focus:ring-2 focus:ring-[#2855FF]/20 outline-none transition-all text-base"
                placeholder="Enter new password"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <p className="mt-1.5 text-xs text-[#6A6A6A]">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1.5 sm:mb-2">
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] focus:border-[#2855FF] focus:ring-2 focus:ring-[#2855FF]/20 outline-none transition-all text-base"
                placeholder="Confirm new password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2855FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6A6A6A]">Loading...</p>
        </div>
      </main>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
