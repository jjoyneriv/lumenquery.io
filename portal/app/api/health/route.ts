import { NextResponse } from 'next/server';

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'lumenquery-portal',
    version: process.env.npm_package_version || '1.0.0',
  };

  return NextResponse.json(health);
}
