'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const categories = [
  { value: 'GENERAL', label: 'General Question' },
  { value: 'BILLING', label: 'Billing & Payments' },
  { value: 'SUBSCRIPTION', label: 'Subscription Issue' },
  { value: 'TECHNICAL', label: 'Technical Support' },
  { value: 'BUG_REPORT', label: 'Bug Report' },
  { value: 'FEATURE_REQUEST', label: 'Feature Request' },
  { value: 'ACCOUNT', label: 'Account Issue' },
];

const priorities = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

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

export default function SupportPage() {
  const { data: session, status: authStatus } = useSession();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [priority, setPriority] = useState('MEDIUM');

  useEffect(() => {
    if (authStatus === 'authenticated') fetchTickets();
    else if (authStatus === 'unauthenticated') setLoading(false);
  }, [authStatus]);

  async function fetchTickets() {
    try {
      const res = await fetch('/api/support');
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, category, priority }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create ticket');
      }
      setSuccess('Ticket created successfully. We\'ll get back to you soon.');
      setSubject('');
      setDescription('');
      setCategory('GENERAL');
      setPriority('MEDIUM');
      setShowForm(false);
      fetchTickets();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="text-white max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-[#7366FF]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">Support Center</h1>
        <p className="text-[#A8A9AD] mb-6">Sign in to create support tickets and get help from our team.</p>
        <Link href="/auth/signin" className="px-6 py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="text-white max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Support Center</h1>
          <p className="text-sm text-[#A8A9AD] mt-1">Get help with your account, billing, or technical issues</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(''); setSuccess(''); }}
          className="px-5 py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors flex items-center gap-2 self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Ticket
        </button>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <p className="text-green-400 text-sm">{success}</p>
        </div>
      )}

      {/* New Ticket Form */}
      {showForm && (
        <div className="bg-[#262932] rounded-2xl border border-white/5 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Create Support Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#A8A9AD] mb-1.5">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
                maxLength={200}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-white placeholder-[#6B6D71] focus:border-[#7366FF] focus:outline-none text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#A8A9AD] mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-white focus:border-[#7366FF] focus:outline-none text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A8A9AD] mb-1.5">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-white focus:border-[#7366FF] focus:outline-none text-sm"
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A8A9AD] mb-1.5">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your issue in detail..."
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-white placeholder-[#6B6D71] focus:border-[#7366FF] focus:outline-none text-sm resize-none"
              />
            </div>
            {error && (
              <div className="bg-[#FC564A]/10 border border-[#FC564A]/20 rounded-lg p-3">
                <p className="text-[#FC564A] text-sm">{error}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-lg border border-white/10 text-[#A8A9AD] hover:text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tickets List */}
      <div className="bg-[#262932] rounded-2xl border border-white/5">
        <div className="px-5 pt-5 pb-3 border-b border-white/5">
          <h2 className="font-semibold text-sm">Your Tickets ({tickets.length})</h2>
        </div>
        {loading ? (
          <div className="p-10 text-center text-[#A8A9AD]">Loading...</div>
        ) : tickets.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-[#A8A9AD] mb-2">No support tickets yet</p>
            <p className="text-xs text-[#A8A9AD]/60">Click &quot;New Ticket&quot; to create one</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {tickets.map((ticket: any) => (
              <Link
                key={ticket.id}
                href={`/support/${ticket.id}`}
                className="flex items-start gap-4 p-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[ticket.status] || ''}`}>
                      {statusLabels[ticket.status] || ticket.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[#A8A9AD] text-[10px] font-medium">
                      {ticket.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium truncate">{ticket.subject}</h3>
                  <p className="text-xs text-[#A8A9AD] mt-1">
                    {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {ticket.messages?.[0] && (
                      <span> &middot; Last reply: {new Date(ticket.messages[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    )}
                  </p>
                </div>
                <svg className="w-4 h-4 text-[#A8A9AD] mt-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
