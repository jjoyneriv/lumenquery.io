'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  let sid = sessionStorage.getItem('lq_sid');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('lq_sid', sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();
  const lastTracked = useRef('');

  useEffect(() => {
    if (!pathname || pathname === lastTracked.current) return;
    lastTracked.current = pathname;

    const sessionId = getSessionId();
    if (!sessionId) return;

    // Fire and forget - don't block rendering
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        sessionId,
        referrer: document.referrer || undefined,
      }),
    }).catch(() => {}); // Silently ignore errors
  }, [pathname]);

  return null;
}
