'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  OPEN: 'bg-[#40B8F4]/10 text-[#40B8F4]',
  IN_PROGRESS: 'bg-[#7366FF]/10 text-[#7366FF]',
  WAITING_ON_CUSTOMER: 'bg-[#FFB829]/10 text-[#FFB829]',
  RESOLVED: 'bg-green-500/10 text-green-400',
  CLOSED: 'bg-white/5 text-[#A8A9AD]',
};

const statusLabels: Record<string, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  WAITING_ON_CUSTOMER: 'Awaiting Reply',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

const priorityColors: Record<string, string> = {
  LOW: 'text-[#A8A9AD]',
  MEDIUM: 'text-[#40B8F4]',
  HIGH: 'text-[#FFB829]',
  URGENT: 'text-[#FC564A]',
};

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [counts, setCounts] = useState<any>({});
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTickets(); }, [filter]);

  async function fetchTickets() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/support?status=${filter}`);
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
        setCounts(data.counts || {});
      }
    } finally {
      setLoading(false);
    }
  }

  const filters = [
    { value: 'ALL', label: 'All', count: counts.total },
    { value: 'OPEN', label: 'Open', count: counts.open },
    { value: 'IN_PROGRESS', label: 'In Progress', count: counts.inProgress },
    { value: 'WAITING_ON_CUSTOMER', label: 'Awaiting', count: counts.waiting },
    { value: 'RESOLVED', label: 'Resolved', count: counts.resolved },
    { value: 'CLOSED', label: 'Closed', count: counts.closed },
  ];

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`p-3 rounded-xl border text-center transition-colors ${
              filter === f.value ? 'border-[#7366FF] bg-[#7366FF]/10' : 'border-white/5 bg-[#262932] hover:border-white/10'
            }`}
          >
            <p className="text-lg font-bold">{f.count ?? '-'}</p>
            <p className="text-[11px] text-[#A8A9AD]">{f.label}</p>
          </button>
        ))}
      </div>

      {/* Tickets Table */}
      <div className="bg-[#262932] rounded-2xl border border-white/5">
        <div className="px-5 pt-5 pb-3 border-b border-white/5">
          <h2 className="font-semibold text-sm">
            {filter === 'ALL' ? 'All Tickets' : `${statusLabels[filter] || filter} Tickets`}
          </h2>
        </div>
        {loading ? (
          <div className="p-10 text-center text-[#A8A9AD]">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="p-10 text-center text-[#A8A9AD]">No tickets found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] text-[#A8A9AD] uppercase tracking-wider border-b border-white/5">
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">User</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Category</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Priority</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tickets.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[ticket.status] || ''}`}>
                        {statusLabels[ticket.status] || ticket.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Link href={`/support/${ticket.id}`} className="text-sm font-medium hover:text-[#7366FF] transition-colors line-clamp-1">
                        {ticket.subject}
                      </Link>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-xs text-[#A8A9AD] truncate max-w-[150px]">{ticket.user?.email}</p>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className="text-xs text-[#A8A9AD]">{ticket.category}</span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className={`text-xs font-medium ${priorityColors[ticket.priority] || ''}`}>{ticket.priority}</span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-xs text-[#A8A9AD] whitespace-nowrap">
                        {new Date(ticket.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
