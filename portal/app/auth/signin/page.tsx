'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

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
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Welcome back</h1>
          <p className="text-[#6A6A6A] mt-2 text-sm sm:text-base">Sign in to your LumenQuery account</p>
        </header>

        <section className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-[#E6E7E9]" aria-labelledby="signin-heading">
          <h2 id="signin-heading" className="sr-only">Sign in form</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-1.5 sm:mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent text-sm sm:text-base"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="block text-sm font-medium text-black">Password</label>
                <Link href="/auth/forgot-password" className="text-sm text-[#7366FF] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] text-black focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent text-sm sm:text-base"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 sm:py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-semibold disabled:opacity-50 transition-colors text-sm sm:text-base"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-[#6A6A6A] mt-4 sm:mt-6 text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-[#7366FF] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F6F7] flex items-center justify-center">
        <div className="text-[#6A6A6A]">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
