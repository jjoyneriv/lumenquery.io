import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          tier: true,
          monthlyRequestLimit: true,
          stripeSubscriptionId: true,
          stripePriceId: true,
          stripeCurrentPeriodEnd: true,
          stripeCustomerId: true,
          sorobanProEnabled: true,
          intelligenceEnabled: true,
          intelligenceTier: true,
          portfolioEnabled: true,
          portfolioTier: true,
          exportEnabled: true,
          realtimeStreamEnabled: true,
          contractsMonthlyLimit: true,
          callHistoryDays: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const org = user.organization;
  const isActive = org?.stripeCurrentPeriodEnd
    ? new Date(org.stripeCurrentPeriodEnd) > new Date()
    : false;

  return NextResponse.json({
    subscription: {
      plan: org?.tier || 'FREE',
      isActive: org?.tier === 'FREE' ? true : isActive,
      hasSubscription: !!org?.stripeSubscriptionId,
      currentPeriodEnd: org?.stripeCurrentPeriodEnd,
      features: {
        monthlyRequests: org?.monthlyRequestLimit || 10000,
        sorobanPro: org?.sorobanProEnabled || false,
        intelligence: org?.intelligenceEnabled || false,
        portfolio: org?.portfolioEnabled || false,
        export: org?.exportEnabled || false,
        realTimeStream: org?.realtimeStreamEnabled || false,
        contractsLimit: org?.contractsMonthlyLimit || 10,
      },
    },
  });
}
