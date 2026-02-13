'use client';

import { useEffect, useState } from 'react';
import { AuditLogTable } from '@/components/admin';

interface AuditLog {
  id: string;
  action: string;
  admin: {
    id: string;
    email: string;
    name: string | null;
  };
  targetUser: {
    id: string;
    email: string;
    name: string | null;
  } | null;
  details: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ActionType {
  action: string;
  count: number;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [actionTypes, setActionTypes] = useState<ActionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [pagination.page, actionFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (actionFilter) params.set('action', actionFilter);

      const response = await fetch(`/api/admin/audit?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }

      const data = await response.json();
      setLogs(data.logs);
      setPagination(data.pagination);
      setActionTypes(data.actionTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black">Audit Log</h1>
        <p className="text-[#6A6A6A]">Track all admin actions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-4 mb-6">
        <div className="flex items-center gap-4">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="px-4 py-2 border border-[#E6E7E9] rounded-lg focus:outline-none focus:border-[#2855FF] bg-white"
          >
            <option value="">All Actions</option>
            {actionTypes.map((type) => (
              <option key={type.action} value={type.action}>
                {type.action.replace(/_/g, ' ')} ({type.count})
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setActionFilter('');
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="px-4 py-2 text-[#6A6A6A] hover:text-black transition-colors"
          >
            Clear Filters
          </button>
        </div>
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
          <div className="animate-spin w-8 h-8 border-2 border-[#2855FF] border-t-transparent rounded-full" />
        </div>
      ) : logs.length > 0 ? (
        <>
          <AuditLogTable logs={logs} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-[#6A6A6A]">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} entries
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1 border border-[#E6E7E9] rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-[#6A6A6A]">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.totalPages}
                  className="px-3 py-1 border border-[#E6E7E9] rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-black mb-2">No audit logs yet</h3>
          <p className="text-[#6A6A6A]">Admin actions will appear here when they are performed.</p>
        </div>
      )}
    </div>
  );
}
