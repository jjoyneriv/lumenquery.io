'use client';

import { useState } from 'react';

interface AIExplanationProps {
  contractId: string;
  callId: string;
  existingExplanation?: string | null;
  canUseAI: boolean;
  remainingAI?: { used: number; limit: number };
}

export function AIExplanation({
  contractId,
  callId,
  existingExplanation,
  canUseAI,
  remainingAI,
}: AIExplanationProps) {
  const [explanation, setExplanation] = useState(existingExplanation || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateExplanation = async () => {
    if (!canUseAI) {
      setError('AI explanations require Developer tier or higher');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/contracts/${contractId}/calls/${callId}/explain`, {
        method: 'POST',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate explanation');
      }

      const data = await res.json();
      setExplanation(data.explanation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate explanation');
    } finally {
      setLoading(false);
    }
  };

  if (explanation) {
    return (
      <div className="bg-gradient-to-r from-[#2855FF]/5 to-purple-500/5 border border-[#2855FF]/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <svg
            className="w-5 h-5 text-[#2855FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h4 className="text-sm font-medium text-[#2855FF]">AI Explanation</h4>
        </div>
        <p className="text-sm text-[#6A6A6A] whitespace-pre-wrap leading-relaxed">
          {explanation}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F6F7] border border-[#E6E7E9] rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-[#6A6A6A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span className="text-sm text-[#6A6A6A]">
            Get an AI-powered explanation of this contract call
          </span>
        </div>

        <button
          onClick={generateExplanation}
          disabled={loading || !canUseAI}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            canUseAI
              ? 'bg-[#2855FF] text-white hover:bg-[#1e44cc]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Explain
            </>
          )}
        </button>
      </div>

      {!canUseAI && remainingAI && (
        <p className="text-xs text-[#6A6A6A] mt-2">
          {remainingAI.limit === 0
            ? 'Upgrade to Developer tier to use AI explanations'
            : `${remainingAI.used}/${remainingAI.limit} explanations used this month`}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
}
