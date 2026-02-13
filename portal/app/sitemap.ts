import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumenquery.io';

  // Static pages (public, indexable)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-02-13'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/analytics/network`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/analytics/tokens`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/analytics/contracts`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contracts`,
      lastModified: new Date('2026-02-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Note: /compliance and /intelligence are behind auth (noindex) - not included
  ];

  // Blog posts - ALL posts with their actual publication dates
  const blogPosts: MetadataRoute.Sitemap = [
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
    {
      url: `${baseUrl}/blog/stellar-lumen-future-decentralized-applications`,
      lastModified: new Date('2026-02-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/building-web3-with-rpc-nodes`,
      lastModified: new Date('2026-02-02'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/future-of-stellar-blockchain-2026`,
      lastModified: new Date('2026-01-29'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/xlm-retail-market-potential`,
      lastModified: new Date('2026-01-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/stellar-api-use-cases-for-fintech`,
      lastModified: new Date('2026-01-27'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/getting-started-with-lumenquery`,
      lastModified: new Date('2026-01-25'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...blogPosts];
}
