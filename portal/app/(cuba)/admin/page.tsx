'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalOrganizations: number;
    totalApiKeys: number;
    recentRequests: number;
  };
  usage: {
    period: string;
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    successRate: number;
  };
  tierDistribution: Array<{ tier: string; count: number }>;
  featureUsage: {
    sorobanPro: number;
    intelligence: number;
    portfolio: number;
  };
}

interface TrafficStats {
  summary: {
    views24h: number;
    views7d: number;
    views30d: number;
    visitors24h: number;
    visitors7d: number;
    visitors30d: number;
  };
  breakdown24h: {
    subscribers: number;
    freeUsers: number;
    anonymous: number;
    total: number;
  };
  tierBreakdown: Array<{ tier: string; views: number }>;
  topPages: Array<{ path: string; views: number }>;
  topPagesSubscribers: Array<{ path: string; views: number }>;
  hourlyTraffic: Array<{ timestamp: string; views: number }>;
  dailyTraffic: Array<{ date: string; views: number }>;
}

const tierColors: Record<string, string> = {
  ENTERPRISE: 'bg-[#FFB829]',
  TEAM: 'bg-[#40B8F4]',
  DEVELOPER: 'bg-green-500',
  FREE: 'bg-[#A8A9AD]',
  Anonymous: 'bg-[#6B6D71]',
};

const tierLabels: Record<string, string> = {
  ENTERPRISE: 'Enterprise',
  TEAM: 'Professional',
  DEVELOPER: 'Starter',
  FREE: 'Free',
  Anonymous: 'Anonymous',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [traffic, setTraffic] = useState<TrafficStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/usage?period=7d').then(r => r.ok ? r.json() : null),
      fetch('/api/admin/traffic').then(r => r.ok ? r.json() : null),
    ]).then(([statsData, trafficData]) => {
      setStats(statsData);
      setTraffic(trafficData);
    }).catch(err => {
      setError(err instanceof Error ? err.message : 'Failed to load');
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#7366FF] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FC564A]/10 border border-[#FC564A]/20 rounded-xl p-6">
        <p className="text-[#FC564A]">{error}</p>
      </div>
    );
  }

  const maxHourly = traffic ? Math.max(...traffic.hourlyTraffic.map(h => h.views), 1) : 1;
  const maxDaily = traffic ? Math.max(...traffic.dailyTraffic.map(d => d.views), 1) : 1;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-[#A8A9AD] text-sm">System overview, traffic, and usage statistics</p>
      </div>

      {/* Overview Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#7366FF]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-1">{stats.overview.totalUsers}</h4>
            <span className="text-xs text-[#A8A9AD]">Total Users</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-green-400">{stats.overview.activeUsers} online</span>
            </div>
          </div>
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-1">{stats.overview.totalApiKeys}</h4>
            <span className="text-xs text-[#A8A9AD]">API Keys</span>
          </div>
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFB829]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FFB829]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-1">{stats.usage.totalRequests.toLocaleString()}</h4>
            <span className="text-xs text-[#A8A9AD]">API Requests (7d)</span>
          </div>
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-1">{stats.overview.totalOrganizations}</h4>
            <span className="text-xs text-[#A8A9AD]">Organizations</span>
          </div>
        </div>
      )}

      {/* Traffic Metrics */}
      {traffic && (
        <>
          {/* Traffic Summary Cards */}
          <h2 className="text-lg font-bold text-white mb-4">Website Traffic</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <p className="text-xs text-[#A8A9AD] mb-1">Page Views (24h)</p>
              <p className="text-2xl font-bold">{traffic.summary.views24h.toLocaleString()}</p>
              <p className="text-[10px] text-[#A8A9AD] mt-1">{traffic.summary.visitors24h} unique visitors</p>
            </div>
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <p className="text-xs text-[#A8A9AD] mb-1">Page Views (7d)</p>
              <p className="text-2xl font-bold">{traffic.summary.views7d.toLocaleString()}</p>
              <p className="text-[10px] text-[#A8A9AD] mt-1">{traffic.summary.visitors7d} unique visitors</p>
            </div>
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <p className="text-xs text-[#A8A9AD] mb-1">Page Views (30d)</p>
              <p className="text-2xl font-bold">{traffic.summary.views30d.toLocaleString()}</p>
              <p className="text-[10px] text-[#A8A9AD] mt-1">{traffic.summary.visitors30d} unique visitors</p>
            </div>
          </div>

          {/* Subscriber vs Non-Subscriber (24h) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <h3 className="font-semibold text-sm mb-4">Traffic by User Type (24h)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7366FF]" />
                    <span className="text-sm">Paid Subscribers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{traffic.breakdown24h.subscribers}</span>
                    <span className="text-[10px] text-[#A8A9AD]">
                      {traffic.breakdown24h.total > 0 ? Math.round(traffic.breakdown24h.subscribers / traffic.breakdown24h.total * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-[#7366FF]" style={{ width: `${traffic.breakdown24h.total > 0 ? (traffic.breakdown24h.subscribers / traffic.breakdown24h.total * 100) : 0}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#40B8F4]" />
                    <span className="text-sm">Free Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{traffic.breakdown24h.freeUsers}</span>
                    <span className="text-[10px] text-[#A8A9AD]">
                      {traffic.breakdown24h.total > 0 ? Math.round(traffic.breakdown24h.freeUsers / traffic.breakdown24h.total * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-[#40B8F4]" style={{ width: `${traffic.breakdown24h.total > 0 ? (traffic.breakdown24h.freeUsers / traffic.breakdown24h.total * 100) : 0}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6B6D71]" />
                    <span className="text-sm">Anonymous Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{traffic.breakdown24h.anonymous}</span>
                    <span className="text-[10px] text-[#A8A9AD]">
                      {traffic.breakdown24h.total > 0 ? Math.round(traffic.breakdown24h.anonymous / traffic.breakdown24h.total * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-[#6B6D71]" style={{ width: `${traffic.breakdown24h.total > 0 ? (traffic.breakdown24h.anonymous / traffic.breakdown24h.total * 100) : 0}%` }} />
                </div>
              </div>
            </div>

            {/* Traffic by Tier (7d) */}
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <h3 className="font-semibold text-sm mb-4">Traffic by Tier (7d)</h3>
              <div className="space-y-3">
                {traffic.tierBreakdown.map(t => {
                  const total = traffic.tierBreakdown.reduce((s, x) => s + x.views, 0);
                  return (
                    <div key={t.tier} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${tierColors[t.tier] || 'bg-[#A8A9AD]'}`} />
                        <span className="text-sm">{tierLabels[t.tier] || t.tier}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{t.views.toLocaleString()}</span>
                        <span className="text-[10px] text-[#A8A9AD]">{total > 0 ? Math.round(t.views / total * 100) : 0}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Hourly Traffic Chart (24h) */}
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5 mb-6">
            <h3 className="font-semibold text-sm mb-4">Hourly Traffic (Last 24h)</h3>
            <div className="flex items-end gap-1 h-32">
              {traffic.hourlyTraffic.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    className="w-full bg-[#7366FF] rounded-t hover:bg-[#5A4FCF] transition-colors min-h-[2px]"
                    style={{ height: `${Math.max((h.views / maxHourly) * 100, 2)}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#1D1E26] border border-white/10 rounded px-2 py-1 text-[10px] text-white whitespace-nowrap z-10">
                    {new Date(h.timestamp).toLocaleTimeString('en-US', { hour: 'numeric' })} - {h.views} views
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-[#A8A9AD]">
              {traffic.hourlyTraffic.length > 0 && (
                <>
                  <span>{new Date(traffic.hourlyTraffic[0]?.timestamp).toLocaleTimeString('en-US', { hour: 'numeric' })}</span>
                  <span>Now</span>
                </>
              )}
            </div>
          </div>

          {/* Daily Traffic Chart (7d) */}
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5 mb-6">
            <h3 className="font-semibold text-sm mb-4">Daily Traffic (Last 7 Days)</h3>
            <div className="flex items-end gap-2 h-32">
              {traffic.dailyTraffic.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#A8A9AD] font-medium">{d.views}</span>
                  <div
                    className="w-full bg-green-500 rounded-t min-h-[2px]"
                    style={{ height: `${Math.max((d.views / maxDaily) * 100, 2)}%` }}
                  />
                  <span className="text-[9px] text-[#A8A9AD]">
                    {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <h3 className="font-semibold text-sm mb-4">Top Pages - All Traffic (7d)</h3>
              <div className="space-y-2">
                {traffic.topPages.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-[#A8A9AD] truncate max-w-[70%] font-mono">{p.path}</span>
                    <span className="text-xs font-semibold">{p.views.toLocaleString()}</span>
                  </div>
                ))}
                {traffic.topPages.length === 0 && <p className="text-xs text-[#A8A9AD]">No data yet</p>}
              </div>
            </div>
            <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
              <h3 className="font-semibold text-sm mb-4">Top Pages - Subscribers Only (7d)</h3>
              <div className="space-y-2">
                {traffic.topPagesSubscribers.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-[#A8A9AD] truncate max-w-[70%] font-mono">{p.path}</span>
                    <span className="text-xs font-semibold text-[#7366FF]">{p.views.toLocaleString()}</span>
                  </div>
                ))}
                {traffic.topPagesSubscribers.length === 0 && <p className="text-xs text-[#A8A9AD]">No subscriber traffic yet</p>}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Subscription & Feature Stats */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <h3 className="font-semibold text-sm mb-4">Subscription Tiers</h3>
            <div className="space-y-3">
              {stats.tierDistribution.map((tier) => (
                <div key={tier.tier} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${tierColors[tier.tier] || 'bg-[#A8A9AD]'}`} />
                    <span className="text-sm">{tierLabels[tier.tier] || tier.tier}</span>
                  </div>
                  <span className="text-sm text-[#A8A9AD]">{tier.count} orgs</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
            <h3 className="font-semibold text-sm mb-4">Feature Adoption</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Soroban Pro</span>
                <span className="text-sm font-semibold">{stats.featureUsage.sorobanPro} orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Transaction Intelligence</span>
                <span className="text-sm font-semibold">{stats.featureUsage.intelligence} orgs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Portfolio Intelligence</span>
                <span className="text-sm font-semibold">{stats.featureUsage.portfolio} orgs</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-[#262932] rounded-xl border border-white/5 p-5">
        <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-[#7366FF]/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#7366FF]/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium">Manage Users</p>
              <p className="text-[10px] text-[#A8A9AD]">View and edit accounts</p>
            </div>
          </Link>
          <Link href="/admin/support" className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-green-500/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium">Support Tickets</p>
              <p className="text-[10px] text-[#A8A9AD]">Manage customer requests</p>
            </div>
          </Link>
          <Link href="/admin/audit" className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div>
              <p className="text-sm font-medium">Audit Log</p>
              <p className="text-[10px] text-[#A8A9AD]">Review admin actions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
