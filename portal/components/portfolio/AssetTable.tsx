'use client';

import { useState } from 'react';

interface Asset {
  assetCode: string;
  assetIssuer?: string | null;
  balance: number;
  currentValueUsd: number;
  avgCostBasis?: number;
  unrealizedPnl?: number;
  realizedPnl?: number;
  pnlPercent?: number;
  riskLevel?: string;
}

interface AssetTableProps {
  assets: Asset[];
  showPnL?: boolean;
  showRisk?: boolean;
}

export default function AssetTable({ assets, showPnL = true, showRisk = false }: AssetTableProps) {
  const [sortBy, setSortBy] = useState<'value' | 'pnl' | 'balance'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatBalance = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toFixed(4);
  };

  const formatPercent = (value: number | undefined) => {
    if (value === undefined) return '-';
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const truncateIssuer = (issuer?: string | null) => {
    if (!issuer) return null;
    return `${issuer.slice(0, 4)}...${issuer.slice(-4)}`;
  };

  const getRiskBadge = (level?: string) => {
    if (!level) return null;
    const colors: Record<string, string> = {
      LOW: 'bg-green-100 text-green-700',
      MEDIUM: 'bg-yellow-100 text-yellow-700',
      HIGH: 'bg-orange-100 text-orange-700',
      CRITICAL: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[level] || 'bg-gray-100 text-gray-700'}`}>
        {level.charAt(0) + level.slice(1).toLowerCase()}
      </span>
    );
  };

  const sortedAssets = [...assets].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'value':
        comparison = a.currentValueUsd - b.currentValueUsd;
        break;
      case 'pnl':
        comparison = (a.unrealizedPnl || 0) - (b.unrealizedPnl || 0);
        break;
      case 'balance':
        comparison = a.balance - b.balance;
        break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleSort = (column: 'value' | 'pnl' | 'balance') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: 'value' | 'pnl' | 'balance' }) => (
    <svg
      className={`w-4 h-4 inline-block ml-1 ${sortBy === column ? 'text-indigo-600' : 'text-gray-400'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {sortBy === column && sortOrder === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );

  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-[#6A6A6A]">
        <p>No assets found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-[#E6E7E9]">
            <th className="text-left py-3 px-4 text-sm font-semibold text-[#6A6A6A]">Asset</th>
            <th
              className="text-right py-3 px-4 text-sm font-semibold text-[#6A6A6A] cursor-pointer hover:text-black"
              onClick={() => handleSort('balance')}
            >
              Balance
              <SortIcon column="balance" />
            </th>
            <th
              className="text-right py-3 px-4 text-sm font-semibold text-[#6A6A6A] cursor-pointer hover:text-black"
              onClick={() => handleSort('value')}
            >
              Value
              <SortIcon column="value" />
            </th>
            {showPnL && (
              <th
                className="text-right py-3 px-4 text-sm font-semibold text-[#6A6A6A] cursor-pointer hover:text-black"
                onClick={() => handleSort('pnl')}
              >
                P&L
                <SortIcon column="pnl" />
              </th>
            )}
            {showRisk && (
              <th className="text-right py-3 px-4 text-sm font-semibold text-[#6A6A6A]">Risk</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, index) => {
            const pnlColor = (asset.unrealizedPnl || 0) >= 0 ? 'text-green-600' : 'text-red-600';
            return (
              <tr
                key={`${asset.assetCode}-${asset.assetIssuer || 'native'}-${index}`}
                className="border-b border-[#E6E7E9] hover:bg-[#F5F6F7]"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-indigo-600">
                        {asset.assetCode.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{asset.assetCode}</div>
                      {asset.assetIssuer && (
                        <div className="text-xs text-[#6A6A6A]">{truncateIssuer(asset.assetIssuer)}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  {formatBalance(asset.balance)}
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  {formatCurrency(asset.currentValueUsd)}
                </td>
                {showPnL && (
                  <td className={`py-3 px-4 text-right ${pnlColor}`}>
                    <div>{formatCurrency(asset.unrealizedPnl || 0)}</div>
                    <div className="text-xs">{formatPercent(asset.pnlPercent)}</div>
                  </td>
                )}
                {showRisk && (
                  <td className="py-3 px-4 text-right">
                    {getRiskBadge(asset.riskLevel)}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
