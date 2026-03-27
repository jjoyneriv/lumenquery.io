'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface TierGateProps {
  children: ReactNode;
  isAllowed: boolean;
  requiredTier?: string;
  feature?: string;
  showUpgrade?: boolean;
}

export function TierGate({
  children,
  isAllowed,
  requiredTier = 'SOLO',
  feature = 'this feature',
  showUpgrade = true,
}: TierGateProps) {
  if (isAllowed) {
    return <>{children}</>;
  }

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 p-8 text-center">
      <div className="max-w-md mx-auto">
        <svg
          className="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-white mb-2">
          Upgrade Required
        </h3>
        <p className="text-gray-400 mb-4">
          Access to {feature} requires the {requiredTier} tier or higher.
        </p>
        {showUpgrade && (
          <Link
            href="/intelligence/upgrade"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#7366FF] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors font-medium"
          >
            View Plans
          </Link>
        )}
      </div>
    </div>
  );
}
