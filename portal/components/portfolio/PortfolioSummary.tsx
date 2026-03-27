'use client';

interface PortfolioSummaryProps {
  totalValueUsd: number;
  totalValueXlm: number;
  totalPnlUsd: number;
  totalPnlPercent: number;
  accountCount: number;
  positionCount: number;
  lastSyncedAt?: Date | string | null;
  onSync?: () => void;
  syncing?: boolean;
}

export default function PortfolioSummary({
  totalValueUsd,
  totalValueXlm,
  totalPnlUsd,
  totalPnlPercent,
  accountCount,
  positionCount,
  lastSyncedAt,
  onSync,
  syncing,
}: PortfolioSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatXlm = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const formatTime = (date: Date | string | null | undefined) => {
    if (!date) return 'Never';
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const pnlColor = totalPnlUsd >= 0 ? 'text-green-600' : 'text-red-600';
  const pnlBg = totalPnlUsd >= 0 ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Value */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
        <div className="text-sm opacity-80 mb-1">Total Value</div>
        <div className="text-2xl font-bold">{formatCurrency(totalValueUsd)}</div>
        <div className="text-sm opacity-80 mt-1">{formatXlm(totalValueXlm)} XLM</div>
      </div>

      {/* P&L */}
      <div className={`p-4 rounded-xl ${pnlBg} border ${totalPnlUsd >= 0 ? 'border-green-200' : 'border-red-200'}`}>
        <div className="text-sm text-gray-400 mb-1">Total P&L</div>
        <div className={`text-2xl font-bold ${pnlColor}`}>
          {totalPnlUsd >= 0 ? '+' : ''}{formatCurrency(totalPnlUsd)}
        </div>
        <div className={`text-sm ${pnlColor} mt-1`}>
          {formatPercent(totalPnlPercent)}
        </div>
      </div>

      {/* Accounts & Positions */}
      <div className="p-4 rounded-xl bg-[#1D1E26] border border-white/10">
        <div className="text-sm text-gray-400 mb-1">Portfolio</div>
        <div className="text-2xl font-bold">{accountCount}</div>
        <div className="text-sm text-gray-400 mt-1">
          {accountCount === 1 ? 'account' : 'accounts'} / {positionCount} positions
        </div>
      </div>

      {/* Sync Status */}
      <div className="p-4 rounded-xl bg-[#1D1E26] border border-white/10">
        <div className="text-sm text-gray-400 mb-1">Last Synced</div>
        <div className="text-lg font-medium">{formatTime(lastSyncedAt)}</div>
        {onSync && (
          <button
            onClick={onSync}
            disabled={syncing}
            className="mt-2 px-3 py-1 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {syncing ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Sync Now
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
