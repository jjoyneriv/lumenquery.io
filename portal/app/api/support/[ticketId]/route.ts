import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET /api/support/[ticketId] - Get ticket detail
export async function GET(req: Request, { params }: { params: { ticketId: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const ticket = await prisma.supportTicket.findUnique({
    where: { id: params.ticketId },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

  // Only allow the ticket owner or admins
  const isAdmin = (session.user as any)?.role === 'SUPER_ADMIN';
  if (ticket.userId !== user.id && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({ ticket });
}

// PUT /api/support/[ticketId] - Update ticket (admin: status/priority, user: close)
export async function PUT(req: Request, { params }: { params: { ticketId: string } }) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const ticket = await prisma.supportTicket.findUnique({ where: { id: params.ticketId } });
  if (!ticket) return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });

  const isAdmin = (session.user as any)?.role === 'SUPER_ADMIN';
  if (ticket.userId !== user.id && !isAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const updateData: any = {};

  if (isAdmin) {
    if (body.status) updateData.status = body.status;
    if (body.priority) updateData.priority = body.priority;
  } else {
    // Customers can only close their own tickets
    if (body.status === 'CLOSED') updateData.status = 'CLOSED';
  }

  const updated = await prisma.supportTicket.update({
    where: { id: params.ticketId },
    data: updateData,
  });

  return NextResponse.json({ ticket: updated });
}
