'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AreaChart from '@/components/analytics/AreaChart';

interface NetworkMetrics {
  ledger: {
    sequence: number;
    closedAt: string;
    protocolVersion: number;
    coreVersion: string;
    avgCloseTime: number;
  };
  transactions: {
    last24h: number;
    tps: number;
    successRate: number;
    failed24h: number;
  };
  operations: {
    last24h: number;
    ops: number;
  };
  fees: {
    current: number;
    avg24h: number;
    percentile95: number;
    min: number;
    max: number;
    mode: number;
  };
  network: {
    totalCoins: number;
    baseReserve: number;
    networkUptime: number;
  };
  market: {
    price: number;
    marketCap: number;
    volume24h: number;
    change24h: number;
  } | null;
  history: Array<{
    timestamp: string;
    transactions: number;
    operations: number;
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
    const interval = setInterval(fetchMetrics, 300000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (num: number) => new Intl.NumberFormat().format(num);
  const fmtCompact = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${fmt(Math.round(num))}`;
  };

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading analytics...</div>
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

  const m = metrics;
  const change = m?.market?.change24h || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      {lastUpdate && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-400">Live</span>
          </div>
          <span className="text-xs text-gray-400">
            Updated {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      )}

      {/* XLM Market Stats */}
      {m?.market && (
        <div className="bg-gradient-to-r from-[#262932] to-[#2a2d3a] rounded-2xl border border-white/10 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#7366FF]/20 flex items-center justify-center">
              <span className="text-sm font-bold text-[#7366FF]">XLM</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Stellar Lumens</h2>
              <span className="text-[11px] text-gray-400">Market Statistics</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-gray-400 mb-1">Price</p>
              <p className="text-xl font-bold text-white">${m.market.price.toFixed(4)}</p>
              <span className={`text-xs font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
                <span className="text-gray-500 ml-1">24h</span>
              </span>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-1">Market Cap</p>
              <p className="text-xl font-bold text-white">{fmtCompact(m.market.marketCap)}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-1">24h Volume</p>
              <p className="text-xl font-bold text-white">{fmtCompact(m.market.volume24h)}</p>
            </div>
            <div>
              <p className="text-[11px] text-gray-400 mb-1">Circulating Supply</p>
              <p className="text-xl font-bold text-white">{(m.network.totalCoins / 1e9).toFixed(1)}B</p>
              <span className="text-[11px] text-gray-500">XLM</span>
            </div>
          </div>
        </div>
      )}

      {/* Blockchain Statistics - Row 1 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Blockchain Statistics</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Transactions (24h)"
            value={fmt(m?.transactions.last24h || 0)}
            sub={`${m?.transactions.tps.toFixed(2) || '0'} TPS`}
            icon={<TxIcon />}
            color="blue"
          />
          <StatCard
            label="Operations (24h)"
            value={fmt(m?.operations.last24h || 0)}
            sub={`${m?.operations.ops.toFixed(2) || '0'} ops/sec`}
            icon={<OpsIcon />}
            color="purple"
          />
          <StatCard
            label="Failed Transactions"
            value={fmt(m?.transactions.failed24h || 0)}
            sub={`${(100 - (m?.transactions.successRate || 0)).toFixed(1)}% of total`}
            icon={<FailIcon />}
            color="red"
          />
          <StatCard
            label="Network Uptime"
            value={`${m?.network.networkUptime || 99.99}%`}
            sub="Stellar network reliability"
            icon={<UptimeIcon />}
            color="green"
          />
        </div>
      </div>

      {/* Blockchain Statistics - Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Current Ledger"
          value={fmt(m?.ledger.sequence || 0)}
          sub={`Protocol v${m?.ledger.protocolVersion || 0}`}
          icon={<LedgerIcon />}
          color="blue"
        />
        <StatCard
          label="Avg Ledger Time"
          value={`${m?.ledger.avgCloseTime || 0}s`}
          sub="Average close time"
          icon={<ClockIcon />}
          color="yellow"
        />
        <StatCard
          label="Base Fee"
          value={`${m?.fees.current || 100} stroops`}
          sub={`P95: ${fmt(m?.fees.percentile95 || 0)} stroops`}
          icon={<FeeIcon />}
          color="yellow"
        />
        <StatCard
          label="Base Reserve"
          value={`${m?.network.baseReserve || 0.5} XLM`}
          sub="Minimum account balance"
          icon={<ReserveIcon />}
          color="cyan"
        />
      </div>

      {/* Fee Distribution */}
      <div className="bg-[#262932] rounded-2xl border border-white/10 p-5">
        <h3 className="text-sm font-semibold mb-4">Fee Distribution</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-[11px] text-gray-400">Min Fee</p>
            <p className="text-lg font-bold text-white">{fmt(m?.fees.min || 0)}</p>
            <p className="text-[10px] text-gray-500">stroops</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400">Mode Fee</p>
            <p className="text-lg font-bold text-white">{fmt(m?.fees.mode || 0)}</p>
            <p className="text-[10px] text-gray-500">stroops</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400">P95 Fee</p>
            <p className="text-lg font-bold text-white">{fmt(m?.fees.percentile95 || 0)}</p>
            <p className="text-[10px] text-gray-500">stroops</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400">Max Fee</p>
            <p className="text-lg font-bold text-white">{fmt(m?.fees.max || 0)}</p>
            <p className="text-[10px] text-gray-500">stroops</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#262932] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Transaction Volume</h3>
            {loading && <span className="text-xs text-gray-400">Loading...</span>}
          </div>
          <AreaChart
            data={m?.history || []}
            dataKey="transactions"
            xAxisKey="timestamp"
            color="#7366FF"
            height={220}
            chartId="transactions-24h"
          />
        </div>
        <div className="bg-[#262932] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Operations Volume</h3>
            {loading && <span className="text-xs text-gray-400">Loading...</span>}
          </div>
          <AreaChart
            data={m?.history || []}
            dataKey="operations"
            xAxisKey="timestamp"
            color="#A855F7"
            height={220}
            chartId="operations-24h"
          />
        </div>
      </div>

      {/* Network Info */}
      <div className="bg-[#262932] rounded-2xl border border-white/10 p-5">
        <h3 className="text-sm font-semibold mb-4">Network Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Network</span>
            <span className="text-white font-medium">Public Global Stellar Network</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Protocol Version</span>
            <span className="text-white font-medium">v{m?.ledger.protocolVersion || 0}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Stellar Core</span>
            <span className="text-white font-medium text-xs">{m?.ledger.coreVersion || 'N/A'}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Total Supply</span>
            <span className="text-white font-medium">{((m?.network.totalCoins || 0) / 1e9).toFixed(2)}B XLM</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Base Reserve</span>
            <span className="text-white font-medium">{m?.network.baseReserve || 0.5} XLM</span>
          </div>
          <div className="flex justify-between py-2 border-b border-white/5">
            <span className="text-gray-400">Base Fee</span>
            <span className="text-white font-medium">{m?.fees.current || 100} stroops (0.00001 XLM)</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/analytics/network"
          className="bg-[#262932] rounded-2xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold group-hover:text-[#7366FF]">Network Metrics</h3>
          </div>
          <p className="text-sm text-gray-400">Detailed ledger and transaction analysis</p>
        </Link>
        <Link
          href="/analytics/tokens"
          className="bg-[#262932] rounded-2xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold group-hover:text-[#7366FF]">Token Analytics</h3>
          </div>
          <p className="text-sm text-gray-400">Velocity, whale tracking, issuer risk</p>
        </Link>
      </div>
    </div>
  );
}

// -- Stat Card Component --
function StatCard({ label, value, sub, icon, color }: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'cyan';
}) {
  const colorMap = {
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    green: 'bg-green-500/10 text-green-400',
    red: 'bg-red-500/10 text-red-400',
    yellow: 'bg-[#FFB829]/10 text-[#FFB829]',
    cyan: 'bg-cyan-500/10 text-cyan-400',
  };

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-gray-400 text-[11px] sm:text-xs">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{value}</p>
      {sub && <p className="text-gray-500 text-[11px] mt-1">{sub}</p>}
    </div>
  );
}

// -- Icons --
function TxIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  );
}

function OpsIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );
}

function FailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );
}

function UptimeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LedgerIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FeeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function ReserveIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
