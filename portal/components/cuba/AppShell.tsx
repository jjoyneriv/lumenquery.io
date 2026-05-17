'use client';

import { SidebarProvider, useSidebar } from './SidebarContext';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';

function ShellContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#1D1E26]">
      <Sidebar />
      <AppHeader />
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isCollapsed ? 'lg:pl-[70px]' : 'lg:pl-[255px]'
        }`}
      >
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellContent>{children}</ShellContent>
    </SidebarProvider>
  );
}
