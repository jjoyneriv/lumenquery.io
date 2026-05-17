'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const isPausedRef = useRef(false);
  const seenIdsRef = useRef<Set<string>>(new Set());

  // Keep ref in sync with state
  isPausedRef.current = isPaused;

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();

    const params = new URLSearchParams();
    params.set('filter', filter);
    if (accountId) params.set('account', accountId);
    if (assetCode) params.set('asset', assetCode);

    const url = `/api/intelligence/stream?${params.toString()}`;
    const es = new EventSource(url);
    eventSourceRef.current = es;

    es.addEventListener('connected', () => {
      setStatus('connected');
    });

    es.addEventListener('transaction', (event) => {
      if (isPausedRef.current) return;
      try {
        const data = JSON.parse(event.data);
        const txId = data.id || data.hash || '';

        // Deduplicate
        if (txId && seenIdsRef.current.has(txId)) return;
        if (txId) {
          seenIdsRef.current.add(txId);
          // Keep set bounded
          if (seenIdsRef.current.size > 500) {
            const arr = Array.from(seenIdsRef.current);
            seenIdsRef.current = new Set(arr.slice(-250));
          }
        }

        const tx: Transaction = {
          id: txId || String(Date.now()) + Math.random(),
          type: data.transactionType || data.type || 'unknown',
          sourceAccount: data.sourceAccount
            ? `${data.sourceAccount.slice(0, 6)}...${data.sourceAccount.slice(-6)}`
            : 'Unknown',
          fullSourceAccount: data.sourceAccount,
          timestamp: data.createdAt || new Date().toISOString(),
          ledger: 0,
          txHash: data.hash || data.id || '',
          amount: data.amount,
          assetCode: data.assetCode || (data.assetType === 'native' ? 'XLM' : data.assetCode),
          destinationAccount: data.to
            ? `${data.to.slice(0, 6)}...${data.to.slice(-6)}`
            : undefined,
          fullDestinationAccount: data.to,
        };

        setTransactions((prev) => [tx, ...prev].slice(0, maxTransactions));
        setLastUpdate(new Date());

        if (autoScroll && containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
      } catch (err) {
        console.error('Failed to parse transaction:', err);
      }
    });

    es.addEventListener('heartbeat', () => {
      setLastUpdate(new Date());
    });

    es.onerror = () => {
      setStatus('disconnected');
      cleanup();
      // Reconnect after delay unless paused
      setTimeout(() => {
        if (!isPausedRef.current) {
          setStatus('connecting');
          connect();
        }
      }, 5000);
    };
  }, [filter, accountId, assetCode, maxTransactions, autoScroll, cleanup]);

  // Connect on mount and when filter changes
  useEffect(() => {
    if (!isPaused) {
      setStatus('connecting');
      connect();
    }
    return cleanup;
  }, [filter, accountId, assetCode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
      setStatus('connecting');
      connect();
    } else {
      setIsPaused(true);
      isPausedRef.current = true;
      cleanup();
      setStatus('disconnected');
    }
  };

  const handleClear = () => {
    setTransactions([]);
    seenIdsRef.current.clear();
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
                ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                : 'bg-[#FFB829]/10 text-[#FFB829] hover:bg-[#FFB829]/20'
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
            className="p-2 rounded-lg bg-white/5 text-[#A8A9AD] hover:bg-white/10 transition-colors"
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
                <svg className="w-12 h-12 mx-auto mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <p>Waiting for transactions...</p>
              </>
            ) : status === 'connecting' ? (
              <div>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7366FF] mx-auto mb-4" />
                <p>Connecting to stream...</p>
              </div>
            ) : (
              <p>Stream disconnected. Click resume to reconnect.</p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
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
