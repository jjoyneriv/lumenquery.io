'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const docsNavItems = [
  { href: '/docs', label: 'API Reference' },
  { href: '/docs/analytics', label: 'Analytics' },
  { href: '/docs/intelligence', label: 'Intelligence' },
  { href: '/docs/contracts', label: 'Contracts' },
  { href: '/docs/portfolio', label: 'Portfolio' },
];

export default function DocsLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#F5F6F7] text-black">
      {/* Header */}
      <header className="bg-white border-b border-[#E6E7E9]">
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
              <h1 className="text-lg sm:text-2xl font-bold">API Documentation</h1>
              <p className="text-[#6A6A6A] text-xs sm:text-sm truncate max-w-[200px] sm:max-w-none">
                Horizon API & Soroban RPC
              </p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#2855FF] text-white text-xs sm:text-sm font-medium hover:bg-[#1E44CC] transition-colors"
          >
            Dashboard
          </Link>
        </nav>
        {/* Product Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto border-t border-[#E6E7E9]">
          <Link href="/dashboard/transactions" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Live Transactions
          </Link>
          <Link href="/contracts" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Contracts
          </Link>
          <Link href="/analytics" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Analytics
          </Link>
          <Link href="/intelligence" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Intelligence
          </Link>
          <Link href="/portfolio" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black transition-colors whitespace-nowrap">
            Portfolio
          </Link>
          <Link href="/docs" className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#2855FF] bg-[#2855FF]/10 hover:bg-[#2855FF]/20 transition-colors whitespace-nowrap">
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
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Sidebar Navigation */}
          <aside className="w-full md:w-56 flex-shrink-0">
            <nav className="bg-white rounded-xl border border-[#E6E7E9] p-4 sticky top-4">
              <h2 className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">
                Documentation
              </h2>
              <ul className="space-y-1">
                {docsNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-[#2855FF] text-white'
                            : 'text-[#6A6A6A] hover:bg-[#F5F6F7] hover:text-black'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
