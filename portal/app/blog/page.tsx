import Link from 'next/link';

const posts = [
  {
    slug: 'build-stellar-blockchain-explorer-horizon-api',
    title: 'How to Build a Stellar Blockchain Explorer Using Horizon API (Step-by-Step Guide)',
    excerpt: 'Build a fully functional Stellar blockchain explorer from scratch. Learn to fetch transactions, query accounts, parse operations, and display ledger data using the LumenQuery Horizon API.',
    date: '2026-02-13',
    readTime: '15 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'soroban-json-rpc-explained',
    title: 'Soroban JSON RPC Explained: How to Query Smart Contracts on Stellar',
    excerpt: 'Master Soroban JSON-RPC for smart contract development on Stellar. Learn contract calls, event queries, simulation, and when to use Horizon vs Soroban RPC with production-ready infrastructure.',
    date: '2026-02-13',
    readTime: '12 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'best-stellar-api-providers-2026',
    title: 'Best Stellar API Providers in 2026 (Comparison Guide)',
    excerpt: 'Compare Stellar API providers: self-hosted Horizon, public endpoints, and managed services. Performance benchmarks, pricing, and feature comparisons to help you choose the right infrastructure.',
    date: '2026-02-13',
    readTime: '10 min read',
    category: 'Comparison',
  },
  {
    slug: 'monitor-stellar-validator-horizon-node',
    title: 'How to Monitor a Stellar Validator or Horizon Node in Production',
    excerpt: 'Set up comprehensive monitoring for Stellar validators and Horizon nodes. Covers Prometheus, Grafana dashboards, alerting strategies, RPC health checks, and ledger lag detection.',
    date: '2026-02-13',
    readTime: '14 min read',
    category: 'Operations',
  },
  {
    slug: 'using-claude-code-with-json-rpc-api',
    title: 'Using Claude Code to Interface with JSON-RPC APIs',
    excerpt: 'Learn how to leverage Claude Code, Anthropic\'s AI-powered CLI tool, to interact with JSON-RPC APIs like Stellar\'s Soroban RPC. Build, test, and debug blockchain applications faster with AI assistance.',
    date: '2026-02-07',
    readTime: '10 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'getting-started-with-claude-code',
    title: 'Getting Started with Claude Code: The AI-Powered Development Tool',
    excerpt: 'Discover how Claude Code can transform your development workflow. From installation to advanced features, learn everything you need to start building software with AI assistance.',
    date: '2026-02-07',
    readTime: '8 min read',
    category: 'Tutorial',
  },
  {
    slug: 'stellar-lumen-future-decentralized-applications',
    title: 'Stellar Lumen and the Future of Decentralized Applications',
    excerpt: 'Explore how Stellar\'s unique architecture, Soroban smart contracts, and focus on real-world utility position XLM as a foundation for the next generation of decentralized applications.',
    date: '2026-02-03',
    readTime: '11 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'building-web3-with-rpc-nodes',
    title: 'Building in Web3: The Essential Role of RPC Nodes',
    excerpt: 'Understand why RPC nodes are the backbone of Web3 development, how they work, and best practices for integrating reliable blockchain infrastructure into your decentralized applications.',
    date: '2026-02-02',
    readTime: '9 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'future-of-stellar-blockchain-2026',
    title: 'The Future of Stellar: What\'s Next for the Lumen Blockchain in 2026 and Beyond',
    excerpt: 'From Soroban smart contracts to institutional adoption, explore the technological roadmap and strategic direction shaping Stellar\'s future as a leading blockchain platform.',
    date: '2026-01-29',
    readTime: '10 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'xlm-retail-market-potential',
    title: 'XLM and the Retail Revolution: How Stellar Could Transform Everyday Payments',
    excerpt: 'Discover why Stellar Lumens (XLM) is uniquely positioned to bridge the gap between cryptocurrency and mainstream retail adoption, from point-of-sale integration to cross-border shopping.',
    date: '2026-01-28',
    readTime: '9 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'stellar-api-use-cases-for-fintech',
    title: '5 Powerful Use Cases for the Stellar Horizon API in Fintech',
    excerpt: 'Discover how businesses are leveraging the Stellar network through LumenQuery to build cross-border payments, tokenization platforms, and more.',
    date: '2026-01-27',
    readTime: '8 min read',
    category: 'Use Cases',
  },
  {
    slug: 'getting-started-with-lumenquery',
    title: 'Getting Started with LumenQuery: A Complete Guide',
    excerpt: 'Learn how to integrate LumenQuery into your application and start building on the Stellar network in minutes.',
    date: '2026-01-25',
    readTime: '5 min read',
    category: 'Tutorial',
  },
];

// Get unique categories
const categories = Array.from(new Set(posts.map(p => p.category)));

export default function BlogPage() {
  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">LumenQuery Blog</h1>
            <p className="text-[#6A6A6A] text-sm sm:text-base">
              Insights, tutorials, and updates from the LumenQuery team
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6A6A6A]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {posts.length} articles
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span
            key={category}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E6E7E9] text-xs font-medium text-[#6A6A6A]"
          >
            {category} ({posts.filter(p => p.category === category).length})
          </span>
        ))}
      </div>

      {/* Featured Post */}
      <Link
        href={`/blog/${posts[0].slug}`}
        className="block p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#2855FF] to-[#1E44CC] text-white hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
            Featured
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">
            {posts[0].category}
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">{posts[0].title}</h2>
        <p className="text-white/80 text-sm mb-3 line-clamp-2">{posts[0].excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-white/60">
          <time dateTime={posts[0].date}>{posts[0].date}</time>
          <span>{posts[0].readTime}</span>
        </div>
      </Link>

      {/* Recent Posts Grid */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <h2 className="text-lg font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(1, 5).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-4 rounded-lg bg-[#F5F6F7] hover:bg-[#E6E7E9] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#2855FF]/10 text-[#2855FF] text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-[#6A6A6A] text-xs">{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-[#6A6A6A] line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
        <h2 className="text-lg font-bold mb-4">All Articles</h2>
        <div className="space-y-3">
          {posts.slice(5).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#2855FF]/10 text-[#2855FF] text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">{post.title}</h3>
                  <p className="text-xs text-[#6A6A6A] line-clamp-1">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#6A6A6A] whitespace-nowrap">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#2855FF] text-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Start Building on Stellar</h2>
          <p className="text-white/80 text-sm mb-4">Get API access and start integrating with the Stellar network today.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-white text-[#2855FF] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Get API Key
            </Link>
            <Link
              href="/docs"
              className="px-6 py-2 bg-white/20 text-white rounded-lg font-medium text-sm hover:bg-white/30 transition-colors"
            >
              View Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
