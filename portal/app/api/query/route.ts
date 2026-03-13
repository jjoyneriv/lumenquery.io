import { NextRequest, NextResponse } from 'next/server';
import { parseQuery, executeQuery, getSuggestions } from '@/lib/query';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Query is required',
          suggestions: getSuggestions(),
        },
        { status: 400 }
      );
    }

    // Parse the natural language query
    const parsed = parseQuery(query.trim());

    // Execute the query
    const result = await executeQuery(parsed);

    // Add suggestions for unknown queries
    if (!result.success && parsed.type === 'unknown') {
      result.suggestion = `Try one of these: ${getSuggestions().slice(0, 3).join(', ')}`;
    }

    return NextResponse.json({
      ...result,
      parsedQuery: {
        type: parsed.type,
        description: parsed.description,
      },
    });
  } catch (error) {
    console.error('Query API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred processing your query',
        suggestions: getSuggestions(),
      },
      { status: 500 }
    );
  }
}

// GET endpoint for suggestions
export async function GET() {
  return NextResponse.json({
    suggestions: getSuggestions(),
    examples: [
      {
        query: 'Show the top 10 wallets holding XLM',
        description: 'Find the largest XLM holders',
      },
      {
        query: 'Recent payments in the last hour',
        description: 'View recent payment activity',
      },
      {
        query: 'Transactions larger than 1,000,000 XLM',
        description: 'Find whale movements',
      },
      {
        query: 'What assets are on Stellar?',
        description: 'List popular tokens',
      },
      {
        query: 'Latest ledger status',
        description: 'Network information',
      },
    ],
  });
}
