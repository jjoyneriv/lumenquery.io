'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CallHistoryTable, ExportButton } from '@/components/contracts';

interface Call {
  id: string;
  txHash: string;
  ledger: number;
  timestamp: string;
  functionName: string;
  inputsDecoded: unknown;
  outputsDecoded: unknown;
  status: string;
  errorCode: string | null;
  gasUsed: number | null;
}

interface FunctionCount {
  name: string;
  count: number;
}

export default function ContractCallsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const contractId = params.contractId as string;

  const [calls, setCalls] = useState<Call[]>([]);
  const [functions, setFunctions] = useState<FunctionCount[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedFunction, setSelectedFunction] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(pagination.page),
          limit: String(pagination.limit),
        });

        if (selectedFunction) queryParams.set('function', selectedFunction);
        if (selectedStatus) queryParams.set('status', selectedStatus);

        const res = await fetch(`/api/contracts/${contractId}/calls?${queryParams}`);
        const data = await res.json();

        setCalls(data.calls || []);
        setFunctions(data.functions || []);
        setPagination(data.pagination || pagination);
      } catch (error) {
        console.error('Failed to fetch calls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, [contractId, pagination.page, selectedFunction, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm text-[#6A6A6A] mb-1">Function</label>
            <select
              value={selectedFunction || ''}
              onChange={(e) => {
                setSelectedFunction(e.target.value || null);
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF]"
            >
              <option value="">All Functions</option>
              {functions.map((fn) => (
                <option key={fn.name} value={fn.name}>
                  {fn.name} ({fn.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#6A6A6A] mb-1">Status</label>
            <select
              value={selectedStatus || ''}
              onChange={(e) => {
                setSelectedStatus(e.target.value || null);
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF]"
            >
              <option value="">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex-1" />

          <ExportButton
            contractId={contractId}
            type="calls"
            canExport={!!session}
          />
        </div>
      </div>

      {/* Calls Table */}
      {loading ? (
        <div className="bg-white border border-[#E6E7E9] rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#7366FF] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      ) : (
        <CallHistoryTable calls={calls} />
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border border-[#E6E7E9] rounded-lg p-4">
          <p className="text-sm text-[#6A6A6A]">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} calls
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="px-3 py-1 border border-[#E6E7E9] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#7366FF]"
            >
              Previous
            </button>
            <span className="text-sm text-[#6A6A6A]">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 border border-[#E6E7E9] rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#7366FF]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
