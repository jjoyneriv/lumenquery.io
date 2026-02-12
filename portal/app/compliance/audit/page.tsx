'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuditLogTable } from '@/components/compliance';

interface AuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actorType: 'USER' | 'SYSTEM' | 'WORKER' | 'API';
  actorEmail?: string;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  contentHash: string;
  chainValid: boolean;
  timestamp: string;
}

interface Filters {
  actions: string[];
  entityTypes: string[];
}

export default function ComplianceAuditPage() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [filters, setFilters] = useState<Filters>({ actions: [], entityTypes: [] });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [offset, setOffset] = useState(0);
  const limit = 50;

  // Filter state
  const [actionFilter, setActionFilter] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState('');

  const fetchAuditLog = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (actionFilter) params.append('action', actionFilter);
      if (entityTypeFilter) params.append('entityType', entityTypeFilter);
      params.append('limit', String(limit));
      params.append('offset', String(offset));

      const res = await fetch(`/api/compliance/audit?${params}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setEntries(data.entries);
      setFilters(data.filters);
      setTotal(data.pagination.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit log');
    } finally {
      setLoading(false);
    }
  }, [actionFilter, entityTypeFilter, offset]);

  useEffect(() => {
    fetchAuditLog();
  }, [fetchAuditLog]);

  const handleFilterChange = (newFilters: { action?: string; entityType?: string }) => {
    if (newFilters.action !== undefined) setActionFilter(newFilters.action);
    if (newFilters.entityType !== undefined) setEntityTypeFilter(newFilters.entityType);
    setOffset(0);
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Audit Log</h1>
          <p className="text-sm text-[#6A6A6A] mt-1">
            Immutable record of all compliance actions with hash chain verification
          </p>
        </div>
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
        <AuditLogTable
          entries={entries}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6A6A6A]">
            Showing {offset + 1} to {Math.min(offset + limit, total)} of {total} entries
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

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-800">Tamper-Proof Audit Trail</h4>
            <p className="text-sm text-blue-700 mt-1">
              Each audit log entry contains a cryptographic hash of its content, linked to the previous entry.
              This creates an immutable chain that can be verified to detect any tampering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
