'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  activePage?: 'home' | 'docs' | 'blog' | 'dashboard' | 'analytics' | 'contracts' | 'pricing' | 'intelligence' | 'compliance' | 'portfolio';
}

export default function Header({ activePage = 'home' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (page: string) =>
    activePage === page
      ? 'text-[#2855FF] font-medium'
      : 'text-[#6A6A6A] hover:text-black font-medium';

  return (
    <header className="border-b border-[#E6E7E9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#2855FF] flex items-center justify-center">
            <span className="text-white font-bold text-sm sm:text-base">LQ</span>
          </div>
          <span className="text-lg sm:text-xl font-bold">LumenQuery</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/contracts" className={navLinkClass('contracts')}>Contracts</Link>
          <Link href="/analytics" className={navLinkClass('analytics')}>Analytics</Link>
          <Link href="/intelligence" className={navLinkClass('intelligence')}>Intelligence</Link>
          <Link href="/compliance" className={navLinkClass('compliance')}>Compliance</Link>
          <Link href="/portfolio" className={navLinkClass('portfolio')}>Portfolio</Link>
          <Link href="/docs" className={navLinkClass('docs')}>Docs</Link>
          <Link href="/pricing" className={navLinkClass('pricing')}>Pricing</Link>
          <Link href="/auth/signin" className="text-[#6A6A6A] hover:text-black font-medium">Sign In</Link>
          <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white text-sm font-medium transition-colors">
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-[#F5F6F7] transition-colors"
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
        <div className="md:hidden border-t border-[#E6E7E9] bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-3">
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
              href="/compliance"
              className={`py-2 ${navLinkClass('compliance')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Compliance
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
            <Link
              href="/auth/signin"
              className="py-2 text-[#6A6A6A] hover:text-black font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white text-sm font-medium text-center transition-colors"
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
