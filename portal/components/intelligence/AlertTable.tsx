'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Alert {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  sourceType: string;
  sourceId: string;
  configName: string;
  alertType: string;
  createdAt: string;
  readAt?: string;
  isRead: boolean;
}

interface AlertTableProps {
  alerts: Alert[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDelete?: (id: string) => void;
}

const severityConfig = {
  INFO: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  WARNING: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  CRITICAL: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
};

const alertTypeLabels: Record<string, string> = {
  WHALE_MOVEMENT: 'Whale Movement',
  TRUSTLINE_CHANGE: 'Trustline Change',
  ACCOUNT_ACTIVITY: 'Account Activity',
  CONTRACT_CALL: 'Contract Call',
  ANOMALY_DETECTED: 'Anomaly Detected',
};

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function AlertTable({ alerts, onMarkRead, onMarkAllRead, onDelete }: AlertTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const unreadCount = alerts.filter((a) => !a.isRead).length;

  if (alerts.length === 0) {
    return (
      <div className="bg-[#262932] rounded-xl border border-white/10 p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <p className="text-gray-400 mb-4">No alerts yet</p>
        <p className="text-sm text-gray-400">
          Alerts will appear here when your configured rules are triggered
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 overflow-hidden">
      {unreadCount > 0 && onMarkAllRead && (
        <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {unreadCount} unread alert{unreadCount > 1 ? 's' : ''}
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-sm text-[#7366FF] hover:text-[#5A4FCF] transition-colors"
          >
            Mark all as read
          </button>
        </div>
      )}

      <div className="divide-y divide-[#E6E7E9]">
        {alerts.map((alert) => {
          const severity = severityConfig[alert.severity];
          const isExpanded = expandedId === alert.id;

          return (
            <div
              key={alert.id}
              className={`${!alert.isRead ? 'bg-blue-50/30' : ''}`}
            >
              <div
                className="p-4 hover:bg-[#1D1E26] cursor-pointer transition-colors"
                onClick={() => {
                  setExpandedId(isExpanded ? null : alert.id);
                  if (!alert.isRead && onMarkRead) {
                    onMarkRead(alert.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-0.5">
                    {!alert.isRead && (
                      <span className="block w-2 h-2 rounded-full bg-[#7366FF]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${severity.bg} ${severity.text}`}>
                        {alert.severity}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {alertTypeLabels[alert.alertType] || alert.alertType}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(alert.createdAt)}
                      </span>
                    </div>

                    <h4 className="font-medium text-white">{alert.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {alert.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      From: {alert.configName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(alert.id);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 bg-[#1D1E26]">
                  <div className="bg-[#262932] rounded-lg p-4 space-y-3">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Full Message:</p>
                      <p className="text-sm text-white">{alert.message}</p>
                    </div>

                    {alert.data && Object.keys(alert.data).length > 0 && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Details:</p>
                        <pre className="text-xs font-mono bg-[#1D1E26] p-3 rounded overflow-x-auto">
                          {JSON.stringify(alert.data, null, 2)}
                        </pre>
                      </div>
                    )}

                    {alert.sourceId && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Source:</span>
                        <code className="text-sm font-mono text-[#7366FF]">
                          {alert.sourceId.length > 20
                            ? `${alert.sourceId.slice(0, 10)}...${alert.sourceId.slice(-8)}`
                            : alert.sourceId}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
