import type { AlertSeverity, ComplianceRuleType } from '@prisma/client';

interface ViolationData {
  id: string;
  severity: AlertSeverity;
  ruleType: ComplianceRuleType;
  accountId: string;
  score: number;
  matchDetails: Record<string, unknown>;
  createdAt: Date;
  dashboardUrl: string;
}

export function violationAlertEmail(data: ViolationData): {
  subject: string;
  html: string;
} {
  const severityColors: Record<AlertSeverity, string> = {
    INFO: '#3b82f6',
    WARNING: '#f59e0b',
    CRITICAL: '#ef4444',
  };

  const severityLabels: Record<AlertSeverity, string> = {
    INFO: 'Informational',
    WARNING: 'Warning',
    CRITICAL: 'Critical',
  };

  const ruleTypeLabels: Record<ComplianceRuleType, string> = {
    SANCTIONS_SCREENING: 'Sanctions Screening',
    VELOCITY_LIMIT: 'Velocity Limit Exceeded',
    VOLUME_LIMIT: 'Volume Limit Exceeded',
    CIRCULAR_PAYMENT: 'Circular Payment Detected',
    MIXER_DETECTION: 'Mixer Pattern Detected',
    UNUSUAL_PATTERN: 'Unusual Activity Pattern',
    COUNTERPARTY_RISK: 'High-Risk Counterparty',
    CONTRACT_ABUSE: 'Contract Abuse',
    STRUCTURING: 'Transaction Structuring',
    DORMANT_ACTIVATION: 'Dormant Account Activation',
  };

  const subject = `[${severityLabels[data.severity]}] Compliance Violation: ${ruleTypeLabels[data.ruleType]}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="background: ${severityColors[data.severity]}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 20px;">${severityLabels[data.severity]} Alert</h1>
    <p style="margin: 8px 0 0; opacity: 0.9;">${ruleTypeLabels[data.ruleType]}</p>
  </div>

  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
          <strong>Risk Score</strong>
        </td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
          <span style="background: ${data.score >= 70 ? '#fee2e2' : data.score >= 50 ? '#fef3c7' : '#dcfce7'}; padding: 4px 8px; border-radius: 4px; font-weight: 600;">
            ${data.score}/100
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
          <strong>Account</strong>
        </td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right; font-family: monospace; font-size: 12px;">
          ${data.accountId.slice(0, 8)}...${data.accountId.slice(-4)}
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">
          <strong>Detected At</strong>
        </td>
        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
          ${data.createdAt.toISOString()}
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0;">
          <strong>Violation ID</strong>
        </td>
        <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">
          ${data.id}
        </td>
      </tr>
    </table>

    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">Match Details</h3>
      <pre style="margin: 0; font-size: 12px; white-space: pre-wrap; word-break: break-word;">${JSON.stringify(data.matchDetails, null, 2)}</pre>
    </div>

    <a href="${data.dashboardUrl}" style="display: block; background: #2855ff; color: white; text-align: center; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">
      View in Dashboard
    </a>

  </div>

  <p style="margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center;">
    This is an automated alert from LumenQuery Compliance.<br>
    <a href="https://lumenquery.io/compliance/settings" style="color: #2855ff;">Manage notification settings</a>
  </p>

</body>
</html>
  `.trim();

  return { subject, html };
}
