'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
}

interface UsageStats {
  today: { requests: number; successful: number; failed: number; avgResponseTime: number };
  month: { requests: number; successful: number; failed: number; dataTransfer: number; limit: number; percentUsed: number };
  tier: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newSecretKey, setNewSecretKey] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [keysRes, usageRes] = await Promise.all([
        fetch('/api/keys'),
        fetch('/api/usage'),
      ]);
      const keysData = await keysRes.json();
      const usageData = await usageRes.json();
      if (keysData.keys) setApiKeys(keysData.keys);
      if (!usageData.error) setUsage(usageData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await res.json();
      if (data.secretKey) {
        setNewSecretKey(data.secretKey);
        setApiKeys([data.key, ...apiKeys]);
        setNewKeyName('');
      }
    } catch (error) {
      console.error('Failed to create API key:', error);
    } finally {
      setCreating(false);
    }
  };

  const revokeApiKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;
    try {
      const res = await fetch(`/api/keys?id=${keyId}`, { method: 'DELETE' });
      if (res.ok) {
        setApiKeys(apiKeys.filter(k => k.id !== keyId));
      }
    } catch (error) {
      console.error('Failed to revoke API key:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setNewSecretKey('');
    setNewKeyName('');
  };

  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#F5F6F7] flex items-center justify-center">
        <div className="text-[#6A6A6A]">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#F5F6F7] text-black">
      {/* Header */}
      <header className="bg-white border-b border-[#E6E7E9]">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="LumenQuery home">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#2855FF] flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">LQ</span>
              </div>
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold">Dashboard</h1>
              <p className="text-[#6A6A6A] text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] text-xs sm:text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </nav>
        {/* Product Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <Link href="/dashboard/transactions" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#2855FF] bg-[#2855FF]/10 hover:bg-[#2855FF]/20 transition-colors whitespace-nowrap flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Transactions
          </Link>
          <Link href="/contracts" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Contracts
          </Link>
          <Link href="/analytics" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Analytics
          </Link>
          <Link href="/intelligence" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Intelligence
          </Link>
          <Link href="/compliance" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Compliance
          </Link>
          <Link href="/portfolio" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Portfolio
          </Link>
          <Link href="/docs" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Docs
          </Link>
          {(session.user as any)?.role === 'ADMIN' || (session.user as any)?.role === 'SUPER_ADMIN' ? (
            <Link href="/admin" className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin
            </Link>
          ) : null}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {/* Stats Grid */}
        <section aria-labelledby="stats-heading" className="mb-6 sm:mb-8">
          <h2 id="stats-heading" className="sr-only">Usage Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
            <p className="text-[#6A6A6A] text-xs sm:text-sm mb-1">Requests Today</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{formatNumber(usage?.today.requests || 0)}</p>
            <p className="text-[#6A6A6A] text-xs sm:text-sm mt-1">{usage?.today.avgResponseTime || 0}ms avg</p>
          </div>
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
            <p className="text-[#6A6A6A] text-xs sm:text-sm mb-1">Monthly Usage</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{formatNumber(usage?.month.requests || 0)}</p>
            <div className="mt-2">
              <div className="w-full h-1.5 sm:h-2 bg-[#E6E7E9] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${(usage?.month.percentUsed || 0) > 80 ? 'bg-red-500' : 'bg-[#2855FF]'}`}
                  style={{ width: `${Math.min(usage?.month.percentUsed || 0, 100)}%` }}
                />
              </div>
              <p className="text-[#6A6A6A] text-[10px] sm:text-xs mt-1">{usage?.month.percentUsed || 0}% of {formatNumber(usage?.month.limit || 10000)}</p>
            </div>
          </div>
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
            <p className="text-[#6A6A6A] text-xs sm:text-sm mb-1">API Keys</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{apiKeys.length}</p>
          </div>
          <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white">
            <p className="text-white/70 text-xs sm:text-sm mb-1">Current Plan</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{usage?.tier || 'FREE'}</p>
            <p className="text-white/60 text-xs sm:text-sm mt-1">{formatNumber(usage?.month.limit || 10000)} req/mo</p>
          </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9] mb-6 sm:mb-8" aria-labelledby="quickstart-heading">
          <h2 id="quickstart-heading" className="text-lg sm:text-xl font-bold mb-4">Quick Start</h2>

          {/* Horizon API */}
          <div className="mb-6">
            <h3 className="text-sm sm:text-md font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">REST</span>
              Horizon API
            </h3>
            <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-3 overflow-x-auto">
              <p className="text-[#6A6A6A] text-xs sm:text-sm mb-2">Endpoint:</p>
              <code className="text-[#2855FF] text-sm sm:text-base">https://api.lumenquery.io</code>
            </div>
            <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
              <p className="text-[#6A6A6A] text-xs sm:text-sm mb-2">Example Request:</p>
              <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
{`curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.lumenquery.io/ledgers?limit=1`}
              </pre>
            </div>
          </div>

          {/* Soroban RPC */}
          <div>
            <h3 className="text-sm sm:text-md font-semibold mb-2 sm:mb-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-xs">JSON-RPC</span>
              Soroban RPC
            </h3>
            <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 mb-3 overflow-x-auto">
              <p className="text-[#6A6A6A] text-xs sm:text-sm mb-2">Endpoint:</p>
              <code className="text-[#2855FF] text-sm sm:text-base">https://rpc.lumenquery.io</code>
            </div>
            <div className="bg-[#0D0D0D] rounded-lg p-3 sm:p-4 overflow-x-auto">
              <p className="text-[#6A6A6A] text-xs sm:text-sm mb-2">Example Request:</p>
              <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
{`curl -X POST -H "X-API-Key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' \\
  https://rpc.lumenquery.io`}
              </pre>
            </div>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]" aria-labelledby="apikeys-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 id="apikeys-heading" className="text-lg sm:text-xl font-bold">API Keys</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white text-sm font-medium transition-colors"
            >
              Create API Key
            </button>
          </div>

          {apiKeys.length === 0 ? (
            <p className="text-[#6A6A6A] text-sm sm:text-base">You haven&apos;t created any API keys yet.</p>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base">{key.name}</p>
                    <p className="text-xs sm:text-sm text-[#6A6A6A] flex flex-wrap items-center gap-1 sm:gap-2">
                      <code className="bg-[#E6E7E9] px-1.5 sm:px-2 py-0.5 rounded text-xs">{key.keyPrefix}••••••••</code>
                      <span className="hidden sm:inline">•</span>
                      <span>Created {new Date(key.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => revokeApiKey(key.id)}
                    className="self-end sm:self-auto px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs sm:text-sm transition-colors whitespace-nowrap"
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-xl border border-[#E6E7E9]">
            {!newSecretKey ? (
              <>
                <h3 className="text-lg sm:text-xl font-bold mb-4">Create API Key</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-2">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production, Development"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] focus:outline-none focus:ring-2 focus:ring-[#2855FF] text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={closeModal} className="flex-1 px-4 py-2 rounded-lg border border-[#E6E7E9] hover:bg-[#F5F6F7] transition-colors text-sm sm:text-base">
                    Cancel
                  </button>
                  <button
                    onClick={createApiKey}
                    disabled={creating || !newKeyName.trim()}
                    className="flex-1 px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white disabled:opacity-50 transition-colors text-sm sm:text-base"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-bold mb-2">API Key Created!</h3>
                <p className="text-[#6A6A6A] text-xs sm:text-sm mb-4">Copy your API key now. You won&apos;t be able to see it again.</p>
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 sm:p-3 rounded-lg bg-[#F5F6F7] text-[#2855FF] text-xs sm:text-sm break-all border border-[#E6E7E9]">
                      {newSecretKey}
                    </code>
                    <button onClick={() => copyToClipboard(newSecretKey)} className="px-2 sm:px-3 py-2 sm:py-3 rounded-lg bg-[#F5F6F7] hover:bg-[#E6E7E9] border border-[#E6E7E9] transition-colors flex-shrink-0">
                      {copied ? '✓' : '📋'}
                    </button>
                  </div>
                </div>
                <button onClick={closeModal} className="w-full px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white transition-colors text-sm sm:text-base">
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
