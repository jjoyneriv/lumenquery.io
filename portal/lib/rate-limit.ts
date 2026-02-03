import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (use Redis in production for distributed)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

interface RateLimitConfig {
  interval: number; // in milliseconds
  maxRequests: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  interval: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
};

// Stricter limits for sensitive endpoints
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/auth/signup': { interval: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
  '/api/auth/signin': { interval: 60 * 1000, maxRequests: 10 }, // 10 per minute
  '/api/keys': { interval: 60 * 1000, maxRequests: 30 }, // 30 per minute
  default: DEFAULT_CONFIG,
};

function getClientIdentifier(req: NextRequest): string {
  // Use IP address as identifier
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

export function rateLimit(endpoint: string = 'default') {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default;

  return async function rateLimitMiddleware(req: NextRequest): Promise<NextResponse | null> {
    const clientId = getClientIdentifier(req);
    const key = `${endpoint}:${clientId}`;
    const now = Date.now();

    let entry = rateLimitMap.get(key);

    // Clean up expired entries periodically
    if (rateLimitMap.size > 10000) {
      for (const [k, v] of rateLimitMap.entries()) {
        if (v.resetAt < now) {
          rateLimitMap.delete(k);
        }
      }
    }

    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + config.interval };
      rateLimitMap.set(key, entry);
    }

    entry.count++;

    const remaining = Math.max(0, config.maxRequests - entry.count);
    const resetIn = Math.ceil((entry.resetAt - now) / 1000);

    // Add rate limit headers
    const headers = {
      'X-RateLimit-Limit': config.maxRequests.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': Math.ceil(entry.resetAt / 1000).toString(),
    };

    if (entry.count > config.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', retryAfter: resetIn },
        { status: 429, headers }
      );
    }

    return null; // Continue with request
  };
}

// Helper to wrap API handlers with rate limiting
export function withRateLimit(endpoint: string) {
  const limiter = rateLimit(endpoint);

  return function wrapper<T extends (...args: any[]) => Promise<NextResponse>>(handler: T) {
    return async function rateLimitedHandler(req: NextRequest, ...args: any[]): Promise<NextResponse> {
      const limitResponse = await limiter(req);
      if (limitResponse) return limitResponse;
      return handler(req, ...args);
    };
  };
}
