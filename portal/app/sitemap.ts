import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumenquery.io';
  const today = new Date('2026-02-13');

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Documentation pages (all public)
  const docPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/docs`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/analytics`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/intelligence`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/compliance`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/contracts`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/portfolio`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Analytics pages (public, no auth required)
  const analyticsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/analytics`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analytics/network`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/analytics/tokens`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/analytics/contracts`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Contracts explorer (public landing page)
  const contractsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/contracts`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Blog listing
  const blogListing: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Blog posts - ALL 12 posts with their actual publication dates
  const blogPosts: MetadataRoute.Sitemap = [
    // 2026-02-13 posts (new SEO-optimized posts)
    {
      url: `${baseUrl}/blog/build-stellar-blockchain-explorer-horizon-api`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/soroban-json-rpc-explained`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/best-stellar-api-providers-2026`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/monitor-stellar-validator-horizon-node`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 2026-02-07 posts
    {
      url: `${baseUrl}/blog/using-claude-code-with-json-rpc-api`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/getting-started-with-claude-code`,
      lastModified: new Date('2026-02-07'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-02-03 posts
    {
      url: `${baseUrl}/blog/stellar-lumen-future-decentralized-applications`,
      lastModified: new Date('2026-02-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-02-02 posts
    {
      url: `${baseUrl}/blog/building-web3-with-rpc-nodes`,
      lastModified: new Date('2026-02-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-01-29 posts
    {
      url: `${baseUrl}/blog/future-of-stellar-blockchain-2026`,
      lastModified: new Date('2026-01-29'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-01-28 posts
    {
      url: `${baseUrl}/blog/xlm-retail-market-potential`,
      lastModified: new Date('2026-01-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-01-27 posts
    {
      url: `${baseUrl}/blog/stellar-api-use-cases-for-fintech`,
      lastModified: new Date('2026-01-27'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // 2026-01-25 posts
    {
      url: `${baseUrl}/blog/getting-started-with-lumenquery`,
      lastModified: new Date('2026-01-25'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Note: The following are excluded from sitemap (require auth or noindex):
  // - /auth/* (blocked by robots.txt)
  // - /dashboard/* (requires auth, noindex)
  // - /compliance/* (requires auth, noindex)
  // - /intelligence/* (requires auth, noindex)
  // - /portfolio/* (requires auth, noindex)
  // - /contracts/[contractId]/* (dynamic routes, require auth for full features)

  return [
    ...corePages,
    ...docPages,
    ...analyticsPages,
    ...contractsPages,
    ...blogListing,
    ...blogPosts,
  ];
}
