'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { useSidebar } from './SidebarContext';

const breadcrumbNames: Record<string, string> = {
  dashboard: 'Dashboard',
  transactions: 'Live Transactions',
  analytics: 'Network Analytics',
  network: 'Network',
  tokens: 'Tokens',
  contracts: 'Smart Contracts',
  intelligence: 'Intelligence',
  stream: 'Live Stream',
  accounts: 'Accounts',
  watchlists: 'Watchlists',
  alerts: 'Alerts',
  trustlines: 'Trustlines',
  portfolio: 'Portfolio',
  docs: 'Documentation',
  blog: 'Blog',
  pricing: 'Pricing',
  admin: 'Admin Console',
  users: 'Users',
  usage: 'Usage',
  audit: 'Audit Log',
  query: 'Query',
  deploy: 'Deploy',
  guides: 'Guides',
};

export default function AppHeader() {
  const { isCollapsed, toggleCollapse, toggleMobile } = useSidebar();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const segments = pathname?.split('/').filter(Boolean) || [];
  const pageTitle = breadcrumbNames[segments[0] || ''] || 'Dashboard';

  return (
    <header
      className={`fixed top-0 right-0 h-16 z-30 bg-[#1D1E26] border-b border-white/10 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${
        isCollapsed ? 'lg:left-[70px]' : 'lg:left-[255px]'
      } left-0`}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-[#A8A9AD] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop collapse toggle */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex p-2 rounded-lg hover:bg-white/5 text-[#A8A9AD] hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-[#A8A9AD] hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          {segments.map((seg, i) => {
            const name = breadcrumbNames[seg] || seg;
            const href = '/' + segments.slice(0, i + 1).join('/');
            const isLast = i === segments.length - 1;
            return (
              <span key={href} className="flex items-center gap-2">
                <svg className="w-3 h-3 text-[#A8A9AD]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {isLast ? (
                  <span className="text-white font-medium">{name}</span>
                ) : (
                  <Link href={href} className="text-[#A8A9AD] hover:text-white transition-colors">
                    {name}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        {/* Mobile title */}
        <h1 className="sm:hidden text-white font-semibold text-sm">{pageTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {session ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7366FF] to-[#a26cf8] flex items-center justify-center text-white text-xs font-bold">
                {(session.user?.name?.[0] || session.user?.email?.[0] || 'U').toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm text-white font-medium truncate max-w-[120px]">
                  {session.user?.name || session.user?.email}
                </p>
                <p className="text-[10px] text-[#A8A9AD]">
                  {(session.user as any)?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Member'}
                </p>
              </div>
              <svg className="hidden md:block w-4 h-4 text-[#A8A9AD]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#262932] border border-white/10 rounded-xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-sm text-white font-medium truncate">{session.user?.name || 'User'}</p>
                  <p className="text-xs text-[#A8A9AD] truncate">{session.user?.email}</p>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#A8A9AD] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#FC564A] hover:bg-white/5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/signin"
              className="px-3 py-1.5 rounded-lg text-sm text-[#A8A9AD] hover:text-white border border-white/10 hover:border-[#7366FF] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-3 py-1.5 rounded-lg text-sm text-white bg-[#7366FF] hover:bg-[#5A4FCF] transition-colors"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
