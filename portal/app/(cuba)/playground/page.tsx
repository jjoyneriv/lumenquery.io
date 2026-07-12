'use client';

import { useState } from 'react';
import Link from 'next/link';

const SAMPLE_ACCOUNT = 'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN7';

export default function Playground() {
  const [address, setAddress] = useState(SAMPLE_ACCOUNT);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const queryAccount = async () => {
    if (!address.startsWith('G') || address.length !== 56) {
      setError('Invalid Stellar address. Must start with G and be 56 characters.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`https://horizon.stellar.org/accounts/${address}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Account not found on the Stellar network.');
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setResult({
        account_id: data.account_id,
        sequence: data.sequence,
        balances: data.balances.map((b: any) => ({
          asset: b.asset_type === 'native' ? 'XLM' : `${b.asset_code}:${b.asset_issuer?.slice(0, 4)}...`,
          balance: b.balance,
        })),
        subentry_count: data.subentry_count,
        last_modified_ledger: data.last_modified_ledger,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">API Playground</h1>
        <p className="text-[#A8A9AD] text-sm">Try the Stellar Horizon API live. No account required.</p>
      </div>

      <div className="bg-[#262932] rounded-2xl border border-white/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded bg-green-900/50 text-green-300 text-[10px] font-semibold">GET</span>
          <span className="text-xs text-[#A8A9AD]">/accounts/{'{'}accountId{'}'}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Stellar account address (G...)"
            className="flex-1 px-4 py-3 rounded-lg bg-[#1D1E26] border border-white/10 text-sm text-white placeholder:text-[#A8A9AD] focus:outline-none focus:border-[#7366FF]/50 font-mono"
          />
          <button
            onClick={queryAccount}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[#7366FF] text-white text-sm font-medium hover:bg-[#5A4FCF] transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Querying...' : 'Query Account'}
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-[#1D1E26] rounded-lg border border-white/5 overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs text-green-400 font-medium">200 OK</span>
              <span className="text-xs text-[#A8A9AD]">horizon.stellar.org</span>
            </div>
            <pre className="p-4 text-xs text-gray-300 overflow-x-auto">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </div>
        )}

        {!result && !error && (
          <div className="p-8 rounded-lg bg-[#1D1E26] border border-white/5 text-center">
            <p className="text-[#A8A9AD] text-sm">Click &quot;Query Account&quot; to fetch live data from the Stellar network</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-[#7366FF]/10 to-transparent rounded-xl border border-[#7366FF]/20 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold mb-1">Want more?</h2>
            <p className="text-xs text-[#A8A9AD]">Get your own API key for rate-limited access, analytics, and premium endpoints.</p>
          </div>
          <Link href="/auth/signup" className="px-5 py-2.5 rounded-lg bg-[#7366FF] text-white text-sm font-medium hover:bg-[#5A4FCF] transition-colors whitespace-nowrap">
            Get Free API Key
          </Link>
        </div>
      </div>

      {/* SEO content */}
      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-bold">What You Can Query</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#262932] border border-white/5">
            <h3 className="text-sm font-semibold mb-2">Account Details</h3>
            <p className="text-xs text-[#A8A9AD]">Balances, sequence numbers, flags, signers, and thresholds for any Stellar account.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#262932] border border-white/5">
            <h3 className="text-sm font-semibold mb-2">Transaction History</h3>
            <p className="text-xs text-[#A8A9AD]">Full transaction history with decoded operations, memos, and fee details.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#262932] border border-white/5">
            <h3 className="text-sm font-semibold mb-2">Network Ledgers</h3>
            <p className="text-xs text-[#A8A9AD]">Browse ledger history, check TPS, fees, and protocol version changes.</p>
          </div>
          <div className="p-4 rounded-xl bg-[#262932] border border-white/5">
            <h3 className="text-sm font-semibold mb-2">Soroban Contracts</h3>
            <p className="text-xs text-[#A8A9AD]">Query smart contract state, events, and invocations via JSON-RPC.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="/stellar-horizon-api" className="text-sm text-[#7366FF] hover:underline">Horizon API Docs →</Link>
          <Link href="/soroban-rpc-api" className="text-sm text-[#7366FF] hover:underline">Soroban RPC Docs →</Link>
          <Link href="/docs" className="text-sm text-[#7366FF] hover:underline">Full Documentation →</Link>
        </div>
      </div>
    </div>
  );
}
