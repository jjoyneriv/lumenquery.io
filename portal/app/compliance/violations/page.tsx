'use client';

import { useState, useEffect, useCallback } from 'react';
import { ViolationTable } from '@/components/compliance';

interface Violation {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  status: 'PENDING' | 'UNDER_REVIEW' | 'CLEARED' | 'CONFIRMED' | 'ESCALATED' | 'REPORTED';
  score: number;
  accountId: string;
  counterpartyId?: string;
  transactionHash?: string;
  ruleName: string;
  ruleType: string;
  matchDetails?: Record<string, unknown>;
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
}

interface StatusCounts {
  PENDING?: number;
  UNDER_REVIEW?: number;
  CLEARED?: number;
  CONFIRMED?: number;
  ESCALATED?: number;
  REPORTED?: number;
}

export default function ComplianceViolationsPage() {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const fetchViolations = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (severityFilter) params.append('severity', severityFilter);
      params.append('limit', String(limit));
      params.append('offset', String(offset));

      const res = await fetch(`/api/compliance/violations?${params}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setViolations(data.violations);
      setStatusCounts(data.statusCounts);
      setTotal(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load violations');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, severityFilter, offset]);

  useEffect(() => {
    fetchViolations();
  }, [fetchViolations]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/compliance/violations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      fetchViolations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update violation');
    }
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Violations</h1>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: '', label: 'All', count: total },
          { key: 'PENDING', label: 'Pending', count: statusCounts.PENDING || 0 },
          { key: 'UNDER_REVIEW', label: 'Under Review', count: statusCounts.UNDER_REVIEW || 0 },
          { key: 'CONFIRMED', label: 'Confirmed', count: statusCounts.CONFIRMED || 0 },
          { key: 'ESCALATED', label: 'Escalated', count: statusCounts.ESCALATED || 0 },
          { key: 'CLEARED', label: 'Cleared', count: statusCounts.CLEARED || 0 },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setStatusFilter(item.key);
              setOffset(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === item.key
                ? 'bg-[#2855FF] text-white'
                : 'bg-white border border-[#E6E7E9] text-[#6A6A6A] hover:bg-[#F5F6F7]'
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={severityFilter}
          onChange={(e) => {
            setSeverityFilter(e.target.value);
            setOffset(0);
          }}
          className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
        >
          <option value="">All Severities</option>
          <option value="CRITICAL">Critical</option>
          <option value="WARNING">Warning</option>
          <option value="INFO">Info</option>
        </select>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      ) : (
        <ViolationTable
          violations={violations}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6A6A6A]">
            Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} violations
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOffset(Math.max(0, offset - limit))}
              disabled={offset === 0}
              className="px-3 py-1.5 text-sm font-medium border border-[#E6E7E9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6F7]"
            >
              Previous
            </button>
            <span className="text-sm text-[#6A6A6A]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setOffset(offset + limit)}
              disabled={offset + limit >= total}
              className="px-3 py-1.5 text-sm font-medium border border-[#E6E7E9] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F5F6F7]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
