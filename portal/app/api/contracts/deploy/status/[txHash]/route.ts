import { NextRequest, NextResponse } from 'next/server';
import { getTransactionStatus } from '@/lib/soroban';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ txHash: string }> }
) {
  try {
    const { txHash } = await params;

    if (!txHash || txHash.length !== 64) {
      return NextResponse.json(
        { error: 'Invalid transaction hash' },
        { status: 400 }
      );
    }

    // Get transaction status
    const result = await getTransactionStatus(txHash);

    return NextResponse.json({
      status: result.status,
      ledger: result.ledger,
      createdAt: result.createdAt,
      resultXdr: result.resultXdr,
      resultMetaXdr: result.resultMetaXdr,
      latestLedger: result.latestLedger,
    });
  } catch (error) {
    console.error('Status check error:', error);
    const message = error instanceof Error ? error.message : 'Status check failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
