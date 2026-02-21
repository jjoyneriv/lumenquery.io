'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MetricCard from '@/components/analytics/MetricCard';
import AreaChart from '@/components/analytics/AreaChart';

interface NetworkMetrics {
  ledger: {
    sequence: number;
    closedAt: string;
    protocolVersion: number;
  };
  transactions: {
    last24h: number;
    tps: number;
    successRate: number;
  };
  fees: {
    current: number;
    avg24h: number;
    percentile95: number;
  };
  history: Array<{
    timestamp: string;
    transactions: number;
    successRate: number;
  }>;
  updatedAt: string;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/analytics/network?range=24h');
        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        setMetrics(data);
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    // Refresh every 5 minutes (matches server cache TTL)
    const interval = setInterval(fetchMetrics, 300000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
  const formatTPS = (tps: number) => tps.toFixed(2);
  const formatPercent = (pct: number) => `${pct.toFixed(1)}%`;

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#6A6A6A]">Loading analytics...</div>
      </div>
    );
  }

  if (error && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Stellar Network Analytics</h1>
          <p className="text-[#6A6A6A] text-sm mt-1">
            Real-time insights into the Stellar network
            {lastUpdate && (
              <span className="ml-2 text-xs">
                Updated {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-sm text-[#6A6A6A]">Live data</span>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Current Ledger"
          value={formatNumber(metrics?.ledger.sequence || 0)}
          subtitle={`Protocol v${metrics?.ledger.protocolVersion || 0}`}
          icon="ledger"
        />
        <MetricCard
          title="Transactions (24h)"
          value={formatNumber(metrics?.transactions.last24h || 0)}
          subtitle={`${formatTPS(metrics?.transactions.tps || 0)} TPS`}
          trend={metrics?.transactions.tps && metrics.transactions.tps > 50 ? 'up' : 'neutral'}
          icon="transactions"
        />
        <MetricCard
          title="Success Rate"
          value={formatPercent(metrics?.transactions.successRate || 0)}
          subtitle="Network reliability"
          trend={metrics?.transactions.successRate && metrics.transactions.successRate > 99 ? 'up' : 'down'}
          icon="success"
        />
        <MetricCard
          title="Avg Fee"
          value={`${metrics?.fees.avg24h || 0} stroops`}
          subtitle={`P95: ${metrics?.fees.percentile95 || 0}`}
          icon="fee"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Transaction Volume</h3>
            {loading && <span className="text-xs text-[#6A6A6A]">Loading...</span>}
          </div>
          <AreaChart
            data={metrics?.history || []}
            dataKey="transactions"
            xAxisKey="timestamp"
            color="#2855FF"
            height={250}
            chartId="transactions-24h"
          />
        </div>
        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Success Rate</h3>
            {loading && <span className="text-xs text-[#6A6A6A]">Loading...</span>}
          </div>
          <AreaChart
            data={metrics?.history || []}
            dataKey="successRate"
            xAxisKey="timestamp"
            color="#10B981"
            height={250}
            valueFormatter={(v) => `${v.toFixed(1)}%`}
            chartId="successRate-24h"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/analytics/network"
          className="bg-white rounded-2xl border border-[#E6E7E9] p-6 hover:border-[#2855FF] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold group-hover:text-[#2855FF]">Network Metrics</h3>
          </div>
          <p className="text-sm text-[#6A6A6A]">Detailed ledger and transaction analysis</p>
        </Link>

        <Link
          href="/analytics/tokens"
          className="bg-white rounded-2xl border border-[#E6E7E9] p-6 hover:border-[#2855FF] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold group-hover:text-[#2855FF]">Token Analytics</h3>
          </div>
          <p className="text-sm text-[#6A6A6A]">Velocity, whale tracking, issuer risk</p>
        </Link>

        <Link
          href="/analytics/contracts"
          className="bg-white rounded-2xl border border-[#E6E7E9] p-6 hover:border-[#2855FF] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-semibold group-hover:text-[#2855FF]">Smart Contracts</h3>
          </div>
          <p className="text-sm text-[#6A6A6A]">Soroban contract calls and gas usage</p>
        </Link>
      </div>
    </div>
  );
}
