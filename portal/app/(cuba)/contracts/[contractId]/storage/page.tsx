'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { StorageTable, ExportButton } from '@/components/contracts';

interface StorageEntry {
  id: string;
  key: string;
  keyDecoded: string | null;
  value: string;
  valueDecoded: unknown;
  ledger: number;
  timestamp: string;
}

interface Snapshot {
  totalEntries: number;
  totalSizeBytes: number;
  ledger: number;
  timestamp: string;
}

export default function ContractStoragePage() {
  const params = useParams();
  const { data: session } = useSession();
  const contractId = params.contractId as string;

  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStorage = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/contracts/${contractId}/storage?page=${pagination.page}&limit=${pagination.limit}`
        );
        const data = await res.json();

        setEntries(data.entries || []);
        setSnapshot(data.snapshot || null);
        setPagination(data.pagination || pagination);
      } catch (error) {
        console.error('Failed to fetch storage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, [contractId, pagination.page]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contract Storage</h2>
        <ExportButton
          contractId={contractId}
          type="storage"
          canExport={!!session}
        />
      </div>

      {/* Storage Table */}
      {loading ? (
        <div className="bg-[#262932] border border-white/10 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#7366FF] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      ) : (
        <StorageTable entries={entries} snapshot={snapshot} />
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#262932] border border-white/10 rounded-lg p-4">
          <p className="text-sm text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} entries
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-white/10 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#7366FF]"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 border border-white/10 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#7366FF]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
