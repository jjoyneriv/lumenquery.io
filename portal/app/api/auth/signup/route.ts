import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate unique IDs
    const userId = `user_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const orgId = `org_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const orgSlug = `org-${userId.slice(5, 13)}`;

    // Create organization first
    await prisma.organization.create({
      data: {
        id: orgId,
        name: `${name || email.split('@')[0]}'s Organization`,
        slug: orgSlug,
      },
    });

    // Create user with organization
    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        name,
        hashedPassword,
        organizationId: orgId,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
