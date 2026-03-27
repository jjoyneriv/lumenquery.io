'use client';

import { useEffect, useState } from 'react';
import { UserTable } from '@/components/admin';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
  organization: {
    id: string;
    name: string;
    tier: string;
    intelligenceTier: string;
    portfolioTier: string;
  } | null;
  apiKeyCount: number;
  sessionCount: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, search, roleFilter, tierFilter, activeOnly]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) params.set('search', search);
      if (roleFilter) params.set('role', roleFilter);
      if (tierFilter) params.set('tier', tierFilter);
      if (activeOnly) params.set('activeOnly', 'true');

      const response = await fetch(`/api/admin/users?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-gray-400">View and manage user accounts</p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Total Users:</span>
          <span className="font-semibold text-white">{stats.totalUsers}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-gray-400">Online:</span>
          <span className="font-semibold text-white">{stats.activeUsers}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#262932] rounded-xl border border-white/10 p-4 mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-[#7366FF]"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-[#7366FF] bg-[#262932]"
          >
            <option value="">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>

          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:border-[#7366FF] bg-[#262932]"
          >
            <option value="">All Tiers</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="TEAM">Team</option>
            <option value="DEVELOPER">Developer</option>
            <option value="AUDITOR">Auditor</option>
            <option value="FREE">Free</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => {
                setActiveOnly(e.target.checked);
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="w-4 h-4 rounded border-white/10 text-[#7366FF] focus:ring-[#7366FF]"
            />
            <span className="text-sm text-gray-400">Online only</span>
          </label>

          <button
            type="submit"
            className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-2 border-[#7366FF] border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          <UserTable users={users} onRefresh={fetchUsers} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-400">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} users
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 border border-white/10 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-400">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-3 py-1 border border-white/10 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
