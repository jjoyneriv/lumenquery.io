'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { WatchlistTable, WatchlistManager } from '@/components/intelligence';

interface Watchlist {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  accountCount: number;
}

export default function WatchlistsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState<Watchlist | null>(null);
  const [limits, setLimits] = useState<{ used: number; limit: number } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/watchlists');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchWatchlists();
    }
  }, [session]);

  const fetchWatchlists = async () => {
    try {
      const res = await fetch('/api/intelligence/watchlists');
      const data = await res.json();
      if (res.ok) {
        setWatchlists(data.watchlists || []);
        setLimits(data.limits);
      }
    } catch (error) {
      console.error('Failed to fetch watchlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: { name: string; description: string }) => {
    const res = await fetch('/api/intelligence/watchlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create watchlist');
    }

    setShowCreateForm(false);
    fetchWatchlists();
  };

  const handleUpdate = async (data: { name: string; description: string }) => {
    if (!editingWatchlist) return;

    const res = await fetch(`/api/intelligence/watchlists/${editingWatchlist.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update watchlist');
    }

    setEditingWatchlist(null);
    fetchWatchlists();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/intelligence/watchlists/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchWatchlists();
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Watchlists
          </h1>
          <p className="text-[#6A6A6A] mt-1">
            Monitor specific Stellar accounts for activity
            {limits && (
              <span className="ml-2 text-sm">
                ({limits.used}/{limits.limit} accounts used)
              </span>
            )}
          </p>
        </div>
        {!showCreateForm && !editingWatchlist && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-[#2855FF] text-white rounded-lg font-medium hover:bg-[#1E44CC] transition-colors"
          >
            Create Watchlist
          </button>
        )}
      </header>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <WatchlistManager
          onSubmit={handleCreate}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {editingWatchlist && (
        <WatchlistManager
          onSubmit={handleUpdate}
          onCancel={() => setEditingWatchlist(null)}
          initialData={{
            name: editingWatchlist.name,
            description: editingWatchlist.description || '',
          }}
          isEdit
        />
      )}

      {/* Watchlists Table */}
      {loading ? (
        <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF] mx-auto" />
        </div>
      ) : (
        <WatchlistTable
          watchlists={watchlists}
          onDelete={handleDelete}
          onEdit={(w) => setEditingWatchlist(w)}
        />
      )}
    </div>
  );
}
