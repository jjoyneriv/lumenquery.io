'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { TransactionRow, Transaction } from './TransactionRow';
import { StreamStatusIndicator } from './StreamStatusIndicator';

interface TransactionFeedProps {
  filter?: 'all' | 'payments' | 'offers' | 'path_payments' | 'trustlines' | 'whale' | 'contracts';
  accountId?: string;
  assetCode?: string;
  autoScroll?: boolean;
  maxTransactions?: number;
  hasFullAccess?: boolean;
}

type StreamStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export function TransactionFeed({
  filter = 'all',
  accountId,
  assetCode,
  autoScroll = true,
  maxTransactions = 100,
  hasFullAccess = false,
}: TransactionFeedProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [status, setStatus] = useState<StreamStatus>('connecting');
  const [lastUpdate, setLastUpdate] = useState<Date | undefined>(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const params = new URLSearchParams();
    params.set('filter', filter);
    if (accountId) params.set('account', accountId);
    if (assetCode) params.set('asset', assetCode);

    const url = `/api/intelligence/stream?${params.toString()}`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setStatus('connected');
    };

    eventSource.addEventListener('connected', () => {
      setStatus('connected');
    });

    eventSource.addEventListener('transaction', (event) => {
      if (!isPaused) {
        try {
          const tx = JSON.parse(event.data) as Transaction;
          setTransactions((prev) => {
            const updated = [tx, ...prev].slice(0, maxTransactions);
            return updated;
          });
          setLastUpdate(new Date());

          if (autoScroll && containerRef.current) {
            containerRef.current.scrollTop = 0;
          }
        } catch (err) {
          console.error('Failed to parse transaction:', err);
        }
      }
    });

    eventSource.addEventListener('heartbeat', () => {
      setLastUpdate(new Date());
    });

    eventSource.addEventListener('error', (event) => {
      console.error('Stream error:', event);
      setStatus('error');
    });

    eventSource.onerror = () => {
      setStatus('disconnected');
      setTimeout(() => {
        if (!isPaused) {
          setStatus('connecting');
          connect();
        }
      }, 5000);
    };
  }, [filter, accountId, assetCode, isPaused, maxTransactions, autoScroll]);

  useEffect(() => {
    if (!isPaused) {
      connect();
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [connect, isPaused]);

  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setStatus('disconnected');
    }
  };

  const handleClear = () => {
    setTransactions([]);
  };

  return (
    <div className="bg-[#262932] rounded-xl border border-white/10 overflow-hidden h-full flex flex-col">
      <div className="px-4 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-white">Live Transaction Stream</h3>
          <StreamStatusIndicator status={status} lastUpdate={lastUpdate} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePause}
            className={`p-2 rounded-lg transition-colors ${
              isPaused
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            title="Clear"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            {status === 'connected' ? (
              <>
                <svg
                  className="w-12 h-12 mx-auto mb-4 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p>Waiting for transactions...</p>
              </>
            ) : status === 'connecting' ? (
              <p>Connecting to stream...</p>
            ) : (
              <p>Stream disconnected. Click resume to reconnect.</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#E6E7E9]">
            {transactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                transaction={tx}
                hasFullAccess={hasFullAccess}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-white/10 bg-[#1D1E26] text-xs text-gray-400">
        {transactions.length} transactions • Filter: {filter}
        {accountId && ` • Account: ${accountId.slice(0, 8)}...`}
        {assetCode && ` • Asset: ${assetCode}`}
      </div>
    </div>
  );
}
