'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  WAITING_ON_CUSTOMER: 'Awaiting Your Reply',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
};

export default function TicketDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const ticketId = params.ticketId as string;
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAdmin = (session?.user as any)?.role === 'SUPER_ADMIN';

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages]);

  async function fetchTicket() {
    try {
      const res = await fetch(`/api/support/${ticketId}`);
      if (res.ok) {
        const data = await res.json();
        setTicket(data.ticket);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setError('');
    setSending(true);

    try {
      const res = await fetch(`/api/support/${ticketId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send message');
      }
      setMessage('');
      fetchTicket();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  async function handleStatusChange(newStatus: string) {
    try {
      await fetch(`/api/support/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchTicket();
    } catch {}
  }

  if (loading) {
    return <div className="text-white text-center py-16 text-[#A8A9AD]">Loading ticket...</div>;
  }

  if (!ticket) {
    return (
      <div className="text-white text-center py-16">
        <p className="text-[#A8A9AD] mb-4">Ticket not found</p>
        <Link href="/support" className="text-[#7366FF] hover:underline">Back to Support</Link>
      </div>
    );
  }

  return (
    <div className="text-white max-w-3xl mx-auto">
      {/* Back link */}
      <Link href="/support" className="inline-flex items-center gap-1.5 text-sm text-[#A8A9AD] hover:text-white transition-colors mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Tickets
      </Link>

      {/* Ticket Header */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 p-5 mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status] || ''}`}>
            {statusLabels[ticket.status] || ticket.status}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/5 text-[#A8A9AD] text-xs font-medium">
            {ticket.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white/5 text-[#A8A9AD] text-xs font-medium">
            {ticket.priority} Priority
          </span>
        </div>
        <h1 className="text-lg font-bold mb-2">{ticket.subject}</h1>
        <p className="text-xs text-[#A8A9AD]">
          Created {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {isAdmin && ticket.status !== 'CLOSED' && (
            <>
              <button onClick={() => handleStatusChange('IN_PROGRESS')} className="px-3 py-1.5 rounded-lg bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium hover:bg-[#7366FF]/20 transition-colors">
                Mark In Progress
              </button>
              <button onClick={() => handleStatusChange('RESOLVED')} className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-colors">
                Mark Resolved
              </button>
              <button onClick={() => handleStatusChange('CLOSED')} className="px-3 py-1.5 rounded-lg bg-white/5 text-[#A8A9AD] text-xs font-medium hover:bg-white/10 transition-colors">
                Close Ticket
              </button>
            </>
          )}
          {!isAdmin && ticket.status !== 'CLOSED' && (
            <button onClick={() => handleStatusChange('CLOSED')} className="px-3 py-1.5 rounded-lg bg-white/5 text-[#A8A9AD] text-xs font-medium hover:bg-white/10 transition-colors">
              Close Ticket
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="bg-[#262932] rounded-2xl border border-white/5 mb-4">
        <div className="px-5 pt-5 pb-3 border-b border-white/5">
          <h2 className="font-semibold text-sm">Conversation ({ticket.messages?.length || 0})</h2>
        </div>
        <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto sidebar-scroll">
          {ticket.messages?.map((msg: any) => (
            <div key={msg.id} className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${msg.isAdmin ? 'bg-[#1D1E26] border border-white/5' : 'bg-[#7366FF]/10 border border-[#7366FF]/20'}`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold">
                    {msg.isAdmin ? 'Support Team' : msg.senderName}
                  </span>
                  {msg.isAdmin && (
                    <span className="px-1.5 py-0.5 rounded bg-[#7366FF]/10 text-[#7366FF] text-[9px] font-bold">ADMIN</span>
                  )}
                </div>
                <p className="text-sm text-[#BEBFC2] whitespace-pre-wrap">{msg.message}</p>
                <p className="text-[10px] text-[#A8A9AD] mt-2">
                  {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Reply Form */}
      {ticket.status !== 'CLOSED' ? (
        <form onSubmit={handleSendMessage} className="bg-[#262932] rounded-2xl border border-white/5 p-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your reply..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-[#1D1E26] border border-white/10 text-white placeholder-[#6B6D71] focus:border-[#7366FF] focus:outline-none text-sm resize-none mb-3"
          />
          {error && (
            <p className="text-[#FC564A] text-xs mb-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="px-5 py-2.5 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium text-sm transition-colors disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Reply'}
          </button>
        </form>
      ) : (
        <div className="bg-[#262932] rounded-2xl border border-white/5 p-5 text-center">
          <p className="text-sm text-[#A8A9AD]">This ticket is closed. <button onClick={() => handleStatusChange('OPEN')} className="text-[#7366FF] hover:underline">Reopen it</button> to continue the conversation.</p>
        </div>
      )}
    </div>
  );
}
