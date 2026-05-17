import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// POST /api/support/[ticketId]/messages - Add message to ticket
export async function POST(req: Request, { params }: { params: { ticketId: string } }) {
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

  if (ticket.status === 'CLOSED') {
    return NextResponse.json({ error: 'Ticket is closed' }, { status: 400 });
  }

  const body = await req.json();
  if (!body.message || !body.message.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const message = await prisma.ticketMessage.create({
    data: {
      ticketId: params.ticketId,
      senderId: user.id,
      senderName: user.name || user.email,
      isAdmin,
      message: body.message.trim(),
    },
  });

  // Update ticket status based on who replied
  const newStatus = isAdmin ? 'WAITING_ON_CUSTOMER' : 'OPEN';
  await prisma.supportTicket.update({
    where: { id: params.ticketId },
    data: { status: ticket.status === 'RESOLVED' ? ticket.status : newStatus },
  });

  return NextResponse.json({ message }, { status: 201 });
}
