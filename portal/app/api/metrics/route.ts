import { NextResponse } from 'next/server';

// GET /api/metrics - Prometheus format (basic process metrics)
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
