'use client';

import { useState, useEffect } from 'react';
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

export default function NetworkAnalyticsPage() {
  const [metrics, setMetrics] = useState<NetworkMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/analytics/network?range=24h');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to fetch network metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#6A6A6A]">Loading network metrics...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Network Metrics</h1>
          <p className="text-[#6A6A6A] text-sm mt-1">
            Detailed ledger and transaction analytics
          </p>
        </div>
      </div>

      {/* Ledger Info */}
      <div className="bg-white rounded-2xl border border-[#E6E7E9] p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Current Ledger</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-[#6A6A6A] text-sm">Sequence</p>
            <p className="text-2xl font-bold">{formatNumber(metrics?.ledger.sequence || 0)}</p>
          </div>
          <div>
            <p className="text-[#6A6A6A] text-sm">Closed At</p>
            <p className="text-lg font-medium">
              {metrics?.ledger.closedAt
                ? new Date(metrics.ledger.closedAt).toLocaleString()
                : '-'}
            </p>
          </div>
          <div>
            <p className="text-[#6A6A6A] text-sm">Protocol Version</p>
            <p className="text-2xl font-bold">v{metrics?.ledger.protocolVersion || 0}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Transactions (24h)"
          value={formatNumber(metrics?.transactions.last24h || 0)}
          icon="transactions"
        />
        <MetricCard
          title="TPS"
          value={metrics?.transactions.tps?.toFixed(2) || '0'}
          subtitle="Transactions per second"
          icon="transactions"
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics?.transactions.successRate?.toFixed(1) || 0}%`}
          trend={metrics?.transactions.successRate && metrics.transactions.successRate > 99 ? 'up' : 'neutral'}
          icon="success"
        />
        <MetricCard
          title="Current Base Fee"
          value={`${metrics?.fees.current || 0} stroops`}
          subtitle={`P95: ${metrics?.fees.percentile95 || 0}`}
          icon="fee"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Volume Over Time</h3>
          <AreaChart
            data={metrics?.history || []}
            dataKey="transactions"
            xAxisKey="timestamp"
            color="#2855FF"
            height={300}
          />
        </div>

        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-6">
          <h3 className="text-lg font-semibold mb-4">Success Rate Over Time</h3>
          <AreaChart
            data={metrics?.history || []}
            dataKey="successRate"
            xAxisKey="timestamp"
            color="#10B981"
            height={300}
            valueFormatter={(v) => `${v.toFixed(1)}%`}
          />
        </div>
      </div>
    </div>
  );
}
