import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/notifications/channels/email';

// Rate limiting: max 3 requests per email per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(email);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 3) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit check
    if (!checkRateLimit(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if user exists (but don't reveal this to the client)
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link.',
      });
    }

    // Delete any existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail },
    });

    // Generate secure token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    // Save token to database
    await prisma.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        token,
        expires,
      },
    });

    // Generate reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'https://lumenquery.io';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

    // Send email
    await sendEmail({
      to: normalizedEmail,
      subject: 'Reset Your LumenQuery Password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-block; width: 48px; height: 48px; background-color: #2855FF; border-radius: 12px; line-height: 48px;">
              <span style="color: white; font-weight: bold; font-size: 20px;">LQ</span>
            </div>
          </div>

          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 20px; text-align: center;">Reset Your Password</h1>

          <p style="margin-bottom: 20px;">Hi${user.name ? ` ${user.name}` : ''},</p>

          <p style="margin-bottom: 20px;">We received a request to reset the password for your LumenQuery account. Click the button below to create a new password:</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #2855FF; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">Reset Password</a>
          </div>

          <p style="margin-bottom: 20px; color: #666; font-size: 14px;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>

          <p style="margin-bottom: 20px; color: #666; font-size: 14px;">If the button doesn't work, copy and paste this URL into your browser:</p>
          <p style="margin-bottom: 20px; word-break: break-all; color: #2855FF; font-size: 14px;">${resetUrl}</p>

          <hr style="border: none; border-top: 1px solid #E6E7E9; margin: 30px 0;">

          <p style="color: #999; font-size: 12px; text-align: center;">
            This email was sent by LumenQuery. If you have questions, contact support.
          </p>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      message: 'If an account exists with this email, you will receive a password reset link.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
