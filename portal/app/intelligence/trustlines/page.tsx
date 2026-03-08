'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { TrustlineMonitor } from '@/components/intelligence';

interface TrustlineChange {
  id: string;
  type: 'created' | 'removed' | 'updated';
  account: string;
  fullAccount?: string;
  assetCode: string;
  assetIssuer?: string;
  fullIssuer?: string;
  limit?: string;
  createdAt: string;
}

interface Summary {
  total: number;
  created: number;
  removed: number;
  updated: number;
}

interface TopAsset {
  code: string;
  count: number;
}

export default function TrustlinesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trustlines, setTrustlines] = useState<TrustlineChange[]>([]);
  const [summary, setSummary] = useState<Summary>({
    total: 0,
    created: 0,
    removed: 0,
    updated: 0,
  });
  const [topAssets, setTopAssets] = useState<TopAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [assetFilter, setAssetFilter] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/trustlines');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchTrustlines();
    }
  }, [session, assetFilter]);

  const fetchTrustlines = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '100');
      if (assetFilter) params.set('asset', assetFilter);

      const res = await fetch(`/api/intelligence/trustlines?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setTrustlines(data.trustlines || []);
        setSummary(data.summary || { total: 0, created: 0, removed: 0, updated: 0 });
        setTopAssets(data.topAssets || []);
      }
    } catch (error) {
      console.error('Trustlines fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">
          Trustline Monitor
        </h1>
        <p className="text-[#6A6A6A] mt-1">
          Track trustline creation and removal across the network
        </p>
      </header>

      {/* Asset Filter */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
        <div className="flex items-center gap-4">
          <label htmlFor="assetFilter" className="text-sm text-[#6A6A6A]">
            Filter by Asset:
          </label>
          <input
            type="text"
            id="assetFilter"
            value={assetFilter}
            onChange={(e) => setAssetFilter(e.target.value)}
            placeholder="e.g., USDC"
            className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2855FF] w-32"
          />
          {assetFilter && (
            <button
              onClick={() => setAssetFilter('')}
              className="text-sm text-[#6A6A6A] hover:text-black"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Trustline Monitor */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF] mx-auto" />
        </div>
      ) : (
        <TrustlineMonitor
          trustlines={trustlines}
          summary={summary}
          topAssets={topAssets}
          hasFullAccess={true}
          onRefresh={fetchTrustlines}
          isLoading={loading}
        />
      )}
    </div>
  );
}
