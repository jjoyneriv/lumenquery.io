import Link from 'next/link';

const posts = [
  {
    slug: 'build-stellar-payment-dashboard-horizon-api',
    title: 'How to Build a Stellar Payment Dashboard Using Horizon API Data',
    excerpt: 'A step-by-step developer tutorial showing how to display account balances, payment history, ledger info, and transaction status using the Stellar Horizon API.',
    date: '2026-06-05',
    readTime: '12 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'what-is-soroban-rpc-stellar-smart-contracts',
    title: 'What Is Soroban RPC and Why It Matters for Stellar Smart Contracts',
    excerpt: 'New to Soroban? This guide explains what Stellar RPC is, how it differs from Horizon, and why it is essential for building and interacting with smart contracts on Stellar.',
    date: '2026-06-05',
    readTime: '9 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'stellar-stablecoin-payments-low-fees-fast-settlement',
    title: 'Stellar for Stablecoin Payments: Why Low Fees and Fast Settlement Matter',
    excerpt: 'USDC has 2.1 million holders on Stellar. MoneyGram settles remittances on it. Here is why Stellar is becoming the default rail for stablecoin payments.',
    date: '2026-06-05',
    readTime: '10 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'track-live-stellar-transactions-real-time',
    title: 'How to Track Live Stellar Transactions in Real Time',
    excerpt: 'Stream decoded Stellar transactions as they happen using SSE, Horizon cursors, and the LumenQuery live transaction viewer. Includes working code examples.',
    date: '2026-06-05',
    readTime: '10 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'building-blockchain-explorer-stellar-core-data',
    title: 'Building a Blockchain Explorer for Stellar: Core Data You Need',
    excerpt: 'Accounts, ledgers, transactions, assets, operations — the five pillars of a Stellar explorer. Here is how to query and display each one.',
    date: '2026-06-05',
    readTime: '11 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'stellar-smart-contract-events-soroban-developers',
    title: 'Stellar Smart Contract Events Explained for Soroban Developers',
    excerpt: 'Soroban contract events are your primary observability tool. This guide covers how to emit, query, filter, and monitor events in production.',
    date: '2026-06-05',
    readTime: '11 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'api-rate-limits-blockchain-apps-production',
    title: 'How API Rate Limits Affect Blockchain Applications in Production',
    excerpt: 'Rate limits are the silent killer of blockchain apps. Learn how they work, how to optimize your usage, and when to upgrade from free to paid infrastructure.',
    date: '2026-06-05',
    readTime: '9 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'natural-language-search-stellar-blockchain-data',
    title: 'Using Natural Language Search to Query Stellar Blockchain Data',
    excerpt: 'Type "top 10 XLM holders" and get results. LumenQuery\'s natural language query turns plain English into Horizon API calls — no SDK knowledge required.',
    date: '2026-06-05',
    readTime: '8 min read',
    category: 'Tutorial',
  },
  {
    slug: 'horizon-api-vs-stellar-rpc-which-to-use',
    title: 'Horizon API vs Stellar RPC: Which One Should Your App Use?',
    excerpt: 'Horizon indexes historical blockchain data. Stellar RPC gives you real-time contract state and simulation. Here is when to use each, and when you need both.',
    date: '2026-06-04',
    readTime: '11 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'build-stellar-app-without-running-node',
    title: 'How to Build a Production-Ready Stellar App Without Running Your Own Node',
    excerpt: 'Running your own Horizon or Soroban node means disk management, ledger lag monitoring, and 24/7 uptime. Managed infrastructure lets you skip all of that and ship faster.',
    date: '2026-06-04',
    readTime: '10 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'soroban-smart-contract-monitoring-production',
    title: 'Soroban Smart Contract Monitoring: What Developers Should Track in Production',
    excerpt: 'Your contract is deployed. Now what? We cover the events, errors, storage changes, and latency metrics you should be watching — and how to set up alerts before something breaks.',
    date: '2026-06-04',
    readTime: '12 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'stellar-transaction-monitoring-exchanges-compliance',
    title: 'Real-Time Stellar Transaction Monitoring for Exchanges, Funds, and Compliance Teams',
    excerpt: 'Watchlists, whale alerts, suspicious flow detection, and webhook notifications. How institutional teams monitor the Stellar network in production.',
    date: '2026-06-04',
    readTime: '11 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'query-stellar-accounts-ledgers-javascript',
    title: 'How to Query Stellar Accounts, Ledgers, and Transactions with JavaScript',
    excerpt: 'A practical tutorial using the Stellar SDK and Horizon API. Fetch balances, parse operations, page through results, and handle errors — with working code examples.',
    date: '2026-06-04',
    readTime: '13 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'why-rwa-tokenization-growing-stellar',
    title: 'Why Real-World Asset Tokenization Is Growing on Stellar',
    excerpt: 'From Franklin Templeton\'s BENJI to $2B+ in onchain RWAs, Stellar has become a top-three chain for tokenized assets. Here is why institutions keep choosing it.',
    date: '2026-06-04',
    readTime: '10 min read',
    category: 'RWA Tokenization',
  },
  {
    slug: 'stellar-api-rate-limits-choose-plan',
    title: 'Stellar API Rate Limits Explained: How to Choose the Right Plan for Your App',
    excerpt: 'Public Horizon endpoints rate-limit aggressively. We break down usage patterns from hobby projects to enterprise integrations and help you pick the right tier.',
    date: '2026-06-04',
    readTime: '8 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'monitor-stellar-network-health-tps-latency',
    title: 'How to Monitor Stellar Network Health: Ledgers, TPS, Latency, and RPC Availability',
    excerpt: 'Whether you run a validator or just depend on the network, understanding Stellar\'s health metrics matters. Here is what to watch and how to set up monitoring.',
    date: '2026-06-04',
    readTime: '9 min read',
    category: 'Operations',
  },
  {
    slug: 'bermuda-onchain-economy-stellar',
    title: 'Stellar Is Powering Bermuda\'s Plan for a Fully Onchain Economy',
    excerpt: 'SDF announced on May 12 that Stellar will underpin Bermuda\'s effort to move government and financial payments onchain. Here is what the partnership means for the network and for builders.',
    date: '2026-05-15',
    readTime: '9 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'stellar-rwa-2-billion-q1-2026',
    title: 'Onchain RWAs on Stellar Surpass $2 Billion: Inside the Network\'s Biggest Growth Story',
    excerpt: 'Real-world asset tokenization is Stellar\'s defining narrative in 2026. With SDF\'s strategic investment in Ascend and over $2B in onchain RWAs in Q1, here is where things stand.',
    date: '2026-05-15',
    readTime: '10 min read',
    category: 'RWA Tokenization',
  },
  {
    slug: 'figure-ylds-stellar-tokenized-yield',
    title: 'Figure Launches YLDS on Stellar: What Tokenized Yield Means for Institutional Adoption',
    excerpt: 'Figure\'s YLDS token went live on Stellar on May 5, adding another institutional-grade tokenized yield product to the network. We break down the mechanics and implications.',
    date: '2026-05-15',
    readTime: '8 min read',
    category: 'RWA Tokenization',
  },
  {
    slug: 'xlm-price-016-may-2026-outlook',
    title: 'XLM at $0.16 in May 2026: On-Chain Strength Behind a Quiet Price',
    excerpt: 'Stellar Lumens is trading around $0.16 with market chatter focused on the $0.16-$0.17 range. We look at what the on-chain data says beneath the surface-level price action.',
    date: '2026-05-15',
    readTime: '7 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'franklin-templeton-benji-stellar-5-years',
    title: 'Franklin Templeton and Stellar Mark 5 Years of BENJI: The Tokenized Money Market Fund That Started It All',
    excerpt: 'BENJI, the first U.S.-registered money market fund on a public blockchain, celebrates five years on Stellar. We explore what this milestone means for RWA tokenization and why institutional finance keeps betting on Stellar.',
    date: '2026-05-03',
    readTime: '9 min read',
    category: 'RWA Tokenization',
  },
  {
    slug: 'xlm-price-may-2026-market-cap-ranking',
    title: 'XLM at $0.159: Stellar Holds Steady at #19 by Market Cap in May 2026',
    excerpt: 'Stellar Lumens trades around $0.159 with a $4.7B market cap, holding its position in the top 20. We break down the on-chain fundamentals, volume trends, and what the current valuation says about the network.',
    date: '2026-05-03',
    readTime: '7 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'stellar-payments-defi-rwa-positioning-2026',
    title: 'Stellar in 2026: How SDF Is Positioning the Network Around Payments, DeFi, and Asset Tokenization',
    excerpt: 'From cross-border remittances to tokenized treasuries and institutional DeFi, the Stellar Development Foundation is doubling down on real-world use cases. Here is where the network stands today.',
    date: '2026-05-03',
    readTime: '10 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'xlm-technical-analysis-breakout-levels-may-2026',
    title: 'XLM Technical Analysis: Can Stellar Break Above $0.20, or Is $0.14 Support the Next Test?',
    excerpt: 'Market chatter is focused on whether XLM can clear the $0.18-$0.20 resistance zone. We examine the key levels, on-chain signals, and broader crypto sentiment shaping the next move.',
    date: '2026-05-03',
    readTime: '8 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'moneygram-stellar-partnership-stablecoin-utility',
    title: 'MoneyGram and Stellar Extend Partnership to Scale Real-World Stablecoin Utility Globally',
    excerpt: 'MoneyGram and SDF announced a multi-year partnership extension to scale stablecoin-powered remittances across 200+ countries. With $4.2B in USDC volume and 500K agent locations, the developer opportunity is massive.',
    date: '2026-04-24',
    readTime: '10 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'stellar-regulatory-clarity-bullish-xlm',
    title: 'Why Regulatory Clarity Is the Most Bullish Case for Stellar and XLM',
    excerpt: 'From the GENIUS Act to XLM\'s commodity classification, regulatory clarity is unlocking institutional adoption at scale. Here\'s why Stellar\'s compliance-first design gives it a structural advantage.',
    date: '2026-04-24',
    readTime: '11 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'xlm-price-prediction-whale-accumulation',
    title: 'XLM Price Analysis: What Whale Accumulation and On-Chain Metrics Tell Us',
    excerpt: 'A 7.03 billion XLM exchange outflow, growing network usage, and improving regulatory clarity paint an interesting picture. We analyze the on-chain data behind the accumulation thesis.',
    date: '2026-04-24',
    readTime: '9 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'stellar-236-billion-economy-redefining-value',
    title: 'Stellar (XLM) and the $236B Economy Redefining How Value Moves Online',
    excerpt: 'With $55.6B in payment volume, $1B+ in tokenized RWAs, and the x402 protocol enabling AI agent micropayments, Stellar is building the infrastructure for a new kind of economy.',
    date: '2026-04-24',
    readTime: '12 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'stellar-record-14-million-transactions',
    title: 'Stellar Hits Record 14.1 Million Transactions in a Single Day',
    excerpt: 'The Stellar network reached a historic milestone with over 14.1 million transactions processed in 24 hours, signaling explosive growth in on-chain activity and real-world adoption.',
    date: '2026-04-19',
    readTime: '8 min read',
    category: 'Network Performance',
  },
  {
    slug: 'stellar-protocol-26-yardstick-upgrade',
    title: 'Protocol 26 (Yardstick): Stellar\'s Next Major Upgrade Goes Live on Testnet',
    excerpt: 'The testnet for Stellar\'s Protocol 26 upgrade, codenamed Yardstick, went live on April 16, 2026. Here\'s what developers need to know ahead of the mainnet vote in May.',
    date: '2026-04-19',
    readTime: '10 min read',
    category: 'Protocol Update',
  },
  {
    slug: 'stellar-institutional-rwa-adoption-2026',
    title: 'Mercado Bitcoin and RedSwan Bring $300M in Real World Assets to Stellar',
    excerpt: 'Mercado Bitcoin announced a $200M RWA issuance and RedSwan brought $100M in tokenized real estate to Stellar, marking a major milestone for institutional adoption.',
    date: '2026-04-19',
    readTime: '9 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'micar-eurau-stablecoin-stellar',
    title: 'MiCAR-Compliant EURAU Stablecoin Launches on Stellar for European Settlement',
    excerpt: 'A new euro-denominated stablecoin, EURAU, has been integrated on Stellar for institutional settlement, fully compliant with the EU\'s Markets in Crypto-Assets Regulation (MiCAR).',
    date: '2026-04-19',
    readTime: '7 min read',
    category: 'Stablecoins',
  },
  {
    slug: 'lobstr-xrp-ledger-cross-chain',
    title: 'LOBSTR Wallet Adds XRP Ledger Support: Cross-Chain Utility Expands',
    excerpt: 'LOBSTR, one of the most popular Stellar wallets, has added support for the XRP Ledger, giving users seamless access to assets across both networks from a single interface.',
    date: '2026-04-19',
    readTime: '6 min read',
    category: 'Ecosystem',
  },
  {
    slug: 'xlm-market-performance-outpacing-crypto',
    title: 'XLM Outpaces the Crypto Market: What\'s Driving Stellar\'s Strong Performance',
    excerpt: 'Stellar Lumens (XLM) has shown remarkable strength with weekly gains outpacing the average cryptocurrency. We analyze the catalysts behind the rally and what it means for the ecosystem.',
    date: '2026-04-19',
    readTime: '8 min read',
    category: 'Market Analysis',
  },
  {
    slug: 'stellar-foundation-real-world-assets',
    title: 'How the Stellar Foundation Is Driving Real World Asset Adoption on Chain',
    excerpt: 'Explore how SDF is positioning Stellar as the go-to blockchain for tokenized real world assets, from treasury bills and bonds to carbon credits, and what this means for developers and institutions.',
    date: '2026-03-27',
    readTime: '12 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'stellar-foundation-roadmap-2026',
    title: 'The Stellar Foundation Roadmap for 2026: Key Milestones and What Developers Should Know',
    excerpt: 'A deep dive into SDF\'s 2026 roadmap including 5000 TPS targets, Stellar RPC unification, state archival improvements, and how each milestone impacts your applications and integrations.',
    date: '2026-03-27',
    readTime: '14 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'using-stellar-rpc-access-blockchain-data',
    title: 'Using the Stellar RPC to Access Real-Time Blockchain Data',
    excerpt: 'A hands-on guide to querying real-time ledger state, simulating transactions, and streaming events using the Stellar RPC. Includes code examples, method reference, and best practices for production apps.',
    date: '2026-03-27',
    readTime: '13 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'stellar-expanding-developer-ecosystem',
    title: 'How Stellar Is Expanding the Developer Ecosystem in 2026',
    excerpt: 'From Soroban smart contracts to improved SDKs, better tooling, and grant programs, discover how SDF is building a thriving developer community and what opportunities exist for builders.',
    date: '2026-03-27',
    readTime: '11 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'soroban-to-stellar-rpc-rebrand',
    title: 'From Soroban to Stellar RPC: What the Rebrand Means for Developers',
    excerpt: 'Explore the recent shift from Soroban RPC to Stellar RPC, why SDF made the change, and how this unified data access strategy simplifies querying real-time network state and smart contract interactions.',
    date: '2026-02-22',
    readTime: '10 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'horizon-api-vs-stellar-rpc',
    title: 'Building Real-Time Apps on Stellar: Horizon API vs Stellar RPC',
    excerpt: 'A comparative guide showing when to use Horizon (historical data, deep indexing) versus Stellar RPC (real-time state, transaction simulation), plus code snippets and practical use cases.',
    date: '2026-02-22',
    readTime: '12 min read',
    category: 'Developer Guide',
  },
  {
    slug: 'stellar-5000-tps-roadmap-api-impact',
    title: "How Stellar's Roadmap to 5000 TPS Impacts Your API Integrations",
    excerpt: "Break down SDF's scalability goals for ~5000 TPS and what changes developers should expect in Horizon and RPC infrastructure—including performance, redundancy, and future-proofing applications.",
    date: '2026-02-22',
    readTime: '11 min read',
    category: 'Industry Insights',
  },
  {
    slug: 'horizon-rpc-use-cases-financial-apps-2026',
    title: 'Top 5 Horizon & RPC Use Cases for Financial Apps in 2026',
    excerpt: 'Popular real-world use cases: cross-border payments, token issuance, DEX integration, real-time monitoring, and smart contract management—with real API patterns for each.',
    date: '2026-02-22',
    readTime: '13 min read',
    category: 'Use Cases',
  },
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
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">LumenQuery Blog</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Insights, tutorials, and updates from the LumenQuery team
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
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
            className="px-3 py-1.5 rounded-lg bg-[#262932] border border-white/10 text-xs font-medium text-gray-400"
          >
            {category} ({posts.filter(p => p.category === category).length})
          </span>
        ))}
      </div>

      {/* Featured Post */}
      <Link
        href={`/blog/${posts[0].slug}`}
        className="block p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#7366FF] to-[#5A4FCF] text-white hover:shadow-lg transition-shadow"
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
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <h2 className="text-lg font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(1, 5).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs">{post.readTime}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
        <h2 className="text-lg font-bold mb-4">All Articles</h2>
        <div className="space-y-3">
          {posts.slice(5).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 rounded-lg border border-white/10 hover:border-[#7366FF] hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 truncate">{post.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 whitespace-nowrap">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white">
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Start Building on Stellar</h2>
          <p className="text-white/80 text-sm mb-4">Get API access and start integrating with the Stellar network today.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/auth/signup"
              className="px-6 py-2 bg-white text-[#7366FF] rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
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
