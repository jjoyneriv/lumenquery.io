'use client';

import { useEffect, useState } from 'react';

interface UsageStats {
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
  topEndpoints: Array<{
    endpoint: string;
    requests: number;
    avgResponseTime: number;
  }>;
  dailyUsage: Array<{
    date: string;
    requests: number;
    successful: number;
    failed: number;
  }>;
}

export default function UsagePage() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [period, setPeriod] = useState('7d');

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/usage?period=${period}`);
      if (!response.ok) {
        throw new Error('Failed to fetch usage stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#7366FF] border-t-transparent rounded-full" />
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

  const maxRequests = Math.max(...stats.dailyUsage.map(d => d.requests), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Usage Analytics</h1>
          <p className="text-gray-400">Platform usage statistics and trends</p>
        </div>
        <div className="flex items-center gap-2">
          {['24h', '7d', '30d'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                period === p
                  ? 'bg-[#7366FF] text-white'
                  : 'bg-[#262932] border border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Total Requests</p>
          <p className="text-3xl font-bold text-white">{stats.usage.totalRequests.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-2">{period} period</p>
        </div>
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Successful</p>
          <p className="text-3xl font-bold text-green-600">{stats.usage.successfulRequests.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">{stats.usage.successRate}% success rate</p>
        </div>
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Failed</p>
          <p className="text-3xl font-bold text-red-600">{stats.usage.failedRequests.toLocaleString()}</p>
          <p className="text-sm text-red-600 mt-2">{(100 - stats.usage.successRate).toFixed(2)}% error rate</p>
        </div>
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <p className="text-sm text-gray-400 mb-1">Active Users</p>
          <p className="text-3xl font-bold text-[#7366FF]">{stats.overview.activeUsers}</p>
          <p className="text-sm text-gray-400 mt-2">of {stats.overview.totalUsers} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Chart */}
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Daily Requests</h2>
          <div className="h-64">
            <div className="flex items-end justify-between h-48 gap-1">
              {stats.dailyUsage.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col-reverse">
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${(day.successful / maxRequests) * 180}px` }}
                    />
                    <div
                      className="w-full bg-red-500"
                      style={{ height: `${(day.failed / maxRequests) * 180}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {stats.dailyUsage.map((day, i) => (
                <span key={i} className="flex-1 text-center">
                  {formatDate(day.date)}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500" />
              <span className="text-sm text-gray-400">Successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500" />
              <span className="text-sm text-gray-400">Failed</span>
            </div>
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
          <h2 className="text-lg font-bold text-white mb-4">Top Endpoints</h2>
          <div className="space-y-4">
            {stats.topEndpoints.map((endpoint, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-mono text-white truncate max-w-[60%]">{endpoint.endpoint}</span>
                  <span className="text-sm text-gray-400">{endpoint.requests.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7366FF] rounded-full"
                      style={{ width: `${(endpoint.requests / stats.topEndpoints[0].requests) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-16 text-right">{endpoint.avgResponseTime}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
