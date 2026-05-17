import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import {
  PLANS,
  PAYMENT_ADDRESS,
  PAYMENT_EXPIRY_MS,
  generateMemo,
  calculateAmount,
} from '@/lib/crypto-payments';

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const { plan, currency } = await req.json();

  if (!plan || !PLANS[plan]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }
  if (!currency || !['XLM', 'USDC'].includes(currency)) {
    return NextResponse.json({ error: 'Invalid currency. Use XLM or USDC' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Create or get organization
  let org = user.organization;
  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: user.name || user.email.split('@')[0],
        slug: user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
        users: { connect: { id: user.id } },
      },
    });
  }

  // Check for existing pending payment
  const existing = await prisma.cryptoPayment.findFirst({
    where: {
      userId: user.id,
      plan,
      status: 'PENDING',
      expiresAt: { gt: new Date() },
    },
  });
  if (existing) {
    return NextResponse.json({ payment: existing });
  }

  const planConfig = PLANS[plan];
  const amount = await calculateAmount(planConfig.priceUsd, currency as 'XLM' | 'USDC');
  const memo = generateMemo(user.userId);

  const payment = await prisma.cryptoPayment.create({
    data: {
      userId: user.id,
      organizationId: org.id,
      plan,
      currency,
      amount,
      amountUsd: planConfig.priceUsd,
      memo,
      toAddress: PAYMENT_ADDRESS,
      expiresAt: new Date(Date.now() + PAYMENT_EXPIRY_MS),
    },
  });

  return NextResponse.json({ payment });
}
