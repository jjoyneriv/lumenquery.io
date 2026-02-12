import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkIntelligenceAccess } from '@/lib/intelligence/gates';

// GET - List alert configurations
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
    const access = await checkIntelligenceAccess(user.organizationId, 'alerts');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Fetch configurations
    const configs = await prisma.alertConfiguration.findMany({
      where: { organizationId: user.organizationId },
      include: {
        _count: {
          select: { alerts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      configurations: configs.map((c) => ({
        id: c.id,
        name: c.name,
        description: c.description,
        enabled: c.enabled,
        alertType: c.alertType,
        conditions: c.conditions,
        notifyEmail: c.notifyEmail,
        notifyWebhook: c.notifyWebhook,
        webhookUrl: c.webhookUrl,
        cooldownMinutes: c.cooldownMinutes,
        lastTriggered: c.lastTriggered,
        alertCount: c._count.alerts,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
      limits: {
        used: access.used,
        limit: access.limit,
      },
    });
  } catch (error) {
    console.error('Alert configs list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch alert configurations' },
      { status: 500 }
    );
  }
}

// POST - Create alert configuration
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
    const access = await checkIntelligenceAccess(user.organizationId, 'alerts');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Check limit
    if (access.limit && access.used && access.used >= access.limit) {
      return NextResponse.json(
        { error: `Alert configuration limit reached (${access.used}/${access.limit})` },
        { status: 400 }
      );
    }

    const body = await req.json();
    const {
      name,
      description,
      alertType,
      conditions,
      notifyEmail,
      notifyWebhook,
      webhookUrl,
      cooldownMinutes,
    } = body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!alertType || !['WHALE_MOVEMENT', 'TRUSTLINE_CHANGE', 'ACCOUNT_ACTIVITY', 'CONTRACT_CALL', 'ANOMALY_DETECTED'].includes(alertType)) {
      return NextResponse.json(
        { error: 'Valid alert type is required' },
        { status: 400 }
      );
    }

    if (!conditions || typeof conditions !== 'object') {
      return NextResponse.json(
        { error: 'Conditions are required' },
        { status: 400 }
      );
    }

    // Check webhook access
    if (notifyWebhook) {
      const webhookAccess = await checkIntelligenceAccess(user.organizationId, 'webhooks');
      if (!webhookAccess.allowed) {
        return NextResponse.json(
          { error: webhookAccess.reason },
          { status: 403 }
        );
      }

      if (!webhookUrl) {
        return NextResponse.json(
          { error: 'Webhook URL is required when webhook notifications are enabled' },
          { status: 400 }
        );
      }
    }

    // Create configuration
    const config = await prisma.alertConfiguration.create({
      data: {
        name,
        description,
        alertType,
        conditions,
        notifyEmail: notifyEmail ?? true,
        notifyWebhook: notifyWebhook ?? false,
        webhookUrl,
        cooldownMinutes: cooldownMinutes ?? 5,
        organizationId: user.organizationId,
      },
    });

    return NextResponse.json({
      configuration: {
        id: config.id,
        name: config.name,
        description: config.description,
        enabled: config.enabled,
        alertType: config.alertType,
        conditions: config.conditions,
        notifyEmail: config.notifyEmail,
        notifyWebhook: config.notifyWebhook,
        cooldownMinutes: config.cooldownMinutes,
        createdAt: config.createdAt,
      },
    });
  } catch (error) {
    console.error('Alert config create error:', error);
    return NextResponse.json(
      { error: 'Failed to create alert configuration' },
      { status: 500 }
    );
  }
}
