import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { getComplianceStatus } from '@/lib/compliance/gates';

// GET - Get compliance status for the organization
export async function GET() {
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
      select: { organizationId: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    const status = await getComplianceStatus(user.organizationId);

    if (!status) {
      return NextResponse.json(
        { error: 'Failed to get compliance status' },
        { status: 500 }
      );
    }

    return NextResponse.json(status);
  } catch (error) {
    console.error('Compliance status error:', error);
    return NextResponse.json(
      { error: 'Failed to get compliance status' },
      { status: 500 }
    );
  }
}
