'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IntelligenceNav } from '@/components/intelligence';

export default function ContractsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/contracts');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-4 sticky top-8">
            <h2 className="font-semibold text-black mb-4">Intelligence</h2>
            <IntelligenceNav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                Contract Intelligence
              </h1>
              <p className="text-[#6A6A6A] mt-1">
                Advanced Soroban contract analytics and monitoring
              </p>
            </div>
            <Link
              href="/intelligence"
              className="text-[#2855FF] hover:text-[#1E44CC] text-sm"
            >
              &larr; Back to Dashboard
            </Link>
          </header>

          {/* Coming Soon Card */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Coming Soon
              </h2>
              <p className="text-[#6A6A6A] mb-6">
                Advanced Soroban contract analytics are on the way. Track contract calls,
                analyze gas usage, monitor events, and identify anomalies in contract behavior.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
                <div className="p-4 bg-[#F5F6F7] rounded-lg">
                  <h3 className="font-semibold text-black mb-1">Call Frequency</h3>
                  <p className="text-sm text-[#6A6A6A]">Track contract invocation patterns</p>
                </div>
                <div className="p-4 bg-[#F5F6F7] rounded-lg">
                  <h3 className="font-semibold text-black mb-1">Gas Analytics</h3>
                  <p className="text-sm text-[#6A6A6A]">Monitor gas usage and costs</p>
                </div>
                <div className="p-4 bg-[#F5F6F7] rounded-lg">
                  <h3 className="font-semibold text-black mb-1">Event Monitoring</h3>
                  <p className="text-sm text-[#6A6A6A]">Real-time contract event streaming</p>
                </div>
                <div className="p-4 bg-[#F5F6F7] rounded-lg">
                  <h3 className="font-semibold text-black mb-1">Caller Profiling</h3>
                  <p className="text-sm text-[#6A6A6A]">Identify top contract users</p>
                </div>
              </div>

              <Link
                href="/contracts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2855FF] text-white rounded-lg font-medium hover:bg-[#1E44CC] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Explore Contracts with Soroban Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
