import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';

// GET - Get watchlist details
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
      watchlist: {
        id: watchlist.id,
        name: watchlist.name,
        description: watchlist.description,
        createdAt: watchlist.createdAt,
        updatedAt: watchlist.updatedAt,
        accounts: watchlist.accounts.map((a) => ({
          id: a.id,
          accountId: a.accountId,
          label: a.label,
          addedAt: a.addedAt,
        })),
      },
    });
  } catch (error) {
    console.error('Watchlist get error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
      { status: 500 }
    );
  }
}

// PUT - Update watchlist
export async function PUT(
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

    // Check ownership
    const existing = await prisma.watchlist.findFirst({
      where: {
        id: params.watchlistId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { name, description } = body;

    const watchlist = await prisma.watchlist.update({
      where: { id: params.watchlistId },
      data: {
        name: name || existing.name,
        description: description !== undefined ? description : existing.description,
      },
    });

    return NextResponse.json({
      watchlist: {
        id: watchlist.id,
        name: watchlist.name,
        description: watchlist.description,
        updatedAt: watchlist.updatedAt,
      },
    });
  } catch (error) {
    console.error('Watchlist update error:', error);
    return NextResponse.json(
      { error: 'Failed to update watchlist' },
      { status: 500 }
    );
  }
}

// DELETE - Delete watchlist
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

    // Check ownership
    const existing = await prisma.watchlist.findFirst({
      where: {
        id: params.watchlistId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Watchlist not found' },
        { status: 404 }
      );
    }

    await prisma.watchlist.delete({
      where: { id: params.watchlistId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Watchlist delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete watchlist' },
      { status: 500 }
    );
  }
}
