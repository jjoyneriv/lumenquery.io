import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';

// GET - List accounts in watchlist
export async function GET(
  req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const session = await auth();
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

    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: params.watchlistId,
        organizationId: user.organizationId,
      },
      include: {
        accounts: {
          orderBy: { addedAt: 'desc' },
        },
      },
    });

    if (!watchlist) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      accounts: watchlist.accounts.map((a) => ({
        id: a.id,
        accountId: a.accountId,
        label: a.label,
        addedAt: a.addedAt,
      })),
    });
  } catch (error) {
    console.error('Watchlist accounts list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watchlist accounts' },
      { status: 500 }
    );
  }
}

// POST - Add account to watchlist
export async function POST(
  req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const session = await auth();
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

    // Check access and limits
    const access = await checkIntelligenceAccess(user.organizationId, 'watchlist');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Check if limit exceeded
    if (access.limit && access.used && access.used >= access.limit) {
      return NextResponse.json(
        { error: `Watchlist account limit reached (${access.used}/${access.limit})` },
        { status: 400 }
      );
    }

    // Check watchlist ownership
    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: params.watchlistId,
        organizationId: user.organizationId,
      },
    });

    if (!watchlist) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { accountId, label } = body;

    if (!accountId || typeof accountId !== 'string') {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    // Validate account ID format
    if (!accountId.startsWith('G') && !accountId.startsWith('C')) {
      return NextResponse.json(
        { error: 'Invalid account ID format' },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.watchlistAccount.findFirst({
      where: {
        watchlistId: params.watchlistId,
        accountId,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Account already in watchlist' },
        { status: 400 }
      );
    }

    const account = await prisma.watchlistAccount.create({
      data: {
        watchlistId: params.watchlistId,
        accountId,
        label,
      },
    });

    return NextResponse.json({
      account: {
        id: account.id,
        accountId: account.accountId,
        label: account.label,
        addedAt: account.addedAt,
      },
    });
  } catch (error) {
    console.error('Watchlist add account error:', error);
    return NextResponse.json(
      { error: 'Failed to add account to watchlist' },
      { status: 500 }
    );
  }
}

// DELETE - Remove account from watchlist
export async function DELETE(
  req: Request,
  { params }: { params: { watchlistId: string } }
) {
  try {
    const session = await auth();
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

    // Check watchlist ownership
    const watchlist = await prisma.watchlist.findFirst({
      where: {
        id: params.watchlistId,
        organizationId: user.organizationId,
      },
    });

    if (!watchlist) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get('accountId');

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    const deleted = await prisma.watchlistAccount.deleteMany({
      where: {
        watchlistId: params.watchlistId,
        accountId,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { error: 'Account not found in watchlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Watchlist remove account error:', error);
    return NextResponse.json(
      { error: 'Failed to remove account from watchlist' },
      { status: 500 }
    );
  }
}
