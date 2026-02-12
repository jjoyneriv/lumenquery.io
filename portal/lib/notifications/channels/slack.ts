import { prisma } from '@/lib/prisma';

interface SlackMessage {
  text: string;
  blocks?: SlackBlock[];
  attachments?: SlackAttachment[];
}

interface SlackBlock {
  type: string;
  text?: {
    type: string;
    text: string;
    emoji?: boolean;
  };
  accessory?: unknown;
  elements?: unknown[];
}

interface SlackAttachment {
  color?: string;
  title?: string;
  text?: string;
  fields?: Array<{
    title: string;
    value: string;
    short?: boolean;
  }>;
  footer?: string;
  ts?: number;
}

interface SendResult {
  success: boolean;
  error?: string;
}

export async function sendSlackMessage(
  webhookUrl: string,
  message: SlackMessage
): Promise<SendResult> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function sendComplianceSlackAlert(
  organizationId: string,
  alert: {
    severity: 'INFO' | 'WARNING' | 'CRITICAL';
    title: string;
    message: string;
    fields?: Array<{ title: string; value: string }>;
    url?: string;
  }
): Promise<SendResult> {
  // Get organization's Slack webhook
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { notifySlack: true, slackWebhookUrl: true },
  });

  if (!org?.notifySlack || !org.slackWebhookUrl) {
    return { success: false, error: 'Slack not configured' };
  }

  const severityColors: Record<string, string> = {
    INFO: '#36a64f',
    WARNING: '#f2c744',
    CRITICAL: '#d63447',
  };

  const severityEmojis: Record<string, string> = {
    INFO: ':information_source:',
    WARNING: ':warning:',
    CRITICAL: ':rotating_light:',
  };

  const slackMessage: SlackMessage = {
    text: `${severityEmojis[alert.severity]} ${alert.title}`,
    attachments: [
      {
        color: severityColors[alert.severity],
        title: alert.title,
        text: alert.message,
        fields: alert.fields?.map((f) => ({
          title: f.title,
          value: f.value,
          short: true,
        })),
        footer: 'LumenQuery Compliance',
        ts: Math.floor(Date.now() / 1000),
      },
    ],
  };

  if (alert.url) {
    slackMessage.blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${severityEmojis[alert.severity]} *${alert.title}*\n${alert.message}`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View in Dashboard',
              emoji: true,
            },
            url: alert.url,
          },
        ],
      },
    ];
  }

  return sendSlackMessage(org.slackWebhookUrl, slackMessage);
}

export function formatSlackViolationAlert(violation: {
  id: string;
  severity: string;
  ruleType: string;
  accountId: string;
  score: number;
}): SlackMessage {
  return {
    text: `Compliance Violation Detected: ${violation.ruleType}`,
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `Compliance Violation: ${violation.ruleType}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Severity:* ${violation.severity}\n*Account:* \`${violation.accountId}\`\n*Risk Score:* ${violation.score}`,
        },
      },
    ],
  };
}
