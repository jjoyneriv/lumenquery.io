export interface NavGrandchild {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
  badge?: string;
  children?: NavGrandchild[];
}

export interface NavItem {
  label: string;
  href?: string;
  icon: string;
  children?: NavChild[];
  badge?: string;
  requireAuth?: boolean;
  requireRole?: string;
}

export interface NavSection {
  heading: string;
  items: NavItem[];
}

export const sidebarNavigation: NavSection[] = [
  {
    heading: 'General',
    items: [
      {
        label: 'Home',
        href: '/homepage',
        icon: 'home',
      },
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'chart',
        requireAuth: true,
      },
      {
        label: 'Query',
        href: '/query',
        icon: 'search',
      },
    ],
  },
  {
    heading: 'Analytics',
    items: [
      {
        label: 'Network Analytics',
        icon: 'chart',
        children: [
          { label: 'Overview', href: '/analytics' },
          { label: 'Network', href: '/analytics/network' },
          { label: 'Tokens', href: '/analytics/tokens' },
        ],
      },
    ],
  },
  {
    heading: 'Products',
    items: [
      {
        label: 'Live Transactions',
        href: '/dashboard/transactions',
        icon: 'bolt',
        badge: 'Live',
      },
      {
        label: 'Smart Contracts',
        icon: 'code',
        children: [
          { label: 'Explorer', href: '/contracts' },
          { label: 'Deploy', href: '/contracts/deploy' },
        ],
      },
      {
        label: 'Intelligence',
        icon: 'eye',
        requireAuth: true,
        children: [
          { label: 'Overview', href: '/intelligence' },
          { label: 'Live Stream', href: '/intelligence/stream' },
          { label: 'Accounts', href: '/intelligence/accounts' },
          { label: 'Watchlists', href: '/intelligence/watchlists' },
          { label: 'Alerts', href: '/intelligence/alerts' },
          { label: 'Trustlines', href: '/intelligence/trustlines' },
          { label: 'Contracts', href: '/intelligence/contracts' },
        ],
      },
      {
        label: 'Portfolio',
        icon: 'wallet',
        requireAuth: true,
        children: [
          { label: 'Overview', href: '/portfolio' },
        ],
      },
    ],
  },
  {
    heading: 'Content',
    items: [
      {
        label: 'Blog',
        href: '/blog',
        icon: 'book',
      },
      {
        label: 'Documentation',
        icon: 'file',
        children: [
          { label: 'API Reference', href: '/docs' },
          {
            label: 'Analytics',
            href: '/docs/analytics',
            children: [
              { label: 'Introduction', href: '/docs/analytics#introduction' },
              { label: 'Dashboard', href: '/docs/analytics#dashboard' },
              { label: 'Time Ranges', href: '/docs/analytics#time-ranges' },
              { label: 'Network Metrics', href: '/docs/analytics#network' },
              { label: 'Token Analytics', href: '/docs/analytics#tokens' },
              { label: 'Smart Contracts', href: '/docs/analytics#contracts' },
              { label: 'Understanding Stroops', href: '/docs/analytics#stroops' },
              { label: 'API Reference', href: '/docs/analytics#api-reference' },
              { label: 'Data Sources', href: '/docs/analytics#data-sources' },
            ],
          },
          {
            label: 'Intelligence',
            href: '/docs/intelligence',
            children: [
              { label: 'Introduction', href: '/docs/intelligence#introduction' },
              { label: 'Dashboard', href: '/docs/intelligence#dashboard' },
              { label: 'Subscription Tiers', href: '/docs/intelligence#tiers' },
              { label: 'Live Stream', href: '/docs/intelligence#live-stream' },
              { label: 'Accounts', href: '/docs/intelligence#accounts' },
              { label: 'Watchlists', href: '/docs/intelligence#watchlists' },
              { label: 'Alerts', href: '/docs/intelligence#alerts' },
              { label: 'Trustlines', href: '/docs/intelligence#trustlines' },
              { label: 'Contracts', href: '/docs/intelligence#contracts' },
              { label: 'Stream API', href: '/docs/intelligence#api-stream' },
              { label: 'Accounts API', href: '/docs/intelligence#api-accounts' },
              { label: 'Watchlists API', href: '/docs/intelligence#api-watchlists' },
              { label: 'Alerts API', href: '/docs/intelligence#api-alerts' },
              { label: 'Trustlines API', href: '/docs/intelligence#api-trustlines' },
            ],
          },
          {
            label: 'Contracts',
            href: '/docs/contracts',
            children: [
              { label: 'Introduction', href: '/docs/contracts#introduction' },
              { label: 'Dashboard', href: '/docs/contracts#dashboard' },
              { label: 'Subscription Tiers', href: '/docs/contracts#tiers' },
              { label: 'Decoded Calls', href: '/docs/contracts#decoded-calls' },
              { label: 'Storage Viewer', href: '/docs/contracts#storage-viewer' },
              { label: 'Event Stream', href: '/docs/contracts#event-stream' },
              { label: 'AI Explanations', href: '/docs/contracts#ai-explanations' },
              { label: 'XDR Decoding', href: '/docs/contracts#xdr-decoding' },
              { label: 'Soroban Data Types', href: '/docs/contracts#data-types' },
              { label: 'API Reference', href: '/docs/contracts#api-reference' },
            ],
          },
          {
            label: 'Portfolio',
            href: '/docs/portfolio',
            children: [
              { label: 'Introduction', href: '/docs/portfolio#introduction' },
              { label: 'Dashboard', href: '/docs/portfolio#dashboard' },
              { label: 'Subscription Tiers', href: '/docs/portfolio#tiers' },
              { label: 'Portfolios', href: '/docs/portfolio#portfolios' },
              { label: 'Account Management', href: '/docs/portfolio#accounts' },
              { label: 'Asset Positions', href: '/docs/portfolio#positions' },
              { label: 'P&L Tracking', href: '/docs/portfolio#pnl' },
              { label: 'Trustline Risk', href: '/docs/portfolio#trustlines' },
              { label: 'Contract Positions', href: '/docs/portfolio#contracts' },
              { label: 'Yield Tracking', href: '/docs/portfolio#yield' },
              { label: 'Performance Snapshots', href: '/docs/portfolio#snapshots' },
              { label: 'Create a Portfolio', href: '/docs/portfolio#create-portfolio' },
              { label: 'Add an Account', href: '/docs/portfolio#add-account' },
              { label: 'Sync Portfolio Data', href: '/docs/portfolio#sync-data' },
              { label: 'Cost Basis (FIFO)', href: '/docs/portfolio#cost-basis' },
              { label: 'Risk Scoring', href: '/docs/portfolio#risk-scoring' },
              { label: 'API Reference', href: '/docs/portfolio#api-reference' },
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Support',
    items: [
      {
        label: 'Help Center',
        href: '/support',
        icon: 'support',
        requireAuth: true,
      },
    ],
  },
  {
    heading: 'Settings',
    items: [
      {
        label: 'Subscription',
        href: '/subscription',
        icon: 'tag',
        requireAuth: true,
      },
      {
        label: 'Pricing',
        href: '/pricing',
        icon: 'tag',
      },
      {
        label: 'Admin Console',
        icon: 'shield',
        requireRole: 'SUPER_ADMIN',
        children: [
          { label: 'Dashboard', href: '/admin' },
          { label: 'Users', href: '/admin/users' },
          { label: 'Support Tickets', href: '/admin/support' },
          { label: 'Usage', href: '/admin/usage' },
          { label: 'Audit Log', href: '/admin/audit' },
        ],
      },
    ],
  },
];

export const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  bolt: 'M13 10V3L4 14h7v7l9-11h-7z',
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  wallet: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  file: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  tag: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  support: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
};
