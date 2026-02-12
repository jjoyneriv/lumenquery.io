'use client';

import { useState, useEffect, useCallback } from 'react';
import { AccountTable } from '@/components/compliance';

interface MonitoredAccount {
  id: string;
  accountId: string;
  label?: string;
  monitoringLevel: 'BASIC' | 'STANDARD' | 'ENHANCED' | 'RESTRICTED';
  riskScore: number;
  riskFactors?: Record<string, unknown>;
  lastAssessed?: string;
  lastActivity?: string;
  totalVolume30d: string;
  txCount30d: number;
  addedAt: string;
}

interface Limits {
  current: number;
  max: number;
}

export default function ComplianceAccountsPage() {
  const [accounts, setAccounts] = useState<MonitoredAccount[]>([]);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccountId, setNewAccountId] = useState('');
  const [newAccountLabel, setNewAccountLabel] = useState('');
  const [addingAccount, setAddingAccount] = useState(false);

  const fetchAccounts = useCallback(async () => {
    try {
      const res = await fetch('/api/compliance/accounts');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setAccounts(data.accounts);
      setLimits(data.limits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingAccount(true);

    try {
      const res = await fetch('/api/compliance/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: newAccountId,
          label: newAccountLabel || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      setShowAddModal(false);
      setNewAccountId('');
      setNewAccountLabel('');
      fetchAccounts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add account');
    } finally {
      setAddingAccount(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this account from monitoring?')) {
      return;
    }

    try {
      const res = await fetch(`/api/compliance/accounts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      fetchAccounts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const canAddMore = limits && (limits.max === -1 || limits.current < limits.max);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Monitored Accounts</h1>
          {limits && (
            <p className="text-sm text-[#6A6A6A] mt-1">
              {limits.max === -1
                ? `${limits.current} accounts monitored`
                : `${limits.current} / ${limits.max} accounts`}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={!canAddMore}
          className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add Account
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      <AccountTable
        accounts={accounts}
        onDelete={handleDelete}
      />

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-black mb-4">Add Account to Monitor</h2>
            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Stellar Account ID *
                </label>
                <input
                  type="text"
                  value={newAccountId}
                  onChange={(e) => setNewAccountId(e.target.value.toUpperCase())}
                  required
                  pattern="G[A-Z0-9]{55}"
                  placeholder="G..."
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                />
                <p className="text-xs text-[#6A6A6A] mt-1">
                  Enter a valid Stellar public key (starts with G)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Label (optional)
                </label>
                <input
                  type="text"
                  value={newAccountLabel}
                  onChange={(e) => setNewAccountLabel(e.target.value)}
                  placeholder="e.g., Company Treasury"
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[#6A6A6A] hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingAccount}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 transition-colors"
                >
                  {addingAccount ? 'Adding...' : 'Add Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
