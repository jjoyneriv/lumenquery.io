'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useSidebar } from './SidebarContext';
import { sidebarNavigation, iconPaths, NavItem, NavChild } from './navigation';

function NavIcon({ name, className = '' }: { name: string; className?: string }) {
  const d = iconPaths[name];
  if (!d) return null;
  return (
    <svg className={`w-5 h-5 flex-shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const { isCollapsed, openSections, toggleSection, openSection, closeMobile } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;
  const sectionKey = item.label;
  const isOpen = openSections.has(sectionKey);

  const isChildActive = hasChildren && item.children!.some(c =>
    pathname === c.href || (c.href !== '/' && pathname?.startsWith(c.href + '/'))
  );
  const isDirectActive = item.href && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href + '/')));
  const isActive = isDirectActive || isChildActive;

  useEffect(() => {
    if (isChildActive && !isOpen) {
      openSection(sectionKey);
    }
  }, [isChildActive, isOpen, openSection, sectionKey]);

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => toggleSection(sectionKey)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? 'text-[#7366FF]'
              : 'text-[#A8A9AD] hover:text-white hover:bg-white/5'
          }`}
          title={isCollapsed ? item.label : undefined}
        >
          <NavIcon name={item.icon} className={isActive ? 'text-[#7366FF]' : ''} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-500/20 text-green-400">
                  {item.badge}
                </span>
              )}
              <ChevronIcon open={isOpen} />
            </>
          )}
        </button>
        {!isCollapsed && isOpen && (
          <ul className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-0.5">
            {item.children!.map(child => {
              const childBase = child.href.split('#')[0];
              const childActive = pathname === childBase ||
                (childBase !== '/' && pathname?.startsWith(childBase + '/'));
              const hasGrandchildren = child.children && child.children.length > 0;
              const grandchildrenOpen = childActive && hasGrandchildren;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={closeMobile}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                      childActive
                        ? 'text-[#7366FF] bg-[#7366FF]/10 font-medium'
                        : 'text-[#A8A9AD] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {child.label}
                    {child.badge && (
                      <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-500/20 text-green-400">
                        {child.badge}
                      </span>
                    )}
                  </Link>
                  {grandchildrenOpen && (
                    <ul className="mt-1 ml-3 pl-3 border-l border-white/5 space-y-0.5">
                      {child.children!.map(gc => (
                        <li key={gc.href}>
                          <a
                            href={gc.href}
                            onClick={closeMobile}
                            className="block px-2 py-1.5 rounded text-xs text-[#A8A9AD] hover:text-[#7366FF] hover:bg-white/5 transition-colors"
                          >
                            {gc.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href!}
        onClick={closeMobile}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'text-[#7366FF] bg-[#7366FF]/10'
            : 'text-[#A8A9AD] hover:text-white hover:bg-white/5'
        }`}
        title={isCollapsed ? item.label : undefined}
      >
        <NavIcon name={item.icon} className={isActive ? 'text-[#7366FF]' : ''} />
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-green-500/20 text-green-400">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}

export default function Sidebar() {
  const { isCollapsed, isMobileOpen, closeMobile } = useSidebar();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;

  const filteredNav = sidebarNavigation.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (item.requireAuth && !session) return false;
      if (item.requireRole && userRole !== item.requireRole) return false;
      return true;
    }),
  })).filter(section => section.items.length > 0);

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 bg-[#262932] border-r border-white/10 flex flex-col transition-all duration-300 ${
          isCollapsed ? 'w-[70px]' : 'w-[255px]'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className={`flex items-center border-b border-white/10 h-16 flex-shrink-0 ${isCollapsed ? 'justify-center px-2' : 'px-5'}`}>
          <Link href="/" className="flex items-center gap-3 min-w-0" onClick={closeMobile}>
            <Image
              src="/logo.png"
              alt="LumenQuery"
              width={36}
              height={36}
              className="w-9 h-9 flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <span className="text-white font-bold text-base truncate block">LumenQuery</span>
                <span className="text-[#A8A9AD] text-[10px] tracking-wider uppercase">RPC Builder</span>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 sidebar-scroll">
          {filteredNav.map((section) => (
            <div key={section.heading} className="mb-4">
              {!isCollapsed && (
                <h3 className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#A8A9AD]/60">
                  {section.heading}
                </h3>
              )}
              {isCollapsed && <div className="border-t border-white/10 mx-2 mb-3" />}
              <ul className="space-y-0.5">
                {section.items.map(item => (
                  <SidebarItem key={item.label} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={`border-t border-white/10 p-3 flex-shrink-0 ${isCollapsed ? 'px-2' : ''}`}>
          {!isCollapsed ? (
            <div className="px-3 py-2 rounded-lg bg-[#7366FF]/10">
              <p className="text-[11px] text-[#7366FF] font-medium">LumenQuery.io</p>
              <p className="text-[10px] text-[#A8A9AD]">Stellar Blockchain Platform</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-[#7366FF]/10 flex items-center justify-center">
                <span className="text-[#7366FF] text-xs font-bold">LQ</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
