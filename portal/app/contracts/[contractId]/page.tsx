'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatRelativeTime, formatLedger, formatNumber } from '@/lib/soroban/formatter';

interface ContractData {
  id: string;
  contractId: string;
  wasmHash: string | null;
  name: string | null;
  version: string | null;
  sourceUrl: string | null;
  createdLedger: number;
  lastSeenLedger: number;
  totalCalls: number;
  createdAt: string;
  stats: {
    calls: number;
    events: number;
    storageEntries: number;
  };
  recentCalls: Array<{
    id: string;
    functionName: string;
    status: string;
    timestamp: string;
    gasUsed: number | null;
  }>;
  recentEvents: Array<{
    id: string;
    eventType: string;
    timestamp: string;
    topics: unknown;
  }>;
}

export default function ContractOverviewPage() {
  const params = useParams();
  const contractId = params.contractId as string;
  const [contract, setContract] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await fetch(`/api/contracts/${contractId}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? 'Contract not found' : 'Failed to fetch contract');
        }
        const data = await res.json();
        setContract(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contract');
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-red-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          href="/contracts"
          className="text-[#2855FF] hover:underline"
        >
          Back to Explorer
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#F5F6F7] rounded-lg">
            <p className="text-sm text-[#6A6A6A]">Total Calls</p>
            <p className="text-2xl font-bold">{formatNumber(contract.stats.calls)}</p>
          </div>
          <div className="p-4 bg-[#F5F6F7] rounded-lg">
            <p className="text-sm text-[#6A6A6A]">Events</p>
            <p className="text-2xl font-bold">{formatNumber(contract.stats.events)}</p>
          </div>
          <div className="p-4 bg-[#F5F6F7] rounded-lg">
            <p className="text-sm text-[#6A6A6A]">Storage Entries</p>
            <p className="text-2xl font-bold">{formatNumber(contract.stats.storageEntries)}</p>
          </div>
          <div className="p-4 bg-[#F5F6F7] rounded-lg">
            <p className="text-sm text-[#6A6A6A]">Last Activity</p>
            <p className="text-2xl font-bold">#{formatLedger(contract.lastSeenLedger)}</p>
          </div>
        </div>
      </div>

      {/* Contract Details */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Contract Details</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contract.name && (
            <div>
              <dt className="text-sm text-[#6A6A6A]">Name</dt>
              <dd className="font-medium">{contract.name}</dd>
            </div>
          )}
          {contract.version && (
            <div>
              <dt className="text-sm text-[#6A6A6A]">Version</dt>
              <dd className="font-medium">{contract.version}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-[#6A6A6A]">Created Ledger</dt>
            <dd className="font-medium">#{formatLedger(contract.createdLedger)}</dd>
          </div>
          <div>
            <dt className="text-sm text-[#6A6A6A]">Indexed</dt>
            <dd className="font-medium">{formatRelativeTime(contract.createdAt)}</dd>
          </div>
          {contract.wasmHash && (
            <div className="md:col-span-2">
              <dt className="text-sm text-[#6A6A6A]">WASM Hash</dt>
              <dd className="font-mono text-sm break-all">{contract.wasmHash}</dd>
            </div>
          )}
          {contract.sourceUrl && (
            <div className="md:col-span-2">
              <dt className="text-sm text-[#6A6A6A]">Source Code</dt>
              <dd>
                <a
                  href={contract.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2855FF] hover:underline"
                >
                  {contract.sourceUrl}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Calls */}
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Calls</h2>
            <Link
              href={`/contracts/${contractId}/calls`}
              className="text-sm text-[#2855FF] hover:underline"
            >
              View All
            </Link>
          </div>
          {contract.recentCalls.length > 0 ? (
            <div className="space-y-3">
              {contract.recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-3 bg-[#F5F6F7] rounded-lg"
                >
                  <div>
                    <code className="text-sm font-mono text-[#2855FF]">
                      {call.functionName}
                    </code>
                    <p className="text-xs text-[#6A6A6A] mt-1">
                      {formatRelativeTime(call.timestamp)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      call.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {call.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#6A6A6A] text-center py-4">No recent calls</p>
          )}
        </div>

        {/* Recent Events */}
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Events</h2>
            <Link
              href={`/contracts/${contractId}/events`}
              className="text-sm text-[#2855FF] hover:underline"
            >
              View All
            </Link>
          </div>
          {contract.recentEvents.length > 0 ? (
            <div className="space-y-3">
              {contract.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-[#F5F6F7] rounded-lg"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        event.eventType === 'contract'
                          ? 'bg-green-100 text-green-800'
                          : event.eventType === 'system'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {event.eventType}
                    </span>
                    <span className="text-xs text-[#6A6A6A]">
                      {formatRelativeTime(event.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#6A6A6A] text-center py-4">No recent events</p>
          )}
        </div>
      </div>
    </div>
  );
}
