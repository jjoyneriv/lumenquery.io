'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ContractNavProps {
  contractId: string;
}

const navItems = [
  { href: '', label: 'Overview', icon: 'overview' },
  { href: '/calls', label: 'Calls', icon: 'calls' },
  { href: '/storage', label: 'Storage', icon: 'storage' },
  { href: '/events', label: 'Events', icon: 'events' },
  { href: '/analytics', label: 'Analytics', icon: 'analytics' },
];

const icons: Record<string, React.ReactNode> = {
  overview: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  calls: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  storage: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  events: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  analytics: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export function ContractNav({ contractId }: ContractNavProps) {
  const pathname = usePathname();
  const basePath = `/contracts/${contractId}`;

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block w-64 flex-shrink-0" aria-label="Contract navigation">
        <div className="sticky top-24 bg-[#262932] border border-white/10 rounded-lg p-2">
          {navItems.map((item) => {
            const href = basePath + item.href;
            const isActive = pathname === href || (item.href === '' && pathname === basePath);

            return (
              <Link
                key={item.href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#7366FF] text-white'
                    : 'text-gray-400 hover:bg-[#1D1E26] hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {icons[item.icon]}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile horizontal nav */}
      <nav className="lg:hidden overflow-x-auto -mx-4 px-4 pb-4" aria-label="Contract navigation">
        <div className="flex gap-2 min-w-max">
          {navItems.map((item) => {
            const href = basePath + item.href;
            const isActive = pathname === href || (item.href === '' && pathname === basePath);

            return (
              <Link
                key={item.href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7366FF] text-white'
                    : 'bg-[#262932] border border-white/10 text-gray-400 hover:border-[#7366FF]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {icons[item.icon]}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
