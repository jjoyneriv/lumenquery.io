'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col">
      <Header activePage="contracts" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-black to-[#1a1a2e] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2855FF]/20 rounded-full text-sm text-[#2855FF] mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Soroban Pro
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Smart Contract Explorer
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore Soroban smart contracts with decoded calls, storage visualization,
              event streams, and AI-powered explanations.
            </p>
            <ContractSearch />
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg border border-[#E6E7E9]">
                <div className="w-10 h-10 bg-[#2855FF]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2855FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Decoded Calls</h3>
                <p className="text-sm text-[#6A6A6A]">
                  Human-readable function calls with decoded parameters
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E6E7E9]">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Storage Viewer</h3>
                <p className="text-sm text-[#6A6A6A]">
                  Browse contract storage with key-value visualization
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E6E7E9]">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Event Stream</h3>
                <p className="text-sm text-[#6A6A6A]">
                  Real-time event monitoring with decoded topics
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-[#E6E7E9]">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">AI Explanations</h3>
                <p className="text-sm text-[#6A6A6A]">
                  Get AI-powered explanations of contract calls
                </p>
              </div>
            </div>

            {/* Recent Contracts */}
            <h2 className="text-xl font-semibold mb-6">Recently Indexed Contracts</h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E6E7E9] rounded-lg p-4 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E6E7E9]">
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
              <div className="bg-white border border-[#E6E7E9] rounded-lg p-12 text-center">
                <svg
                  className="w-16 h-16 mx-auto text-[#6A6A6A] mb-4"
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
                <p className="text-[#6A6A6A] mb-4">
                  No contracts indexed yet. Search for a contract to get started.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
