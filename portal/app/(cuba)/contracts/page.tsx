'use client';

import { useState, useEffect } from 'react';
import { ContractSearch, ContractCard } from '@/components/contracts';

interface Contract {
  id: string;
  contractId: string;
  name: string | null;
  totalCalls: number;
  lastSeenLedger: number;
  createdAt: string;
}

export default function ContractsPage() {
  const [recentContracts, setRecentContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch('/api/contracts/search?limit=12');
        const data = await res.json();
        setRecentContracts(data.contracts || []);
      } catch (error) {
        console.error('Failed to fetch contracts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="text-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Search Section */}
        <section className="mb-6 sm:mb-8">
          <div className="bg-[#262932] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Search Contracts</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <ContractSearch />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-6 sm:mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
              <div className="w-10 h-10 bg-[#7366FF]/10 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Decoded Calls</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Human-readable function calls
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Storage Viewer</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Key-value visualization
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">Event Stream</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Real-time monitoring
              </p>
            </div>

            <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm sm:text-base mb-1">AI Explanations</h3>
              <p className="text-xs sm:text-sm text-white/70">
                Coming soon
              </p>
            </div>
          </div>
        </section>

        {/* Recent Contracts */}
        <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Recently Indexed Contracts</h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-[#1D1E26] border border-white/10 rounded-lg p-4 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentContracts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentContracts.map((contract) => (
                <ContractCard key={contract.id} {...contract} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1D1E26] border border-white/10 rounded-lg p-8 sm:p-12 text-center">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-gray-400 text-sm sm:text-base">
                No contracts indexed yet. Search for a contract to get started.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
