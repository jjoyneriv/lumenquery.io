// ===========================================
// Portfolio API - List & Create
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { canAccessPortfolio, canCreatePortfolio, checkFeatureAccess } from '@/lib/portfolio/gates';

// GET /api/portfolio - List user's portfolios
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
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

    const portfolios = await prisma.portfolio.findMany({
      where: { organizationId: org.id },
      include: {
        accounts: {
          select: {
            id: true,
            accountId: true,
            label: true,
            xlmBalance: true,
            totalValueUsd: true,
          },
        },
        _count: {
          select: {
            accounts: true,
            positions: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedPortfolios = portfolios.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      currency: p.currency,
      isDefault: p.isDefault,
      totalValueUsd: Number(p.totalValueUsd),
      totalValueXlm: Number(p.totalValueXlm),
      totalPnlUsd: Number(p.totalPnlUsd),
      totalPnlPercent: p.totalPnlPercent,
      accountCount: p._count.accounts,
      positionCount: p._count.positions,
      lastSyncedAt: p.lastSyncedAt,
      accounts: p.accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        label: a.label,
        xlmBalance: Number(a.xlmBalance),
        totalValueUsd: Number(a.totalValueUsd),
      })),
    }));

    return NextResponse.json({
      portfolios: formattedPortfolios,
      tier: org.portfolioTier,
      limits: {
        maxPortfolios: org.maxPortfolios,
        maxAccounts: org.maxPortfolioAccounts,
        currentPortfolios: portfolios.length,
      },
    });
  } catch (error) {
    console.error('Failed to list portfolios:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/portfolio - Create new portfolio
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
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

    // Check portfolio limit
    const currentCount = await prisma.portfolio.count({
      where: { organizationId: org.id },
    });

    if (!canCreatePortfolio(org as any, currentCount)) {
      return NextResponse.json(
        { error: `Portfolio limit reached. Your plan allows ${org.maxPortfolios} portfolios.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, description, currency = 'USD' } = body;

    if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name is required and must be 1-100 characters' },
        { status: 400 }
      );
    }

    // Create portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        name,
        description,
        currency,
        isDefault: currentCount === 0, // First portfolio is default
        organizationId: org.id,
      },
    });

    return NextResponse.json({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      currency: portfolio.currency,
      isDefault: portfolio.isDefault,
      totalValueUsd: 0,
      totalValueXlm: 0,
      totalPnlUsd: 0,
      totalPnlPercent: 0,
      accountCount: 0,
      createdAt: portfolio.createdAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
