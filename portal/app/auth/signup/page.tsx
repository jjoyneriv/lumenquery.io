'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but failed to sign in. Please try signing in manually.');
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#2855FF] flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">LQ</span>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Create your account</h1>
          <p className="text-[#6A6A6A] mt-2 text-sm sm:text-base">Start building on Stellar with LumenQuery</p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-[#E6E7E9]">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 sm:mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent text-sm sm:text-base"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 sm:mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent text-sm sm:text-base"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 sm:mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 sm:mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-[#6A6A6A] mt-4 sm:mt-6 text-sm">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-[#2855FF] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-[#6A6A6A] text-xs sm:text-sm mt-4 sm:mt-6 px-4">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
