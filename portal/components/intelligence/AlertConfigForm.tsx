'use client';

import { useState } from 'react';

export interface AlertConditions {
  threshold?: number;
  accountId?: string;
  assetCode?: string;
  contractId?: string;
  changeType?: 'created' | 'removed' | 'all';
  [key: string]: unknown;
}

export interface AlertConfigFormData {
  name: string;
  description?: string;
  alertType: string;
  conditions: AlertConditions;
  notifyEmail: boolean;
  notifyWebhook: boolean;
  webhookUrl?: string;
  cooldownMinutes: number;
}

interface AlertConfigFormProps {
  onSubmit: (data: AlertConfigFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<AlertConfigFormData>;
  isEdit?: boolean;
  webhooksEnabled?: boolean;
}

const alertTypes = [
  { value: 'WHALE_MOVEMENT', label: 'Whale Movement', description: 'Large transfers exceeding threshold' },
  { value: 'TRUSTLINE_CHANGE', label: 'Trustline Change', description: 'Trustline creation or removal' },
  { value: 'ACCOUNT_ACTIVITY', label: 'Account Activity', description: 'Activity on watched accounts' },
  { value: 'CONTRACT_CALL', label: 'Contract Call', description: 'Soroban contract invocations' },
  { value: 'ANOMALY_DETECTED', label: 'Anomaly Detected', description: 'Unusual behavior patterns' },
];

export function AlertConfigForm({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
  webhooksEnabled = false,
}: AlertConfigFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [alertType, setAlertType] = useState(initialData?.alertType || 'WHALE_MOVEMENT');
  const [conditions, setConditions] = useState<AlertConditions>(initialData?.conditions || {});
  const [notifyEmail, setNotifyEmail] = useState(initialData?.notifyEmail ?? true);
  const [notifyWebhook, setNotifyWebhook] = useState(initialData?.notifyWebhook ?? false);
  const [webhookUrl, setWebhookUrl] = useState(initialData?.webhookUrl || '');
  const [cooldownMinutes, setCooldownMinutes] = useState(initialData?.cooldownMinutes ?? 5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (notifyWebhook && !webhookUrl.trim()) {
      setError('Webhook URL is required when webhook notifications are enabled');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        alertType,
        conditions,
        notifyEmail,
        notifyWebhook,
        webhookUrl: notifyWebhook ? webhookUrl.trim() : undefined,
        cooldownMinutes,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateCondition = (key: keyof AlertConditions, value: unknown) => {
    setConditions((prev) => ({ ...prev, [key]: value }));
  };

  const selectedType = alertTypes.find((t) => t.value === alertType);

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 p-6">
      <h3 className="font-semibold text-white mb-4">
        {isEdit ? 'Edit Alert Configuration' : 'Create Alert Configuration'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
              placeholder="e.g., Large XLM Transfer Alert"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
              placeholder="Optional description"
            />
          </div>
        </div>

        {/* Alert Type */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Alert Type *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {alertTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => {
                  setAlertType(type.value);
                  setConditions({});
                }}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  alertType === type.value
                    ? 'border-[#7366FF] bg-blue-50'
                    : 'border-white/10 hover:border-[#7366FF]'
                }`}
              >
                <p className="font-medium text-white">{type.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Conditions based on type */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Conditions</h4>

          {alertType === 'WHALE_MOVEMENT' && (
            <div>
              <label htmlFor="threshold" className="block text-sm text-gray-400 mb-1">
                Amount Threshold (XLM)
              </label>
              <input
                type="number"
                id="threshold"
                value={conditions.threshold || ''}
                onChange={(e) => updateCondition('threshold', parseInt(e.target.value) || undefined)}
                className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
                placeholder="100000"
                min="0"
              />
            </div>
          )}

          {alertType === 'TRUSTLINE_CHANGE' && (
            <>
              <div>
                <label htmlFor="assetCode" className="block text-sm text-gray-400 mb-1">
                  Asset Code (optional)
                </label>
                <input
                  type="text"
                  id="assetCode"
                  value={conditions.assetCode || ''}
                  onChange={(e) => updateCondition('assetCode', e.target.value || undefined)}
                  className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
                  placeholder="e.g., USDC"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Change Type</label>
                <select
                  value={conditions.changeType || 'all'}
                  onChange={(e) => updateCondition('changeType', e.target.value as AlertConditions['changeType'])}
                  className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
                >
                  <option value="all">All Changes</option>
                  <option value="created">Created Only</option>
                  <option value="removed">Removed Only</option>
                </select>
              </div>
            </>
          )}

          {alertType === 'ACCOUNT_ACTIVITY' && (
            <div>
              <label htmlFor="accountId" className="block text-sm text-gray-400 mb-1">
                Account ID
              </label>
              <input
                type="text"
                id="accountId"
                value={conditions.accountId || ''}
                onChange={(e) => updateCondition('accountId', e.target.value || undefined)}
                className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent font-mono text-sm"
                placeholder="G..."
              />
            </div>
          )}

          {alertType === 'CONTRACT_CALL' && (
            <div>
              <label htmlFor="contractId" className="block text-sm text-gray-400 mb-1">
                Contract ID
              </label>
              <input
                type="text"
                id="contractId"
                value={conditions.contractId || ''}
                onChange={(e) => updateCondition('contractId', e.target.value || undefined)}
                className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent font-mono text-sm"
                placeholder="C..."
              />
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Notifications</h4>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.checked)}
              className="w-4 h-4 text-[#7366FF] border-white/10 rounded focus:ring-[#7366FF]"
            />
            <span className="text-sm text-gray-400">Send email notifications</span>
          </label>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyWebhook}
                onChange={(e) => setNotifyWebhook(e.target.checked)}
                disabled={!webhooksEnabled}
                className="w-4 h-4 text-[#7366FF] border-white/10 rounded focus:ring-[#7366FF] disabled:opacity-50"
              />
              <span className={`text-sm ${webhooksEnabled ? 'text-gray-400' : 'text-gray-400 opacity-50'}`}>
                Send webhook notifications
                {!webhooksEnabled && ' (Teams tier required)'}
              </span>
            </label>

            {notifyWebhook && webhooksEnabled && (
              <div className="mt-2 ml-7">
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent text-sm"
                  placeholder="https://example.com/webhook"
                />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="cooldown" className="block text-sm text-gray-400 mb-1">
              Cooldown Period (minutes)
            </label>
            <input
              type="number"
              id="cooldown"
              value={cooldownMinutes}
              onChange={(e) => setCooldownMinutes(parseInt(e.target.value) || 5)}
              className="w-32 px-4 py-2 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent"
              min="1"
              max="1440"
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum time between repeated alerts for the same trigger
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#7366FF] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Alert'}
          </button>
        </div>
      </form>
    </div>
  );
}
