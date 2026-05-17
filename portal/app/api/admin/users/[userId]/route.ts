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
  const { name, role, tier } = body;

  // Check if updating tier - requires super admin
  if (tier !== undefined) {
    const superAdminSession = await requireSuperAdmin();
    if (!superAdminSession) {
      return NextResponse.json(
        { error: 'Super admin access required to change user tiers' },
        { status: 403 }
      );
    }

    const validTiers = ['FREE', 'DEVELOPER', 'TEAM', 'ENTERPRISE'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be FREE, DEVELOPER, TEAM, or ENTERPRISE' },
        { status: 400 }
      );
    }

    // Get user and ensure they have an organization
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cannot change tier of SUPER_ADMIN users
    if (targetUser.role === 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Cannot change tier of a super admin' },
        { status: 400 }
      );
    }

    // Create org if user doesn't have one
    let orgId = targetUser.organizationId;
    if (!orgId) {
      const org = await prisma.organization.create({
        data: {
          name: targetUser.name || targetUser.email.split('@')[0],
          slug: targetUser.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
          users: { connect: { id: userId } },
        },
      });
      orgId = org.id;
    }

    // Apply tier features
    const tierFeatures: Record<string, any> = {
      FREE: {
        tier: 'FREE',
        monthlyRequestLimit: 10000,
        sorobanProEnabled: false,
        contractsMonthlyLimit: 10,
        callHistoryDays: 7,
        exportEnabled: false,
        realtimeStreamEnabled: false,
        intelligenceEnabled: false,
        intelligenceTier: 'NONE',
        portfolioEnabled: false,
        portfolioTier: 'NONE',
      },
      DEVELOPER: {
        tier: 'DEVELOPER',
        monthlyRequestLimit: 100000,
        sorobanProEnabled: true,
        contractsMonthlyLimit: 50,
        callHistoryDays: 30,
        exportEnabled: true,
        realtimeStreamEnabled: false,
        intelligenceEnabled: false,
        intelligenceTier: 'NONE',
        portfolioEnabled: false,
        portfolioTier: 'NONE',
      },
      TEAM: {
        tier: 'TEAM',
        monthlyRequestLimit: 1000000,
        sorobanProEnabled: true,
        contractsMonthlyLimit: 999999,
        callHistoryDays: 90,
        exportEnabled: true,
        realtimeStreamEnabled: true,
        intelligenceEnabled: true,
        intelligenceTier: 'TEAMS',
        portfolioEnabled: true,
        portfolioTier: 'PRO',
      },
      ENTERPRISE: {
        tier: 'ENTERPRISE',
        monthlyRequestLimit: 999999999,
        sorobanProEnabled: true,
        contractsMonthlyLimit: 999999,
        callHistoryDays: 365,
        exportEnabled: true,
        realtimeStreamEnabled: true,
        intelligenceEnabled: true,
        intelligenceTier: 'ENTERPRISE',
        portfolioEnabled: true,
        portfolioTier: 'DAO',
      },
    };

    await prisma.organization.update({
      where: { id: orgId },
      data: tierFeatures[tier],
    });

    // Log the action
    await logAdminAction(
      superAdminSession.user.id,
      'TIER_CHANGED',
      userId,
      { newTier: tier, previousTier: targetUser.organization?.tier || 'NONE' },
      request
    );

    // Return updated user
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: { select: { id: true, name: true, slug: true, tier: true, monthlyRequestLimit: true, sorobanProEnabled: true, intelligenceEnabled: true, intelligenceTier: true, portfolioEnabled: true, portfolioTier: true } } },
    });

    return NextResponse.json({
      user: formatUserForResponse(updatedUser),
      message: `Tier updated to ${tier}`,
    });
  }

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

// DELETE /api/admin/users/[userId] - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const adminSession = await requireSuperAdmin();
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Super admin access required to delete users' },
      { status: 403 }
    );
  }

  const { userId } = await params;

  // Prevent self-deletion
  if (userId === adminSession.user.id) {
    return NextResponse.json(
      { error: 'You cannot delete your own account' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Prevent deleting the last super admin
  if (user.role === 'SUPER_ADMIN') {
    const superAdminCount = await prisma.user.count({
      where: { role: 'SUPER_ADMIN' },
    });
    if (superAdminCount <= 1) {
      return NextResponse.json(
        { error: 'Cannot delete the last super admin' },
        { status: 400 }
      );
    }
  }

  // Delete related records first (cascading deletes may not cover all)
  await prisma.session.deleteMany({ where: { userId } });
  await prisma.account.deleteMany({ where: { userId } });

  // Delete the user
  await prisma.user.delete({ where: { id: userId } });

  // Log the admin action
  await logAdminAction(
    adminSession.user.id,
    'USER_DELETED',
    userId,
    { deletedEmail: user.email, deletedRole: user.role },
    request
  );

  return NextResponse.json({ message: 'User deleted successfully' });
}
