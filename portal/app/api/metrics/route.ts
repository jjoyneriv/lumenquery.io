import { NextResponse } from 'next/server';

// Simple metrics collector
// In production, use prom-client for proper Prometheus metrics
interface Metrics {
  requests: { [key: string]: number };
  errors: { [key: string]: number };
  latency: { [key: string]: number[] };
}

// Global metrics store (resets on restart - use Redis for persistence)
const metrics: Metrics = {
  requests: {},
  errors: {},
  latency: {},
};

// Track a request (call from middleware or API routes)
export function trackRequest(path: string, statusCode: number, durationMs: number) {
  const key = path.split('?')[0]; // Remove query params

  // Count requests
  metrics.requests[key] = (metrics.requests[key] || 0) + 1;

  // Count errors (5xx)
  if (statusCode >= 500) {
    metrics.errors[key] = (metrics.errors[key] || 0) + 1;
  }

  // Track latency (keep last 100 samples)
  if (!metrics.latency[key]) {
    metrics.latency[key] = [];
  }
  metrics.latency[key].push(durationMs);
  if (metrics.latency[key].length > 100) {
    metrics.latency[key].shift();
  }
}

// Calculate percentile
function percentile(arr: number[], p: number): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

// GET /api/metrics - Prometheus format
export async function GET(req: Request) {
  // Basic auth check for metrics endpoint
  const authHeader = req.headers.get('authorization');
  const expectedToken = process.env.METRICS_TOKEN;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const lines: string[] = [];

  // Service info
  lines.push('# HELP lumenquery_info LumenQuery service info');
  lines.push('# TYPE lumenquery_info gauge');
  lines.push('lumenquery_info{service="portal",version="1.0.0"} 1');

  // Request counts
  lines.push('# HELP http_requests_total Total HTTP requests');
  lines.push('# TYPE http_requests_total counter');
  for (const [path, count] of Object.entries(metrics.requests)) {
    lines.push(`http_requests_total{job="portal",path="${path}"} ${count}`);
  }

  // Error counts
  lines.push('# HELP http_errors_total Total HTTP errors (5xx)');
  lines.push('# TYPE http_errors_total counter');
  for (const [path, count] of Object.entries(metrics.errors)) {
    lines.push(`http_errors_total{job="portal",path="${path}"} ${count}`);
  }

  // Latency histogram (simplified)
  lines.push('# HELP http_request_duration_seconds HTTP request duration');
  lines.push('# TYPE http_request_duration_seconds summary');
  for (const [path, samples] of Object.entries(metrics.latency)) {
    if (samples.length > 0) {
      const p50 = percentile(samples, 50) / 1000;
      const p95 = percentile(samples, 95) / 1000;
      const p99 = percentile(samples, 99) / 1000;
      lines.push(`http_request_duration_seconds{job="portal",path="${path}",quantile="0.5"} ${p50.toFixed(6)}`);
      lines.push(`http_request_duration_seconds{job="portal",path="${path}",quantile="0.95"} ${p95.toFixed(6)}`);
      lines.push(`http_request_duration_seconds{job="portal",path="${path}",quantile="0.99"} ${p99.toFixed(6)}`);
    }
  }

  // Uptime
  lines.push('# HELP process_uptime_seconds Process uptime');
  lines.push('# TYPE process_uptime_seconds gauge');
  lines.push(`process_uptime_seconds{job="portal"} ${process.uptime().toFixed(0)}`);

  // Memory usage
  const mem = process.memoryUsage();
  lines.push('# HELP process_memory_bytes Process memory usage');
  lines.push('# TYPE process_memory_bytes gauge');
  lines.push(`process_memory_bytes{job="portal",type="heapUsed"} ${mem.heapUsed}`);
  lines.push(`process_memory_bytes{job="portal",type="heapTotal"} ${mem.heapTotal}`);
  lines.push(`process_memory_bytes{job="portal",type="rss"} ${mem.rss}`);

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
