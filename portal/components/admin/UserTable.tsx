'use client';

import { useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
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
      SUPER_ADMIN: 'bg-red-100 text-red-700',
      ADMIN: 'bg-purple-100 text-purple-700',
      USER: 'bg-gray-100 text-gray-700',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role] || styles.USER}`}>
        {role.replace('_', ' ')}
      </span>
    );
  };

  const getTierBadge = (tier: string) => {
    const styles: Record<string, string> = {
      ENTERPRISE: 'bg-yellow-100 text-yellow-800',
      TEAM: 'bg-blue-100 text-blue-700',
      DEVELOPER: 'bg-green-100 text-green-700',
      AUDITOR: 'bg-purple-100 text-purple-700',
      FREE: 'bg-gray-100 text-gray-600',
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
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E6E7E9] bg-gray-50">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center gap-1 font-medium text-sm text-[#6A6A6A] hover:text-black"
                >
                  User
                  <SortIcon field="email" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Role</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Subscription</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('lastLoginAt')}
                  className="flex items-center gap-1 font-medium text-sm text-[#6A6A6A] hover:text-black"
                >
                  Last Login
                  <SortIcon field="lastLoginAt" />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Status</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center gap-1 font-medium text-sm text-[#6A6A6A] hover:text-black"
                >
                  Created
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th className="text-right py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-[#E6E7E9] hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#7366FF] flex items-center justify-center text-white text-sm font-medium">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-black">{user.name || 'No name'}</p>
                      <p className="text-sm text-[#6A6A6A]">{user.email}</p>
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
                      <p className="text-xs text-[#6A6A6A]">{user.organization.name}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-[#6A6A6A]">No org</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-[#6A6A6A]">
                    {formatRelativeTime(user.lastLoginAt)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isOnline(user.lastActiveAt) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className="text-sm text-[#6A6A6A]">
                      {isOnline(user.lastActiveAt) ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-[#6A6A6A]">
                    {formatDate(user.createdAt).split(',')[0]}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/admin/users/${user.id}`}
                    className="text-[#7366FF] hover:text-[#1e40af] text-sm font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
