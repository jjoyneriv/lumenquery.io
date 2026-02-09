'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AreaChart from '@/components/analytics/AreaChart';
import TimeRangeSelector from '@/components/analytics/TimeRangeSelector';
import MetricCard from '@/components/analytics/MetricCard';
import { formatGas, formatNumber, formatPercentage } from '@/lib/soroban/formatter';

interface Analytics {
  summary: {
    totalCalls: number;
    successRate: number;
    failedCalls: number;
    totalGasUsed: number;
    avgGasPerCall: number;
  };
  gasUsage: {
    total: number;
    avgPerCall: number;
    trend: 'up' | 'down' | 'stable';
  };
  errorAnalysis: {
    successRate: number;
    failedCalls: number;
    errorBreakdown: Array<{ code: string; count: number }>;
  };
  callVolume: {
    total: number;
    history: Array<{
      timestamp: string;
      calls: number;
      avgGas: number;
      successRate: number;
    }>;
  };
  storageGrowth: Array<{
    timestamp: string;
    entries: number;
    sizeBytes: number;
  }>;
  range: string;
  updatedAt: string;
}

export default function ContractAnalyticsPage() {
  const params = useParams();
  const contractId = params.contractId as string;

  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/contracts/${contractId}/analytics?range=${timeRange}`);
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [contractId, timeRange]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-[#E6E7E9] rounded-lg p-4 h-24" />
          ))}
        </div>
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-4 h-64" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-8 text-center">
        <p className="text-[#6A6A6A]">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contract Analytics</h2>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Calls"
          value={formatNumber(analytics.summary.totalCalls)}
          icon="transactions"
        />
        <MetricCard
          title="Success Rate"
          value={formatPercentage(analytics.summary.successRate)}
          icon="success"
          trend={analytics.summary.successRate >= 95 ? 'up' : 'down'}
        />
        <MetricCard
          title="Avg Gas/Call"
          value={formatGas(analytics.summary.avgGasPerCall)}
          icon="fee"
          trend={analytics.gasUsage.trend === 'down' ? 'up' : analytics.gasUsage.trend === 'up' ? 'down' : 'neutral'}
        />
        <MetricCard
          title="Failed Calls"
          value={String(analytics.summary.failedCalls)}
          icon="transactions"
          trend={analytics.summary.failedCalls === 0 ? 'up' : 'down'}
        />
      </div>

      {/* Call Volume Chart */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
        <h3 className="text-sm font-medium text-[#6A6A6A] mb-4">Call Volume</h3>
        {analytics.callVolume.history.length > 0 ? (
          <AreaChart
            data={analytics.callVolume.history}
            dataKey="calls"
            xAxisKey="timestamp"
            color="#2855FF"
            height={200}
          />
        ) : (
          <div className="h-48 flex items-center justify-center text-[#6A6A6A]">
            No call history data
          </div>
        )}
      </div>

      {/* Gas Usage Chart */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
        <h3 className="text-sm font-medium text-[#6A6A6A] mb-4">Average Gas Usage</h3>
        {analytics.callVolume.history.length > 0 ? (
          <AreaChart
            data={analytics.callVolume.history}
            dataKey="avgGas"
            xAxisKey="timestamp"
            color="#10B981"
            height={200}
            valueFormatter={(v) => formatGas(v)}
          />
        ) : (
          <div className="h-48 flex items-center justify-center text-[#6A6A6A]">
            No gas usage data
          </div>
        )}
      </div>

      {/* Error Breakdown */}
      {analytics.errorAnalysis.errorBreakdown.length > 0 && (
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
          <h3 className="text-sm font-medium text-[#6A6A6A] mb-4">Error Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F6F7]">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-[#6A6A6A] uppercase">
                    Error Code
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-[#6A6A6A] uppercase">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E7E9]">
                {analytics.errorAnalysis.errorBreakdown.map((error, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2">
                      <code className="text-sm font-mono text-red-600">{error.code}</code>
                    </td>
                    <td className="px-4 py-2 text-right text-sm">
                      {error.count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Storage Growth */}
      {analytics.storageGrowth.length > 0 && (
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
          <h3 className="text-sm font-medium text-[#6A6A6A] mb-4">Storage Growth</h3>
          <AreaChart
            data={analytics.storageGrowth}
            dataKey="entries"
            xAxisKey="timestamp"
            color="#8B5CF6"
            height={200}
          />
        </div>
      )}
    </div>
  );
}
