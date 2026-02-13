import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin, unauthorizedResponse, logAdminAction } from '@/lib/admin';

// GET /api/admin/users/[userId]/sessions - Get user's session history
export async function GET(
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
      lastLoginAt: true,
      lastActiveAt: true,
      currentSessionStart: true,
      sessions: {
        select: {
          id: true,
          expires: true,
        },
        orderBy: { expires: 'desc' },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const now = new Date();
  const activeSessions = user.sessions.filter(s => s.expires > now);
  const expiredSessions = user.sessions.filter(s => s.expires <= now);

  return NextResponse.json({
    userId: user.id,
    email: user.email,
    lastLoginAt: user.lastLoginAt,
    lastActiveAt: user.lastActiveAt,
    currentSessionStart: user.currentSessionStart,
    sessionDurationMs: user.currentSessionStart
      ? now.getTime() - user.currentSessionStart.getTime()
      : null,
    activeSessions: activeSessions.length,
    totalSessions: user.sessions.length,
    sessions: user.sessions.map(s => ({
      id: s.id,
      expires: s.expires,
      isActive: s.expires > now,
    })),
  });
}

// DELETE /api/admin/users/[userId]/sessions - Force logout (delete all sessions)
export async function DELETE(
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
      role: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Prevent forcing logout of super admins (unless you are super admin)
  if (user.role === 'SUPER_ADMIN' && adminSession.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json(
      { error: 'Only super admins can force logout super admins' },
      { status: 403 }
    );
  }

  // Count sessions before deletion
  const sessionCount = await prisma.session.count({
    where: { userId },
  });

  // Delete all sessions
  await prisma.session.deleteMany({
    where: { userId },
  });

  // Clear session tracking fields
  await prisma.user.update({
    where: { id: userId },
    data: {
      currentSessionStart: null,
    },
  });

  // Log the admin action
  await logAdminAction(
    adminSession.user.id,
    'FORCE_LOGOUT',
    userId,
    {
      sessionsDeleted: sessionCount,
    },
    request
  );

  return NextResponse.json({
    message: 'User logged out successfully',
    sessionsDeleted: sessionCount,
  });
}
