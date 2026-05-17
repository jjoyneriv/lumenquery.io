import crypto from 'crypto';

// Stellar payment configuration
export const PAYMENT_ADDRESS = process.env.STELLAR_PAYMENT_ADDRESS || 'GBEIBYZVIO7WSDRAWVAFLOLLQ7C4X7ING6R43EXFHMNTIOLP2DJLMICV';
export const USDC_ISSUER = 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'; // Circle USDC on Stellar
export const HORIZON_URL = 'https://horizon.stellar.org';

// Payment window: 2 hours
export const PAYMENT_EXPIRY_MS = 2 * 60 * 60 * 1000;

// Subscription duration: 30 days
export const SUBSCRIPTION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export interface PlanConfig {
  name: string;
  tier: string;
  priceUsd: number;
  features: {
    monthlyRequestLimit: number;
    sorobanProEnabled: boolean;
    contractsMonthlyLimit: number;
    callHistoryDays: number;
    exportEnabled: boolean;
    realtimeStreamEnabled: boolean;
    intelligenceEnabled: boolean;
    intelligenceTier: string;
    portfolioEnabled: boolean;
    portfolioTier: string;
    maxPortfolios: number;
    maxPortfolioAccounts: number;
    pnlTrackingEnabled: boolean;
    yieldTrackingEnabled: boolean;
  };
}

export const PLANS: Record<string, PlanConfig> = {
  starter: {
    name: 'Starter',
    tier: 'DEVELOPER',
    priceUsd: 29,
    features: {
      monthlyRequestLimit: 100000,
      sorobanProEnabled: true,
      contractsMonthlyLimit: 50,
      callHistoryDays: 30,
      exportEnabled: true,
      realtimeStreamEnabled: false,
      intelligenceEnabled: false,
      intelligenceTier: 'NONE',
      portfolioEnabled: false,
      portfolioTier: 'NONE',
      maxPortfolios: 1,
      maxPortfolioAccounts: 1,
      pnlTrackingEnabled: false,
      yieldTrackingEnabled: false,
    },
  },
  professional: {
    name: 'Professional',
    tier: 'TEAM',
    priceUsd: 49,
    features: {
      monthlyRequestLimit: 1000000,
      sorobanProEnabled: true,
      contractsMonthlyLimit: 999999,
      callHistoryDays: 90,
      exportEnabled: true,
      realtimeStreamEnabled: true,
      intelligenceEnabled: true,
      intelligenceTier: 'TEAMS',
      portfolioEnabled: true,
      portfolioTier: 'PRO',
      maxPortfolios: 5,
      maxPortfolioAccounts: 10,
      pnlTrackingEnabled: true,
      yieldTrackingEnabled: true,
    },
  },
  enterprise: {
    name: 'Enterprise',
    tier: 'ENTERPRISE',
    priceUsd: 499,
    features: {
      monthlyRequestLimit: 999999999,
      sorobanProEnabled: true,
      contractsMonthlyLimit: 999999,
      callHistoryDays: 365,
      exportEnabled: true,
      realtimeStreamEnabled: true,
      intelligenceEnabled: true,
      intelligenceTier: 'ENTERPRISE',
      portfolioEnabled: true,
      portfolioTier: 'DAO',
      maxPortfolios: 100,
      maxPortfolioAccounts: 999999,
      pnlTrackingEnabled: true,
      yieldTrackingEnabled: true,
    },
  },
};

// Use the user's 16-char alphanumeric userId as the memo
// This fits within Stellar's 28-byte text memo limit
export function generateMemo(publicUserId: string): string {
  return publicUserId;
}

// Get XLM price from Horizon (using USDC/XLM orderbook)
export async function getXlmPrice(): Promise<number> {
  try {
    const res = await fetch(
      `${HORIZON_URL}/order_book?selling_asset_type=native&buying_asset_type=credit_alphanum4&buying_asset_code=USDC&buying_asset_issuer=${USDC_ISSUER}&limit=1`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.asks?.[0]?.price) {
        // price is USDC per XLM
        return parseFloat(data.asks[0].price);
      }
    }
  } catch (e) {
    console.error('Error fetching XLM price:', e);
  }
  // Fallback price
  return 0.10;
}

// Calculate payment amount
export async function calculateAmount(priceUsd: number, currency: 'XLM' | 'USDC'): Promise<string> {
  if (currency === 'USDC') {
    return priceUsd.toFixed(2);
  }
  // Convert USD to XLM
  const xlmPrice = await getXlmPrice();
  const xlmAmount = priceUsd / xlmPrice;
  // Round up to 1 decimal for clean amounts
  return (Math.ceil(xlmAmount * 10) / 10).toFixed(1);
}

// Verify payment on Stellar network
export async function verifyPayment(
  toAddress: string,
  memo: string,
  expectedAmount: string,
  currency: 'XLM' | 'USDC',
  afterTimestamp: string
): Promise<{ verified: boolean; txHash?: string }> {
  try {
    // Fetch recent payments to the address
    const res = await fetch(
      `${HORIZON_URL}/accounts/${toAddress}/payments?order=desc&limit=100`,
      { cache: 'no-store' }
    );
    if (!res.ok) return { verified: false };

    const data = await res.json();
    const payments = data._embedded?.records || [];

    for (const payment of payments) {
      // Skip if before our payment was created
      if (new Date(payment.created_at) < new Date(afterTimestamp)) continue;

      // Check if this payment matches
      if (payment.type !== 'payment' && payment.type !== 'path_payment_strict_send' && payment.type !== 'path_payment_strict_receive') continue;

      // Get the transaction to check memo
      const txRes = await fetch(payment._links?.transaction?.href || `${HORIZON_URL}/transactions/${payment.transaction_hash}`, { cache: 'no-store' });
      if (!txRes.ok) continue;
      const tx = await txRes.json();

      // Check memo matches
      const txMemo = tx.memo || '';
      if (txMemo !== memo) continue;

      // Check currency and amount
      const paymentAmount = parseFloat(payment.amount || '0');
      const expected = parseFloat(expectedAmount);

      if (currency === 'XLM') {
        if (payment.asset_type !== 'native') continue;
        // Allow 1% tolerance for XLM price fluctuation
        if (paymentAmount >= expected * 0.99) {
          return { verified: true, txHash: payment.transaction_hash };
        }
      } else if (currency === 'USDC') {
        if (payment.asset_code !== 'USDC') continue;
        if (paymentAmount >= expected * 0.99) {
          return { verified: true, txHash: payment.transaction_hash };
        }
      }
    }

    return { verified: false };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { verified: false };
  }
}
