'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  userId: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  lastLoginAt: string | null;
  lastActiveAt: string | null;
  organization: {
    id: string;
    name: string;
    tier: string;
    intelligenceTier: string;
    portfolioTier: string;
  } | null;
  apiKeyCount: number;
  sessionCount: number;
}

interface UserTableProps {
  users: User[];
  onRefresh: () => void;
}

export default function UserTable({ users, onRefresh }: UserTableProps) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${email}"? This action cannot be undone.`)) {
      return;
    }
    setDeleting(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete user');
      } else {
        onRefresh();
      }
    } catch {
      alert('Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleString();
  };

  const formatRelativeTime = (date: string | null) => {
    if (!date) return '-';
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return formatDate(date);
  };

  const isOnline = (lastActiveAt: string | null) => {
    if (!lastActiveAt) return false;
    const diff = Date.now() - new Date(lastActiveAt).getTime();
    return diff < 30 * 60 * 1000; // Active within 30 minutes
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      SUPER_ADMIN: 'bg-[#FC564A]/10 text-[#FC564A]',
      ADMIN: 'bg-purple-500/10 text-purple-400',
      USER: 'bg-white/5 text-[#A8A9AD]',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || styles.USER}`}>
        {role.replace('_', ' ')}
      </span>
    );
  };

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      ENTERPRISE: 'bg-[#FFB829]/10 text-[#FFB829]',
      TEAM: 'bg-[#40B8F4]/10 text-[#40B8F4]',
      DEVELOPER: 'bg-green-500/10 text-green-400',
      AUDITOR: 'bg-purple-500/10 text-purple-400',
      FREE: 'bg-white/5 text-[#A8A9AD]',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[tier] || styles.FREE}`}>
        {tier}
      </span>
    );
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d={sortOrder === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
      </svg>
    );
  };

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-1 font-medium text-sm text-gray-400 hover:text-white"
                >
                  User
                  <SortIcon field="email" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-gray-400">Role</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-gray-400">Subscription</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('lastLoginAt')}
                  className="flex items-center gap-1 font-medium text-sm text-gray-400 hover:text-white"
                >
                  Last Login
                  <SortIcon field="lastLoginAt" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-gray-400">Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center gap-1 font-medium text-sm text-gray-400 hover:text-white"
                >
                  Created
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <span className="font-medium text-sm text-gray-400">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7366FF] flex items-center justify-center text-white text-sm font-medium">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.name || 'No name'}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <p className="text-[10px] font-mono text-[#7366FF]">ID: {user.userId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {getRoleBadge(user.role)}
                </td>
                <td className="py-3 px-4">
                  {user.organization ? (
                    <div className="space-y-1">
                      {getTierBadge(user.organization.tier)}
                      <p className="text-xs text-gray-400">{user.organization.name}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">No org</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-400">
                    {formatRelativeTime(user.lastLoginAt)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOnline(user.lastActiveAt) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm text-gray-400">
                      {isOnline(user.lastActiveAt) ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-400">
                    {formatDate(user.createdAt).split(',')[0]}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-[#7366FF] hover:text-[#5A4FCF] text-sm font-medium"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id, user.email)}
                      disabled={deleting === user.id}
                      className="text-[#FC564A] hover:text-[#FC564A]/70 text-sm font-medium disabled:opacity-50"
                    >
                      {deleting === user.id ? '...' : 'Delete'}
                    </button>
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
