// ===========================================
// Portfolio Sync API - Refresh from Horizon
// ===========================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { checkFeatureAccess } from '@/lib/portfolio/gates';
import {
  getAccount,
  getXlmPrice,
  getAssetPriceInXlm,
} from '@/lib/portfolio/horizon-client';
import { balanceToPosition } from '@/lib/portfolio/calculator';

// POST /api/portfolio/[portfolioId]/sync - Sync portfolio from Horizon
export async function POST(
  request: NextRequest,
  { params }: { params: { portfolioId: string } }
) {
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

    // Get XLM price
    const xlmPriceUsd = await getXlmPrice();

    let totalValueXlm = 0;
    let totalValueUsd = 0;
    const syncResults: any[] = [];

    // Sync each account
    for (const portfolioAccount of portfolio.accounts) {
      try {
        const horizonAccount = await getAccount(portfolioAccount.accountId);

        if (!horizonAccount) {
          syncResults.push({
            accountId: portfolioAccount.accountId,
            status: 'not_found',
            error: 'Account not found on Stellar network',
          });
          continue;
        }

        // Calculate balances
        let accountXlmBalance = 0;
        let accountTotalValueUsd = 0;
        const newPositions: any[] = [];

        for (const balance of horizonAccount.balances) {
          const amount = parseFloat(balance.balance);
          if (amount <= 0) continue;

          let priceInXlm = 1;
          if (balance.asset_type !== 'native' && balance.asset_code && balance.asset_issuer) {
            priceInXlm = await getAssetPriceInXlm(balance.asset_code, balance.asset_issuer);
          }

          const currentPrice = balance.asset_type === 'native' ? xlmPriceUsd : priceInXlm * xlmPriceUsd;
          const currentValueUsd = amount * currentPrice;

          if (balance.asset_type === 'native') {
            accountXlmBalance = amount;
          }
          accountTotalValueUsd += currentValueUsd;

          const position = balanceToPosition(balance, priceInXlm, xlmPriceUsd, params.portfolioId, portfolioAccount.id);

          newPositions.push({
            assetCode: position.assetCode!,
            assetIssuer: position.assetIssuer || null,
            assetType: position.assetType!,
            balance: amount,
            limit: position.limit || null,
            currentPrice,
            currentValueUsd,
            riskLevel: position.riskLevel!,
          });
        }

        // Update account
        await prisma.portfolioAccount.update({
          where: { id: portfolioAccount.id },
          data: {
            sequence: BigInt(horizonAccount.sequence),
            numSubentries: horizonAccount.subentry_count,
            xlmBalance: accountXlmBalance,
            totalValueUsd: accountTotalValueUsd,
            lastActivity: horizonAccount.last_modified_time ? new Date(horizonAccount.last_modified_time) : null,
          },
        });

        // Delete old positions and create new ones
        await prisma.assetPosition.deleteMany({
          where: { accountId: portfolioAccount.id },
        });

        if (newPositions.length > 0) {
          await prisma.assetPosition.createMany({
            data: newPositions.map((p) => ({
              ...p,
              portfolioId: params.portfolioId,
              accountId: portfolioAccount.id,
            })),
          });
        }

        totalValueXlm += accountXlmBalance;
        totalValueUsd += accountTotalValueUsd;

        syncResults.push({
          accountId: portfolioAccount.accountId,
          status: 'synced',
          xlmBalance: accountXlmBalance,
          totalValueUsd: accountTotalValueUsd,
          positionCount: newPositions.length,
        });
      } catch (error) {
        console.error(`Failed to sync account ${portfolioAccount.accountId}:`, error);
        syncResults.push({
          accountId: portfolioAccount.accountId,
          status: 'error',
          error: 'Failed to fetch account data',
        });
      }
    }

    // Update portfolio totals
    await prisma.portfolio.update({
      where: { id: params.portfolioId },
      data: {
        totalValueXlm,
        totalValueUsd,
        lastSyncedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      syncedAt: new Date(),
      xlmPriceUsd,
      portfolio: {
        totalValueXlm,
        totalValueUsd,
      },
      accounts: syncResults,
    });
  } catch (error) {
    console.error('Failed to sync portfolio:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
