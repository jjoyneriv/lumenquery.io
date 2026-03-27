'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTable } from '@/components/intelligence';

interface Alert {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  sourceType: string;
  sourceId: string;
  configName: string;
  alertType: string;
  createdAt: string;
  readAt?: string;
  isRead: boolean;
}

export default function AlertsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/alerts');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAlerts();
    }
  }, [session, filter, severityFilter]);

  const fetchAlerts = async () => {
    try {
      const params = new URLSearchParams();
      params.set('status', filter);
      if (severityFilter) params.set('severity', severityFilter);
      params.set('limit', String(pagination.limit));
      params.set('offset', String(pagination.offset));

      const res = await fetch(`/api/intelligence/alerts?${params.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setAlerts(data.alerts || []);
        setPagination(data.pagination || pagination);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Alerts list error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch(`/api/intelligence/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ readAt: new Date().toISOString() }),
      });

      if (res.ok) {
        setAlerts((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, isRead: true, readAt: new Date().toISOString() } : a
          )
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      // Mark all visible unread alerts as read
      const unreadAlerts = alerts.filter((a) => !a.isRead);
      await Promise.all(
        unreadAlerts.map((a) =>
          fetch(`/api/intelligence/alerts/${a.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ readAt: new Date().toISOString() }),
          })
        )
      );

      setAlerts((prev) =>
        prev.map((a) => ({ ...a, isRead: true, readAt: a.readAt || new Date().toISOString() }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this alert?')) return;

    try {
      const res = await fetch(`/api/intelligence/alerts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete alert:', error);
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Alert Inbox
          </h1>
          <p className="text-[#6A6A6A] mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread alert${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </div>
        <Link
          href="/intelligence/alerts/configs"
          className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors"
        >
          Manage Configs
        </Link>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6A6A6A]">Status:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-[#7366FF] text-white'
                  : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === 'unread'
                  ? 'bg-[#7366FF] text-white'
                  : 'bg-[#F5F6F7] text-[#6A6A6A] hover:text-black'
              }`}
            >
              Unread
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6A6A6A]">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-1.5 border border-[#E6E7E9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF]"
            >
              <option value="">All</option>
              <option value="INFO">Info</option>
              <option value="WARNING">Warning</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts Table */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF] mx-auto" />
        </div>
      ) : (
        <AlertTable
          alerts={alerts}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      {pagination.total > pagination.limit && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() =>
              setPagination((p) => ({ ...p, offset: Math.max(0, p.offset - p.limit) }))
            }
            disabled={pagination.offset === 0}
            className="px-3 py-1.5 bg-[#F5F6F7] text-[#6A6A6A] rounded-lg text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-[#6A6A6A]">
            {pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
          </span>
          <button
            onClick={() =>
              setPagination((p) => ({
                ...p,
                offset: Math.min(p.total - p.limit, p.offset + p.limit),
              }))
            }
            disabled={pagination.offset + pagination.limit >= pagination.total}
            className="px-3 py-1.5 bg-[#F5F6F7] text-[#6A6A6A] rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
