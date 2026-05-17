import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/support - List all tickets (admin only)
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || (user as any).role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const where: any = {};
  if (status && status !== 'ALL') where.status = status;

  const tickets = await prisma.supportTicket.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  // Get user info for each ticket
  const userIds = [...new Set(tickets.map((t) => t.userId))];
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  });
  const userMap = new Map(users.map((u) => [u.id, u]));

  const ticketsWithUsers = tickets.map((t) => ({
    ...t,
    user: userMap.get(t.userId) || { name: 'Unknown', email: 'unknown' },
  }));

  const counts = {
    total: await prisma.supportTicket.count(),
    open: await prisma.supportTicket.count({ where: { status: 'OPEN' } }),
    inProgress: await prisma.supportTicket.count({ where: { status: 'IN_PROGRESS' } }),
    waiting: await prisma.supportTicket.count({ where: { status: 'WAITING_ON_CUSTOMER' } }),
    resolved: await prisma.supportTicket.count({ where: { status: 'RESOLVED' } }),
    closed: await prisma.supportTicket.count({ where: { status: 'CLOSED' } }),
  };

  return NextResponse.json({ tickets: ticketsWithUsers, counts });
}
