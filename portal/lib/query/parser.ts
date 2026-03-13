// Natural language query parser

import { ParsedQuery, QueryType } from './types';

// Pattern matchers for different query types
const patterns: Array<{
  type: QueryType;
  patterns: RegExp[];
  extractor: (match: RegExpMatchArray, query: string) => Record<string, string | number | boolean>;
  description: (params: Record<string, string | number | boolean>) => string;
  sql: (params: Record<string, string | number | boolean>) => string;
}> = [
  // Top holders / largest wallets
  {
    type: 'top_holders',
    patterns: [
      /top\s+(\d+)\s+(?:wallets?|accounts?|holders?)\s*(?:holding|with)?\s*(?:xlm|lumens?)?/i,
      /top\s+(\d+)\s+xlm\s+holders?/i,
      /largest\s+(\d+)\s+(?:wallets?|accounts?|holders?)/i,
      /(?:wallets?|accounts?)\s+(?:with\s+)?(?:the\s+)?(?:most|highest|largest)\s+(?:xlm|balance)/i,
      /show\s+(?:me\s+)?(?:the\s+)?top\s+(\d+)\s+(?:xlm\s+)?(?:wallets?|holders?|accounts?)/i,
      /biggest\s+(?:xlm\s+)?(?:wallets?|holders?)/i,
      /xlm\s+holders?/i,
      /rich\s+(?:list|wallets?)/i,
      /(?:which|what)\s+(?:wallets?|accounts?)\s+(?:received|got)\s+(?:the\s+)?most\s+xlm/i,
      /(?:wallets?|accounts?)\s+(?:that\s+)?received\s+(?:the\s+)?most\s+xlm/i,
    ],
    extractor: (match, query) => {
      const limitMatch = query.match(/\d+/);
      return { limit: limitMatch ? parseInt(limitMatch[0]) : 10 };
    },
    description: (params) => `Top ${params.limit} XLM holders by balance`,
    sql: (params) => `SELECT account_id, balance, last_modified_time
FROM accounts
WHERE asset_type = 'native'
ORDER BY balance DESC
LIMIT ${params.limit};`,
  },

  // Account info
  {
    type: 'account_info',
    patterns: [
      /(?:account|wallet)\s+(?:info|details?|balance)?\s*(?:for\s+)?([GC][A-Z0-9]{55})/i,
      /([GC][A-Z0-9]{55})\s+(?:account|wallet|balance)/i,
      /balance\s+(?:of|for)\s+([GC][A-Z0-9]{55})/i,
      /show\s+(?:me\s+)?([GC][A-Z0-9]{55})/i,
    ],
    extractor: (match) => ({ accountId: match[1] }),
    description: (params) => `Account details for ${(params.accountId as string).substring(0, 8)}...`,
    sql: (params) => `SELECT account_id, balance, asset_type, asset_code, last_modified_time
FROM account_balances
WHERE account_id = '${params.accountId}';`,
  },

  // Recent payments
  {
    type: 'recent_payments',
    patterns: [
      /(?:recent|latest|last)\s+(\d+)?\s*payments?/i,
      /payments?\s+(?:in\s+)?(?:the\s+)?(?:last|past)\s+(\d+)?\s*(?:hours?|minutes?|days?)?/i,
      /show\s+(?:me\s+)?(?:recent\s+)?payments?/i,
    ],
    extractor: (match, query) => {
      const limitMatch = query.match(/(\d+)\s*(?:payments?|records?|results?)/i);
      const timeMatch = query.match(/(\d+)\s*(hours?|minutes?|days?)/i);
      return {
        limit: limitMatch ? parseInt(limitMatch[1]) : 20,
        timeUnit: timeMatch ? timeMatch[2].toLowerCase().replace(/s$/, '') : 'hour',
        timeValue: timeMatch ? parseInt(timeMatch[1]) : 24,
      };
    },
    description: (params) => `Recent ${params.limit} payments`,
    sql: (params) => `SELECT id, type, from_account, to_account, amount, asset, created_at
FROM payments
ORDER BY created_at DESC
LIMIT ${params.limit};`,
  },

  // Large payments
  {
    type: 'large_payments',
    patterns: [
      /(?:payments?|transfers?|transactions?)\s+(?:larger|greater|bigger|more)\s+than\s+([\d,]+(?:\.\d+)?)\s*(?:xlm|lumens?)?/i,
      /(?:large|big|huge|whale)\s+(?:payments?|transfers?|transactions?)/i,
      /([\d,]+(?:\.\d+)?)\s*(?:xlm|lumens?)?\s+(?:or\s+)?(?:more|larger|bigger)\s+(?:payments?|transfers?)/i,
    ],
    extractor: (match, query) => {
      const amountMatch = query.match(/([\d,]+(?:\.\d+)?)\s*(?:xlm|lumens?)?/i);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 1000000;
      const limitMatch = query.match(/(?:top|last|limit)\s+(\d+)/i);
      const timeMatch = query.match(/(?:last|past)\s+(\d+)\s*(hours?|days?)/i);
      return {
        minAmount: amount,
        limit: limitMatch ? parseInt(limitMatch[1]) : 20,
        timeValue: timeMatch ? parseInt(timeMatch[1]) : 24,
        timeUnit: timeMatch ? timeMatch[2].toLowerCase().replace(/s$/, '') : 'hour',
      };
    },
    description: (params) => `Payments larger than ${Number(params.minAmount).toLocaleString()} XLM`,
    sql: (params) => `SELECT id, from_account, to_account, amount, created_at
FROM payments
WHERE amount >= ${params.minAmount}
  AND asset_type = 'native'
ORDER BY amount DESC
LIMIT ${params.limit};`,
  },

  // Recent transactions
  {
    type: 'recent_transactions',
    patterns: [
      /(?:recent|latest|last)\s+(\d+)?\s*transactions?/i,
      /transactions?\s+(?:in\s+)?(?:the\s+)?(?:last|past)\s+(\d+)?\s*(?:hours?|minutes?)?/i,
      /show\s+(?:me\s+)?(?:recent\s+)?transactions?/i,
    ],
    extractor: (match, query) => {
      const limitMatch = query.match(/(\d+)\s*(?:transactions?|records?)/i);
      return { limit: limitMatch ? parseInt(limitMatch[1]) : 20 };
    },
    description: (params) => `Recent ${params.limit} transactions`,
    sql: (params) => `SELECT hash, source_account, fee_charged, operation_count, created_at, successful
FROM transactions
ORDER BY created_at DESC
LIMIT ${params.limit};`,
  },

  // Assets / tokens
  {
    type: 'assets',
    patterns: [
      /(?:top|popular|most\s+held)\s+(\d+)?\s*(?:assets?|tokens?)/i,
      /(?:assets?|tokens?)\s+(?:on\s+)?stellar/i,
      /(?:list|show)\s+(?:me\s+)?(?:all\s+)?(?:assets?|tokens?)/i,
      /what\s+(?:assets?|tokens?)\s+(?:are\s+)?(?:on|available)/i,
      /(?:trading|traded)\s+(?:assets?|tokens?)/i,
      /(?:highest|most)\s+(?:trading\s+)?volume\s+(?:assets?|tokens?)/i,
    ],
    extractor: (match, query) => {
      const limitMatch = query.match(/(\d+)\s*(?:assets?|tokens?)/i);
      return { limit: limitMatch ? parseInt(limitMatch[1]) : 20 };
    },
    description: (params) => `Top ${params.limit} assets on Stellar`,
    sql: (params) => `SELECT asset_code, asset_issuer, amount, num_accounts
FROM assets
ORDER BY num_accounts DESC
LIMIT ${params.limit};`,
  },

  // Account transactions
  {
    type: 'account_transactions',
    patterns: [
      /transactions?\s+(?:for|from|by)\s+([GC][A-Z0-9]{55})/i,
      /([GC][A-Z0-9]{55})\s+transactions?/i,
    ],
    extractor: (match) => ({ accountId: match[1], limit: 20 }),
    description: (params) => `Transactions for ${(params.accountId as string).substring(0, 8)}...`,
    sql: (params) => `SELECT hash, operation_count, fee_charged, created_at, successful
FROM transactions
WHERE source_account = '${params.accountId}'
ORDER BY created_at DESC
LIMIT ${params.limit};`,
  },

  // Ledger info
  {
    type: 'ledger_info',
    patterns: [
      /(?:current|latest|recent)\s+ledger/i,
      /ledger\s+(?:info|status|stats)/i,
      /network\s+(?:status|stats|info)/i,
    ],
    extractor: () => ({ limit: 1 }),
    description: () => 'Latest ledger information',
    sql: () => `SELECT sequence, hash, closed_at, transaction_count, operation_count, base_fee_in_stroops
FROM ledgers
ORDER BY sequence DESC
LIMIT 1;`,
  },

  // Operations
  {
    type: 'operations',
    patterns: [
      /(?:recent|latest|last)\s+(\d+)?\s*operations?/i,
      /operations?\s+(?:in\s+)?(?:the\s+)?(?:last|past)/i,
    ],
    extractor: (match, query) => {
      const limitMatch = query.match(/(\d+)\s*operations?/i);
      return { limit: limitMatch ? parseInt(limitMatch[1]) : 20 };
    },
    description: (params) => `Recent ${params.limit} operations`,
    sql: (params) => `SELECT id, type, source_account, created_at
FROM operations
ORDER BY created_at DESC
LIMIT ${params.limit};`,
  },
];

export function parseQuery(query: string): ParsedQuery {
  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();

  for (const pattern of patterns) {
    for (const regex of pattern.patterns) {
      const match = normalizedQuery.match(regex);
      if (match) {
        // For account_info, extract account ID from original query to preserve case
        let params: Record<string, string | number | boolean>;
        if (pattern.type === 'account_info' || pattern.type === 'account_transactions') {
          // Extract the account ID from the original query using the same pattern
          const originalMatch = trimmedQuery.match(regex);
          params = pattern.extractor(originalMatch || match, trimmedQuery);
        } else {
          params = pattern.extractor(match, normalizedQuery);
        }
        return {
          type: pattern.type,
          params,
          description: pattern.description(params),
          sql: pattern.sql(params),
        };
      }
    }
  }

  // Unknown query type - try to provide helpful suggestions
  return {
    type: 'unknown',
    params: { originalQuery: query },
    description: 'Unknown query type',
  };
}

export function getSuggestions(): string[] {
  return [
    'Show the top 10 wallets holding XLM',
    'Recent payments in the last 24 hours',
    'Transactions larger than 1,000,000 XLM',
    'Account info for G... (paste address)',
    'What assets are on Stellar?',
    'Latest ledger status',
    'Recent 50 transactions',
  ];
}
