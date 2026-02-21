'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PasswordResetModal } from '@/components/admin';

interface UserDetail {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
  currentSessionStart: string | null;
  sessionDurationSeconds: number | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    tier: string;
    monthlyRequestLimit: number;
    sorobanProEnabled: boolean;
    intelligenceEnabled: boolean;
    intelligenceTier: string;
    portfolioEnabled: boolean;
    portfolioTier: string;
  } | null;
  apiKeys: Array<{
    id: string;
    name: string;
    keyPrefix: string;
    lastUsedAt: string | null;
    createdAt: string;
    revokedAt: string | null;
    permissions: string[];
  }>;
  activeSessions: number;
}

interface UsageData {
  topEndpoints: Array<{
    endpoint: string;
    count: number;
    avgResponseTime: number;
  }>;
  dailyUsage: Array<{
    date: string;
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
  }>;
}

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUser(data.user);
      setUsage(data.usage);
      setNewRole(data.user.role);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!user || newRole === user.role) {
      setEditingRole(false);
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update role');
      }

      await fetchUser();
      setEditingRole(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleForceLogout = async () => {
    if (!confirm('Are you sure you want to force logout this user?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}/sessions`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to force logout');
      }

      await fetchUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '-';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const isOnline = (lastActiveAt: string | null) => {
    if (!lastActiveAt) return false;
    return Date.now() - new Date(lastActiveAt).getTime() < 30 * 60 * 1000;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#2855FF] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <p className="text-red-700 mb-4">{error}</p>
        <Link href="/admin/users" className="text-[#2855FF] hover:underline">
          ← Back to Users
        </Link>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/users" className="text-[#6A6A6A] hover:text-black text-sm mb-2 inline-block">
          ← Back to Users
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#2855FF] flex items-center justify-center text-white text-2xl font-medium">
              {(user.name || user.email).charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-black">{user.name || 'No name'}</h1>
              <p className="text-[#6A6A6A]">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 border border-[#E6E7E9] rounded-lg font-medium text-[#6A6A6A] hover:bg-gray-50 transition-colors"
            >
              Reset Password
            </button>
            {user.activeSessions > 0 && (
              <button
                onClick={handleForceLogout}
                className="px-4 py-2 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Force Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-bold text-black mb-4">Account Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[#6A6A6A]">Role</p>
                {editingRole ? (
                  <div className="flex items-center gap-2 mt-1">
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="px-3 py-1 border border-[#E6E7E9] rounded-lg focus:outline-none focus:border-[#2855FF] bg-white text-sm"
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                    <button
                      onClick={handleUpdateRole}
                      disabled={isUpdating}
                      className="px-3 py-1 bg-[#2855FF] text-white rounded-lg text-sm font-medium hover:bg-[#1e40af] disabled:opacity-50"
                    >
                      {isUpdating ? '...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingRole(false);
                        setNewRole(user.role);
                      }}
                      className="px-3 py-1 border border-[#E6E7E9] rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'SUPER_ADMIN' ? 'bg-red-100 text-red-700' :
                      user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => setEditingRole(true)}
                      className="text-[#2855FF] text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-[#6A6A6A]">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${isOnline(user.lastActiveAt) ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <span className="font-medium text-black">
                    {isOnline(user.lastActiveAt) ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-[#6A6A6A]">Created</p>
                <p className="font-medium text-black mt-1">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6A6A6A]">Last Login</p>
                <p className="font-medium text-black mt-1">{formatDate(user.lastLoginAt)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6A6A6A]">Session Duration</p>
                <p className="font-medium text-black mt-1">{formatDuration(user.sessionDurationSeconds)}</p>
              </div>
              <div>
                <p className="text-sm text-[#6A6A6A]">Active Sessions</p>
                <p className="font-medium text-black mt-1">{user.activeSessions}</p>
              </div>
            </div>
          </div>

          {/* Organization & Subscription */}
          {user.organization && (
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
              <h2 className="text-lg font-bold text-black mb-4">Subscription</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#6A6A6A]">Organization</p>
                  <p className="font-medium text-black mt-1">{user.organization.name}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6A6A6A]">Subscription Tier</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    user.organization.tier === 'ENTERPRISE' ? 'bg-yellow-100 text-yellow-800' :
                    user.organization.tier === 'TEAM' ? 'bg-blue-100 text-blue-700' :
                    user.organization.tier === 'DEVELOPER' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.organization.tier}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-[#6A6A6A]">Monthly Requests</p>
                  <p className="font-medium text-black mt-1">{user.organization.monthlyRequestLimit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-[#6A6A6A]">Features Enabled</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.organization.sorobanProEnabled && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">Soroban Pro</span>
                    )}
                    {user.organization.intelligenceEnabled && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Intelligence</span>
                    )}
                    {user.organization.portfolioEnabled && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Portfolio</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Usage Stats */}
          {usage && usage.topEndpoints.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
              <h2 className="text-lg font-bold text-black mb-4">API Usage (Last 30 Days)</h2>
              <div className="space-y-3">
                {usage.topEndpoints.map((endpoint, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-[#E6E7E9] last:border-0">
                    <span className="text-sm font-mono text-black truncate max-w-[60%]">{endpoint.endpoint}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[#6A6A6A]">{endpoint.count} calls</span>
                      <span className="text-[#6A6A6A]">{endpoint.avgResponseTime}ms avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* API Keys */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-bold text-black mb-4">API Keys</h2>
            {user.apiKeys.length > 0 ? (
              <div className="space-y-3">
                {user.apiKeys.map((key) => (
                  <div key={key.id} className="p-3 border border-[#E6E7E9] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-black">{key.name}</span>
                      {key.revokedAt ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Revoked</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Active</span>
                      )}
                    </div>
                    <p className="text-sm font-mono text-[#6A6A6A] mb-2">{key.keyPrefix}...</p>
                    <div className="flex items-center gap-2 text-xs text-[#6A6A6A]">
                      <span>Created: {new Date(key.createdAt).toLocaleDateString()}</span>
                      {key.lastUsedAt && (
                        <>
                          <span>•</span>
                          <span>Last used: {new Date(key.lastUsedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#6A6A6A]">No API keys created</p>
            )}
          </div>
        </div>
      </div>

      <PasswordResetModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userId={user.id}
        userEmail={user.email}
        userName={user.name}
      />
    </div>
  );
}
