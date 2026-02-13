import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse, logAdminAction } from '@/lib/admin';

// POST /api/admin/users/[userId]/password - Send password reset email
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const adminSession = await requireAdmin();
  if (!adminSession) {
    return unauthorizedResponse();
  }

  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Prevent admins from resetting super admin passwords (unless they are super admin)
  if (user.role === 'SUPER_ADMIN' && adminSession.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json(
      { error: 'Only super admins can reset super admin passwords' },
      { status: 403 }
    );
  }

  // Generate password reset token (same as forgot password flow)
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Invalidate any existing tokens for this email
  await prisma.passwordResetToken.updateMany({
    where: {
      email: user.email,
      used: false,
      expires: { gte: new Date() },
    },
    data: { used: true },
  });

  // Create new token
  await prisma.passwordResetToken.create({
    data: {
      email: user.email,
      token,
      expires,
    },
  });

  // Send password reset email
  const resetUrl = `${process.env.NEXTAUTH_URL || 'https://lumenquery.io'}/auth/reset-password?token=${token}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'LumenQuery <noreply@lumenquery.io>',
        to: [user.email],
        subject: 'Password Reset Request - LumenQuery',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2855FF; margin-bottom: 24px;">Password Reset</h1>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Hi${user.name ? ` ${user.name}` : ''},
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              An administrator has initiated a password reset for your LumenQuery account.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Click the button below to set a new password:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}"
                 style="background-color: #2855FF; color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              This link will expire in 1 hour.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you didn't expect this email, please contact support immediately.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="color: #999; font-size: 12px;">
              LumenQuery - Stellar Network API
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    // Log the admin action
    await logAdminAction(
      adminSession.user.id,
      'PASSWORD_RESET_SENT',
      userId,
      {
        email: user.email,
        tokenExpires: expires.toISOString(),
      },
      request
    );

    return NextResponse.json({
      message: 'Password reset email sent successfully',
      email: user.email,
    });
  } catch (error) {
    console.error('Failed to send password reset email:', error);

    // Still log the attempt
    await logAdminAction(
      adminSession.user.id,
      'PASSWORD_RESET_FAILED',
      userId,
      {
        email: user.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      request
    );

    return NextResponse.json(
      { error: 'Failed to send password reset email' },
      { status: 500 }
    );
  }
}
