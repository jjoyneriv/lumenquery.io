import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
// In production, use Redis or similar for distributed rate limiting
const rateStore = new Map<string, { count: number; resetAt: number }>();

// Rate limit configuration per path pattern
const rateLimits: Record<string, { max: number; window: number }> = {
  '/api/auth/signup': { max: 5, window: 3600000 }, // 5 per hour
  '/api/auth': { max: 20, window: 60000 }, // 20 per minute
  '/api/': { max: 60, window: 60000 }, // 60 per minute
};

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(key: string, max: number, window: number): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let entry = rateStore.get(key);

  // Cleanup old entries periodically
  if (rateStore.size > 5000) {
    for (const [k, v] of rateStore.entries()) {
      if (v.resetAt < now) rateStore.delete(k);
    }
  }

  if (!entry || entry.resetAt < now) {
    entry = { count: 1, resetAt: now + window };
    rateStore.set(key, entry);
    return { allowed: true, remaining: max - 1 };
  }

  entry.count++;
  const remaining = Math.max(0, max - entry.count);
  return { allowed: entry.count <= max, remaining };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIP = getClientIP(request);

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    // Find matching rate limit config
    let limitConfig = rateLimits['/api/'];
    for (const [pattern, config] of Object.entries(rateLimits)) {
      if (pathname.startsWith(pattern) && pattern.length > '/api/'.length) {
        limitConfig = config;
        break;
      }
    }

    const key = `${pathname}:${clientIP}`;
    const { allowed, remaining } = checkRateLimit(key, limitConfig.max, limitConfig.window);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // Add rate limit headers to response
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all API routes
    '/api/:path*',
    // Skip static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
