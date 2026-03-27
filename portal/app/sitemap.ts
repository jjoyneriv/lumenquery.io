import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumenquery.io';
  const today = new Date('2026-03-27');

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/query`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.9,
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

  // Developer guides (SEO anchor pages)
  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides/stellar-rpc-guide`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/stellar-api-tutorial`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/horizon-vs-rpc-vs-indexers`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/lumenquery-tutorial`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.9,
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

  // Blog posts - ALL 20 posts with their actual publication dates
  const blogPosts: MetadataRoute.Sitemap = [
    // 2026-03-27 posts (RWA, roadmap, Stellar RPC, developer ecosystem)
    {
      url: `${baseUrl}/blog/stellar-foundation-real-world-assets`,
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/stellar-foundation-roadmap-2026`,
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/using-stellar-rpc-access-blockchain-data`,
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/stellar-expanding-developer-ecosystem`,
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 2026-02-22 posts (new Stellar RPC and use case posts)
    {
      url: `${baseUrl}/blog/soroban-to-stellar-rpc-rebrand`,
      lastModified: new Date('2026-02-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/horizon-api-vs-stellar-rpc`,
      lastModified: new Date('2026-02-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/stellar-5000-tps-roadmap-api-impact`,
      lastModified: new Date('2026-02-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/horizon-rpc-use-cases-financial-apps-2026`,
      lastModified: new Date('2026-02-22'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 2026-02-13 posts (SEO-optimized posts)
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
  // - /intelligence/* (requires auth, noindex)
  // - /portfolio/* (requires auth, noindex)
  // - /contracts/[contractId]/* (dynamic routes, require auth for full features)

  return [
    ...corePages,
    ...docPages,
    ...analyticsPages,
    ...contractsPages,
    ...guidePages,
    ...blogListing,
    ...blogPosts,
  ];
}
