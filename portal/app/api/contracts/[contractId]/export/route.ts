import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkSorobanProAccess } from '@/lib/soroban/gates';

export async function GET(
  req: Request,
  { params }: { params: { contractId: string } }
) {
  try {
    const { contractId } = params;
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'json';
    const type = searchParams.get('type') || 'calls'; // calls, events, storage

    // Check authentication
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user and organization
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { organization: true },
    });

    if (!user?.organizationId) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 400 }
      );
    }

    // Check export access
    const access = await checkSorobanProAccess(user.organizationId, 'export');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason },
        { status: 403 }
      );
    }

    // Get contract
    const contract = await prisma.contract.findUnique({
      where: { contractId },
      select: { id: true, contractId: true, name: true },
    });

    if (!contract) {
      return NextResponse.json(
        { error: 'Contract not found' },
        { status: 404 }
      );
    }

    let data: unknown[];
    let filename: string;

    switch (type) {
      case 'calls':
        data = await prisma.contractCall.findMany({
          where: { contractId: contract.id },
          orderBy: { timestamp: 'desc' },
          take: 10000,
          select: {
            id: true,
            txHash: true,
            ledger: true,
            timestamp: true,
            functionName: true,
            inputsDecoded: true,
            outputsDecoded: true,
            status: true,
            errorCode: true,
            gasUsed: true,
          },
        });
        filename = `${contractId}-calls`;
        break;

      case 'events':
        data = await prisma.contractEvent.findMany({
          where: { contractId: contract.id },
          orderBy: { timestamp: 'desc' },
          take: 10000,
          select: {
            id: true,
            eventId: true,
            txHash: true,
            ledger: true,
            timestamp: true,
            eventType: true,
            topics: true,
            data: true,
          },
        });
        filename = `${contractId}-events`;
        break;

      case 'storage':
        data = await prisma.contractStorage.findMany({
          where: { contractId: contract.id },
          orderBy: { timestamp: 'desc' },
          take: 10000,
          select: {
            id: true,
            storageKey: true,
            storageKeyDecoded: true,
            storageValue: true,
            storageValueDecoded: true,
            ledger: true,
            timestamp: true,
          },
        });
        filename = `${contractId}-storage`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        );
    }

    // Convert BigInt to number for serialization
    const serializedData = JSON.parse(JSON.stringify(data, (_, value) =>
      typeof value === 'bigint' ? Number(value) : value
    ));

    if (format === 'csv') {
      // Convert to CSV
      if (serializedData.length === 0) {
        return new Response('No data to export', {
          status: 200,
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${filename}.csv"`,
          },
        });
      }

      const headers = Object.keys(serializedData[0]);
      const csvRows = [
        headers.join(','),
        ...serializedData.map((row: Record<string, unknown>) =>
          headers.map(h => {
            const value = row[h];
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
            if (typeof value === 'string' && value.includes(',')) return `"${value}"`;
            return String(value);
          }).join(',')
        ),
      ];

      return new Response(csvRows.join('\n'), {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      });
    }

    // JSON format (default)
    return new Response(JSON.stringify(serializedData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}.json"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
