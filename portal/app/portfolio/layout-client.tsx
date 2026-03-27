'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const portfolioNavItems = [
  { href: '/portfolio', label: 'Overview' },
];

export default function PortfolioLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Check if we're on a specific portfolio page
  const isPortfolioDetail = pathname?.match(/^\/portfolio\/[^/]+/);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center gap-2" aria-label="LumenQuery home">
              <Image
                src="/logo.png"
                alt="LumenQuery"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold">Portfolio Intelligence</h1>
              <p className="text-gray-400 text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">
                P&L, yield tracking & risk analysis
              </p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-white/10 hover:border-[#2855FF] hover:text-[#2855FF] text-xs sm:text-sm font-medium transition-colors"
          >
            Upgrade
          </Link>
        </nav>
        {/* Product Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <Link href="/dashboard/transactions" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Transactions
          </Link>
          <Link href="/contracts" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap">
            Contracts
          </Link>
          <Link href="/analytics" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap">
            Analytics
          </Link>
          <Link href="/intelligence" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap">
            Intelligence
          </Link>
          <Link href="/portfolio" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#2855FF] bg-[#2855FF]/10 hover:bg-[#2855FF]/20 transition-colors whitespace-nowrap">
            Portfolio
          </Link>
          <Link href="/docs" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap">
            Docs
          </Link>
          {session && (session.user as any)?.role === 'SUPER_ADMIN' && (
            <Link href="/admin" className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin
            </Link>
          )}
        </div>
        {/* Portfolio Sub-Navigation - only show on detail pages */}
        {isPortfolioDetail && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 border-t border-white/10">
            <div className="flex items-center gap-1 overflow-x-auto">
              <Link
                href="/portfolio"
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
              >
                All Portfolios
              </Link>
              <Link
                href={pathname || '/portfolio'}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-black text-white whitespace-nowrap"
              >
                Portfolio Details
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
