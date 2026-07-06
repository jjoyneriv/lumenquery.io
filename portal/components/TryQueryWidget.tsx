'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const suggestions = [
  'Show me the top 10 XLM holders',
  'Payments larger than 100,000 XLM',
  'What assets are on Stellar?',
  'Latest ledger status',
  'Recent 50 transactions',
];

export default function TryQueryWidget() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/query?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    router.push(`/query?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: Show me the top 10 XLM holders"
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3.5 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors shadow-lg shadow-black/10 whitespace-nowrap"
        >
          Run Query
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mt-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSuggestion(s)}
            className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white/60 text-xs hover:bg-white/20 hover:text-white/80 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
