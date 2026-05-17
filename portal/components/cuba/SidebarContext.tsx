'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  openSections: Set<string>;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
  toggleSection: (key: string) => void;
  openSection: (key: string) => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('cuba-sidebar-collapsed');
    if (saved === 'true') setIsCollapsed(true);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => {
      localStorage.setItem('cuba-sidebar-collapsed', String(!prev));
      return !prev;
    });
  }, []);

  const toggleMobile = useCallback(() => {
    setIsMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const toggleSection = useCallback((key: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const openSection = useCallback((key: string) => {
    setOpenSections(prev => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider value={{
      isCollapsed,
      isMobileOpen,
      openSections,
      toggleCollapse,
      toggleMobile,
      closeMobile,
      toggleSection,
      openSection,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
