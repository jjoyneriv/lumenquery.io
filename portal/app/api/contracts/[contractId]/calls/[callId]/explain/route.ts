import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { checkSorobanProAccess, incrementAIUsage } from '@/lib/soroban/gates';
import { hashFunctionInputs } from '@/lib/soroban/decoder';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(
  req: Request,
  { params }: { params: { contractId: string; callId: string } }
) {
  try {
    const { contractId, callId } = params;

    // Check authentication
    const session = await getServerSession(authOptions);
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

    // Check AI access
    const access = await checkSorobanProAccess(user.organizationId, 'ai');
    if (!access.allowed) {
      return NextResponse.json(
        { error: access.reason, limit: access.limit, used: access.used },
        { status: 403 }
      );
    }

    // Get the contract call
    const call = await prisma.contractCall.findUnique({
      where: { id: callId },
      include: {
        contract: {
          select: {
            contractId: true,
            name: true,
          },
        },
      },
    });

    if (!call || call.contract.contractId !== contractId) {
      return NextResponse.json(
        { error: 'Call not found' },
        { status: 404 }
      );
    }

    // Check if call already has an explanation
    if (call.aiExplanation) {
      return NextResponse.json({
        explanation: call.aiExplanation,
        cached: true,
      });
    }

    // Check global cache
    const callHash = hashFunctionInputs(call.functionName, call.inputsDecoded);
    const cachedExplanation = await prisma.aIExplanationCache.findUnique({
      where: { callHash },
    });

    if (cachedExplanation && cachedExplanation.expiresAt > new Date()) {
      // Update call with cached explanation
      await prisma.contractCall.update({
        where: { id: callId },
        data: { aiExplanation: cachedExplanation.explanation },
      });

      return NextResponse.json({
        explanation: cachedExplanation.explanation,
        cached: true,
      });
    }

    // Generate new explanation
    const prompt = `You are analyzing a Soroban smart contract call on the Stellar blockchain.

Contract ID: ${call.contract.contractId}
Contract Name: ${call.contract.name || 'Unknown'}
Function: ${call.functionName}
Parameters: ${JSON.stringify(call.inputsDecoded, null, 2)}
Result: ${call.status}${call.errorCode ? ` (Error: ${call.errorCode})` : ''}
Output: ${JSON.stringify(call.outputsDecoded, null, 2)}
Gas Used: ${call.gasUsed ? Number(call.gasUsed).toLocaleString() : 'N/A'}

Explain what this contract call does in plain English. Include:
1. What the function is designed to do
2. What the input parameters mean
3. What the output/result indicates
4. Any notable observations about gas usage or errors

Keep the explanation concise (2-4 paragraphs). Be technical but accessible.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const explanation = message.content[0].type === 'text'
      ? message.content[0].text
      : 'Unable to generate explanation';

    // Save to database and cache
    await Promise.all([
      // Update call with explanation
      prisma.contractCall.update({
        where: { id: callId },
        data: { aiExplanation: explanation },
      }),
      // Add to global cache (7 day expiry)
      prisma.aIExplanationCache.upsert({
        where: { callHash },
        create: {
          callHash,
          explanation,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        update: {
          explanation,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
      // Increment AI usage
      incrementAIUsage(user.organizationId),
    ]);

    return NextResponse.json({
      explanation,
      cached: false,
    });
  } catch (error) {
    console.error('AI explanation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    );
  }
}
