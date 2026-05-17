import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

function generateUserId(): string {
  return randomBytes(8).toString('hex').toUpperCase(); // 16-char alphanumeric
}

// Email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Password must have: 8+ chars, 1 uppercase, 1 lowercase, 1 number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Sanitize string input
function sanitize(input: string | undefined): string {
  if (!input) return '';
  return input.trim().slice(0, 255); // Limit length
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Sanitize inputs
    const name = sanitize(body.name);
    const email = sanitize(body.email)?.toLowerCase();
    const password = body.password || '';

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password complexity validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' },
        { status: 400 }
      );
    }

    if (password.length > 128) {
      return NextResponse.json(
        { error: 'Password is too long' },
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

    // Generate 16-char alphanumeric public user ID
    const publicUserId = generateUserId();

    // Create user with organization
    const user = await prisma.user.create({
      data: {
        id: userId,
        userId: publicUserId,
        email,
        name,
        hashedPassword,
        organizationId: orgId,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, userId: user.userId, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
