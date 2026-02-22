import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export interface AdminSession {
  user: {
    id: string;
    email: string;
    name: string | null;
    organizationId: string | null;
    role: UserRole;
  };
}

// Check if user has admin role
export async function requireAdmin(): Promise<AdminSession | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: {
      id: true,
      email: true,
      name: true,
      organizationId: true,
      role: true,
    },
  });

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      organizationId: user.organizationId,
      role: user.role,
    },
  };
}

// Check if user is a super admin (for admin management)
export async function requireSuperAdmin(): Promise<AdminSession | null> {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: {
      id: true,
      email: true,
      name: true,
      organizationId: true,
      role: true,
    },
  });

  if (!user || user.role !== 'SUPER_ADMIN') {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      organizationId: user.organizationId,
      role: user.role,
    },
  };
}

// Log admin action to audit log
export async function logAdminAction(
  adminId: string,
  action: string,
  targetUserId?: string | null,
  details?: Record<string, unknown>,
  request?: NextRequest
) {
  await prisma.adminAuditLog.create({
    data: {
      adminId,
      action,
      targetUserId,
      details: details ? (details as any) : undefined,
      ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || undefined,
      userAgent: request?.headers.get('user-agent') || undefined,
    },
  });
}

// Common unauthorized response
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized. Admin access required.' },
    { status: 403 }
  );
}

// Format user for API response
export function formatUserForResponse(user: any) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    lastActiveAt: user.lastActiveAt,
    currentSessionStart: user.currentSessionStart,
    organization: user.organization ? {
      id: user.organization.id,
      name: user.organization.name,
      tier: user.organization.tier,
      intelligenceTier: user.organization.intelligenceTier,
      portfolioTier: user.organization.portfolioTier,
    } : null,
  };
}

// Calculate session duration in seconds
export function calculateSessionDuration(sessionStart: Date | null): number | null {
  if (!sessionStart) return null;
  return Math.floor((Date.now() - sessionStart.getTime()) / 1000);
}
