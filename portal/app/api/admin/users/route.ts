import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse, formatUserForResponse } from '@/lib/admin';

// GET /api/admin/users - List all users with pagination and filtering
export async function GET(request: NextRequest) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
  const search = searchParams.get('search') || '';
  const role = searchParams.get('role');
  const tier = searchParams.get('tier');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';
  const activeOnly = searchParams.get('activeOnly') === 'true';

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (role) {
    where.role = role;
  }

  if (tier) {
    where.organization = {
      tier: tier,
    };
  }

  // Active users = logged in within last 30 minutes
  if (activeOnly) {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    where.lastActiveAt = {
      gte: thirtyMinutesAgo,
    };
  }

  // Build orderBy
  let orderBy: any = {};
  if (sortBy === 'lastLoginAt' || sortBy === 'lastActiveAt' || sortBy === 'createdAt') {
    orderBy[sortBy] = sortOrder;
  } else if (sortBy === 'email' || sortBy === 'name') {
    orderBy[sortBy] = sortOrder;
  } else {
    orderBy.createdAt = 'desc';
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            tier: true,
            intelligenceTier: true,
            portfolioTier: true,
          },
        },
        _count: {
          select: {
            apiKeys: true,
            sessions: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  // Calculate active user count
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const activeCount = await prisma.user.count({
    where: {
      lastActiveAt: {
        gte: thirtyMinutesAgo,
      },
    },
  });

  const formattedUsers = users.map(user => ({
    ...formatUserForResponse(user),
    apiKeyCount: user._count.apiKeys,
    sessionCount: user._count.sessions,
  }));

  return NextResponse.json({
    users: formattedUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    stats: {
      totalUsers: total,
      activeUsers: activeCount,
    },
  });
}
