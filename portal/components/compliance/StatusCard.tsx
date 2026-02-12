'use client';

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

interface StatusCardProps {
  status: ComplianceStatus;
}

const tierConfig: Record<string, { label: string; bg: string; text: string }> = {
  NONE: { label: 'Not Enabled', bg: 'bg-gray-100', text: 'text-gray-800' },
  BASIC: { label: 'Basic', bg: 'bg-blue-100', text: 'text-blue-800' },
  STANDARD: { label: 'Standard', bg: 'bg-purple-100', text: 'text-purple-800' },
  ENTERPRISE: { label: 'Enterprise', bg: 'bg-indigo-100', text: 'text-indigo-800' },
};

function formatTimeAgo(timestamp?: string): string {
  if (!timestamp) return 'Never';
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

function formatLimit(current: number, max: number): string {
  if (max === -1) return `${current} / Unlimited`;
  return `${current} / ${max}`;
}

export function StatusCard({ status }: StatusCardProps) {
  const tier = tierConfig[status.tier] || tierConfig.NONE;

  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-black">Compliance Status</h3>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${tier.bg} ${tier.text}`}>
          {tier.label}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#F5F6F7] rounded-lg p-4">
          <p className="text-2xl font-bold text-black">{status.metrics.activeViolations}</p>
          <p className="text-sm text-[#6A6A6A]">Active Violations</p>
        </div>
        <div className="bg-[#F5F6F7] rounded-lg p-4">
          <p className="text-2xl font-bold text-yellow-600">{status.metrics.pendingReview}</p>
          <p className="text-sm text-[#6A6A6A]">Pending Review</p>
        </div>
        <div className="bg-[#F5F6F7] rounded-lg p-4">
          <p className="text-2xl font-bold text-red-600">{status.metrics.accountsAtRisk}</p>
          <p className="text-sm text-[#6A6A6A]">High Risk Accounts</p>
        </div>
        <div className="bg-[#F5F6F7] rounded-lg p-4">
          <p className="text-sm font-medium text-black">{formatTimeAgo(status.metrics.lastScanAt)}</p>
          <p className="text-sm text-[#6A6A6A]">Last Scan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#6A6A6A]">Monitored Accounts</span>
            <span className="text-sm font-medium text-black">
              {formatLimit(status.limits.monitoredAccounts.current, status.limits.monitoredAccounts.max)}
            </span>
          </div>
          {status.limits.monitoredAccounts.max !== -1 && (
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2855FF] rounded-full"
                style={{
                  width: `${Math.min(100, (status.limits.monitoredAccounts.current / status.limits.monitoredAccounts.max) * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#6A6A6A]">Compliance Rules</span>
            <span className="text-sm font-medium text-black">
              {formatLimit(status.limits.rules.current, status.limits.rules.max)}
            </span>
          </div>
          {status.limits.rules.max !== -1 && (
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2855FF] rounded-full"
                style={{
                  width: `${Math.min(100, (status.limits.rules.current / status.limits.rules.max) * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#E6E7E9] pt-4">
        <h4 className="text-sm font-medium text-black mb-3">Features</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(status.features).map(([feature, enabled]) => (
            <span
              key={feature}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
                enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {enabled ? (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
              {feature.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
