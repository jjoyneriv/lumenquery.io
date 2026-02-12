import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkComplianceAccess } from '@/lib/compliance/gates';
import { createAuditLog } from '@/lib/compliance/audit';

interface RouteContext {
  params: Promise<{ reportId: string }>;
}

// GET - Get report details
export async function GET(req: Request, context: RouteContext) {
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
      select: { organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    // Check feature access
    const access = await checkComplianceAccess(user.organizationId, 'reports');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    const { reportId } = await context.params;

    const report = await prisma.complianceReport.findFirst({
      where: {
        id: reportId,
        organizationId: user.organizationId,
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: report.id,
      reportType: report.reportType,
      title: report.title,
      period: report.period,
      format: report.format,
      fileUrl: report.fileUrl,
      generatedBy: report.generatedBy,
      summary: report.summary,
      violations: report.violations,
      accounts: report.accounts,
      metrics: report.metrics,
      createdAt: report.createdAt,
    });
  } catch (error) {
    console.error('Get report error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

// DELETE - Delete report
export async function DELETE(req: Request, context: RouteContext) {
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
      select: { id: true, email: true, organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    const { reportId } = await context.params;

    const existing = await prisma.complianceReport.findFirst({
      where: {
        id: reportId,
        organizationId: user.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    await prisma.complianceReport.delete({
      where: { id: reportId },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'DELETE',
      entityType: 'compliance_report',
      entityId: reportId,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      previousState: {
        reportType: existing.reportType,
        title: existing.title,
        period: existing.period,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete report error:', error);
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}
