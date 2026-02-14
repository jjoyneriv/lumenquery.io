'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Operation {
  index: number;
  type: string;
  description: string;
  raw: any;
}

interface Transaction {
  type: 'transaction' | 'connected' | 'error';
  hash?: string;
  ledger?: number;
  created_at?: string;
  source_account?: string;
  source_account_short?: string;
  fee_charged?: string;
  fee_xlm?: string;
  operation_count?: number;
  memo?: string | null;
  successful?: boolean;
  operations?: Operation[];
  envelope_xdr?: string;
  result_xdr?: string;
  message?: string;
}

export default function TransactionViewerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [showRawJson, setShowRawJson] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (!session || paused) return;

    const eventSource = new EventSource('/api/transactions/stream');
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data: Transaction = JSON.parse(event.data);

        if (data.type === 'connected') {
          setConnected(true);
          setError(null);
        } else if (data.type === 'error') {
          setError(data.message || 'Unknown error');
        } else if (data.type === 'transaction') {
          setTransactions((prev) => {
            // Check if transaction already exists
            if (prev.some((tx) => tx.hash === data.hash)) {
              return prev;
            }
            // Keep last 100 transactions
            const updated = [data, ...prev].slice(0, 100);
            return updated;
          });
        }
      } catch (e) {
        console.error('Error parsing transaction:', e);
      }
    };

    eventSource.onerror = () => {
      setConnected(false);
      setError('Connection lost. Reconnecting...');
    };

    return () => {
      eventSource.close();
    };
  }, [session, paused]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const togglePause = () => {
    if (paused) {
      setPaused(false);
    } else {
      setPaused(true);
      eventSourceRef.current?.close();
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const getOperationColor = (type: string): string => {
    const colors: Record<string, string> = {
      payment: 'bg-green-100 text-green-700',
      create_account: 'bg-blue-100 text-blue-700',
      invoke_host_function: 'bg-purple-100 text-purple-700',
      manage_sell_offer: 'bg-orange-100 text-orange-700',
      manage_buy_offer: 'bg-orange-100 text-orange-700',
      change_trust: 'bg-yellow-100 text-yellow-700',
      path_payment_strict_receive: 'bg-teal-100 text-teal-700',
      path_payment_strict_send: 'bg-teal-100 text-teal-700',
      set_options: 'bg-gray-100 text-gray-700',
      account_merge: 'bg-red-100 text-red-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#F5F6F7] flex items-center justify-center">
        <div className="text-[#6A6A6A]">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-[#333]">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2855FF] flex items-center justify-center">
                <span className="text-white font-bold text-sm">LQ</span>
              </div>
            </Link>
            <div>
              <h1 className="text-lg font-bold">Transaction Viewer</h1>
              <p className="text-[#888] text-xs">Live Stellar Network Transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${connected && !paused ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm text-[#888]">
                {paused ? 'Paused' : connected ? 'Live' : 'Connecting...'}
              </span>
            </div>
            <button
              onClick={togglePause}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                paused
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
            >
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={clearTransactions}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[#333] hover:bg-[#444] text-white transition-colors"
            >
              Clear
            </button>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[#333] hover:border-[#555] text-[#888] hover:text-white transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-900/50 border-b border-red-700 px-4 py-2 text-center text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Transaction List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4" ref={containerRef}>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[#888] text-sm">
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} loaded
          </p>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#555]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#888] mb-2">Waiting for transactions...</h3>
            <p className="text-[#555] text-sm">New transactions will appear here in real-time</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.hash}
                className="bg-[#1A1A1A] rounded-xl border border-[#333] overflow-hidden transition-all"
              >
                {/* Transaction Header */}
                <div
                  className="p-4 cursor-pointer hover:bg-[#222] transition-colors"
                  onClick={() => setExpandedTx(expandedTx === tx.hash ? null : tx.hash!)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${tx.successful ? 'bg-green-500' : 'bg-red-500'}`} />
                        <code className="text-[#2855FF] text-sm font-mono">{tx.hash?.slice(0, 16)}...</code>
                        <span className="text-[#555] text-xs">Ledger #{tx.ledger}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-[#888]">{formatDate(tx.created_at!)}</span>
                        <span className="text-[#555]">•</span>
                        <span className="text-[#888]">From: {tx.source_account_short}</span>
                        <span className="text-[#555]">•</span>
                        <span className="text-[#888]">Fee: {tx.fee_xlm} XLM</span>
                        {tx.memo && (
                          <>
                            <span className="text-[#555]">•</span>
                            <span className="text-yellow-500">Memo: {tx.memo}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-[#333] text-[#888] text-xs">
                        {tx.operation_count} op{tx.operation_count !== 1 ? 's' : ''}
                      </span>
                      <svg
                        className={`w-5 h-5 text-[#555] transition-transform ${expandedTx === tx.hash ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Operations Preview */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tx.operations?.slice(0, 3).map((op, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded text-xs font-medium ${getOperationColor(op.type)}`}
                      >
                        {op.description.length > 60 ? op.description.slice(0, 60) + '...' : op.description}
                      </span>
                    ))}
                    {(tx.operations?.length || 0) > 3 && (
                      <span className="px-2 py-1 rounded bg-[#333] text-[#888] text-xs">
                        +{(tx.operations?.length || 0) - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedTx === tx.hash && (
                  <div className="border-t border-[#333] p-4 bg-[#151515]">
                    {/* Full Details */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#888] mb-2">Transaction Details</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-[#555]">Hash</p>
                          <p className="font-mono text-xs break-all">{tx.hash}</p>
                        </div>
                        <div>
                          <p className="text-[#555]">Source Account</p>
                          <p className="font-mono text-xs break-all">{tx.source_account}</p>
                        </div>
                        <div>
                          <p className="text-[#555]">Ledger</p>
                          <p>{tx.ledger}</p>
                        </div>
                        <div>
                          <p className="text-[#555]">Status</p>
                          <p className={tx.successful ? 'text-green-500' : 'text-red-500'}>
                            {tx.successful ? 'Successful' : 'Failed'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Operations */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[#888] mb-2">Operations ({tx.operations?.length})</h4>
                      <div className="space-y-2">
                        {tx.operations?.map((op, i) => (
                          <div key={i} className="bg-[#1A1A1A] rounded-lg p-3 border border-[#333]">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[#555] text-xs">#{op.index}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getOperationColor(op.type)}`}>
                                    {op.type.replace(/_/g, ' ')}
                                  </span>
                                </div>
                                <p className="text-sm text-white">{op.description}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowRawJson(showRawJson === `${tx.hash}-${i}` ? null : `${tx.hash}-${i}`);
                                }}
                                className="text-xs text-[#2855FF] hover:underline"
                              >
                                {showRawJson === `${tx.hash}-${i}` ? 'Hide' : 'JSON'}
                              </button>
                            </div>
                            {showRawJson === `${tx.hash}-${i}` && (
                              <pre className="mt-2 p-2 bg-[#0D0D0D] rounded text-xs text-[#888] overflow-x-auto">
                                {JSON.stringify(op.raw, null, 2)}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* XDR */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#888] mb-2">Envelope XDR</h4>
                      <pre className="p-3 bg-[#0D0D0D] rounded-lg text-xs text-[#555] overflow-x-auto break-all whitespace-pre-wrap">
                        {tx.envelope_xdr}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
