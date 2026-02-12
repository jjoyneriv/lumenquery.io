import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkAccountLimit } from '@/lib/compliance/gates';
import { createAuditLog } from '@/lib/compliance/audit';

// GET - List monitored accounts
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    if (!user.organization?.complianceEnabled) {
      return NextResponse.json(
        { error: 'Compliance features not enabled' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const monitoringLevel = searchParams.get('level');
    const minRiskScore = parseInt(searchParams.get('minRisk') || '0');
    const sortBy = searchParams.get('sortBy') || 'addedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (search) {
      where.OR = [
        { accountId: { contains: search, mode: 'insensitive' } },
        { label: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (monitoringLevel) {
      where.monitoringLevel = monitoringLevel;
    }

    if (minRiskScore > 0) {
      where.riskScore = { gte: minRiskScore };
    }

    // Fetch accounts
    const [accounts, total] = await Promise.all([
      prisma.monitoredAccount.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: offset,
        take: limit,
      }),
      prisma.monitoredAccount.count({ where }),
    ]);

    // Get account limits
    const limitCheck = await checkAccountLimit(user.organizationId);

    return NextResponse.json({
      accounts: accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        label: a.label,
        monitoringLevel: a.monitoringLevel,
        riskScore: a.riskScore,
        riskFactors: a.riskFactors,
        lastAssessed: a.lastAssessed,
        lastActivity: a.lastActivity,
        totalVolume30d: a.totalVolume30d.toString(),
        txCount30d: a.txCount30d,
        addedAt: a.addedAt,
      })),
      pagination: {
        total,
        limit,
        offset,
      },
      limits: {
        current: limitCheck.currentCount,
        max: limitCheck.limit,
      },
    });
  } catch (error) {
    console.error('List accounts error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

// POST - Add a new monitored account
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    // Check account limit
    const limitCheck = await checkAccountLimit(user.organizationId);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { error: limitCheck.reason, upgradeUrl: limitCheck.upgradeUrl },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { accountId, label, monitoringLevel } = body;

    // Validate Stellar account ID format
    if (!accountId || !/^G[A-Z0-9]{55}$/.test(accountId)) {
      return NextResponse.json(
        { error: 'Invalid Stellar account ID format' },
        { status: 400 }
      );
    }

    // Check if account already exists
    const existing = await prisma.monitoredAccount.findUnique({
      where: {
        organizationId_accountId: {
          organizationId: user.organizationId,
          accountId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Account is already being monitored' },
        { status: 409 }
      );
    }

    // Create monitored account
    const account = await prisma.monitoredAccount.create({
      data: {
        organizationId: user.organizationId,
        accountId,
        label: label || null,
        monitoringLevel: monitoringLevel || 'STANDARD',
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'CREATE',
      entityType: 'monitored_account',
      entityId: account.id,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      newState: {
        accountId,
        label,
        monitoringLevel: account.monitoringLevel,
      },
    });

    return NextResponse.json({
      id: account.id,
      accountId: account.accountId,
      label: account.label,
      monitoringLevel: account.monitoringLevel,
      riskScore: account.riskScore,
      addedAt: account.addedAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Add account error:', error);
    return NextResponse.json(
      { error: 'Failed to add account' },
      { status: 500 }
    );
  }
}
