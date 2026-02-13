// ===========================================
// Portfolio Value & P&L Calculator
// ===========================================

import { HorizonBalance, HorizonTrade, getXlmPrice, getAssetPriceInXlm } from './horizon-client';
import { AssetPosition, TradeRecord, TradeType, RiskLevel, AssetType, PnLSummary, AssetPnL } from './types';

/**
 * Calculate portfolio value from balances
 */
export async function calculatePortfolioValue(
  balances: HorizonBalance[]
): Promise<{ totalValueXlm: number; totalValueUsd: number; xlmPrice: number }> {
  const xlmPrice = await getXlmPrice();
  let totalValueXlm = 0;

  for (const balance of balances) {
    const amount = parseFloat(balance.balance);

    if (balance.asset_type === 'native') {
      totalValueXlm += amount;
    } else if (balance.asset_code && balance.asset_issuer) {
      const priceInXlm = await getAssetPriceInXlm(balance.asset_code, balance.asset_issuer);
      totalValueXlm += amount * priceInXlm;
    }
  }

  return {
    totalValueXlm,
    totalValueUsd: totalValueXlm * xlmPrice,
    xlmPrice,
  };
}

/**
 * Convert Horizon balance to AssetPosition
 */
export function balanceToPosition(
  balance: HorizonBalance,
  priceInXlm: number,
  xlmPriceUsd: number,
  portfolioId: string,
  accountId: string
): Partial<AssetPosition> {
  const amount = parseFloat(balance.balance);
  const limit = balance.limit ? parseFloat(balance.limit) : undefined;
  const currentPrice = balance.asset_type === 'native' ? xlmPriceUsd : priceInXlm * xlmPriceUsd;
  const currentValueUsd = amount * currentPrice;

  let assetType: AssetType = 'NATIVE';
  if (balance.asset_type === 'credit_alphanum4') {
    assetType = 'CREDIT_ALPHANUM4';
  } else if (balance.asset_type === 'credit_alphanum12') {
    assetType = 'CREDIT_ALPHANUM12';
  } else if (balance.asset_type === 'liquidity_pool_shares') {
    assetType = 'LIQUIDITY_POOL_SHARES';
  }

  return {
    assetCode: balance.asset_code || 'XLM',
    assetIssuer: balance.asset_issuer,
    assetType,
    balance: amount,
    limit,
    currentPrice,
    currentValueUsd,
    riskLevel: 'LOW', // Will be calculated separately
  };
}

/**
 * Convert Horizon trade to TradeRecord
 */
export function horizonTradeToRecord(
  trade: HorizonTrade,
  accountId: string,
  portfolioId: string,
  xlmPriceUsd: number
): Partial<TradeRecord> {
  const baseAmount = parseFloat(trade.base_amount);
  const counterAmount = parseFloat(trade.counter_amount);
  const price = counterAmount / baseAmount;

  // Determine trade type from perspective of the account
  let tradeType: TradeType;
  if (trade.base_is_seller && trade.base_account === accountId) {
    tradeType = 'SELL';
  } else if (!trade.base_is_seller && trade.base_account === accountId) {
    tradeType = 'BUY';
  } else if (trade.base_is_seller && trade.counter_account === accountId) {
    tradeType = 'BUY';
  } else {
    tradeType = 'SELL';
  }

  // Calculate USD price
  let priceUsd = 0;
  if (trade.base_asset_type === 'native') {
    priceUsd = xlmPriceUsd;
  } else if (trade.counter_asset_type === 'native') {
    priceUsd = xlmPriceUsd / price;
  }

  return {
    txHash: trade.id.split('-')[0], // Extract tx hash from trade ID
    ledger: parseInt(trade.paging_token.split('-')[0]),
    timestamp: new Date(trade.ledger_close_time),
    tradeType,
    baseAssetCode: trade.base_asset_code || 'XLM',
    baseAssetIssuer: trade.base_asset_issuer,
    baseAmount,
    counterAssetCode: trade.counter_asset_code || 'XLM',
    counterAssetIssuer: trade.counter_asset_issuer,
    counterAmount,
    price,
    priceUsd,
    source: 'DEX',
  };
}

/**
 * Calculate P&L for a position using FIFO cost basis
 */
export function calculatePositionPnL(
  position: AssetPosition,
  trades: TradeRecord[]
): { unrealizedPnl: number; realizedPnl: number; avgCostBasis: number; totalCostUsd: number } {
  // Sort trades by timestamp (oldest first for FIFO)
  const sortedTrades = [...trades].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  // Track lots using FIFO
  const lots: { amount: number; costBasis: number }[] = [];
  let realizedPnl = 0;

  for (const trade of sortedTrades) {
    const isBuy =
      (trade.tradeType === 'BUY' && trade.counterAssetCode === position.assetCode) ||
      (trade.tradeType === 'SELL' && trade.baseAssetCode === position.assetCode);

    if (isBuy) {
      // Add to lots
      const amount = trade.tradeType === 'BUY' ? trade.counterAmount : trade.baseAmount;
      const costPerUnit = trade.priceUsd || 0;
      lots.push({ amount, costBasis: costPerUnit });
    } else {
      // Sell - realize P&L using FIFO
      let amountToSell = trade.tradeType === 'SELL' ? trade.baseAmount : trade.counterAmount;
      const salePrice = trade.priceUsd || 0;

      while (amountToSell > 0 && lots.length > 0) {
        const lot = lots[0];
        const sellFromLot = Math.min(amountToSell, lot.amount);

        realizedPnl += sellFromLot * (salePrice - lot.costBasis);
        lot.amount -= sellFromLot;
        amountToSell -= sellFromLot;

        if (lot.amount <= 0) {
          lots.shift();
        }
      }
    }
  }

  // Calculate remaining cost basis
  const totalRemainingAmount = lots.reduce((sum, lot) => sum + lot.amount, 0);
  const totalCostUsd = lots.reduce((sum, lot) => sum + lot.amount * lot.costBasis, 0);
  const avgCostBasis = totalRemainingAmount > 0 ? totalCostUsd / totalRemainingAmount : 0;

  // Calculate unrealized P&L
  const unrealizedPnl = position.balance * position.currentPrice - totalCostUsd;

  return {
    unrealizedPnl,
    realizedPnl,
    avgCostBasis,
    totalCostUsd,
  };
}

/**
 * Calculate P&L summary for entire portfolio
 */
export function calculatePnLSummary(
  positions: AssetPosition[],
  snapshots: { timestamp: Date; totalValueUsd: number }[]
): PnLSummary {
  let totalUnrealizedPnl = 0;
  let totalRealizedPnl = 0;
  let totalCurrentValue = 0;
  let totalCostBasis = 0;

  const byAsset: AssetPnL[] = positions.map((pos) => {
    totalUnrealizedPnl += pos.unrealizedPnl;
    totalRealizedPnl += pos.realizedPnl;
    totalCurrentValue += pos.currentValueUsd;
    totalCostBasis += pos.totalCostUsd;

    return {
      assetCode: pos.assetCode,
      assetIssuer: pos.assetIssuer,
      unrealizedPnl: pos.unrealizedPnl,
      realizedPnl: pos.realizedPnl,
      totalPnl: pos.unrealizedPnl + pos.realizedPnl,
      pnlPercent: pos.pnlPercent,
      currentValue: pos.currentValueUsd,
      costBasis: pos.totalCostUsd,
    };
  });

  const totalPnl = totalUnrealizedPnl + totalRealizedPnl;
  const pnlPercent = totalCostBasis > 0 ? (totalPnl / totalCostBasis) * 100 : 0;

  // Calculate period P&L from snapshots
  const byPeriod = calculatePeriodPnL(snapshots, totalCurrentValue);

  return {
    totalUnrealizedPnl,
    totalRealizedPnl,
    totalPnl,
    pnlPercent,
    byAsset: byAsset.sort((a, b) => Math.abs(b.totalPnl) - Math.abs(a.totalPnl)),
    byPeriod,
  };
}

/**
 * Calculate P&L by time period
 */
function calculatePeriodPnL(
  snapshots: { timestamp: Date; totalValueUsd: number }[],
  currentValue: number
): { period: string; pnlUsd: number; pnlPercent: number; startValue: number; endValue: number }[] {
  const now = new Date();
  const periods = [
    { label: '24h', hours: 24 },
    { label: '7d', hours: 168 },
    { label: '30d', hours: 720 },
    { label: 'YTD', hours: (now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 3600000 },
    { label: 'ALL', hours: Infinity },
  ];

  const sortedSnapshots = [...snapshots].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return periods.map(({ label, hours }) => {
    const cutoff = new Date(now.getTime() - hours * 3600000);
    const startSnapshot = sortedSnapshots.find((s) => s.timestamp <= cutoff) || sortedSnapshots[sortedSnapshots.length - 1];

    if (!startSnapshot) {
      return {
        period: label,
        pnlUsd: 0,
        pnlPercent: 0,
        startValue: currentValue,
        endValue: currentValue,
      };
    }

    const startValue = startSnapshot.totalValueUsd;
    const pnlUsd = currentValue - startValue;
    const pnlPercent = startValue > 0 ? (pnlUsd / startValue) * 100 : 0;

    return {
      period: label,
      pnlUsd,
      pnlPercent,
      startValue,
      endValue: currentValue,
    };
  });
}

/**
 * Calculate diversification score (0-100)
 * Higher score = more diversified
 */
export function calculateDiversificationScore(positions: AssetPosition[]): number {
  if (positions.length === 0) return 0;
  if (positions.length === 1) return 10;

  const totalValue = positions.reduce((sum, pos) => sum + pos.currentValueUsd, 0);
  if (totalValue === 0) return 0;

  // Calculate Herfindahl-Hirschman Index (HHI)
  const hhi = positions.reduce((sum, pos) => {
    const share = pos.currentValueUsd / totalValue;
    return sum + share * share;
  }, 0);

  // Convert HHI to 0-100 score (lower HHI = more diversified = higher score)
  // HHI ranges from 1/n (perfect diversification) to 1 (complete concentration)
  const minHHI = 1 / Math.min(positions.length, 10); // Cap at 10 for scoring
  const score = Math.round(((1 - hhi) / (1 - minHHI)) * 100);

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate average trustline risk
 */
export function calculateAvgTrustlineRisk(
  trustlineRisks: { riskScore: number }[]
): number {
  if (trustlineRisks.length === 0) return 0;

  const totalRisk = trustlineRisks.reduce((sum, t) => sum + t.riskScore, 0);
  return Math.round(totalRisk / trustlineRisks.length);
}

/**
 * Determine risk level from score
 */
export function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'CRITICAL';
  if (score >= 50) return 'HIGH';
  if (score >= 25) return 'MEDIUM';
  return 'LOW';
}

/**
 * Format currency value
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format XLM amount
 */
export function formatXlm(amount: number): string {
  return `${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 7,
  })} XLM`;
}
