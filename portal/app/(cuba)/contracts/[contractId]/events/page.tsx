'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { EventStream, ExportButton } from '@/components/contracts';

interface Event {
  id: string;
  eventId: string;
  txHash: string;
  ledger: number;
  timestamp: string;
  eventType: string;
  topics: string[] | object | null;
  data: object | string | null;
}

interface TypeCount {
  type: string;
  count: number;
}

export default function ContractEventsPage() {
  const params = useParams();
  const { data: session } = useSession();
  const contractId = params.contractId as string;

  const [events, setEvents] = useState<Event[]>([]);
  const [typeCounts, setTypeCounts] = useState<TypeCount[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: String(pagination.page),
          limit: String(pagination.limit),
        });

        if (selectedType) queryParams.set('type', selectedType);

        const res = await fetch(`/api/contracts/${contractId}/events?${queryParams}`);
        const data = await res.json();

        setEvents(data.events || []);
        setTypeCounts(data.typeCounts || []);
        setPagination(data.pagination || pagination);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [contractId, pagination.page, selectedType]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Contract Events</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedType || ''}
            onChange={(e) => {
              setSelectedType(e.target.value || null);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="px-3 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7366FF]"
          >
            <option value="">All Types</option>
            <option value="system">System</option>
            <option value="contract">Contract</option>
            <option value="diagnostic">Diagnostic</option>
          </select>
          <ExportButton
            contractId={contractId}
            type="events"
            canExport={!!session}
          />
        </div>
      </div>

      {/* Events */}
      {loading ? (
        <div className="bg-[#262932] border border-white/10 rounded-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#7366FF] border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      ) : (
        <EventStream events={events} typeCounts={typeCounts} />
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#262932] border border-white/10 rounded-lg p-4">
          <p className="text-sm text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} events
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
