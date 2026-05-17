import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, sessionId, referrer } = body;

    if (!path || !sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Get user info if authenticated
    let userId: string | null = null;
    let userTier: string | null = null;

    try {
      const session = await auth();
      if (session?.user?.email) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true, organization: { select: { tier: true } } },
        });
        if (user) {
          userId = user.id;
          userTier = user.organization?.tier || 'FREE';
        }
      }
    } catch {}

    const userAgent = req.headers.get('user-agent') || undefined;

    await prisma.pageView.create({
      data: {
        path: path.slice(0, 500),
        userId,
        userTier: userId ? userTier : null,
        sessionId: sessionId.slice(0, 64),
        referrer: referrer?.slice(0, 500) || undefined,
        userAgent: userAgent?.slice(0, 500),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
