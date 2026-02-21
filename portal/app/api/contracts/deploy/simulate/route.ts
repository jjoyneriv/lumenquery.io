import { NextRequest, NextResponse } from 'next/server';
import { rpcCallPublic, SimulateTransactionResult } from '@/lib/soroban';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { xdr } = body;

    if (!xdr || typeof xdr !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid XDR' },
        { status: 400 }
      );
    }

    // Simulate the transaction
    const result = await rpcCallPublic<SimulateTransactionResult>(
      'simulateTransaction',
      { transaction: xdr }
    );

    if (result.error) {
      return NextResponse.json(
        { error: `Simulation failed: ${result.error}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      minResourceFee: result.minResourceFee || '0',
      transactionData: result.transactionData,
      events: result.events || [],
      latestLedger: result.latestLedger,
    });
  } catch (error) {
    console.error('Simulation error:', error);
    const message = error instanceof Error ? error.message : 'Simulation failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
