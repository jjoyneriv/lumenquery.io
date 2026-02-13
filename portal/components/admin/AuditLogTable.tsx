'use client';

import { useState } from 'react';

interface AuditLog {
  id: string;
  action: string;
  admin: {
    id: string;
    email: string;
    name: string | null;
  };
  targetUser: {
    id: string;
    email: string;
    name: string | null;
  } | null;
  details: Record<string, any> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const getActionBadge = (action: string) => {
    const styles: Record<string, string> = {
      PASSWORD_RESET_SENT: 'bg-yellow-100 text-yellow-800',
      PASSWORD_RESET_FAILED: 'bg-red-100 text-red-700',
      USER_UPDATED: 'bg-blue-100 text-blue-700',
      FORCE_LOGOUT: 'bg-orange-100 text-orange-700',
      USER_CREATED: 'bg-green-100 text-green-700',
      USER_DISABLED: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[action] || 'bg-gray-100 text-gray-700'}`}>
        {action.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E6E7E9] bg-gray-50">
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Time</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Action</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Admin</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Target User</span>
              </th>
              <th className="text-left py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">IP Address</span>
              </th>
              <th className="text-right py-3 px-4">
                <span className="font-medium text-sm text-[#6A6A6A]">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <>
                <tr key={log.id} className="border-b border-[#E6E7E9] hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#6A6A6A]">
                      {formatDate(log.createdAt)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-black">{log.admin.name || 'No name'}</p>
                      <p className="text-xs text-[#6A6A6A]">{log.admin.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {log.targetUser ? (
                      <div>
                        <p className="text-sm font-medium text-black">{log.targetUser.name || 'No name'}</p>
                        <p className="text-xs text-[#6A6A6A]">{log.targetUser.email}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-[#6A6A6A]">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-[#6A6A6A] font-mono">
                      {log.ipAddress || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {log.details && (
                      <button
                        onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                        className="text-[#2855FF] hover:text-[#1e40af] text-sm font-medium"
                      >
                        {expandedId === log.id ? 'Hide' : 'Show'}
                      </button>
                    )}
                  </td>
                </tr>
                {expandedId === log.id && log.details && (
                  <tr key={`${log.id}-details`} className="border-b border-[#E6E7E9] bg-gray-50">
                    <td colSpan={6} className="py-3 px-4">
                      <div className="bg-white rounded-lg border border-[#E6E7E9] p-4">
                        <h4 className="text-sm font-medium text-black mb-2">Details</h4>
                        <pre className="text-xs text-[#6A6A6A] overflow-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                        {log.userAgent && (
                          <div className="mt-3 pt-3 border-t border-[#E6E7E9]">
                            <h4 className="text-sm font-medium text-black mb-1">User Agent</h4>
                            <p className="text-xs text-[#6A6A6A] break-all">{log.userAgent}</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
