import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET /api/support - List user's tickets
export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return NextResponse.json({ tickets });
}

// POST /api/support - Create a new ticket
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const body = await req.json();
  const { subject, description, category, priority } = body;

  if (!subject || !description) {
    return NextResponse.json({ error: 'Subject and description are required' }, { status: 400 });
  }

  if (subject.length > 200) {
    return NextResponse.json({ error: 'Subject must be under 200 characters' }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      userId: user.id,
      subject: subject.trim(),
      description: description.trim(),
      category: category || 'GENERAL',
      priority: priority || 'MEDIUM',
      messages: {
        create: {
          senderId: user.id,
          senderName: user.name || user.email,
          isAdmin: false,
          message: description.trim(),
        },
      },
    },
    include: { messages: true },
  });

  return NextResponse.json({ ticket }, { status: 201 });
}
