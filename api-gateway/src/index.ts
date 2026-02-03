import Fastify from 'fastify';
import cors from '@fastify/cors';
import crypto from 'crypto';
import { createClient } from 'redis';

const app = Fastify({ logger: true });

const HORIZON_URL = process.env.HORIZON_API_URL || 'http://127.0.0.1:8000';
const DATABASE_URL = process.env.DATABASE_URL || '';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const PUBLIC_API_URL = 'https://api.lumenquery.io';

// Rate limits per tier (requests per minute)
const RATE_LIMITS: Record<string, number> = {
  FREE: 60,
  STARTER: 300,
  PROFESSIONAL: 1000,
  ENTERPRISE: 5000,
};

// Redis client for rate limiting
let redisClient: ReturnType<typeof createClient>;

async function initRedis() {
  redisClient = createClient({ url: REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis error:', err));
  await redisClient.connect();
  console.log('✅ Redis connected for rate limiting');
}

// Simple in-memory cache for API keys
const keyCache = new Map<string, { organizationId: string; tier: string; apiKeyId: string; expiresAt: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Register CORS
app.register(cors, { origin: true });

// Rewrite internal URLs to public URLs
function rewriteUrls(data: string): string {
  return data.replace(/http:\/\/127\.0\.0\.1:8000/g, PUBLIC_API_URL);
}

// Health check - no auth required
app.get('/health', async () => ({
  status: 'healthy',
  timestamp: new Date().toISOString(),
  redis: redisClient?.isReady ? 'connected' : 'disconnected',
}));

// Validate API key
async function validateApiKey(apiKey: string): Promise<{ valid: boolean; organizationId?: string; tier?: string; apiKeyId?: string; error?: string }> {
  if (!apiKey) {
    return { valid: false, error: 'Missing API key' };
  }

  if (!apiKey.startsWith('lq_')) {
    return { valid: false, error: 'Invalid API key format' };
  }

  // Check cache first
  const cached = keyCache.get(apiKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { valid: true, organizationId: cached.organizationId, tier: cached.tier, apiKeyId: cached.apiKeyId };
  }

  // Hash the key for database lookup
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

  try {
    const { Client } = await import('pg');
    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();

    const result = await client.query(`
      SELECT ak.id, ak."organizationId", ak."revokedAt", ak."expiresAt", o.tier
      FROM "ApiKey" ak
      JOIN "Organization" o ON ak."organizationId" = o.id
      WHERE ak."keyHash" = $1
    `, [keyHash]);

    await client.end();

    if (result.rows.length === 0) {
      return { valid: false, error: 'Invalid API key' };
    }

    const key = result.rows[0];

    if (key.revokedAt) {
      return { valid: false, error: 'API key has been revoked' };
    }

    if (key.expiresAt && new Date(key.expiresAt) < new Date()) {
      return { valid: false, error: 'API key has expired' };
    }

    // Cache the valid key
    keyCache.set(apiKey, {
      organizationId: key.organizationId,
      tier: key.tier,
      apiKeyId: key.id,
      expiresAt: Date.now() + CACHE_TTL,
    });

    // Update last used timestamp asynchronously
    const updateClient = new Client({ connectionString: DATABASE_URL });
    updateClient.connect().then(() => {
      updateClient.query(`UPDATE "ApiKey" SET "lastUsedAt" = NOW() WHERE "keyHash" = $1`, [keyHash])
        .finally(() => updateClient.end());
    });

    return { valid: true, organizationId: key.organizationId, tier: key.tier, apiKeyId: key.id };
  } catch (error) {
    console.error('Database error during API key validation:', error);
    return { valid: false, error: 'Internal server error' };
  }
}

// Rate limiting check
async function checkRateLimit(organizationId: string, tier: string): Promise<{ allowed: boolean; limit: number; remaining: number; resetAt: number }> {
  const limit = RATE_LIMITS[tier] || RATE_LIMITS.FREE;
  const windowKey = `ratelimit:${organizationId}`;
  const now = Date.now();
  const windowStart = Math.floor(now / 60000) * 60000;
  const resetAt = windowStart + 60000;

  try {
    const currentCount = await redisClient.incr(windowKey);
    
    if (currentCount === 1) {
      await redisClient.pExpireAt(windowKey, resetAt);
    }

    const remaining = Math.max(0, limit - currentCount);
    const allowed = currentCount <= limit;

    return { allowed, limit, remaining, resetAt };
  } catch (error) {
    console.error('Redis rate limit error:', error);
    return { allowed: true, limit, remaining: limit, resetAt };
  }
}

// Record usage asynchronously
async function recordUsage(
  apiKeyId: string,
  organizationId: string,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTimeMs: number,
  requestSize: number,
  responseSize: number
) {
  try {
    const { Client } = await import('pg');
    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();

    const usageId = `usage_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
    const today = new Date().toISOString().split('T')[0];

    // Insert usage record
    await client.query(`
      INSERT INTO "UsageRecord" (id, "apiKeyId", "organizationId", endpoint, method, "statusCode", "responseTimeMs", "requestSize", "responseSize")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [usageId, apiKeyId, organizationId, endpoint, method, statusCode, responseTimeMs, requestSize, responseSize]);

    // Update or insert daily usage
    const dailyId = `daily_${organizationId}_${today}`.replace(/-/g, '');
    const isSuccess = statusCode >= 200 && statusCode < 400;

    await client.query(`
      INSERT INTO "DailyUsage" (id, date, "organizationId", "totalRequests", "successfulRequests", "failedRequests", "totalResponseTimeMs", "totalDataTransferBytes")
      VALUES ($1, $2, $3, 1, $4, $5, $6, $7)
      ON CONFLICT ("organizationId", date)
      DO UPDATE SET
        "totalRequests" = "DailyUsage"."totalRequests" + 1,
        "successfulRequests" = "DailyUsage"."successfulRequests" + $4,
        "failedRequests" = "DailyUsage"."failedRequests" + $5,
        "totalResponseTimeMs" = "DailyUsage"."totalResponseTimeMs" + $6,
        "totalDataTransferBytes" = "DailyUsage"."totalDataTransferBytes" + $7
    `, [dailyId, today, organizationId, isSuccess ? 1 : 0, isSuccess ? 0 : 1, responseTimeMs, responseSize]);

    await client.end();
  } catch (error) {
    console.error('Failed to record usage:', error);
  }
}

// Auth and rate limit middleware
app.addHook('preHandler', async (req, reply) => {
  if (req.url === '/health') {
    return;
  }

  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Missing X-API-Key header. Get your API key at https://lumenquery.io/dashboard',
    });
  }

  const validation = await validateApiKey(apiKey);

  if (!validation.valid) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: validation.error,
    });
  }

  const rateLimit = await checkRateLimit(validation.organizationId!, validation.tier!);

  reply.header('X-RateLimit-Limit', rateLimit.limit);
  reply.header('X-RateLimit-Remaining', rateLimit.remaining);
  reply.header('X-RateLimit-Reset', Math.ceil(rateLimit.resetAt / 1000));

  if (!rateLimit.allowed) {
    return reply.status(429).send({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Limit: ${rateLimit.limit} requests/minute. Upgrade your plan at https://lumenquery.io/dashboard`,
      retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
    });
  }

  (req as any).organizationId = validation.organizationId;
  (req as any).tier = validation.tier;
  (req as any).apiKeyId = validation.apiKeyId;
});

// Proxy GET requests to Horizon
app.get('/*', async (req, reply) => {
  const startTime = Date.now();
  const requestSize = JSON.stringify(req.query || {}).length;

  try {
    const res = await fetch(`${HORIZON_URL}${req.url}`);
    const data = await res.text();
    const responseTime = Date.now() - startTime;
    const rewrittenData = rewriteUrls(data);

    // Record usage asynchronously (don't await)
    recordUsage(
      (req as any).apiKeyId,
      (req as any).organizationId,
      req.url.split('?')[0],
      'GET',
      res.status,
      responseTime,
      requestSize,
      rewrittenData.length
    );

    reply
      .status(res.status)
      .header('Content-Type', 'application/json')
      .header('X-Response-Time', `${responseTime}ms`)
      .header('X-Powered-By', 'LumenQuery')
      .send(rewrittenData);
  } catch (error) {
    console.error('Proxy error:', error);
    reply.status(502).send({ error: 'Bad Gateway', message: 'Failed to connect to Horizon API' });
  }
});

// Proxy POST requests to Horizon
app.post('/*', async (req, reply) => {
  const startTime = Date.now();
  const bodyStr = JSON.stringify(req.body || {});
  const requestSize = bodyStr.length;

  try {
    const res = await fetch(`${HORIZON_URL}${req.url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
    });
    const data = await res.text();
    const responseTime = Date.now() - startTime;
    const rewrittenData = rewriteUrls(data);

    // Record usage asynchronously
    recordUsage(
      (req as any).apiKeyId,
      (req as any).organizationId,
      req.url.split('?')[0],
      'POST',
      res.status,
      responseTime,
      requestSize,
      rewrittenData.length
    );

    reply
      .status(res.status)
      .header('Content-Type', 'application/json')
      .header('X-Response-Time', `${responseTime}ms`)
      .header('X-Powered-By', 'LumenQuery')
      .send(rewrittenData);
  } catch (error) {
    console.error('Proxy error:', error);
    reply.status(502).send({ error: 'Bad Gateway', message: 'Failed to connect to Horizon API' });
  }
});

// Start server
async function start() {
  await initRedis();
  
  await app.listen({ port: 8080, host: '0.0.0.0' });
  console.log('🚀 LumenQuery API Gateway running on port 8080');
  console.log('📡 Proxying to Horizon at:', HORIZON_URL);
  console.log('🔗 Rewriting URLs to:', PUBLIC_API_URL);
  console.log('🔐 API Key authentication enabled');
  console.log('⏱️  Rate limiting enabled:', RATE_LIMITS);
  console.log('📊 Usage tracking enabled');
}

start().catch(console.error);
