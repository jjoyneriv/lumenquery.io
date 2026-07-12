import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.redirect(new URL('/blog?subscribed=error', request.url));
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { subscribedAt: new Date() },
      create: { email },
    });

    return NextResponse.redirect(new URL('/blog?subscribed=true', request.url));
  } catch {
    return NextResponse.redirect(new URL('/blog?subscribed=true', request.url));
  }
}
