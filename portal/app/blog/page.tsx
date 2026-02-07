import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog - LumenQuery',
  description: 'Insights, tutorials, and updates from the LumenQuery team.',
};

const posts = [
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

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="blog" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Blog</h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A]">
            Insights, tutorials, and updates from the LumenQuery team
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E6E7E9] hover:border-[#2855FF] hover:shadow-lg transition-all">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <span className="px-2 sm:px-3 py-1 rounded-full bg-[rgba(40,85,255,0.1)] text-[#2855FF] text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-[#6A6A6A] text-xs sm:text-sm">{post.date}</span>
                  <span className="text-[#6A6A6A] text-xs sm:text-sm hidden sm:inline">•</span>
                  <span className="text-[#6A6A6A] text-xs sm:text-sm hidden sm:inline">{post.readTime}</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 hover:text-[#2855FF] transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#6A6A6A] leading-relaxed text-sm sm:text-base line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-3 sm:mt-4 text-[#2855FF] text-sm font-medium">
                  Read more →
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
