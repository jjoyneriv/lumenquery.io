import { prisma } from '@/lib/prisma';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email sending via Resend (or other provider)
// Set RESEND_API_KEY in environment
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'compliance@lumenquery.io';

export async function sendEmail(payload: EmailPayload): Promise<SendResult> {
  const { to, subject, html, text } = payload;

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject,
        html,
        text: text ?? htmlToText(html),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    const result = await response.json();
    return { success: true, messageId: result.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

export async function sendComplianceEmail(
  organizationId: string,
  subject: string,
  html: string
): Promise<SendResult> {
  // Get organization's compliance email
  const org = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { complianceEmail: true },
  });

  if (!org?.complianceEmail) {
    return { success: false, error: 'No compliance email configured' };
  }

  return sendEmail({
    to: org.complianceEmail,
    subject: `[LumenQuery Compliance] ${subject}`,
    html,
  });
}

// Simple HTML to text conversion
function htmlToText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
