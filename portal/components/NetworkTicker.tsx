'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TickerData {
  ledger: number;
  tps: number;
  price: number;
  txCount24h: number;
}

export default function NetworkTicker() {
  const [data, setData] = useState<TickerData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/analytics/network', { next: { revalidate: 60 } });
        if (!res.ok) return;
        const json = await res.json();
        setData({
          ledger: json.ledger?.sequence || 0,
          tps: json.transactions?.tps || 0,
          price: json.market?.price || 0,
          txCount24h: json.transactions?.last24h || 0,
        });
      } catch {
        // Silently fail — ticker is non-critical
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  return (
    <div className="bg-[#1a1b22] border-b border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
          <Link href="/analytics" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-500">Ledger</span>
            <span className="font-mono text-gray-300">{data.ledger.toLocaleString()}</span>
          </Link>
          <Link href="/analytics" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
            <span className="text-gray-500">TPS</span>
            <span className="font-mono text-gray-300">{data.tps.toFixed(1)}</span>
          </Link>
          <Link href="/stellar" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
            <span className="text-gray-500">XLM</span>
            <span className="font-mono text-gray-300">${data.price.toFixed(4)}</span>
          </Link>
          <Link href="/dashboard/transactions" className="hidden sm:flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
            <span className="text-gray-500">24h Txns</span>
            <span className="font-mono text-gray-300">{formatNum(data.txCount24h)}</span>
          </Link>
        </div>
        <Link href="/auth/signup" className="text-[#7366FF] hover:text-[#8a7aff] font-medium whitespace-nowrap hidden sm:block transition-colors">
          Start Free →
        </Link>
      </div>
    </div>
  );
}
