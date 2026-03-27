'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Contract {
  id: string;
  contractId: string;
  name: string | null;
  totalCalls: number;
}

export function ContractSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Contract[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const search = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/contracts/search?q=${encodeURIComponent(query)}&limit=5`);
        const data = await res.json();
        setResults(data.contracts || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (contractId: string) => {
    setQuery('');
    setIsOpen(false);
    router.push(`/contracts/${contractId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.startsWith('C') && query.length > 10) {
      router.push(`/contracts/${query}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
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
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search by contract ID (C...) or name"
            className="w-full pl-12 pr-4 py-3 bg-[#262932] text-gray-900 placeholder-gray-500 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7366FF] focus:border-transparent text-base"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-[#7366FF] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#262932] border border-white/10 rounded-lg shadow-lg overflow-hidden">
          {results.map((contract) => (
            <button
              key={contract.id}
              onClick={() => handleSelect(contract.contractId)}
              className="w-full px-4 py-3 text-left hover:bg-[#1D1E26] transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="font-mono text-sm text-[#7366FF]">
                {contract.contractId.slice(0, 10)}...{contract.contractId.slice(-6)}
              </div>
              {contract.name && (
                <div className="text-sm text-gray-400">{contract.name}</div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {contract.totalCalls.toLocaleString()} calls
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute z-50 w-full mt-2 bg-[#262932] border border-white/10 rounded-lg shadow-lg p-4 text-center text-gray-400">
          No contracts found. Try entering a full contract ID.
        </div>
      )}
    </div>
  );
}
