import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkComplianceAccess } from '@/lib/compliance/gates';
import { createAuditLog } from '@/lib/compliance/audit';

interface ReportSummary {
  totalViolations: number;
  violationsByType: Record<string, number>;
  violationsBySeverity: Record<string, number>;
  violationsByStatus: Record<string, number>;
  accountsWithViolations: number;
  newAccountsMonitored: number;
  riskScoreDistribution: {
    low: number;
    medium: number;
    high: number;
  };
}

interface ReportMetrics {
  period: {
    start: string;
    end: string;
  };
  transactionsScanned: number;
  accountsScanned: number;
  rulesEvaluated: number;
  avgProcessingTimeMs: number;
  sanctionsChecks: number;
  cyclesDetected: number;
}

interface GeneratedReportData {
  reportType: string;
  title: string;
  period: string;
  generatedAt: string;
  summary: ReportSummary;
  violations: unknown[];
  accounts: unknown[];
  metrics: ReportMetrics;
}

// GET - List compliance reports
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

    // Check feature access
    const access = await checkComplianceAccess(user.organizationId, 'reports');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const reportType = searchParams.get('type');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause
    const where: Record<string, unknown> = {
      organizationId: user.organizationId,
    };

    if (reportType) {
      where.reportType = reportType;
    }

    // Fetch reports
    const [reports, total] = await Promise.all([
      prisma.complianceReport.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          reportType: true,
          title: true,
          period: true,
          format: true,
          fileUrl: true,
          generatedBy: true,
          createdAt: true,
        },
      }),
      prisma.complianceReport.count({ where }),
    ]);

    return NextResponse.json({
      reports,
      pagination: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('List reports error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST - Generate a new compliance report
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

    // Check feature access
    const access = await checkComplianceAccess(user.organizationId, 'reports');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { reportType, startDate, endDate, format } = body;

    // Validate inputs
    if (!reportType || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'reportType, startDate, and endDate are required' },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check format access
    const reportFormat = format || 'json';
    if (reportFormat === 'pdf') {
      const pdfAccess = await checkComplianceAccess(user.organizationId, 'pdfReports');
      if (!pdfAccess.allowed) {
        return NextResponse.json(
          { error: 'PDF reports require Standard tier or higher' },
          { status: 403 }
        );
      }
    }

    // Generate report data
    const reportData = await generateReportData(
      user.organizationId,
      reportType,
      start,
      end
    );

    // Create report record
    const report = await prisma.complianceReport.create({
      data: {
        organizationId: user.organizationId,
        reportType,
        title: `${reportType} Report - ${formatPeriod(start, end)}`,
        period: `${start.toISOString().split('T')[0]} to ${end.toISOString().split('T')[0]}`,
        summary: JSON.parse(JSON.stringify(reportData.summary)),
        violations: JSON.parse(JSON.stringify(reportData.violations)),
        accounts: JSON.parse(JSON.stringify(reportData.accounts)),
        metrics: JSON.parse(JSON.stringify(reportData.metrics)),
        generatedBy: user.email,
        format: reportFormat,
      },
    });

    // Audit log
    await createAuditLog({
      organizationId: user.organizationId,
      action: 'CREATE',
      entityType: 'compliance_report',
      entityId: report.id,
      actorType: 'USER',
      actorId: user.id,
      actorEmail: user.email,
      newState: {
        reportType,
        period: report.period,
        format: reportFormat,
      },
    });

    return NextResponse.json({
      id: report.id,
      reportType: report.reportType,
      title: report.title,
      period: report.period,
      format: report.format,
      summary: report.summary,
      metrics: report.metrics,
      createdAt: report.createdAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Generate report error:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

async function generateReportData(
  organizationId: string,
  reportType: string,
  startDate: Date,
  endDate: Date
): Promise<GeneratedReportData> {
  // Get violations in period
  const violations = await prisma.complianceViolation.findMany({
    where: {
      organizationId,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      rule: {
        select: {
          name: true,
          ruleType: true,
        },
      },
    },
  });

  // Get monitored accounts
  const accounts = await prisma.monitoredAccount.findMany({
    where: { organizationId },
  });

  // Calculate summary
  const summary: ReportSummary = {
    totalViolations: violations.length,
    violationsByType: {} as Record<string, number>,
    violationsBySeverity: { INFO: 0, WARNING: 0, CRITICAL: 0 },
    violationsByStatus: { PENDING: 0, UNDER_REVIEW: 0, CLEARED: 0, CONFIRMED: 0, ESCALATED: 0, REPORTED: 0 },
    accountsWithViolations: new Set(violations.map((v) => v.accountId)).size,
    newAccountsMonitored: accounts.filter(
      (a) => a.addedAt >= startDate && a.addedAt <= endDate
    ).length,
    riskScoreDistribution: {
      low: accounts.filter((a) => a.riskScore <= 30).length,
      medium: accounts.filter((a) => a.riskScore > 30 && a.riskScore <= 60).length,
      high: accounts.filter((a) => a.riskScore > 60).length,
    },
  };

  for (const v of violations) {
    const ruleType = v.rule.ruleType;
    summary.violationsByType[ruleType] = (summary.violationsByType[ruleType] || 0) + 1;
    summary.violationsBySeverity[v.severity]++;
    summary.violationsByStatus[v.status]++;
  }

  // Calculate metrics
  const rulesEvaluated = await prisma.complianceRule.count({
    where: { organizationId, enabled: true },
  });

  const metrics: ReportMetrics = {
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
    transactionsScanned: 0, // Would need to track this
    accountsScanned: accounts.length,
    rulesEvaluated,
    avgProcessingTimeMs: 0,
    sanctionsChecks: violations.filter((v) => v.rule.ruleType === 'SANCTIONS_SCREENING').length,
    cyclesDetected: violations.filter((v) => v.rule.ruleType === 'CIRCULAR_PAYMENT').length,
  };

  return {
    reportType,
    title: `${reportType} Compliance Report`,
    period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
    generatedAt: new Date().toISOString(),
    summary,
    violations: violations.map((v) => ({
      id: v.id,
      createdAt: v.createdAt.toISOString(),
      severity: v.severity,
      status: v.status,
      ruleType: v.rule.ruleType,
      accountId: v.accountId,
      transactionHash: v.transactionHash ?? undefined,
      matchDetails: v.matchDetails as Record<string, unknown>,
      resolution: v.resolution ?? undefined,
    })),
    accounts: accounts.map((a) => ({
      accountId: a.accountId,
      label: a.label ?? undefined,
      riskScore: a.riskScore,
      violationCount: violations.filter((v) => v.accountId === a.accountId).length,
      totalVolume30d: a.totalVolume30d.toString(),
      monitoringLevel: a.monitoringLevel,
    })),
    metrics,
  };
}

function formatPeriod(start: Date, end: Date): string {
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} - ${endStr}`;
}
