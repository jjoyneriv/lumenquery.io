'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IntelligenceNav, AlertConfigForm } from '@/components/intelligence';

interface AlertConfig {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  alertType: string;
  conditions: Record<string, unknown>;
  notifyEmail: boolean;
  notifyWebhook: boolean;
  webhookUrl?: string;
  cooldownMinutes: number;
  lastTriggered?: string;
  alertCount: number;
  createdAt: string;
  updatedAt: string;
}

const alertTypeLabels: Record<string, string> = {
  WHALE_MOVEMENT: 'Whale Movement',
  TRUSTLINE_CHANGE: 'Trustline Change',
  ACCOUNT_ACTIVITY: 'Account Activity',
  CONTRACT_CALL: 'Contract Call',
  ANOMALY_DETECTED: 'Anomaly Detected',
};

export default function AlertConfigsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [configs, setConfigs] = useState<AlertConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [limits, setLimits] = useState<{ used: number; limit: number } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/intelligence/alerts/configs');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchConfigs();
    }
  }, [session]);

  const fetchConfigs = async () => {
    try {
      const res = await fetch('/api/intelligence/alerts/configs');
      const data = await res.json();
      if (res.ok) {
        setConfigs(data.configurations || []);
        setLimits(data.limits);
      }
    } catch (error) {
      console.error('Failed to fetch configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: {
    name: string;
    description?: string;
    alertType: string;
    conditions: Record<string, unknown>;
    notifyEmail: boolean;
    notifyWebhook: boolean;
    webhookUrl?: string;
    cooldownMinutes: number;
  }) => {
    const res = await fetch('/api/intelligence/alerts/configs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create configuration');
    }

    setShowCreateForm(false);
    fetchConfigs();
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const res = await fetch(`/api/intelligence/alerts/configs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });

      if (res.ok) {
        setConfigs((prev) =>
          prev.map((c) => (c.id === id ? { ...c, enabled } : c))
        );
      }
    } catch (error) {
      console.error('Failed to toggle config:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this alert configuration?')) return;

    try {
      const res = await fetch(`/api/intelligence/alerts/configs/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchConfigs();
      }
    } catch (error) {
      console.error('Failed to delete config:', error);
    }
  };

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-4 sticky top-8">
            <h2 className="font-semibold text-black mb-4">Intelligence</h2>
            <IntelligenceNav />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                Alert Configurations
              </h1>
              <p className="text-[#6A6A6A] mt-1">
                Create and manage alert rules
                {limits && (
                  <span className="ml-2 text-sm">
                    ({limits.used}/{limits.limit} configs used)
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/intelligence/alerts"
                className="text-[#7366FF] hover:text-[#5A4FCF] text-sm"
              >
                &larr; Back to Inbox
              </Link>
              {!showCreateForm && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors"
                >
                  Create Alert
                </button>
              )}
            </div>
          </header>

          {/* Create Form */}
          {showCreateForm && (
            <AlertConfigForm
              onSubmit={handleCreate}
              onCancel={() => setShowCreateForm(false)}
              webhooksEnabled={true}
            />
          )}

          {/* Configs List */}
          {loading ? (
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF] mx-auto" />
            </div>
          ) : configs.length === 0 ? (
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-[#6A6A6A] mb-4">No alert configurations yet</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#5A4FCF] transition-colors"
              >
                Create Your First Alert
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
              <div className="divide-y divide-[#E6E7E9]">
                {configs.map((config) => (
                  <div key={config.id} className="p-4 hover:bg-[#F5F6F7] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-black">{config.name}</h3>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            config.enabled
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {config.enabled ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap text-sm text-[#6A6A6A]">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-xs">
                            {alertTypeLabels[config.alertType] || config.alertType}
                          </span>
                          <span>{config.alertCount} alerts triggered</span>
                          {config.lastTriggered && (
                            <span>
                              • Last: {new Date(config.lastTriggered).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {config.description && (
                          <p className="text-sm text-[#6A6A6A] mt-1">{config.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-[#6A6A6A]">
                          {config.notifyEmail && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email
                            </span>
                          )}
                          {config.notifyWebhook && (
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              Webhook
                            </span>
                          )}
                          <span>Cooldown: {config.cooldownMinutes}m</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggle(config.id, !config.enabled)}
                          className={`p-2 rounded-lg transition-colors ${
                            config.enabled
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          title={config.enabled ? 'Pause' : 'Enable'}
                        >
                          {config.enabled ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(config.id)}
                          className="p-2 text-[#6A6A6A] hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
