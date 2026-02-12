import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}

interface SendResult {
  success: boolean;
  statusCode?: number;
  error?: string;
}

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'lumenquery-compliance';

/**
 * Generate HMAC signature for webhook payload
 */
export function generateSignature(
  payload: string,
  secret: string = WEBHOOK_SECRET
): string {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  return `sha256=${hmac.digest('hex')}`;
}

/**
 * Verify incoming webhook signature
 */
export function verifySignature(
  payload: string,
  signature: string,
  secret: string = WEBHOOK_SECRET
): boolean {
  const expected = generateSignature(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

/**
 * Send webhook to external URL with HMAC signing
 */
export async function sendWebhook(
  url: string,
  payload: WebhookPayload,
  secret?: string
): Promise<SendResult> {
  const body = JSON.stringify(payload);
  const signature = generateSignature(body, secret ?? WEBHOOK_SECRET);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-LumenQuery-Signature': signature,
        'X-LumenQuery-Event': payload.event,
        'X-LumenQuery-Timestamp': payload.timestamp,
      },
      body,
    });

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        error: `HTTP ${response.status}`,
      };
    }

    return { success: true, statusCode: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

/**
 * Send violation webhook to organization's configured endpoint
 */
export async function sendViolationWebhook(
  organizationId: string,
  violation: {
    id: string;
    severity: string;
    ruleType: string;
    accountId: string;
    score: number;
    matchDetails: unknown;
    createdAt: Date;
  }
): Promise<SendResult> {
  // Get organization's webhook URL from alert config
  const alertConfig = await prisma.alertConfiguration.findFirst({
    where: {
      organizationId,
      notifyWebhook: true,
      webhookUrl: { not: null },
    },
    select: { webhookUrl: true },
  });

  if (!alertConfig?.webhookUrl) {
    return { success: false, error: 'No webhook configured' };
  }

  const payload: WebhookPayload = {
    event: 'compliance.violation.created',
    timestamp: new Date().toISOString(),
    data: {
      violationId: violation.id,
      severity: violation.severity,
      ruleType: violation.ruleType,
      accountId: violation.accountId,
      riskScore: violation.score,
      matchDetails: violation.matchDetails,
      createdAt: violation.createdAt.toISOString(),
      dashboardUrl: `https://lumenquery.io/compliance/violations/${violation.id}`,
    },
  };

  return sendWebhook(alertConfig.webhookUrl, payload);
}

/**
 * Supported webhook events
 */
export const WEBHOOK_EVENTS = {
  VIOLATION_CREATED: 'compliance.violation.created',
  VIOLATION_UPDATED: 'compliance.violation.updated',
  VIOLATION_RESOLVED: 'compliance.violation.resolved',
  SANCTIONS_MATCH: 'compliance.sanctions.match',
  CYCLE_DETECTED: 'compliance.cycle.detected',
  REPORT_READY: 'compliance.report.ready',
  RISK_SCORE_CHANGED: 'compliance.risk.changed',
} as const;
