import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';

// GET - List all watchlists
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

    // Check access
    const access = await checkIntelligenceAccess(user.organizationId, 'watchlist');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Fetch watchlists
    const watchlists = await prisma.watchlist.findMany({
      where: { organizationId: user.organizationId },
      include: {
        accounts: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      watchlists: watchlists.map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description,
        accountCount: w.accounts.length,
        createdAt: w.createdAt,
        updatedAt: w.updatedAt,
      })),
      limits: {
        used: access.used,
        limit: access.limit,
      },
    });
  } catch (error) {
    console.error('Watchlist list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watchlists' },
      { status: 500 }
    );
  }
}

// POST - Create a new watchlist
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

    // Check access
    const access = await checkIntelligenceAccess(user.organizationId, 'watchlist');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, description, accounts } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Watchlist name is required' },
        { status: 400 }
      );
    }

    // Check if adding accounts would exceed limit
    if (accounts && Array.isArray(accounts) && access.limit) {
      const currentTotal = access.used || 0;
      if (currentTotal + accounts.length > access.limit) {
        return NextResponse.json(
          { error: `Adding ${accounts.length} accounts would exceed your limit of ${access.limit}` },
          { status: 400 }
        );
      }
    }

    // Create watchlist
    const watchlist = await prisma.watchlist.create({
      data: {
        name,
        description,
        organizationId: user.organizationId,
        accounts: accounts
          ? {
              create: accounts.map((acc: { accountId: string; label?: string }) => ({
                accountId: acc.accountId,
                label: acc.label,
              })),
            }
          : undefined,
      },
      include: {
        accounts: true,
      },
    });

    return NextResponse.json({
      watchlist: {
        id: watchlist.id,
        name: watchlist.name,
        description: watchlist.description,
        accountCount: watchlist.accounts.length,
        createdAt: watchlist.createdAt,
      },
    });
  } catch (error) {
    console.error('Watchlist create error:', error);
    return NextResponse.json(
      { error: 'Failed to create watchlist' },
      { status: 500 }
    );
  }
}
