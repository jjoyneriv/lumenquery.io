'use client';

import { useState } from 'react';

interface RuleFormData {
  name: string;
  description?: string;
  ruleType: string;
  conditions: Record<string, unknown>;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  priority: number;
  autoBlock: boolean;
  requireReview: boolean;
  enabled: boolean;
}

interface RuleFormProps {
  initialData?: Partial<RuleFormData>;
  availableTypes: string[];
  onSubmit: (data: RuleFormData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const ruleTypeLabels: Record<string, string> = {
  SANCTIONS_SCREENING: 'Sanctions Screening',
  VELOCITY_LIMIT: 'Velocity Limit',
  VOLUME_LIMIT: 'Volume Limit',
  CIRCULAR_PAYMENT: 'Circular Payment Detection',
  MIXER_DETECTION: 'Mixer Detection',
  UNUSUAL_PATTERN: 'Unusual Pattern Detection',
  COUNTERPARTY_RISK: 'Counterparty Risk',
  CONTRACT_ABUSE: 'Contract Abuse Monitoring',
  STRUCTURING: 'Structuring Detection',
  DORMANT_ACTIVATION: 'Dormant Account Activation',
};

const ruleTypeDescriptions: Record<string, string> = {
  SANCTIONS_SCREENING: 'Check accounts against OFAC/SDN sanctions lists',
  VELOCITY_LIMIT: 'Alert when transaction frequency exceeds thresholds',
  VOLUME_LIMIT: 'Alert when transaction volume exceeds thresholds',
  CIRCULAR_PAYMENT: 'Detect circular payment patterns',
  MIXER_DETECTION: 'Identify potential mixer/tumbler usage',
  UNUSUAL_PATTERN: 'Machine learning-based anomaly detection',
  COUNTERPARTY_RISK: 'Assess risk of transaction counterparties',
  CONTRACT_ABUSE: 'Monitor smart contract abuse patterns',
  STRUCTURING: 'Detect transaction structuring below thresholds',
  DORMANT_ACTIVATION: 'Alert when dormant accounts become active',
};

export function RuleForm({ initialData, availableTypes, onSubmit, onCancel, isEditing }: RuleFormProps) {
  const [formData, setFormData] = useState<RuleFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    ruleType: initialData?.ruleType || availableTypes[0] || '',
    conditions: initialData?.conditions || {},
    severity: initialData?.severity || 'WARNING',
    priority: initialData?.priority ?? 50,
    autoBlock: initialData?.autoBlock ?? false,
    requireReview: initialData?.requireReview ?? true,
    enabled: initialData?.enabled ?? true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save rule');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConditionFields = () => {
    switch (formData.ruleType) {
      case 'VELOCITY_LIMIT':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Max Transactions per Hour
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).maxTransactionsPerHour || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, maxTransactionsPerHour: parseInt(e.target.value) || undefined },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Max Transactions per Day
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).maxTransactionsPerDay || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, maxTransactionsPerDay: parseInt(e.target.value) || undefined },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                placeholder="e.g., 500"
              />
            </div>
          </div>
        );
      case 'VOLUME_LIMIT':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Max Amount per Transaction (XLM)
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).maxAmountPerTransaction || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, maxAmountPerTransaction: parseFloat(e.target.value) || undefined },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                placeholder="e.g., 100000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Max Amount per Day (XLM)
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).maxAmountPerDay || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, maxAmountPerDay: parseFloat(e.target.value) || undefined },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                placeholder="e.g., 500000"
              />
            </div>
          </div>
        );
      case 'CIRCULAR_PAYMENT':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Minimum Hops
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).minHops || 2}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, minHops: parseInt(e.target.value) || 2 },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
                min={2}
                max={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
                Time Window (minutes)
              </label>
              <input
                type="number"
                value={(formData.conditions as Record<string, number>).timeWindowMinutes || 60}
                onChange={(e) => setFormData({
                  ...formData,
                  conditions: { ...formData.conditions, timeWindowMinutes: parseInt(e.target.value) || 60 },
                })}
                className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
              />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-[#6A6A6A] mb-1">
              Rule Conditions (JSON)
            </label>
            <textarea
              value={JSON.stringify(formData.conditions, null, 2)}
              onChange={(e) => {
                try {
                  setFormData({ ...formData, conditions: JSON.parse(e.target.value) });
                } catch {
                  // Invalid JSON, don't update
                }
              }}
              rows={6}
              className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
              placeholder="{}"
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Rule Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          placeholder="e.g., High Volume Alert"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          placeholder="Optional description of what this rule detects..."
        />
      </div>

      {!isEditing && (
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Rule Type *
          </label>
          <select
            value={formData.ruleType}
            onChange={(e) => setFormData({ ...formData, ruleType: e.target.value, conditions: {} })}
            required
            className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          >
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {ruleTypeLabels[type] || type}
              </option>
            ))}
          </select>
          {formData.ruleType && ruleTypeDescriptions[formData.ruleType] && (
            <p className="text-xs text-[#6A6A6A] mt-1">
              {ruleTypeDescriptions[formData.ruleType]}
            </p>
          )}
        </div>
      )}

      <div className="p-4 bg-[#F5F6F7] rounded-lg">
        <h4 className="font-medium text-black mb-4">Rule Conditions</h4>
        {renderConditionFields()}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Severity
          </label>
          <select
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value as 'INFO' | 'WARNING' | 'CRITICAL' })}
            className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          >
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Priority (1-100)
          </label>
          <input
            type="number"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 50 })}
            min={1}
            max={100}
            className="w-full px-3 py-2 border border-[#E6E7E9] rounded-lg focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireReview}
            onChange={(e) => setFormData({ ...formData, requireReview: e.target.checked })}
            className="w-4 h-4 text-[#2855FF] border-[#E6E7E9] rounded focus:ring-[#2855FF]"
          />
          <span className="text-sm text-black">Require manual review before confirming violations</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.autoBlock}
            onChange={(e) => setFormData({ ...formData, autoBlock: e.target.checked })}
            className="w-4 h-4 text-[#2855FF] border-[#E6E7E9] rounded focus:ring-[#2855FF]"
          />
          <span className="text-sm text-black">Auto-block accounts when violation is confirmed</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            className="w-4 h-4 text-[#2855FF] border-[#E6E7E9] rounded focus:ring-[#2855FF]"
          />
          <span className="text-sm text-black">Enable this rule immediately</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6E7E9]">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-[#6A6A6A] hover:text-black transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Rule'}
        </button>
      </div>
    </form>
  );
}
