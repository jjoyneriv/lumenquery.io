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
    compliance: number;
    portfolio: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/usage?period=7d');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#2855FF] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-[#6A6A6A]">System overview and statistics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#6A6A6A]">Total Users</p>
              <p className="text-2xl font-bold text-black">{stats.overview.totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[#6A6A6A]">{stats.overview.activeUsers} online now</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#6A6A6A]">Organizations</p>
              <p className="text-2xl font-bold text-black">{stats.overview.totalOrganizations}</p>
            </div>
          </div>
          <Link href="/admin/users" className="text-sm text-[#2855FF] hover:underline">
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#6A6A6A]">Active API Keys</p>
              <p className="text-2xl font-bold text-black">{stats.overview.totalApiKeys}</p>
            </div>
          </div>
          <p className="text-sm text-[#6A6A6A]">Non-revoked keys</p>
        </div>

        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[#6A6A6A]">Requests (7d)</p>
              <p className="text-2xl font-bold text-black">{stats.usage.totalRequests.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm">
            <span className={stats.usage.successRate >= 95 ? 'text-green-600' : 'text-yellow-600'}>
              {stats.usage.successRate}% success rate
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tier Distribution */}
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <h2 className="text-lg font-bold text-black mb-4">Subscription Tiers</h2>
          <div className="space-y-4">
            {stats.tierDistribution.map((tier) => (
              <div key={tier.tier} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${
                    tier.tier === 'ENTERPRISE' ? 'bg-yellow-500' :
                    tier.tier === 'TEAM' ? 'bg-blue-500' :
                    tier.tier === 'DEVELOPER' ? 'bg-green-500' :
                    tier.tier === 'AUDITOR' ? 'bg-purple-500' :
                    'bg-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-black">{tier.tier}</span>
                </div>
                <span className="text-sm text-[#6A6A6A]">{tier.count} organizations</span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Usage */}
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
          <h2 className="text-lg font-bold text-black mb-4">Feature Adoption</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Soroban Pro</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">{stats.featureUsage.sorobanPro}</span>
                <span className="text-xs text-[#6A6A6A]">orgs</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Transaction Intelligence</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">{stats.featureUsage.intelligence}</span>
                <span className="text-xs text-[#6A6A6A]">orgs</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Compliance & AML</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">{stats.featureUsage.compliance}</span>
                <span className="text-xs text-[#6A6A6A]">orgs</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Portfolio Intelligence</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">{stats.featureUsage.portfolio}</span>
                <span className="text-xs text-[#6A6A6A]">orgs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
        <h2 className="text-lg font-bold text-black mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-4 border border-[#E6E7E9] rounded-lg hover:border-[#2855FF] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-black">Manage Users</p>
              <p className="text-sm text-[#6A6A6A]">View and edit user accounts</p>
            </div>
          </Link>

          <Link
            href="/admin/usage"
            className="flex items-center gap-3 p-4 border border-[#E6E7E9] rounded-lg hover:border-[#2855FF] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-black">Usage Analytics</p>
              <p className="text-sm text-[#6A6A6A]">View platform usage stats</p>
            </div>
          </Link>

          <Link
            href="/admin/audit"
            className="flex items-center gap-3 p-4 border border-[#E6E7E9] rounded-lg hover:border-[#2855FF] transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-black">Audit Log</p>
              <p className="text-sm text-[#6A6A6A]">Review admin actions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
