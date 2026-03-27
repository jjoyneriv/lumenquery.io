'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MetricCard from '@/components/analytics/MetricCard';

interface DashboardStats {
  unreadAlerts: number;
  watchlistAccounts: number;
  alertConfigs: number;
  recentTransactions: number;
}

export default function IntelligenceDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    unreadAlerts: 0,
    watchlistAccounts: 0,
    alertConfigs: 0,
    recentTransactions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const [alertsRes, watchlistsRes, configsRes] = await Promise.all([
        fetch('/api/intelligence/alerts?status=unread&limit=1'),
        fetch('/api/intelligence/watchlists'),
        fetch('/api/intelligence/alerts/configs'),
      ]);

      const [alertsData, watchlistsData, configsData] = await Promise.all([
        alertsRes.json(),
        watchlistsRes.json(),
        configsRes.json(),
      ]);

      setStats({
        unreadAlerts: alertsData.unreadCount || 0,
        watchlistAccounts: watchlistsData.watchlists?.reduce(
          (sum: number, w: { accountCount: number }) => sum + w.accountCount,
          0
        ) || 0,
        alertConfigs: configsData.configurations?.length || 0,
        recentTransactions: 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Unread Alerts"
              value={loading ? '-' : stats.unreadAlerts}
              icon="custom"
              customIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              }
            />
            <MetricCard
              title="Watched Accounts"
              value={loading ? '-' : stats.watchlistAccounts}
              icon="custom"
              customIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            <MetricCard
              title="Alert Configs"
              value={loading ? '-' : stats.alertConfigs}
              icon="custom"
              customIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
            />
            <MetricCard
              title="Transactions/hr"
              value={loading ? '-' : stats.recentTransactions}
              icon="transactions"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/intelligence/stream"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Live Stream</h3>
                  <p className="text-sm text-gray-400">Watch transactions in real-time</p>
                </div>
              </div>
            </Link>

            <Link
              href="/intelligence/accounts"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Account Lookup</h3>
                  <p className="text-sm text-gray-400">Analyze account behavior</p>
                </div>
              </div>
            </Link>

            <Link
              href="/intelligence/watchlists"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Watchlists</h3>
                  <p className="text-sm text-gray-400">Monitor specific accounts</p>
                </div>
              </div>
            </Link>

            <Link
              href="/intelligence/alerts"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Alerts</h3>
                  <p className="text-sm text-gray-400">
                    {stats.unreadAlerts > 0
                      ? `${stats.unreadAlerts} unread alert${stats.unreadAlerts > 1 ? 's' : ''}`
                      : 'Configure custom alerts'}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/intelligence/trustlines"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Trustlines</h3>
                  <p className="text-sm text-gray-400">Track trustline changes</p>
                </div>
              </div>
            </Link>

            <Link
              href="/intelligence/contracts"
              className="bg-[#262932] rounded-xl border border-white/10 p-6 hover:border-[#7366FF] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Contracts</h3>
                  <p className="text-sm text-gray-400">Soroban contract analytics</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-[#7366FF] to-[#5A4FCF] rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
            <p className="text-white/80 mb-4">
              Set up your first alert or watchlist to start monitoring Stellar network activity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/intelligence/alerts/configs"
                className="px-4 py-2 bg-white text-[#7366FF] rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                Create Alert
              </Link>
              <Link
                href="/intelligence/watchlists"
                className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Create Watchlist
              </Link>
            </div>
      </div>
    </div>
  );
}
