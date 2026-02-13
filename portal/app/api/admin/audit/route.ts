import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse } from '@/lib/admin';

// GET /api/admin/audit - Get admin audit log
export async function GET(request: NextRequest) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const adminId = searchParams.get('adminId');
  const targetUserId = searchParams.get('targetUserId');
  const action = searchParams.get('action');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (adminId) {
    where.adminId = adminId;
  }

  if (targetUserId) {
    where.targetUserId = targetUserId;
  }

  if (action) {
    where.action = action;
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }
    if (endDate) {
      where.createdAt.lte = new Date(endDate);
    }
  }

  const [logs, total] = await Promise.all([
    prisma.adminAuditLog.findMany({
      where,
      include: {
        admin: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        targetUser: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.adminAuditLog.count({ where }),
  ]);

  // Get action summary for filtering
  const actionSummary = await prisma.adminAuditLog.groupBy({
    by: ['action'],
    _count: true,
    orderBy: { _count: { action: 'desc' } },
  });

  return NextResponse.json({
    logs: logs.map(log => ({
      id: log.id,
      action: log.action,
      admin: log.admin,
      targetUser: log.targetUser,
      details: log.details,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      createdAt: log.createdAt,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    actionTypes: actionSummary.map(a => ({
      action: a.action,
      count: a._count,
    })),
  });
}
