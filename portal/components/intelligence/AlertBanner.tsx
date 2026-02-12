'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Alert {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  createdAt: string;
}

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss?: (id: string) => void;
  maxVisible?: number;
}

const severityConfig = {
  INFO: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-500',
    text: 'text-blue-800',
  },
  WARNING: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-500',
    text: 'text-yellow-800',
  },
  CRITICAL: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-500',
    text: 'text-red-800',
  },
};

const severityIcons = {
  INFO: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  WARNING: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  CRITICAL: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function AlertBanner({ alerts, onDismiss, maxVisible = 3 }: AlertBannerProps) {
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    setVisibleAlerts(alerts.slice(0, maxVisible));
  }, [alerts, maxVisible]);

  if (visibleAlerts.length === 0) {
    return null;
  }

  const handleDismiss = (id: string) => {
    setVisibleAlerts((prev) => prev.filter((a) => a.id !== id));
    onDismiss?.(id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {visibleAlerts.map((alert) => {
        const config = severityConfig[alert.severity];

        return (
          <div
            key={alert.id}
            className={`${config.bg} ${config.border} border rounded-lg p-4 shadow-lg animate-slide-in`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${config.icon}`}>
                {severityIcons[alert.severity]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${config.text}`}>{alert.title}</p>
                <p className={`text-sm mt-1 ${config.text} opacity-80 line-clamp-2`}>
                  {alert.message}
                </p>
                <Link
                  href="/intelligence/alerts"
                  className={`text-sm mt-2 inline-block ${config.text} hover:underline`}
                >
                  View details
                </Link>
              </div>
              <button
                onClick={() => handleDismiss(alert.id)}
                className={`flex-shrink-0 ${config.text} opacity-60 hover:opacity-100 transition-opacity`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}

      {alerts.length > maxVisible && (
        <Link
          href="/intelligence/alerts"
          className="block text-center text-sm text-[#2855FF] hover:text-[#1E44CC] bg-white rounded-lg p-2 shadow-lg border border-[#E6E7E9]"
        >
          +{alerts.length - maxVisible} more alerts
        </Link>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
