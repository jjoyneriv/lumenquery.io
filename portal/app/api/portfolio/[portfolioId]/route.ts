// ===========================================
// Portfolio API - Individual Portfolio Operations
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkFeatureAccess } from '@/lib/portfolio/gates';

// GET /api/portfolio/[portfolioId] - Get portfolio details
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

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        organizationId: org.id,
      },
      include: {
        accounts: {
          include: {
            positions: true,
            contractPositions: true,
          },
        },
        positions: true,
        yieldSources: true,
        _count: {
          select: {
            trades: true,
            snapshots: true,
          },
        },
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Calculate aggregated metrics
    const totalPositionValue = portfolio.positions.reduce(
      (sum, p) => sum + Number(p.currentValueUsd),
      0
    );

    const topPositions = [...portfolio.positions]
      .sort((a, b) => Number(b.currentValueUsd) - Number(a.currentValueUsd))
      .slice(0, 5)
      .map((p) => ({
        assetCode: p.assetCode,
        assetIssuer: p.assetIssuer,
        balance: Number(p.balance),
        valueUsd: Number(p.currentValueUsd),
        pnlPercent: p.pnlPercent,
      }));

    const assetAllocation: Record<string, number> = {};
    for (const pos of portfolio.positions) {
      const value = Number(pos.currentValueUsd);
      if (totalPositionValue > 0) {
        assetAllocation[pos.assetCode] = (value / totalPositionValue) * 100;
      }
    }

    return NextResponse.json({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      currency: portfolio.currency,
      isDefault: portfolio.isDefault,
      totalValueUsd: Number(portfolio.totalValueUsd),
      totalValueXlm: Number(portfolio.totalValueXlm),
      totalPnlUsd: Number(portfolio.totalPnlUsd),
      totalPnlPercent: portfolio.totalPnlPercent,
      lastSyncedAt: portfolio.lastSyncedAt,
      accounts: portfolio.accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        label: a.label,
        xlmBalance: Number(a.xlmBalance),
        totalValueUsd: Number(a.totalValueUsd),
        positionCount: a.positions.length,
        contractPositionCount: a.contractPositions.length,
        addedAt: a.addedAt,
      })),
      stats: {
        accountCount: portfolio.accounts.length,
        positionCount: portfolio.positions.length,
        tradeCount: portfolio._count.trades,
        snapshotCount: portfolio._count.snapshots,
        yieldSourceCount: portfolio.yieldSources.length,
      },
      topPositions,
      assetAllocation,
      yieldSources: portfolio.yieldSources.map((y) => ({
        id: y.id,
        name: y.name,
        sourceType: y.sourceType,
        assetCode: y.assetCode,
        currentApy: y.currentApy,
        isActive: y.isActive,
      })),
    });
  } catch (error) {
    console.error('Failed to get portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/portfolio/[portfolioId] - Update portfolio
export async function PUT(
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

    // Verify ownership
    const existing = await prisma.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        organizationId: org.id,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, description, currency, isDefault } = body;

    const updateData: any = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return NextResponse.json(
          { error: 'Name must be 1-100 characters' },
          { status: 400 }
        );
      }
      updateData.name = name;
    }
    if (description !== undefined) updateData.description = description;
    if (currency !== undefined) updateData.currency = currency;

    // If setting as default, unset other defaults
    if (isDefault === true) {
      await prisma.portfolio.updateMany({
        where: {
          organizationId: org.id,
          id: { not: params.portfolioId },
        },
        data: { isDefault: false },
      });
      updateData.isDefault = true;
    }

    const portfolio = await prisma.portfolio.update({
      where: { id: params.portfolioId },
      data: updateData,
    });

    return NextResponse.json({
      id: portfolio.id,
      name: portfolio.name,
      description: portfolio.description,
      currency: portfolio.currency,
      isDefault: portfolio.isDefault,
      updatedAt: portfolio.updatedAt,
    });
  } catch (error) {
    console.error('Failed to update portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/portfolio/[portfolioId] - Delete portfolio
export async function DELETE(
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

    // Verify ownership
    const existing = await prisma.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        organizationId: org.id,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
    }

    // Delete portfolio (cascades to accounts, positions, etc.)
    await prisma.portfolio.delete({
      where: { id: params.portfolioId },
    });

    // If deleted was default, make another one default
    if (existing.isDefault) {
      const firstPortfolio = await prisma.portfolio.findFirst({
        where: { organizationId: org.id },
        orderBy: { createdAt: 'asc' },
      });

      if (firstPortfolio) {
        await prisma.portfolio.update({
          where: { id: firstPortfolio.id },
          data: { isDefault: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
