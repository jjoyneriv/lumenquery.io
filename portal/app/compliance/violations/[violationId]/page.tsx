'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface ViolationDetail {
  id: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  status: 'PENDING' | 'UNDER_REVIEW' | 'CLEARED' | 'CONFIRMED' | 'ESCALATED' | 'REPORTED';
  score: number;
  accountId: string;
  counterpartyId?: string;
  transactionHash?: string;
  contractId?: string;
  rule: {
    id: string;
    name: string;
    ruleType: string;
    description?: string;
    severity: string;
  };
  matchDetails: Record<string, unknown>;
  evidenceData: Record<string, unknown>;
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
  notes?: string;
  createdAt: string;
  account?: {
    id: string;
    label?: string;
    riskScore: number;
    monitoringLevel: string;
  };
  auditTrail: {
    id: string;
    action: string;
    actorType: string;
    actorEmail?: string;
    previousState?: Record<string, unknown>;
    newState?: Record<string, unknown>;
    timestamp: string;
  }[];
}

const severityConfig = {
  INFO: { bg: 'bg-blue-100', text: 'text-blue-800' },
  WARNING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  CRITICAL: { bg: 'bg-red-100', text: 'text-red-800' },
};

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  PENDING: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Pending' },
  UNDER_REVIEW: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Under Review' },
  CLEARED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Cleared' },
  CONFIRMED: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Confirmed' },
  ESCALATED: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Escalated' },
  REPORTED: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Reported' },
};

function truncateAddress(address: string): string {
  if (address.length <= 16) return address;
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

export default function ViolationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const violationId = params.violationId as string;

  const [violation, setViolation] = useState<ViolationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  // Update form
  const [newStatus, setNewStatus] = useState('');
  const [resolution, setResolution] = useState('');
  const [notes, setNotes] = useState('');

  const fetchViolation = useCallback(async () => {
    try {
      const res = await fetch(`/api/compliance/violations/${violationId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setViolation(data);
      setResolution(data.resolution || '');
      setNotes(data.notes || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load violation');
    } finally {
      setLoading(false);
    }
  }, [violationId]);

  useEffect(() => {
    fetchViolation();
  }, [fetchViolation]);

  const handleUpdate = async () => {
    if (!newStatus && !resolution && !notes) return;

    setUpdating(true);
    setError(null);

    try {
      const res = await fetch(`/api/compliance/violations/${violationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(newStatus && { status: newStatus }),
          resolution,
          notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || data.validTransitions?.join(', '));
      }

      setNewStatus('');
      fetchViolation();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update violation');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6" />
          <div className="h-96 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error && !violation) {
    return (
      <div className="space-y-6">
        <Link href="/compliance/violations" className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium">
          ← Back to Violations
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!violation) return null;

  const severity = severityConfig[violation.severity];
  const status = statusConfig[violation.status] || statusConfig.PENDING;

  return (
    <div className="space-y-6">
      <Link href="/compliance/violations" className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium">
        ← Back to Violations
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Violation Details</h1>
          <p className="text-sm text-[#6A6A6A] mt-1">
            {violation.rule.name} • {new Date(violation.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${severity.bg} ${severity.text}`}>
            {violation.severity}
          </span>
          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.text}`}>
            {status.label}
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Involved Entities */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Involved Entities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[#6A6A6A] mb-1">Account</p>
                <code className="text-sm font-mono text-[#2855FF]">
                  {truncateAddress(violation.accountId)}
                </code>
                {violation.account?.label && (
                  <p className="text-xs text-[#6A6A6A] mt-0.5">{violation.account.label}</p>
                )}
              </div>
              {violation.counterpartyId && (
                <div>
                  <p className="text-xs text-[#6A6A6A] mb-1">Counterparty</p>
                  <code className="text-sm font-mono text-black">
                    {truncateAddress(violation.counterpartyId)}
                  </code>
                </div>
              )}
              {violation.transactionHash && (
                <div>
                  <p className="text-xs text-[#6A6A6A] mb-1">Transaction</p>
                  <code className="text-sm font-mono text-black">
                    {truncateAddress(violation.transactionHash)}
                  </code>
                </div>
              )}
              {violation.contractId && (
                <div>
                  <p className="text-xs text-[#6A6A6A] mb-1">Contract</p>
                  <code className="text-sm font-mono text-black">
                    {truncateAddress(violation.contractId)}
                  </code>
                </div>
              )}
            </div>
          </div>

          {/* Match Details */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Match Details</h2>
            <pre className="text-sm font-mono bg-[#F5F6F7] p-4 rounded-lg overflow-x-auto">
              {JSON.stringify(violation.matchDetails, null, 2)}
            </pre>
          </div>

          {/* Evidence */}
          {Object.keys(violation.evidenceData).length > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Evidence</h2>
              <pre className="text-sm font-mono bg-[#F5F6F7] p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(violation.evidenceData, null, 2)}
              </pre>
            </div>
          )}

          {/* Audit Trail */}
          {violation.auditTrail.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Audit Trail</h2>
              <div className="space-y-3">
                {violation.auditTrail.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#2855FF] mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-black">{entry.action}</p>
                      <p className="text-[#6A6A6A]">
                        {entry.actorEmail || entry.actorType} •{' '}
                        {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Risk Score */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Risk Score</h2>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(violation.score / 100) * 251.2} 251.2`}
                    className={
                      violation.score >= 70 ? 'text-red-500' :
                      violation.score >= 40 ? 'text-yellow-500' : 'text-green-500'
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">{violation.score}</span>
                </div>
              </div>
              <p className="text-sm text-[#6A6A6A]">
                {violation.score >= 70 ? 'High Risk' :
                 violation.score >= 40 ? 'Medium Risk' : 'Low Risk'}
              </p>
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Update Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                >
                  <option value="">Keep current status</option>
                  {violation.status === 'PENDING' && (
                    <>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="CLEARED">Clear</option>
                      <option value="CONFIRMED">Confirm</option>
                    </>
                  )}
                  {violation.status === 'UNDER_REVIEW' && (
                    <>
                      <option value="CLEARED">Clear</option>
                      <option value="CONFIRMED">Confirm</option>
                      <option value="ESCALATED">Escalate</option>
                    </>
                  )}
                  {violation.status === 'CONFIRMED' && (
                    <>
                      <option value="ESCALATED">Escalate</option>
                      <option value="REPORTED">Mark as Reported</option>
                    </>
                  )}
                  {violation.status === 'ESCALATED' && (
                    <>
                      <option value="CONFIRMED">Confirm</option>
                      <option value="REPORTED">Mark as Reported</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                  Resolution
                </label>
                <input
                  type="text"
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="e.g., False positive - verified customer"
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={updating || (!newStatus && !resolution && !notes)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 transition-colors"
              >
                {updating ? 'Updating...' : 'Update Violation'}
              </button>
            </div>
          </div>

          {/* Rule Info */}
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
            <h2 className="text-lg font-semibold text-black mb-4">Rule Info</h2>
            <div className="space-y-2">
              <p className="font-medium text-black">{violation.rule.name}</p>
              <p className="text-sm text-[#6A6A6A]">{violation.rule.ruleType}</p>
              {violation.rule.description && (
                <p className="text-sm text-[#6A6A6A]">{violation.rule.description}</p>
              )}
              <Link
                href={`/compliance/rules/${violation.rule.id}`}
                className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
              >
                View Rule →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
