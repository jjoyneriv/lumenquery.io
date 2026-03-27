'use client';

import { formatRelativeTime, formatTxHash, formatLedger } from '@/lib/soroban/formatter';

interface Event {
  id: string;
  eventId: string;
  txHash: string;
  ledger: number;
  timestamp: string;
  eventType: string;
  topics: string[] | object | null;
  data: object | string | null;
}

interface EventStreamProps {
  events: Event[];
  typeCounts?: Array<{ type: string; count: number }>;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  system: { bg: 'bg-blue-100', text: 'text-blue-800' },
  contract: { bg: 'bg-green-100', text: 'text-green-800' },
  diagnostic: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export function EventStream({ events, typeCounts }: EventStreamProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-8 text-center">
        <svg
          className="w-12 h-12 mx-auto text-[#6A6A6A] mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <p className="text-[#6A6A6A]">No events found for this contract</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {typeCounts && typeCounts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {typeCounts.map(({ type, count }) => {
            const colors = typeColors[type] || { bg: 'bg-gray-100', text: 'text-gray-800' };
            return (
              <span
                key={type}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colors.bg} ${colors.text}`}
              >
                {type}: {count.toLocaleString()}
              </span>
            );
          })}
        </div>
      )}

      <div className="bg-white border border-[#E6E7E9] rounded-lg overflow-hidden">
        <div className="divide-y divide-[#E6E7E9]">
          {events.map((event) => {
            const colors = typeColors[event.eventType] || { bg: 'bg-gray-100', text: 'text-gray-800' };

            return (
              <div key={event.id} className="p-4 hover:bg-[#F5F6F7] transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}
                      >
                        {event.eventType}
                      </span>
                      <span className="text-xs text-[#6A6A6A]">
                        #{formatLedger(event.ledger)}
                      </span>
                      <span className="text-xs text-[#6A6A6A]">
                        {formatRelativeTime(event.timestamp)}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="text-xs text-[#6A6A6A]">TX: </span>
                      <code className="text-xs font-mono text-[#7366FF]">
                        {formatTxHash(event.txHash)}
                      </code>
                    </div>

                    {event.topics && (
                      <div className="mb-2">
                        <p className="text-xs text-[#6A6A6A] mb-1">Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {(Array.isArray(event.topics) ? event.topics : []).map((topic: string, i: number) => (
                            <code
                              key={i}
                              className="text-xs font-mono bg-[#F5F6F7] px-2 py-0.5 rounded"
                            >
                              {typeof topic === 'string' && topic.length > 20
                                ? `${topic.slice(0, 10)}...${topic.slice(-6)}`
                                : String(topic)}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.data && (
                      <div>
                        <p className="text-xs text-[#6A6A6A] mb-1">Data:</p>
                        <pre className="text-xs font-mono bg-[#F5F6F7] p-2 rounded overflow-x-auto max-h-24">
                          {typeof event.data === 'object'
                            ? JSON.stringify(event.data, null, 2)
                            : String(event.data)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
