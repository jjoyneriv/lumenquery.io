import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkComplianceAccess } from '@/lib/compliance/gates';

interface RouteContext {
  params: Promise<{ reportId: string }>;
}

// GET - Export report as CSV or JSON
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
    const access = await checkComplianceAccess(user.organizationId, 'csvExport');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    const { reportId } = await context.params;
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'json';

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

    if (format === 'csv') {
      const violations = report.violations as { id: string; createdAt: string; severity: string; status: string; ruleType: string; accountId: string; transactionHash?: string }[];

      // Generate CSV
      const headers = ['id', 'createdAt', 'severity', 'status', 'ruleType', 'accountId', 'transactionHash'];
      const rows = violations.map((v) => [
        v.id,
        v.createdAt,
        v.severity,
        v.status,
        v.ruleType,
        v.accountId,
        v.transactionHash || '',
      ]);

      const csv = [
        headers.join(','),
        ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')),
      ].join('\n');

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="compliance-report-${report.id}.csv"`,
        },
      });
    }

    // JSON format
    return NextResponse.json({
      id: report.id,
      reportType: report.reportType,
      title: report.title,
      period: report.period,
      generatedAt: report.createdAt,
      summary: report.summary,
      violations: report.violations,
      accounts: report.accounts,
      metrics: report.metrics,
    });
  } catch (error) {
    console.error('Export report error:', error);
    return NextResponse.json(
      { error: 'Failed to export report' },
      { status: 500 }
    );
  }
}
