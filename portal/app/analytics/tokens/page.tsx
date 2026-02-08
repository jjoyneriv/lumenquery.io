'use client';

import { useEffect, useState, useCallback } from 'react';
import MetricCard from '@/components/analytics/MetricCard';
import AreaChart from '@/components/analytics/AreaChart';
import TimeRangeSelector from '@/components/analytics/TimeRangeSelector';
import { WhaleTable } from '@/components/analytics/tokens/WhaleTable';
import { RiskBadge } from '@/components/analytics/tokens/RiskBadge';

interface TokenAnalyticsData {
  velocity: {
    totalPayments24h: number;
    totalVolumeXLM: string;
    avgPaymentSize: string;
    topTokensByVolume: Array<{
      code: string;
      issuer: string;
      volume24h: string;
      paymentCount: number;
    }>;
    hourlyActivity: Array<{
      timestamp: string;
      payments: number;
      volume: string;
    }>;
  };
  whales: {
    xlmWhales: Array<{
      address: string;
      balance: string;
      lastActivity: string;
    }>;
    recentLargeMovements: Array<{
      from: string;
      to: string;
      amount: string;
      timestamp: string;
      type: string;
    }>;
  };
  issuerRisk: {
    topTokens: Array<{
      code: string;
      issuer: string;
      totalSupply: string;
      holderCount: number;
      riskFactors: {
        authRequired: boolean;
        authRevocable: boolean;
        authClawback: boolean;
        authImmutable: boolean;
      };
      riskScore: 'low' | 'medium' | 'high';
    }>;
  };
  updatedAt: string;
}

export default function TokenAnalyticsPage() {
  const [data, setData] = useState<TokenAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/analytics/tokens?range=${timeRange}`);
      if (!res.ok) throw new Error('Failed to fetch token analytics');
      const result = await res.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError('Failed to load token analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  // Transform hourly activity for chart
  const chartData = data?.velocity.hourlyActivity.map((item) => ({
    timestamp: item.timestamp,
    payments: item.payments,
  })) || [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Token Analytics</h1>
          <p className="text-[#6A6A6A] text-sm mt-1">
            Token velocity, whale tracking, and issuer risk analysis
          </p>
        </div>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Velocity Metrics */}
      <section aria-labelledby="velocity-heading" className="mb-8">
        <h2 id="velocity-heading" className="sr-only">Token Velocity Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <MetricCard
            title="Payments (24h)"
            value={loading ? '...' : data?.velocity.totalPayments24h.toLocaleString() || '0'}
            icon="transactions"
          />
          <MetricCard
            title="Volume (24h)"
            value={loading ? '...' : `${data?.velocity.totalVolumeXLM || '0'} XLM`}
            icon="fee"
          />
          <MetricCard
            title="Avg Payment"
            value={loading ? '...' : `${data?.velocity.avgPaymentSize || '0'} XLM`}
            customIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Velocity Chart */}
      <section aria-labelledby="velocity-chart-heading" className="mb-8">
        <div className="bg-white rounded-2xl border border-[#E6E7E9] p-4 sm:p-6">
          <h2 id="velocity-chart-heading" className="text-lg font-semibold text-black mb-4">
            Payment Activity
          </h2>
          <div className="h-64">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
              </div>
            ) : chartData.length > 0 ? (
              <AreaChart
                data={chartData}
                dataKey="payments"
                xAxisKey="timestamp"
                color="#2855FF"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-[#6A6A6A]">
                No activity data available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Two Column Layout: Top Tokens & Issuer Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Tokens by Volume */}
        <section aria-labelledby="top-tokens-heading">
          <div className="bg-white rounded-2xl border border-[#E6E7E9] overflow-hidden h-full">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
              <h2 id="top-tokens-heading" className="font-semibold text-black flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Top Tokens by Volume
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
                </div>
              ) : data?.velocity.topTokensByVolume.length ? (
                <div className="space-y-3">
                  {data.velocity.topTokensByVolume.map((token, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-black">{token.code}</span>
                        <span className="text-xs text-[#6A6A6A] ml-2">
                          {token.issuer}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-black">{token.volume24h} XLM</div>
                        <div className="text-xs text-[#6A6A6A]">
                          {token.paymentCount.toLocaleString()} payments
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-[#6A6A6A] py-8">No token data available</p>
              )}
            </div>
          </div>
        </section>

        {/* Issuer Risk Analysis */}
        <section aria-labelledby="issuer-risk-heading">
          <div className="bg-white rounded-2xl border border-[#E6E7E9] overflow-hidden h-full">
            <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
              <h2 id="issuer-risk-heading" className="font-semibold text-black flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Issuer Risk Analysis
              </h2>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
                </div>
              ) : data?.issuerRisk.topTokens.length ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase">
                        Token
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase">
                        Holders
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-[#6A6A6A] uppercase">
                        Risk
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E7E9]">
                    {data.issuerRisk.topTokens.map((token, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-black">{token.code}</div>
                          <div className="text-xs text-[#6A6A6A]">{token.issuer}</div>
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-black">
                          {token.holderCount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <RiskBadge score={token.riskScore} factors={token.riskFactors} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-[#6A6A6A] py-8">No issuer data available</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Whale Tracking */}
      <section aria-labelledby="whale-heading" className="mb-8">
        <h2 id="whale-heading" className="text-lg font-semibold text-black mb-4">
          Whale Tracking
        </h2>
        {loading ? (
          <div className="bg-white rounded-xl border border-[#E6E7E9] p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2855FF]" />
          </div>
        ) : (
          <WhaleTable
            whales={data?.whales.xlmWhales || []}
            movements={data?.whales.recentLargeMovements || []}
          />
        )}
      </section>

      {/* Last Updated */}
      {data?.updatedAt && (
        <p className="text-xs text-[#6A6A6A] text-center">
          Last updated: {new Date(data.updatedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
