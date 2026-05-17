'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ─── Types ──────────────────────────────────────────────────────────

interface StellarOverview {
  network: {
    ledgerSequence: number;
    closedAt: string;
    protocolVersion: number;
    coreVersion: string;
    totalCoins: number;
    tps: number;
    ops: number;
    successRate: number;
    avgCloseTime: number;
    baseFee: number;
    feeP95: number;
    estimated24hTxs: number;
    estimated24hOps: number;
    baseReserve: number;
  };
  assets: Array<{
    code: string;
    issuer: string;
    type: string;
    accounts: number | string;
    amount: string;
    flags?: any;
    isNative?: boolean;
  }>;
  transactions: Array<{
    hash: string;
    ledger: number;
    createdAt: string;
    sourceAccount: string;
    operationCount: number;
    feeCharged: number;
    successful: boolean;
    memoType: string;
    memo: string;
    operations: Array<{
      type: string;
      amount?: string;
      asset_code?: string;
      from?: string;
      to?: string;
    }>;
  }>;
  price: {
    price: number;
    marketCap: number;
    volume24h: number;
    change24h: number;
  } | null;
  ledgers: Array<{
    sequence: number;
    closedAt: string;
    txCount: number;
    successfulTxCount: number;
    failedTxCount: number;
    operationCount: number;
    baseFee: number;
  }>;
  updatedAt: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function formatNumber(n: number, decimals = 0): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toFixed(decimals);
}

function formatUSD(n: number): string {
  if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(2) + 'K';
  return '$' + n.toFixed(2);
}

function truncateAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr || '';
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function timeAgo(dateStr: string): string {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.round(diff)}s ago`;
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
  return `${Math.round(diff / 86400)}d ago`;
}

function getOperationDescription(op: any): string {
  switch (op.type) {
    case 'payment':
      return `${parseFloat(op.amount || '0').toLocaleString()} ${op.asset_code || 'XLM'}`;
    case 'create_account':
      return 'Create Account';
    case 'path_payment_strict_receive':
    case 'path_payment_strict_send':
      return `Path Payment ${parseFloat(op.amount || '0').toLocaleString()} ${op.asset_code || 'XLM'}`;
    case 'manage_sell_offer':
    case 'manage_buy_offer':
      return `DEX ${op.type.includes('sell') ? 'Sell' : 'Buy'} Offer`;
    case 'create_passive_sell_offer':
      return 'Passive Sell Offer';
    case 'change_trust':
      return `Trustline ${op.asset_code || ''}`;
    case 'invoke_host_function':
      return 'Soroban Contract Call';
    case 'extend_footprint_ttl':
      return 'Extend TTL';
    case 'restore_footprint':
      return 'Restore Footprint';
    default:
      return op.type?.replace(/_/g, ' ') || 'Unknown';
  }
}

const assetTypeColors: Record<string, { bg: string; text: string }> = {
  Native: { bg: 'bg-[#7366FF]/10', text: 'text-[#7366FF]' },
  Stablecoin: { bg: 'bg-green-500/10', text: 'text-green-400' },
  Yield: { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  Utility: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
  DeFi: { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  RWA: { bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
  Wrapped: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
};

// ─── Component ──────────────────────────────────────────────────────

export default function StellarDashboard() {
  const [data, setData] = useState<StellarOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/stellar/overview');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
      setError(null);
      setLastRefresh(new Date());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#7366FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#A8A9AD]">Loading Stellar network data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-400 mb-2">Failed to load data</p>
          <button onClick={fetchData} className="px-4 py-2 bg-[#7366FF] rounded-lg text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { network, assets, transactions, price, ledgers } = data;

  return (
    <div className="text-white">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Image src="/logo.png" alt="LumenQuery" width={36} height={36} className="w-9 h-9" />
              <h1 className="text-2xl sm:text-3xl font-bold">Stellar Network Explorer</h1>
            </div>
            <p className="text-[#A8A9AD] text-sm max-w-lg">
              Every asset, transaction, and metric on the Stellar Lumen blockchain — in one place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
            <span className="text-xs text-[#A8A9AD]">
              Updated {timeAgo(data.updatedAt)}
            </span>
          </div>
        </div>

        {/* ─── Top Metrics Row ────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* XLM Price */}
          <div className="bg-[#262932] rounded-xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A8A9AD] uppercase tracking-wider font-medium">XLM Price</span>
              {price && (
                <span className={`text-xs font-semibold flex items-center gap-0.5 ${price.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {price.change24h >= 0 ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  )}
                  {Math.abs(price.change24h).toFixed(2)}%
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">
              ${price?.price?.toFixed(4) || '—'}
            </div>
            <span className="text-xs text-[#A8A9AD]">24h change</span>
          </div>

          {/* Market Cap */}
          <div className="bg-[#262932] rounded-xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A8A9AD] uppercase tracking-wider font-medium">Market Cap</span>
              <div className="w-8 h-8 rounded-lg bg-[#7366FF]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">
              {price ? formatUSD(price.marketCap) : '—'}
            </div>
            <span className="text-xs text-[#A8A9AD]">Total market capitalization</span>
          </div>

          {/* 24h Volume */}
          <div className="bg-[#262932] rounded-xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A8A9AD] uppercase tracking-wider font-medium">24h Volume</span>
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">
              {price ? formatUSD(price.volume24h) : '—'}
            </div>
            <span className="text-xs text-[#A8A9AD]">Trading volume</span>
          </div>

          {/* TPS */}
          <div className="bg-[#262932] rounded-xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#A8A9AD] uppercase tracking-wider font-medium">Network TPS</span>
              <div className="w-8 h-8 rounded-lg bg-[#FFB829]/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold mb-1">
              {network.tps}
            </div>
            <span className="text-xs text-[#A8A9AD]">Transactions per second</span>
          </div>
        </div>
      </div>

      {/* ─── Secondary Metrics Bar ────────────────────────────────── */}
      <div className="bg-[#262932] rounded-xl border border-white/5 p-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold">{network.ledgerSequence.toLocaleString()}</div>
            <div className="text-[11px] text-[#A8A9AD]">Latest Ledger</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{formatNumber(network.estimated24hTxs)}</div>
            <div className="text-[11px] text-[#A8A9AD]">24h Transactions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{formatNumber(network.estimated24hOps)}</div>
            <div className="text-[11px] text-[#A8A9AD]">24h Operations</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{network.successRate}%</div>
            <div className="text-[11px] text-[#A8A9AD]">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{network.avgCloseTime}s</div>
            <div className="text-[11px] text-[#A8A9AD]">Avg Ledger Close</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">v{network.protocolVersion}</div>
            <div className="text-[11px] text-[#A8A9AD]">Protocol Version</div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6">

        {/* ─── Asset Table ────────────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-7">
          <div className="bg-[#262932] rounded-xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-sm">Top Stellar Assets</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-[10px] font-semibold">
                    {assets.length} tracked
                  </span>
                </div>
                <Link href="/analytics/tokens" className="text-[11px] text-[#7366FF] hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[11px] text-[#A8A9AD] uppercase tracking-wider border-b border-white/5">
                    <th className="px-5 py-3 font-medium">#</th>
                    <th className="py-3 font-medium">Asset</th>
                    <th className="py-3 font-medium">Type</th>
                    <th className="py-3 font-medium text-right">Supply</th>
                    <th className="py-3 font-medium text-right pr-5">Holders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assets.map((asset, i) => {
                    const colors = assetTypeColors[asset.type] || { bg: 'bg-gray-500/10', text: 'text-gray-400' };
                    const isNative = asset.isNative;
                    return (
                      <tr key={`${asset.code}-${asset.issuer}`} className={`hover:bg-white/[0.02] transition-colors ${isNative ? 'bg-[#7366FF]/[0.03]' : ''}`}>
                        <td className="px-5 py-3.5 text-xs text-[#A8A9AD]">{i + 1}</td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            {isNative ? (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7366FF] to-[#40B8F4] flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7366FF] to-[#a26cf8] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                {asset.code.slice(0, 2)}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">{asset.code}</span>
                                {isNative && (
                                  <span className="px-1.5 py-0.5 rounded bg-[#7366FF]/20 text-[#7366FF] text-[9px] font-bold">NATIVE</span>
                                )}
                                {isNative && price && (
                                  <span className="text-xs text-[#A8A9AD]">${price.price.toFixed(4)}</span>
                                )}
                              </div>
                              <div className="text-[10px] text-[#A8A9AD] font-mono">
                                {isNative ? 'Stellar Lumens — native currency' : truncateAddress(asset.issuer)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} text-[10px] font-medium`}>
                            {asset.type}
                          </span>
                        </td>
                        <td className="py-3.5 text-right">
                          <div>
                            <span className="text-sm font-medium">
                              {formatNumber(parseFloat(asset.amount) || 0)}
                            </span>
                            {isNative && price && (
                              <div className="text-[10px] text-[#A8A9AD]">
                                {formatUSD(price.marketCap)} mcap
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 text-right pr-5">
                          <span className="text-sm">
                            {(parseInt(String(asset.accounts)) || 0).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Right Column ───────────────────────────────────────── */}
        <div className="col-span-12 xl:col-span-5 space-y-6">

          {/* Network Stats */}
          <div className="bg-[#262932] rounded-xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Network Overview</h2>
                <Link href="/analytics" className="text-[11px] text-[#7366FF] hover:underline">
                  Detailed Analytics
                </Link>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-[#A8A9AD]">Total XLM Supply</span>
                <span className="text-sm font-semibold">{formatNumber(network.totalCoins)} XLM</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-[#A8A9AD]">Base Fee</span>
                <span className="text-sm font-semibold">{network.baseFee} stroops</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-[#A8A9AD]">Fee P95</span>
                <span className="text-sm font-semibold">{network.feeP95.toLocaleString()} stroops</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-[#A8A9AD]">Base Reserve</span>
                <span className="text-sm font-semibold">{network.baseReserve} XLM</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-xs text-[#A8A9AD]">Operations/sec</span>
                <span className="text-sm font-semibold">{network.ops}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-xs text-[#A8A9AD]">Core Version</span>
                <span className="text-sm font-semibold font-mono text-[#7366FF]">{network.coreVersion?.split(' ')[0] || '—'}</span>
              </div>
            </div>
          </div>

          {/* Recent Ledgers */}
          <div className="bg-[#262932] rounded-xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Recent Ledgers</h2>
                <Link href="/analytics/network" className="text-[11px] text-[#7366FF] hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] text-[#A8A9AD] uppercase tracking-wider border-b border-white/5">
                    <th className="px-5 py-2.5 font-medium">Ledger</th>
                    <th className="py-2.5 font-medium">Txns</th>
                    <th className="py-2.5 font-medium">Ops</th>
                    <th className="py-2.5 font-medium text-right pr-5">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ledgers.slice(0, 8).map((l) => (
                    <tr key={l.sequence} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-2.5">
                        <span className="text-xs font-semibold text-[#7366FF]">
                          #{l.sequence.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="text-xs">
                          {l.successfulTxCount}
                          {l.failedTxCount > 0 && (
                            <span className="text-red-400/70 ml-1">+{l.failedTxCount}</span>
                          )}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs">{l.operationCount}</td>
                      <td className="py-2.5 text-right pr-5 text-xs text-[#A8A9AD]">{timeAgo(l.closedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Latest Transactions (Full Width) ───────────────────── */}
        <div className="col-span-12">
          <div className="bg-[#262932] rounded-xl border border-white/5">
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-sm">Latest Transactions</h2>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                </div>
                <Link href="/dashboard/transactions" className="text-[11px] text-[#7366FF] hover:underline">
                  Live Stream
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[10px] text-[#A8A9AD] uppercase tracking-wider border-b border-white/5">
                    <th className="px-5 py-2.5 font-medium">Transaction</th>
                    <th className="py-2.5 font-medium hidden sm:table-cell">Operation</th>
                    <th className="py-2.5 font-medium hidden md:table-cell">From</th>
                    <th className="py-2.5 font-medium text-center">Ops</th>
                    <th className="py-2.5 font-medium text-right">Fee</th>
                    <th className="py-2.5 font-medium text-right pr-5">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx) => {
                    const firstOp = tx.operations[0];
                    const isSoroban = tx.operations.some((op) =>
                      ['invoke_host_function', 'extend_footprint_ttl', 'restore_footprint'].includes(op.type)
                    );
                    return (
                      <tr key={tx.hash} className={`hover:bg-white/[0.02] transition-colors ${isSoroban ? 'border-l-2 border-l-[#7366FF]/50' : ''}`}>
                        <td className="px-5 py-3">
                          <a
                            href={`https://stellar.expert/explorer/public/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${tx.successful ? 'bg-green-400' : 'bg-red-400'}`} />
                            <span className="text-xs font-mono text-[#7366FF] group-hover:underline">
                              {tx.hash.slice(0, 8)}...{tx.hash.slice(-4)}
                            </span>
                            <svg className="w-3 h-3 text-[#A8A9AD] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        </td>
                        <td className="py-3 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            {isSoroban && (
                              <span className="px-1.5 py-0.5 rounded bg-[#7366FF]/10 text-[#7366FF] text-[9px] font-bold">
                                SC
                              </span>
                            )}
                            <span className="text-xs text-[#A8A9AD]">
                              {firstOp ? getOperationDescription(firstOp) : '—'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 hidden md:table-cell">
                          <a
                            href={`https://stellar.expert/explorer/public/account/${tx.sourceAccount}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[#A8A9AD] hover:text-[#7366FF] hover:underline transition-colors"
                          >
                            {truncateAddress(tx.sourceAccount)}
                          </a>
                        </td>
                        <td className="py-3 text-center">
                          <span className="text-xs">{tx.operationCount}</span>
                        </td>
                        <td className="py-3 text-right">
                          <span className="text-xs text-[#A8A9AD]">{tx.feeCharged.toLocaleString()}</span>
                        </td>
                        <td className="py-3 text-right pr-5">
                          <span className="text-xs text-[#A8A9AD]">{timeAgo(tx.createdAt)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ─── Quick Navigation Cards ─────────────────────────────── */}
        <div className="col-span-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/analytics" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-[#7366FF]/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-[#7366FF]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#7366FF]/20 transition-colors">
                <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <span className="text-xs font-semibold">Analytics</span>
            </Link>
            <Link href="/contracts" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-[#FFB829]/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-[#FFB829]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FFB829]/20 transition-colors">
                <svg className="w-5 h-5 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <span className="text-xs font-semibold">Contracts</span>
            </Link>
            <Link href="/dashboard/transactions" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-green-500/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/20 transition-colors">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <span className="text-xs font-semibold">Live Stream</span>
            </Link>
            <Link href="/query" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-[#40B8F4]/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-[#40B8F4]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#40B8F4]/20 transition-colors">
                <svg className="w-5 h-5 text-[#40B8F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span className="text-xs font-semibold">Query</span>
            </Link>
            <Link href="/portfolio" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-purple-500/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
              <span className="text-xs font-semibold">Portfolio</span>
            </Link>
            <Link href="/docs" className="bg-[#262932] rounded-xl border border-white/5 p-4 hover:border-[#FC564A]/30 transition-colors group text-center">
              <div className="w-10 h-10 rounded-xl bg-[#FC564A]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FC564A]/20 transition-colors">
                <svg className="w-5 h-5 text-[#FC564A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <span className="text-xs font-semibold">API Docs</span>
            </Link>
          </div>
        </div>

        {/* ─── CTA Banner ─────────────────────────────────────────── */}
        <div className="col-span-12">
          <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Build on the Stellar Network</h3>
              <p className="text-white/70 text-sm">Enterprise-grade Horizon API and Soroban RPC. Start with 10,000 free requests per month.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/auth/signup" className="px-6 py-3 rounded-lg bg-white text-[#7366FF] font-semibold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                Start for Free
              </Link>
              <Link href="/pricing" className="px-6 py-3 rounded-lg border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors whitespace-nowrap">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="mt-8 pt-6 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8A9AD]">
          <p>&copy; {new Date().getFullYear()} LumenQuery. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Data from Stellar Horizon API</span>
            <span>&middot;</span>
            <span>Prices from CoinGecko</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
