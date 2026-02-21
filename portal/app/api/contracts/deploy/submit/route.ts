import { NextRequest, NextResponse } from 'next/server';
import { sendTransaction } from '@/lib/soroban';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signedXdr } = body;

    if (!signedXdr || typeof signedXdr !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid signed XDR' },
        { status: 400 }
      );
    }

    // Submit the transaction
    const result = await sendTransaction(signedXdr);

    if (result.status === 'ERROR') {
      return NextResponse.json(
        {
          success: false,
          error: 'Transaction submission failed',
          errorResultXdr: result.errorResultXdr,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      status: result.status,
      hash: result.hash,
      latestLedger: result.latestLedger,
    });
  } catch (error) {
    console.error('Submit error:', error);
    const message = error instanceof Error ? error.message : 'Submission failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
