'use client';

import Link from 'next/link';

interface ComplianceRule {
  id: string;
  name: string;
  description?: string;
  ruleType: string;
  enabled: boolean;
  priority: number;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  autoBlock: boolean;
  requireReview: boolean;
  violationCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface RuleCardProps {
  rule: ComplianceRule;
  onToggle?: (id: string, enabled: boolean) => void;
  onDelete?: (id: string) => void;
}

const severityConfig = {
  INFO: { bg: 'bg-blue-100', text: 'text-blue-800' },
  WARNING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  CRITICAL: { bg: 'bg-red-100', text: 'text-red-800' },
};

const ruleTypeLabels: Record<string, string> = {
  SANCTIONS_SCREENING: 'Sanctions Screening',
  VELOCITY_LIMIT: 'Velocity Limit',
  VOLUME_LIMIT: 'Volume Limit',
  CIRCULAR_PAYMENT: 'Circular Payment',
  MIXER_DETECTION: 'Mixer Detection',
  UNUSUAL_PATTERN: 'Unusual Pattern',
  COUNTERPARTY_RISK: 'Counterparty Risk',
  CONTRACT_ABUSE: 'Contract Abuse',
  STRUCTURING: 'Structuring',
  DORMANT_ACTIVATION: 'Dormant Activation',
};

const ruleTypeIcons: Record<string, JSX.Element> = {
  SANCTIONS_SCREENING: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  VELOCITY_LIMIT: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  VOLUME_LIMIT: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  CIRCULAR_PAYMENT: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  MIXER_DETECTION: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
};

export function RuleCard({ rule, onToggle, onDelete }: RuleCardProps) {
  const severity = severityConfig[rule.severity];
  const icon = ruleTypeIcons[rule.ruleType] || (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );

  return (
    <div className={`bg-white rounded-xl border ${rule.enabled ? 'border-[#E6E7E9]' : 'border-gray-300 opacity-60'} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${rule.enabled ? 'bg-[#F5F6F7]' : 'bg-gray-100'} text-[#6A6A6A]`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-black truncate">{rule.name}</h3>
            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${severity.bg} ${severity.text}`}>
              {rule.severity}
            </span>
          </div>
          <p className="text-xs text-[#6A6A6A] mt-0.5">
            {ruleTypeLabels[rule.ruleType] || rule.ruleType}
          </p>
          {rule.description && (
            <p className="text-sm text-[#6A6A6A] mt-2 line-clamp-2">{rule.description}</p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-[#6A6A6A]">
            <span>Priority: {rule.priority}</span>
            {rule.violationCount !== undefined && (
              <span>{rule.violationCount} violations</span>
            )}
            {rule.autoBlock && (
              <span className="text-red-600">Auto-block</span>
            )}
            {rule.requireReview && (
              <span className="text-blue-600">Review required</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onToggle && (
            <button
              onClick={() => onToggle(rule.id, !rule.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                rule.enabled ? 'bg-[#2855FF]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  rule.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#E6E7E9] flex items-center justify-between">
        <Link
          href={`/compliance/rules/${rule.id}`}
          className="text-[#2855FF] hover:text-[#1E44CC] text-sm font-medium"
        >
          Edit Rule
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(rule.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
