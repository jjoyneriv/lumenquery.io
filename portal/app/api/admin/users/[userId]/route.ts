import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  requireAdmin,
  requireSuperAdmin,
  unauthorizedResponse,
  formatUserForResponse,
  logAdminAction,
  calculateSessionDuration,
} from '@/lib/admin';

// GET /api/admin/users/[userId] - Get user details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          slug: true,
          tier: true,
          monthlyRequestLimit: true,
          sorobanProEnabled: true,
          intelligenceEnabled: true,
          intelligenceTier: true,
          complianceEnabled: true,
          complianceTier: true,
          portfolioEnabled: true,
          portfolioTier: true,
        },
      },
      apiKeys: {
        select: {
          id: true,
          name: true,
          keyPrefix: true,
          lastUsedAt: true,
          createdAt: true,
          revokedAt: true,
          permissions: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      sessions: {
        select: {
          id: true,
          expires: true,
        },
        orderBy: { expires: 'desc' },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Get recent usage statistics
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const usageStats = user.organization
    ? await prisma.usageRecord.groupBy({
        by: ['endpoint'],
        where: {
          organizationId: user.organization.id,
          timestamp: { gte: thirtyDaysAgo },
        },
        _count: true,
        _avg: { responseTimeMs: true },
        orderBy: { _count: { endpoint: 'desc' } },
        take: 10,
      })
    : [];

  // Get daily usage for the last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const dailyUsage = user.organization
    ? await prisma.dailyUsage.findMany({
        where: {
          organizationId: user.organization.id,
          date: { gte: sevenDaysAgo },
        },
        orderBy: { date: 'asc' },
      })
    : [];

  return NextResponse.json({
    user: {
      ...formatUserForResponse(user),
      sessionDurationSeconds: calculateSessionDuration(user.currentSessionStart),
      apiKeys: user.apiKeys,
      activeSessions: user.sessions.filter(s => s.expires > new Date()).length,
    },
    usage: {
      topEndpoints: usageStats.map(stat => ({
        endpoint: stat.endpoint,
        count: stat._count,
        avgResponseTime: Math.round(stat._avg.responseTimeMs || 0),
      })),
      dailyUsage: dailyUsage.map(d => ({
        date: d.date,
        totalRequests: d.totalRequests,
        successfulRequests: d.successfulRequests,
        failedRequests: d.failedRequests,
      })),
    },
  });
}

// PUT /api/admin/users/[userId] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const body = await request.json();
  const { name, role } = body;

  // Check if updating role - requires super admin
  if (role !== undefined) {
    const superAdminSession = await requireSuperAdmin();
    if (!superAdminSession) {
      return NextResponse.json(
        { error: 'Super admin access required to change user roles' },
        { status: 403 }
      );
    }

    // Prevent removing the last super admin
    if (role !== 'SUPER_ADMIN') {
      const targetUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (targetUser?.role === 'SUPER_ADMIN') {
        const superAdminCount = await prisma.user.count({
          where: { role: 'SUPER_ADMIN' },
        });

        if (superAdminCount <= 1) {
          return NextResponse.json(
            { error: 'Cannot remove the last super admin' },
            { status: 400 }
          );
        }
      }
    }

    // Validate role value
    if (!['USER', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be USER, ADMIN, or SUPER_ADMIN' },
        { status: 400 }
      );
    }
  }

  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Build update data
  const updateData: any = {};
  if (name !== undefined) updateData.name = name;
  if (role !== undefined) updateData.role = role;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          tier: true,
          intelligenceTier: true,
          complianceTier: true,
          portfolioTier: true,
        },
      },
    },
  });

  // Log the admin action
  await logAdminAction(
    adminSession.user.id,
    'USER_UPDATED',
    userId,
    {
      changes: updateData,
      previousValues: {
        name: user.name,
        role: user.role,
      },
    },
    request
  );

  return NextResponse.json({
    user: formatUserForResponse(updatedUser),
    message: 'User updated successfully',
  });
}
