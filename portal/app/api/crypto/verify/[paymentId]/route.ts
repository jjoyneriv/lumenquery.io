import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import {
  PLANS,
  SUBSCRIPTION_DURATION_MS,
  verifyPayment,
} from '@/lib/crypto-payments';

// GET - Check payment status
export async function GET(req: Request, { params }: { params: { paymentId: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const payment = await prisma.cryptoPayment.findUnique({
    where: { id: params.paymentId },
  });

  if (!payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  // Check if expired
  if (payment.status === 'PENDING' && new Date(payment.expiresAt) < new Date()) {
    await prisma.cryptoPayment.update({
      where: { id: payment.id },
      data: { status: 'EXPIRED' },
    });
    return NextResponse.json({ payment: { ...payment, status: 'EXPIRED' } });
  }

  return NextResponse.json({ payment });
}

// POST - Trigger verification check
export async function POST(req: Request, { params }: { params: { paymentId: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const payment = await prisma.cryptoPayment.findUnique({
    where: { id: params.paymentId },
  });

  if (!payment) {
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  }

  if (payment.status === 'CONFIRMED') {
    return NextResponse.json({ payment, message: 'Already confirmed' });
  }

  if (payment.status === 'EXPIRED') {
    return NextResponse.json({ error: 'Payment expired' }, { status: 400 });
  }

  // Check expiry
  if (new Date(payment.expiresAt) < new Date()) {
    await prisma.cryptoPayment.update({
      where: { id: payment.id },
      data: { status: 'EXPIRED' },
    });
    return NextResponse.json({ error: 'Payment expired' }, { status: 400 });
  }

  // Verify on Stellar network
  const result = await verifyPayment(
    payment.toAddress,
    payment.memo,
    payment.amount,
    payment.currency as 'XLM' | 'USDC',
    payment.createdAt.toISOString()
  );

  if (!result.verified) {
    return NextResponse.json({
      payment,
      message: 'Payment not yet detected. It may take a few seconds to appear on the network.',
    });
  }

  // Payment confirmed - activate subscription
  const subscriptionEnd = new Date(Date.now() + SUBSCRIPTION_DURATION_MS);
  const planConfig = PLANS[payment.plan];

  await prisma.cryptoPayment.update({
    where: { id: payment.id },
    data: {
      status: 'CONFIRMED',
      txHash: result.txHash,
      confirmedAt: new Date(),
      subscriptionEnd,
    },
  });

  // Apply plan features to organization
  if (payment.organizationId && planConfig) {
    await prisma.organization.update({
      where: { id: payment.organizationId },
      data: {
        tier: planConfig.tier as any,
        monthlyRequestLimit: planConfig.features.monthlyRequestLimit,
        sorobanProEnabled: planConfig.features.sorobanProEnabled,
        contractsMonthlyLimit: planConfig.features.contractsMonthlyLimit,
        callHistoryDays: planConfig.features.callHistoryDays,
        exportEnabled: planConfig.features.exportEnabled,
        realtimeStreamEnabled: planConfig.features.realtimeStreamEnabled,
        intelligenceEnabled: planConfig.features.intelligenceEnabled,
        intelligenceTier: planConfig.features.intelligenceTier as any,
        portfolioEnabled: planConfig.features.portfolioEnabled,
        portfolioTier: planConfig.features.portfolioTier as any,
        maxPortfolios: planConfig.features.maxPortfolios,
        maxPortfolioAccounts: planConfig.features.maxPortfolioAccounts,
        pnlTrackingEnabled: planConfig.features.pnlTrackingEnabled,
        yieldTrackingEnabled: planConfig.features.yieldTrackingEnabled,
        stripeCurrentPeriodEnd: subscriptionEnd,
      },
    });
  }

  const updated = await prisma.cryptoPayment.findUnique({ where: { id: payment.id } });
  return NextResponse.json({
    payment: updated,
    message: 'Payment confirmed! Your subscription is now active.',
  });
}
