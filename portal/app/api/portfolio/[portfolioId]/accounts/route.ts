// ===========================================
// Portfolio Accounts API
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { canAddAccount, checkFeatureAccess } from '@/lib/portfolio/gates';
import {
  getAccount,
  isValidStellarAddress,
  accountExists,
  getXlmPrice,
  getAssetPriceInXlm,
} from '@/lib/portfolio/horizon-client';
import { balanceToPosition } from '@/lib/portfolio/calculator';

// GET /api/portfolio/[portfolioId]/accounts - List accounts
export async function GET(
  request: NextRequest,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const org = user.organization;
    const access = checkFeatureAccess(org as any, 'portfolio');
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        organizationId: org.id,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const accounts = await prisma.portfolioAccount.findMany({
      where: { portfolioId: params.portfolioId },
      include: {
        positions: {
          orderBy: { currentValueUsd: 'desc' },
        },
        contractPositions: {
          where: { status: 'ACTIVE' },
        },
        _count: {
          select: {
            trades: true,
            yieldRewards: true,
          },
        },
      },
      orderBy: { addedAt: 'asc' },
    });

    return NextResponse.json({
      accounts: accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        label: a.label,
        addedAt: a.addedAt,
        lastActivity: a.lastActivity,
        xlmBalance: Number(a.xlmBalance),
        totalValueUsd: Number(a.totalValueUsd),
        positionCount: a.positions.length,
        contractPositionCount: a.contractPositions.length,
        tradeCount: a._count.trades,
        rewardCount: a._count.yieldRewards,
        positions: a.positions.slice(0, 5).map((p) => ({
          assetCode: p.assetCode,
          balance: Number(p.balance),
          valueUsd: Number(p.currentValueUsd),
          pnlPercent: p.pnlPercent,
        })),
      })),
      totalAccounts: accounts.length,
      maxAccounts: org.maxPortfolioAccounts,
    });
  } catch (error) {
    console.error('Failed to list accounts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/portfolio/[portfolioId]/accounts - Add account
export async function POST(
  request: NextRequest,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    const org = user.organization;
    const access = checkFeatureAccess(org as any, 'portfolio');
    if (!access.allowed) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }

    // Verify portfolio ownership
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        organizationId: org.id,
      },
      include: {
        accounts: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Check account limit
    const totalAccounts = await prisma.portfolioAccount.count({
      where: {
        portfolio: {
          organizationId: org.id,
        },
      },
    });

    if (!canAddAccount(org as any, totalAccounts)) {
      return NextResponse.json(
        { error: `Account limit reached. Your plan allows ${org.maxPortfolioAccounts} accounts.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { accountId, label } = body;

    // Validate Stellar address
    if (!accountId || !isValidStellarAddress(accountId)) {
      return NextResponse.json(
        { error: 'Invalid Stellar account address' },
        { status: 400 }
      );
    }

    // Check if account already exists in this portfolio
    const existing = await prisma.portfolioAccount.findFirst({
      where: {
        portfolioId: params.portfolioId,
        accountId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Account already exists in this portfolio' },
        { status: 409 }
      );
    }

    // Verify account exists on Stellar network
    const horizonAccount = await getAccount(accountId);
    if (!horizonAccount) {
      return NextResponse.json(
        { error: 'Account not found on Stellar network' },
        { status: 404 }
      );
    }

    // Get XLM price for value calculation
    const xlmPriceUsd = await getXlmPrice();

    // Calculate XLM balance and total value
    let xlmBalance = 0;
    let totalValueUsd = 0;

    for (const balance of horizonAccount.balances) {
      const amount = parseFloat(balance.balance);
      if (balance.asset_type === 'native') {
        xlmBalance = amount;
        totalValueUsd += amount * xlmPriceUsd;
      } else if (balance.asset_code && balance.asset_issuer) {
        const priceInXlm = await getAssetPriceInXlm(balance.asset_code, balance.asset_issuer);
        totalValueUsd += amount * priceInXlm * xlmPriceUsd;
      }
    }

    // Create portfolio account
    const portfolioAccount = await prisma.portfolioAccount.create({
      data: {
        accountId,
        label: label || null,
        portfolioId: params.portfolioId,
        sequence: BigInt(horizonAccount.sequence),
        numSubentries: horizonAccount.subentry_count,
        xlmBalance,
        totalValueUsd,
        lastActivity: horizonAccount.last_modified_time ? new Date(horizonAccount.last_modified_time) : null,
      },
    });

    // Create positions for each balance
    const positionsToCreate = [];
    for (const balance of horizonAccount.balances) {
      const amount = parseFloat(balance.balance);
      if (amount <= 0) continue;

      let priceInXlm = 1;
      if (balance.asset_type !== 'native' && balance.asset_code && balance.asset_issuer) {
        priceInXlm = await getAssetPriceInXlm(balance.asset_code, balance.asset_issuer);
      }

      const position = balanceToPosition(balance, priceInXlm, xlmPriceUsd, params.portfolioId, portfolioAccount.id);

      positionsToCreate.push({
        portfolioId: params.portfolioId,
        accountId: portfolioAccount.id,
        assetCode: position.assetCode!,
        assetIssuer: position.assetIssuer || null,
        assetType: position.assetType!,
        balance: amount,
        limit: position.limit || null,
        currentPrice: position.currentPrice!,
        currentValueUsd: position.currentValueUsd!,
        riskLevel: position.riskLevel!,
      });
    }

    if (positionsToCreate.length > 0) {
      await prisma.assetPosition.createMany({
        data: positionsToCreate,
      });
    }

    // Update portfolio totals
    await updatePortfolioTotals(params.portfolioId);

    return NextResponse.json({
      id: portfolioAccount.id,
      accountId: portfolioAccount.accountId,
      label: portfolioAccount.label,
      xlmBalance: Number(portfolioAccount.xlmBalance),
      totalValueUsd: Number(portfolioAccount.totalValueUsd),
      positionCount: positionsToCreate.length,
      addedAt: portfolioAccount.addedAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to add account:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Update portfolio total values after account changes
 */
async function updatePortfolioTotals(portfolioId: string) {
  const accounts = await prisma.portfolioAccount.findMany({
    where: { portfolioId },
    select: {
      xlmBalance: true,
      totalValueUsd: true,
    },
  });

  const totalValueXlm = accounts.reduce((sum, a) => sum + Number(a.xlmBalance), 0);
  const totalValueUsd = accounts.reduce((sum, a) => sum + Number(a.totalValueUsd), 0);

  await prisma.portfolio.update({
    where: { id: portfolioId },
    data: {
      totalValueXlm,
      totalValueUsd,
      lastSyncedAt: new Date(),
    },
  });
}
