'use client';

import { useEffect, useState } from 'react';
import MetricCard from '@/components/analytics/MetricCard';
import AreaChart from '@/components/analytics/AreaChart';
import { ContractTable } from '@/components/analytics/contracts/ContractTable';
import { EventsTable } from '@/components/analytics/contracts/EventsTable';

interface ContractAnalyticsData {
  activity: {
    totalInvocations24h: number;
    successRate: number;
    hourlyActivity: Array<{
      timestamp: string;
      invocations: number;
    }>;
    topContracts: Array<{
      contractId: string;
      invocations: number;
      lastActivity: string;
    }>;
  };
  gasUsage: {
    currentFee: number;
    avgFee: number;
    p50Fee: number;
    p95Fee: number;
    p99Fee: number;
  };
  events: {
    totalEvents: number;
    recentEvents: Array<{
      contractId: string;
      type: string;
      ledger: number;
      timestamp: string;
      txHash: string;
    }>;
  };
  updatedAt: string;
}

export default function ContractAnalyticsPage() {
  const [data, setData] = useState<ContractAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/analytics/contracts?range=24h');
        if (!res.ok) throw new Error('Failed to fetch contract analytics');
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load contract analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  // Transform hourly activity for chart
  const chartData = data?.activity.hourlyActivity.map((item) => ({
    timestamp: item.timestamp,
    invocations: item.invocations,
  })) || [];

  // Format fee display (stroops to XLM if large)
  const formatFee = (stroops: number): string => {
    if (stroops === 0) return '0';
    if (stroops >= 10000000) {
      return `${(stroops / 10000000).toFixed(4)} XLM`;
    }
    return `${stroops.toLocaleString()} stroops`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Smart Contract Analytics</h1>
          <p className="text-[#6A6A6A] text-sm mt-1">
            Soroban contract activity, gas usage, and event tracking
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Activity Metrics */}
      <section aria-labelledby="activity-heading" className="mb-8">
        <h2 id="activity-heading" className="sr-only">Contract Activity Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Invocations (24h)"
            value={loading ? '...' : data?.activity.totalInvocations24h.toLocaleString() || '0'}
            icon="transactions"
          />
          <MetricCard
            title="Success Rate"
            value={loading ? '...' : `${data?.activity.successRate || 0}%`}
            icon="success"
          />
          <MetricCard
            title="Avg Gas Fee"
            value={loading ? '...' : formatFee(data?.gasUsage.avgFee || 0)}
            icon="fee"
          />
        </div>
      </section>

      {/* Activity Chart */}
      <section aria-labelledby="activity-chart-heading" className="mb-8">
        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-4 sm:p-6">
          <h2 id="activity-chart-heading" className="text-lg font-semibold text-black mb-4">
            Contract Invocations
          </h2>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
              </div>
            ) : chartData.length > 0 ? (
              <AreaChart
                data={chartData}
                dataKey="invocations"
                xAxisKey="timestamp"
                color="#10B981"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-[#6A6A6A]">
                No activity data available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Two Column Layout: Gas Usage & Fee Percentiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gas Usage Summary */}
        <section aria-labelledby="gas-heading">
          <div className="bg-white rounded-2xl border border-[#E6E7E9] overflow-hidden h-full">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
              <h2 id="gas-heading" className="font-semibold text-black flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Gas Usage
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="text-[#6A6A6A]">Current Fee (Mode)</span>
                    <span className="font-medium text-black">{formatFee(data?.gasUsage.currentFee || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                    <span className="text-[#6A6A6A]">Average Fee</span>
                    <span className="font-medium text-black">{formatFee(data?.gasUsage.avgFee || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Fee Percentiles */}
        <section aria-labelledby="percentiles-heading">
          <div className="bg-white rounded-2xl border border-[#E6E7E9] overflow-hidden h-full">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
              <h2 id="percentiles-heading" className="font-semibold text-black flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Fee Percentiles
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                    <span className="text-green-700">P50 (Median)</span>
                    <span className="font-medium text-green-900">{formatFee(data?.gasUsage.p50Fee || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50">
                    <span className="text-yellow-700">P95</span>
                    <span className="font-medium text-yellow-900">{formatFee(data?.gasUsage.p95Fee || 0)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                    <span className="text-red-700">P99</span>
                    <span className="font-medium text-red-900">{formatFee(data?.gasUsage.p99Fee || 0)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Top Contracts */}
      <section aria-labelledby="contracts-heading" className="mb-8">
        <h2 id="contracts-heading" className="sr-only">Top Contracts</h2>
        {loading ? (
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
          </div>
        ) : (
          <ContractTable contracts={data?.activity.topContracts || []} />
        )}
      </section>

      {/* Recent Events */}
      <section aria-labelledby="events-heading" className="mb-8">
        <h2 id="events-heading" className="sr-only">Recent Events</h2>
        {loading ? (
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
          </div>
        ) : (
          <EventsTable events={data?.events.recentEvents || []} />
        )}
      </section>

      {/* Last Updated */}
      {data?.updatedAt && (
        <p className="text-xs text-[#6A6A6A] text-center">
          Last updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
