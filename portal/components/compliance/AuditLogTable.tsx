'use client';

import { useState } from 'react';

interface AuditEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  actorType: 'USER' | 'SYSTEM' | 'WORKER' | 'API';
  actorEmail?: string;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  contentHash: string;
  chainValid: boolean;
  timestamp: string;
}

interface AuditLogTableProps {
  entries: AuditEntry[];
  filters?: {
    actions: string[];
    entityTypes: string[];
  };
  onFilterChange?: (filters: { action?: string; entityType?: string }) => void;
}

const actionLabels: Record<string, { label: string; bg: string; text: string }> = {
  CREATE: { label: 'Created', bg: 'bg-green-100', text: 'text-green-800' },
  UPDATE: { label: 'Updated', bg: 'bg-blue-100', text: 'text-blue-800' },
  DELETE: { label: 'Deleted', bg: 'bg-red-100', text: 'text-red-800' },
  REVIEW: { label: 'Reviewed', bg: 'bg-purple-100', text: 'text-purple-800' },
  ESCALATE: { label: 'Escalated', bg: 'bg-orange-100', text: 'text-orange-800' },
  CLEAR: { label: 'Cleared', bg: 'bg-green-100', text: 'text-green-800' },
  CONFIRM: { label: 'Confirmed', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  REPORT: { label: 'Reported', bg: 'bg-indigo-100', text: 'text-indigo-800' },
  EXPORT: { label: 'Exported', bg: 'bg-gray-100', text: 'text-gray-800' },
};

const actorTypeIcons: Record<string, JSX.Element> = {
  USER: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  SYSTEM: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  WORKER: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  API: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function truncateId(id: string): string {
  if (id.length <= 16) return id;
  return `${id.slice(0, 8)}...${id.slice(-8)}`;
}

export function AuditLogTable({ entries, filters, onFilterChange }: AuditLogTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');

  const handleFilterChange = (action?: string, entityType?: string) => {
    if (action !== undefined) setSelectedAction(action);
    if (entityType !== undefined) setSelectedEntityType(entityType);
    onFilterChange?.({
      action: action !== undefined ? action : selectedAction,
      entityType: entityType !== undefined ? entityType : selectedEntityType,
    });
  };

  if (entries.length === 0) {
    return (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-[#6A6A6A] mb-4">No audit entries found</p>
        <p className="text-sm text-[#6A6A6A]">
          Audit log entries will appear here when compliance actions are taken
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filters && onFilterChange && (
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedAction}
            onChange={(e) => handleFilterChange(e.target.value, undefined)}
            className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          >
            <option value="">All Actions</option>
            {filters.actions.map((action) => (
              <option key={action} value={action}>
                {actionLabels[action]?.label || action}
              </option>
            ))}
          </select>
          <select
            value={selectedEntityType}
            onChange={(e) => handleFilterChange(undefined, e.target.value)}
            className="px-3 py-2 border border-[#E6E7E9] rounded-lg text-sm focus:ring-2 focus:ring-[#2855FF] focus:border-transparent"
          >
            <option value="">All Entity Types</option>
            {filters.entityTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
        <div className="divide-y divide-[#E6E7E9]">
          {entries.map((entry) => {
            const actionConfig = actionLabels[entry.action] || { label: entry.action, bg: 'bg-gray-100', text: 'text-gray-800' };
            const isExpanded = expandedId === entry.id;

            return (
              <div key={entry.id}>
                <div
                  className="p-4 hover:bg-[#F5F6F7] cursor-pointer transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[#6A6A6A]">
                      {actorTypeIcons[entry.actorType] || actorTypeIcons.SYSTEM}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${actionConfig.bg} ${actionConfig.text}`}>
                          {actionConfig.label}
                        </span>
                        <span className="text-sm text-black">
                          {entry.entityType.replace('_', ' ')}
                        </span>
                        <code className="text-xs font-mono text-[#6A6A6A]">
                          {truncateId(entry.entityId)}
                        </code>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#6A6A6A]">
                        <span>{formatTimestamp(entry.timestamp)}</span>
                        {entry.actorEmail && (
                          <>
                            <span>•</span>
                            <span>{entry.actorEmail}</span>
                          </>
                        )}
                        {!entry.chainValid && (
                          <span className="text-red-500 font-medium">Chain integrity broken</span>
                        )}
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-[#6A6A6A] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 bg-[#F5F6F7]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {entry.previousState && Object.keys(entry.previousState).length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-[#6A6A6A] mb-2">Previous State</p>
                          <pre className="text-xs font-mono bg-white p-3 rounded-lg overflow-x-auto border border-[#E6E7E9]">
                            {JSON.stringify(entry.previousState, null, 2)}
                          </pre>
                        </div>
                      )}
                      {entry.newState && Object.keys(entry.newState).length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-[#6A6A6A] mb-2">New State</p>
                          <pre className="text-xs font-mono bg-white p-3 rounded-lg overflow-x-auto border border-[#E6E7E9]">
                            {JSON.stringify(entry.newState, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E6E7E9]">
                      <p className="text-xs text-[#6A6A6A]">
                        <span className="font-medium">Content Hash:</span>{' '}
                        <code className="font-mono">{entry.contentHash.slice(0, 16)}...</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
