'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StatusCard, ViolationTable } from '@/components/compliance';

interface ComplianceStatus {
  enabled: boolean;
  tier: string;
  limits: {
    monitoredAccounts: { current: number; max: number };
    rules: { current: number; max: number };
  };
  metrics: {
    activeViolations: number;
    pendingReview: number;
    accountsAtRisk: number;
    lastScanAt?: string;
  };
  features: {
    sanctions: boolean;
    cycleDetection: boolean;
    reports: boolean;
    webhooks: boolean;
    slackIntegration: boolean;
  };
}

interface Violation {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  status: 'PENDING' | 'UNDER_REVIEW' | 'CLEARED' | 'CONFIRMED' | 'ESCALATED' | 'REPORTED';
  score: number;
  accountId: string;
  counterpartyId?: string;
  transactionHash?: string;
  ruleName: string;
  ruleType: string;
  createdAt: string;
}

export default function ComplianceOverviewPage() {
  const [status, setStatus] = useState<ComplianceStatus | null>(null);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statusRes, violationsRes] = await Promise.all([
          fetch('/api/compliance/status'),
          fetch('/api/compliance/violations?status=PENDING&limit=5'),
        ]);

        if (!statusRes.ok) {
          const data = await statusRes.json();
          if (statusRes.status === 403) {
            setError(data.error || 'Compliance features not enabled');
            setLoading(false);
            return;
          }
          throw new Error(data.error);
        }

        const statusData = await statusRes.json();
        const violationsData = await violationsRes.json();

        setStatus(statusData);
        setViolations(violationsData.violations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-black">Compliance Overview</h1>
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="text-[#6A6A6A] mb-4">{error}</p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] transition-colors"
          >
            View Pricing Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Compliance Overview</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/compliance/accounts"
            className="px-4 py-2 text-sm font-medium text-[#2855FF] border border-[#2855FF] rounded-lg hover:bg-[#2855FF] hover:text-white transition-colors"
          >
            Add Account
          </Link>
          <Link
            href="/compliance/rules"
            className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] transition-colors"
          >
            Create Rule
          </Link>
        </div>
      </div>

      {status && <StatusCard status={status} />}

      <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Pending Violations</h2>
          <Link
            href="/compliance/violations"
            className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
          >
            View All
          </Link>
        </div>
        <ViolationTable violations={violations} showActions={false} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/compliance/accounts"
          className="bg-white rounded-xl border border-[#E6E7E9] p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#F5F6F7] rounded-lg">
              <svg className="w-6 h-6 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-black">Monitored Accounts</h3>
              <p className="text-sm text-[#6A6A6A]">Manage accounts being monitored</p>
            </div>
          </div>
        </Link>

        <Link
          href="/compliance/rules"
          className="bg-white rounded-xl border border-[#E6E7E9] p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#F5F6F7] rounded-lg">
              <svg className="w-6 h-6 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-black">Compliance Rules</h3>
              <p className="text-sm text-[#6A6A6A]">Configure detection rules</p>
            </div>
          </div>
        </Link>

        <Link
          href="/compliance/reports"
          className="bg-white rounded-xl border border-[#E6E7E9] p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#F5F6F7] rounded-lg">
              <svg className="w-6 h-6 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-black">Generate Reports</h3>
              <p className="text-sm text-[#6A6A6A]">Create compliance reports</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
