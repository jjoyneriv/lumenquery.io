import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';

// GET - List alerts (inbox)
export async function GET(req: Request) {
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

    // Check access
    const access = await checkIntelligenceAccess(user.organizationId, 'alerts');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'all'; // unread, all
    const severity = searchParams.get('severity'); // INFO, WARNING, CRITICAL
    const type = searchParams.get('type'); // AlertType
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (status === 'unread') {
      where.readAt = null;
    }

    if (severity) {
      where.severity = severity;
    }

    if (type) {
      where.config = {
        alertType: type,
      };
    }

    // Fetch alerts
    const [alerts, total, unreadCount] = await Promise.all([
      prisma.alert.findMany({
        where,
        include: {
          config: {
            select: {
              name: true,
              alertType: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.alert.count({ where }),
      prisma.alert.count({
        where: {
          organizationId: user.organizationId,
          readAt: null,
        },
      }),
    ]);

    return NextResponse.json({
      alerts: alerts.map((a) => ({
        id: a.id,
        severity: a.severity,
        title: a.title,
        message: a.message,
        data: a.data,
        sourceType: a.sourceType,
        sourceId: a.sourceId,
        configName: a.config.name,
        alertType: a.config.alertType,
        createdAt: a.createdAt,
        readAt: a.readAt,
        isRead: !!a.readAt,
      })),
      pagination: {
        total,
        limit,
        offset,
      },
      unreadCount,
    });
  } catch (error) {
    console.error('Alerts list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}
