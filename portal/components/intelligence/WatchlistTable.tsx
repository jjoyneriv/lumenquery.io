'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WatchlistAccount {
  id: string;
  accountId: string;
  label?: string;
  addedAt: string;
}

interface Watchlist {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  accountCount: number;
}

interface WatchlistTableProps {
  watchlists: Watchlist[];
  onDelete?: (id: string) => void;
  onEdit?: (watchlist: Watchlist) => void;
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays < 1) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function WatchlistTable({ watchlists, onDelete, onEdit }: WatchlistTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this watchlist?')) {
      setDeletingId(id);
      try {
        await onDelete?.(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (watchlists.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-[#6A6A6A] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <p className="text-[#6A6A6A] mb-4">No watchlists created yet</p>
        <p className="text-sm text-[#6A6A6A]">
          Create a watchlist to monitor specific Stellar accounts
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Watchlist
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Accounts
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {watchlists.map((watchlist) => (
              <tr key={watchlist.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <Link
                    href={`/intelligence/watchlists/${watchlist.id}`}
                    className="block"
                  >
                    <p className="font-medium text-[#7366FF] hover:text-[#5A4FCF]">
                      {watchlist.name}
                    </p>
                    {watchlist.description && (
                      <p className="text-sm text-[#6A6A6A] mt-1 truncate max-w-xs">
                        {watchlist.description}
                      </p>
                    )}
                  </Link>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {watchlist.accountCount}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                  {formatTimeAgo(watchlist.updatedAt)}
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(watchlist)}
                        className="p-1.5 text-[#6A6A6A] hover:text-[#7366FF] transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(watchlist.id)}
                        disabled={deletingId === watchlist.id}
                        className="p-1.5 text-[#6A6A6A] hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface WatchlistAccountsTableProps {
  accounts: WatchlistAccount[];
  onRemove?: (accountId: string) => void;
}

export function WatchlistAccountsTable({ accounts, onRemove }: WatchlistAccountsTableProps) {
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (accountId: string) => {
    if (confirm('Remove this account from the watchlist?')) {
      setRemovingId(accountId);
      try {
        await onRemove?.(accountId);
      } finally {
        setRemovingId(null);
      }
    }
  };

  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
        <p className="text-[#6A6A6A]">No accounts in this watchlist</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Account
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Label
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Added
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4">
                  <Link
                    href={`/intelligence/accounts/${account.accountId}`}
                    className="font-mono text-sm text-[#7366FF] hover:text-[#5A4FCF]"
                  >
                    {account.accountId.slice(0, 8)}...{account.accountId.slice(-8)}
                  </Link>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-[#6A6A6A]">
                  {account.label || '-'}
                </td>
                <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                  {formatTimeAgo(account.addedAt)}
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/intelligence/accounts/${account.accountId}`}
                      className="p-1.5 text-[#6A6A6A] hover:text-[#7366FF] transition-colors"
                      title="View Profile"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                    {onRemove && (
                      <button
                        onClick={() => handleRemove(account.accountId)}
                        disabled={removingId === account.accountId}
                        className="p-1.5 text-[#6A6A6A] hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
