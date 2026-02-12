import { prisma } from '@/lib/prisma';
import { sendEmail, sendComplianceEmail } from './channels/email';
import { sendComplianceSlackAlert } from './channels/slack';
import { sendViolationWebhook } from './channels/webhook';
import { violationAlertEmail } from './templates/violation-alert';
import type { AlertSeverity, ComplianceRuleType } from '@prisma/client';

type NotificationChannel = 'EMAIL' | 'SLACK' | 'WEBHOOK';

interface NotificationResult {
  channel: NotificationChannel;
  success: boolean;
  error?: string;
}

/**
 * Send violation notifications to all configured channels
 */
export async function sendViolationNotifications(
  organizationId: string,
  violation: {
    id: string;
    severity: AlertSeverity;
    ruleType: ComplianceRuleType;
    accountId: string;
    score: number;
    matchDetails: unknown;
    createdAt: Date;
  }
): Promise<NotificationResult[]> {
  const results: NotificationResult[] = [];
  const dashboardUrl = `https://lumenquery.io/compliance/violations/${violation.id}`;

  // Get organization notification settings
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: {
      complianceEmail: true,
      notifySlack: true,
      slackWebhookUrl: true,
    },
  });

  // Send email notification
  if (org?.complianceEmail) {
    const { subject, html } = violationAlertEmail({
      ...violation,
      matchDetails: violation.matchDetails as Record<string, unknown>,
      dashboardUrl,
    });

    const emailResult = await sendComplianceEmail(organizationId, subject, html);
    results.push({
      channel: 'EMAIL',
      success: emailResult.success,
      error: emailResult.error,
    });

    // Log delivery attempt
    await logDelivery(organizationId, 'EMAIL', org.complianceEmail, violation.id, emailResult);
  }

  // Send Slack notification
  if (org?.notifySlack && org.slackWebhookUrl) {
    const slackResult = await sendComplianceSlackAlert(organizationId, {
      severity: violation.severity,
      title: `Compliance Violation: ${formatRuleType(violation.ruleType)}`,
      message: `Risk score: ${violation.score}/100\nAccount: ${truncateAddress(violation.accountId)}`,
      fields: [
        { title: 'Severity', value: violation.severity },
        { title: 'Rule Type', value: formatRuleType(violation.ruleType) },
      ],
      url: dashboardUrl,
    });

    results.push({
      channel: 'SLACK',
      success: slackResult.success,
      error: slackResult.error,
    });

    await logDelivery(organizationId, 'SLACK', org.slackWebhookUrl, violation.id, slackResult);
  }

  // Send webhook notification
  const webhookResult = await sendViolationWebhook(organizationId, violation);
  if (webhookResult.success || webhookResult.error !== 'No webhook configured') {
    results.push({
      channel: 'WEBHOOK',
      success: webhookResult.success,
      error: webhookResult.error,
    });

    if (webhookResult.error !== 'No webhook configured') {
      await logDelivery(organizationId, 'WEBHOOK', 'configured', violation.id, webhookResult);
    }
  }

  return results;
}

/**
 * Send daily digest notification
 */
export async function sendDailyDigest(organizationId: string): Promise<void> {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Get summary data
  const [violations, accounts, cycles] = await Promise.all([
    prisma.complianceViolation.count({
      where: {
        organizationId,
        createdAt: { gte: yesterday },
      },
    }),
    prisma.monitoredAccount.count({
      where: {
        organizationId,
        riskScore: { gte: 70 },
      },
    }),
    prisma.paymentCycle.count({
      where: {
        organizationId,
        detectedAt: { gte: yesterday },
      },
    }),
  ]);

  if (violations === 0 && cycles === 0) {
    return; // No activity, skip digest
  }

  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { complianceEmail: true, notifySlack: true, slackWebhookUrl: true },
  });

  // Email digest
  if (org?.complianceEmail) {
    const html = generateDigestHtml({
      period: '24 hours',
      violations,
      highRiskAccounts: accounts,
      cyclesDetected: cycles,
    });

    await sendComplianceEmail(organizationId, 'Daily Compliance Summary', html);
  }

  // Slack digest
  if (org?.notifySlack && org.slackWebhookUrl) {
    await sendComplianceSlackAlert(organizationId, {
      severity: violations > 0 ? 'WARNING' : 'INFO',
      title: 'Daily Compliance Summary',
      message: `Past 24 hours:\n- ${violations} new violations\n- ${accounts} high-risk accounts\n- ${cycles} cycles detected`,
      url: 'https://lumenquery.io/compliance',
    });
  }
}

/**
 * Log notification delivery attempt
 */
async function logDelivery(
  organizationId: string,
  channel: NotificationChannel,
  recipient: string,
  violationId: string,
  result: { success: boolean; error?: string }
): Promise<void> {
  await prisma.notificationDelivery.create({
    data: {
      organizationId,
      channel,
      recipient,
      status: result.success ? 'SENT' : 'FAILED',
      sentAt: result.success ? new Date() : null,
      failureReason: result.error,
      violationId,
      body: JSON.stringify({ violationId, timestamp: new Date().toISOString() }),
    },
  });
}

function formatRuleType(ruleType: ComplianceRuleType): string {
  const labels: Record<ComplianceRuleType, string> = {
    SANCTIONS_SCREENING: 'Sanctions Match',
    VELOCITY_LIMIT: 'Velocity Limit',
    VOLUME_LIMIT: 'Volume Limit',
    CIRCULAR_PAYMENT: 'Circular Payment',
    MIXER_DETECTION: 'Mixer Pattern',
    UNUSUAL_PATTERN: 'Unusual Pattern',
    COUNTERPARTY_RISK: 'Counterparty Risk',
    CONTRACT_ABUSE: 'Contract Abuse',
    STRUCTURING: 'Structuring',
    DORMANT_ACTIVATION: 'Dormant Activation',
  };
  return labels[ruleType] ?? ruleType;
}

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 8)}...${address.slice(-4)}`;
}

function generateDigestHtml(data: {
  period: string;
  violations: number;
  highRiskAccounts: number;
  cyclesDetected: number;
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #2855ff;">Daily Compliance Summary</h1>
  <p>Here's your compliance summary for the past ${data.period}:</p>

  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>New Violations</strong></td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: right;">${data.violations}</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>High-Risk Accounts</strong></td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: right;">${data.highRiskAccounts}</td>
    </tr>
    <tr style="background: #f3f4f6;">
      <td style="padding: 12px; border: 1px solid #e5e7eb;"><strong>Cycles Detected</strong></td>
      <td style="padding: 12px; border: 1px solid #e5e7eb; text-align: right;">${data.cyclesDetected}</td>
    </tr>
  </table>

  <a href="https://lumenquery.io/compliance" style="display: inline-block; background: #2855ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Dashboard</a>

  <p style="margin-top: 30px; font-size: 12px; color: #6b7280;">
    LumenQuery Compliance - <a href="https://lumenquery.io/compliance/settings">Manage settings</a>
  </p>
</body>
</html>
  `;
}
