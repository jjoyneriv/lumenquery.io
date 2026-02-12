'use client';

import { useState, useEffect, useCallback } from 'react';
import { RuleCard, RuleForm } from '@/components/compliance';

interface ComplianceRule {
  id: string;
  name: string;
  description?: string;
  ruleType: string;
  enabled: boolean;
  priority: number;
  conditions: Record<string, unknown>;
  thresholds?: Record<string, unknown>;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  autoBlock: boolean;
  requireReview: boolean;
  violationCount?: number;
  createdAt: string;
  updatedAt: string;
}

interface Limits {
  current: number;
  max: number;
}

export default function ComplianceRulesPage() {
  const [rules, setRules] = useState<ComplianceRule[]>([]);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchRules = useCallback(async () => {
    try {
      const res = await fetch('/api/compliance/rules');
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      setRules(data.rules);
      setLimits(data.limits);
      setAvailableTypes(data.availableTypes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rules');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      const res = await fetch(`/api/compliance/rules/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      fetchRules();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update rule');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rule?')) {
      return;
    }

    try {
      const res = await fetch(`/api/compliance/rules/${id}?confirm=true`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      fetchRules();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete rule');
    }
  };

  const handleCreateRule = async (data: {
    name: string;
    description?: string;
    ruleType: string;
    conditions: Record<string, unknown>;
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    priority: number;
    autoBlock: boolean;
    requireReview: boolean;
    enabled: boolean;
  }) => {
    const res = await fetch('/api/compliance/rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error);
    }

    setShowCreateModal(false);
    fetchRules();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const canAddMore = limits && (limits.max === -1 || limits.current < limits.max);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Compliance Rules</h1>
          {limits && (
            <p className="text-sm text-[#6A6A6A] mt-1">
              {limits.max === -1
                ? `${limits.current} rules configured`
                : `${limits.current} / ${limits.max} rules`}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={!canAddMore}
          className="px-4 py-2 text-sm font-medium text-white bg-[#2855FF] rounded-lg hover:bg-[#1E44CC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Create Rule
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {rules.length === 0 ? (
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <p className="text-[#6A6A6A] mb-4">No compliance rules configured</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-[#2855FF] hover:text-[#1E44CC] font-medium"
          >
            Create your first rule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
            <h2 className="text-lg font-semibold text-black mb-4">Create Compliance Rule</h2>
            <RuleForm
              availableTypes={availableTypes}
              onSubmit={handleCreateRule}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
