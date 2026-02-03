import Fastify from 'fastify';
import cors from '@fastify/cors';
import crypto from 'crypto';
import { createClient } from 'redis';

const app = Fastify({ logger: true });

const SOROBAN_RPC_URL = process.env.SOROBAN_RPC_URL || 'http://127.0.0.1:8001';
const DATABASE_URL = process.env.DATABASE_URL || '';
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const PUBLIC_RPC_URL = 'https://rpc.lumenquery.io';

// Rate limits per tier (requests per minute) - RPC has higher limits for contract calls
const RATE_LIMITS: Record<string, number> = {
  FREE: 30,
  STARTER: 150,
  PROFESSIONAL: 500,
  ENTERPRISE: 2500,
};

// Redis client for rate limiting
let redisClient: ReturnType<typeof createClient>;

async function initRedis() {
  redisClient = createClient({ url: REDIS_URL });
  redisClient.on('error', (err) => console.error('Redis error:', err));
  await redisClient.connect();
  console.log('Connected to Redis for rate limiting');
}

// Simple in-memory cache for API keys
const keyCache = new Map<string, { organizationId: string; tier: string; apiKeyId: string; expiresAt: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Register CORS with allowed origins
const ALLOWED_ORIGINS = [
  'https://lumenquery.io',
  'https://www.lumenquery.io',
  'https://api.lumenquery.io',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3000', 'http://localhost:8080'] : []),
];

app.register(cors, {
  origin: (origin, cb) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      cb(null, true);
      return;
    }
    if (ALLOWED_ORIGINS.includes(origin)) {
      cb(null, true);
      return;
    }
    cb(new Error('CORS not allowed'), false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset', 'X-Response-Time'],
  credentials: true,
  maxAge: 86400, // 24 hours
});

// Health check - no auth required
app.get('/health', async () => ({
  status: 'healthy',
  service: 'soroban-rpc-gateway',
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

// Rate limiting check (separate key from Horizon API)
async function checkRateLimit(organizationId: string, tier: string): Promise<{ allowed: boolean; limit: number; remaining: number; resetAt: number }> {
  const limit = RATE_LIMITS[tier] || RATE_LIMITS.FREE;
  const windowKey = `ratelimit:rpc:${organizationId}`;
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

    // Insert usage record with rpc: prefix to distinguish from Horizon
    await client.query(`
      INSERT INTO "UsageRecord" (id, "apiKeyId", "organizationId", endpoint, method, "statusCode", "responseTimeMs", "requestSize", "responseSize")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [usageId, apiKeyId, organizationId, `rpc:${endpoint}`, method, statusCode, responseTimeMs, requestSize, responseSize]);

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

// JSON-RPC request/response types
interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: unknown;
}

interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: JsonRpcError;
}

// Create JSON-RPC error response
function jsonRpcError(id: string | number | null, code: number, message: string, data?: unknown): JsonRpcResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: { code, message, data },
  };
}

// Auth hook for all non-health routes
app.addHook('preHandler', async (req, reply) => {
  if (req.url === '/health') {
    return;
  }

  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return reply.status(401).send(
      jsonRpcError(null, -32000, 'Unauthorized: Missing X-API-Key header. Get your API key at https://lumenquery.io/dashboard')
    );
  }

  const validation = await validateApiKey(apiKey);

  if (!validation.valid) {
    return reply.status(401).send(
      jsonRpcError(null, -32000, `Unauthorized: ${validation.error}`)
    );
  }

  const rateLimit = await checkRateLimit(validation.organizationId!, validation.tier!);

  reply.header('X-RateLimit-Limit', rateLimit.limit);
  reply.header('X-RateLimit-Remaining', rateLimit.remaining);
  reply.header('X-RateLimit-Reset', Math.ceil(rateLimit.resetAt / 1000));

  if (!rateLimit.allowed) {
    return reply.status(429).send(
      jsonRpcError(null, -32005, `Rate limit exceeded. Limit: ${rateLimit.limit} requests/minute. Upgrade your plan at https://lumenquery.io/dashboard`, {
        retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
      })
    );
  }

  (req as any).organizationId = validation.organizationId;
  (req as any).tier = validation.tier;
  (req as any).apiKeyId = validation.apiKeyId;
});

// Handle JSON-RPC requests (POST /)
app.post('/', async (req, reply) => {
  const startTime = Date.now();
  const body = req.body as JsonRpcRequest | JsonRpcRequest[];
  const bodyStr = JSON.stringify(body);
  const requestSize = bodyStr.length;

  // Validate JSON-RPC format
  const requests = Array.isArray(body) ? body : [body];

  for (const rpcReq of requests) {
    if (!rpcReq.jsonrpc || rpcReq.jsonrpc !== '2.0') {
      return reply.status(400).send(
        jsonRpcError(rpcReq.id || null, -32600, 'Invalid Request: jsonrpc must be "2.0"')
      );
    }
    if (!rpcReq.method || typeof rpcReq.method !== 'string') {
      return reply.status(400).send(
        jsonRpcError(rpcReq.id || null, -32600, 'Invalid Request: method must be a string')
      );
    }
  }

  try {
    const res = await fetch(SOROBAN_RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
    });

    const data = await res.text();
    const responseTime = Date.now() - startTime;

    // Extract method name for usage tracking
    const methodName = Array.isArray(body) ? 'batch' : body.method;

    // Record usage asynchronously
    recordUsage(
      (req as any).apiKeyId,
      (req as any).organizationId,
      methodName,
      'POST',
      res.status,
      responseTime,
      requestSize,
      data.length
    );

    reply
      .status(res.status)
      .header('Content-Type', 'application/json')
      .header('X-Response-Time', `${responseTime}ms`)
      .header('X-Powered-By', 'LumenQuery')
      .send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    const rpcError = jsonRpcError(
      Array.isArray(body) ? null : body.id,
      -32603,
      'Internal error: Failed to connect to Soroban RPC'
    );
    reply.status(502).send(rpcError);
  }
});

// Handle GET requests (for JSON-RPC introspection if needed)
app.get('/', async (_req, reply) => {
  reply.send({
    name: 'LumenQuery Soroban RPC Gateway',
    version: '1.0.0',
    description: 'Managed Soroban RPC endpoint with authentication and rate limiting',
    docs: 'https://lumenquery.io/docs/soroban-rpc',
    endpoints: {
      rpc: PUBLIC_RPC_URL,
    },
    methods: [
      'getHealth',
      'getNetwork',
      'getLatestLedger',
      'getLedgerEntries',
      'getTransaction',
      'getTransactions',
      'sendTransaction',
      'simulateTransaction',
      'getEvents',
      'getFeeStats',
      'getVersionInfo',
    ],
  });
});

// Start server
async function start() {
  await initRedis();

  await app.listen({ port: 8082, host: '0.0.0.0' });
  console.log('LumenQuery RPC Gateway running on port 8082');
  console.log('Proxying to Soroban RPC at:', SOROBAN_RPC_URL);
  console.log('Public URL:', PUBLIC_RPC_URL);
  console.log('API Key authentication enabled');
  console.log('Rate limits:', RATE_LIMITS);
}

start().catch(console.error);
