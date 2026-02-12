'use client';

import { useState } from 'react';

interface WatchlistFormData {
  name: string;
  description: string;
}

interface WatchlistManagerProps {
  onSubmit: (data: WatchlistFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: WatchlistFormData;
  isEdit?: boolean;
}

export function WatchlistManager({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}: WatchlistManagerProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), description: description.trim() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save watchlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
      <h3 className="font-semibold text-black mb-4">
        {isEdit ? 'Edit Watchlist' : 'Create Watchlist'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#6A6A6A] mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#E6E7E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
            placeholder="e.g., Top Exchanges"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#6A6A6A] mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-[#E6E7E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent resize-none"
            placeholder="Optional description for this watchlist"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-[#6A6A6A] hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#2855FF] text-white rounded-lg hover:bg-[#1E44CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Watchlist'}
          </button>
        </div>
      </form>
    </div>
  );
}

interface AddAccountFormProps {
  onSubmit: (accountId: string, label?: string) => Promise<void>;
  onCancel: () => void;
}

export function AddAccountForm({ onSubmit, onCancel }: AddAccountFormProps) {
  const [accountId, setAccountId] = useState('');
  const [label, setLabel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedId = accountId.trim();
    if (!trimmedId) {
      setError('Account ID is required');
      return;
    }

    if (!trimmedId.startsWith('G') && !trimmedId.startsWith('C')) {
      setError('Invalid account ID format. Must start with G or C.');
      return;
    }

    if (trimmedId.length !== 56) {
      setError('Account ID must be 56 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(trimmedId, label.trim() || undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
      <h3 className="font-semibold text-black mb-4">Add Account to Watchlist</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="accountId" className="block text-sm font-medium text-[#6A6A6A] mb-1">
            Account ID *
          </label>
          <input
            type="text"
            id="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full px-4 py-2 border border-[#E6E7E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent font-mono text-sm"
            placeholder="G..."
          />
        </div>

        <div>
          <label htmlFor="label" className="block text-sm font-medium text-[#6A6A6A] mb-1">
            Label (optional)
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-4 py-2 border border-[#E6E7E9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
            placeholder="e.g., Binance Hot Wallet"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-[#6A6A6A] hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#2855FF] text-white rounded-lg hover:bg-[#1E44CC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Account'}
          </button>
        </div>
      </form>
    </div>
  );
}
