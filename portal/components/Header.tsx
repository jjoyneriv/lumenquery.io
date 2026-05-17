'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  activePage?: 'home' | 'docs' | 'blog' | 'dashboard' | 'analytics' | 'contracts' | 'pricing' | 'intelligence' | 'portfolio' | 'admin' | 'query' | 'stellar';
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;

  const navLinkClass = (page: string) =>
    activePage === page
      ? 'text-[#7366FF] font-medium'
      : 'text-gray-400 hover:text-white font-medium';

  return (
    <header className="border-b border-white/10 bg-[#1D1E26]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LumenQuery"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <span className="text-lg sm:text-xl font-bold text-white">LumenQuery</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/stellar" className={navLinkClass('stellar')}>Stellar</Link>
          <Link href="/query" className={navLinkClass('query')}>Query</Link>
          <Link href="/contracts" className={navLinkClass('contracts')}>Contracts</Link>
          <Link href="/analytics" className={navLinkClass('analytics')}>Analytics</Link>
          <Link href="/intelligence" className={navLinkClass('intelligence')}>Intelligence</Link>
          <Link href="/portfolio" className={navLinkClass('portfolio')}>Portfolio</Link>
          <Link href="/docs" className={navLinkClass('docs')}>Docs</Link>
          <Link href="/pricing" className={navLinkClass('pricing')}>Pricing</Link>
          {userRole === 'SUPER_ADMIN' && (
            <Link href="/admin" className={`${navLinkClass('admin')} flex items-center gap-1`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin
            </Link>
          )}
          <Link href="/auth/signin" className="text-gray-400 hover:text-white font-medium">Sign In</Link>
          <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white text-sm font-medium transition-colors">
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1D1E26]">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              href="/stellar"
              className={`py-2 ${navLinkClass('stellar')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Stellar
            </Link>
            <Link
              href="/query"
              className={`py-2 ${navLinkClass('query')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Query
            </Link>
            <Link
              href="/contracts"
              className={`py-2 ${navLinkClass('contracts')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contracts
            </Link>
            <Link
              href="/analytics"
              className={`py-2 ${navLinkClass('analytics')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </Link>
            <Link
              href="/intelligence"
              className={`py-2 ${navLinkClass('intelligence')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Intelligence
            </Link>
            <Link
              href="/portfolio"
              className={`py-2 ${navLinkClass('portfolio')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/docs"
              className={`py-2 ${navLinkClass('docs')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className={`py-2 ${navLinkClass('pricing')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {userRole === 'SUPER_ADMIN' && (
              <Link
                href="/admin"
                className={`py-2 flex items-center gap-2 ${navLinkClass('admin')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin
              </Link>
            )}
            <Link
              href="/auth/signin"
              className="py-2 text-gray-400 hover:text-white font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white text-sm font-medium text-center transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
