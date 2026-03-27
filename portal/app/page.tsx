import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'LumenQuery - Enterprise Stellar Horizon API & Soroban RPC Infrastructure',
  description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure. Enterprise-grade Horizon API and Soroban RPC with sub-100ms response times. Free tier available.',
  keywords: ['Stellar', 'Horizon API', 'Soroban RPC', 'blockchain', 'XLM', 'cryptocurrency', 'smart contracts', 'Web3'],
  alternates: {
    canonical: 'https://lumenquery.io',
  },
  openGraph: {
    title: 'LumenQuery - Enterprise Stellar Horizon API & Soroban RPC',
    description: 'Build blockchain applications on the Stellar network with reliable, scalable infrastructure. Enterprise-grade Horizon API and Soroban RPC.',
    type: 'website',
    url: 'https://lumenquery.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LumenQuery - Enterprise Stellar Infrastructure',
    description: 'Build on Stellar with reliable Horizon API and Soroban RPC. Start free.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1D1E26] text-white">
      <Header activePage="home" />

      <main>
        {/* Hero */}
        <header className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 rounded-full bg-[#7366FF]/10 border border-[#7366FF]/20 text-[#7366FF] text-xs sm:text-sm font-medium">Horizon API</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-medium">Soroban RPC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Stellar Infrastructure
            <br />
            <span className="text-gray-400">Made Simple</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
            Enterprise-grade Horizon API and Soroban RPC for the Stellar network.
            Build blockchain apps and smart contracts with reliable, scalable infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link href="/auth/signup" className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-semibold text-base sm:text-lg transition-colors text-center">
              Start for Free
            </Link>
            <Link href="/docs" className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-white/20 hover:border-[#7366FF] text-white hover:text-[#7366FF] font-semibold text-base sm:text-lg transition-colors text-center">
              View Documentation
            </Link>
          </div>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
            Free tier includes 10,000 requests/month • No credit card required
          </p>
        </div>
      </header>

        {/* Code Example */}
        <section className="py-10 sm:py-16 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="code-examples-heading">
          <h2 id="code-examples-heading" className="sr-only">API Code Examples</h2>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Horizon API Example */}
            <div className="bg-[#1D1E26] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28CA41]"></div>
                <span className="ml-2 sm:ml-4 px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-xs">Horizon API</span>
              </div>
              <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <code>{`$ curl -H "X-API-Key: lq_..." \\
  api.lumenquery.io/ledgers?limit=1

{
  "_embedded": {
    "records": [{
      "sequence": 60924672,
      "hash": "e9ff3504..."
    }]
  }
}`}</code>
              </pre>
            </div>

            {/* Soroban RPC Example */}
            <div className="bg-[#1D1E26] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28CA41]"></div>
                <span className="ml-2 sm:ml-4 px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">Soroban RPC</span>
              </div>
              <pre className="text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <code>{`$ curl -X POST \\
  -H "X-API-Key: lq_..." \\
  -d '{"jsonrpc":"2.0",
       "method":"getLatestLedger"}' \\
  rpc.lumenquery.io

{
  "result": {
    "sequence": 60924672
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

        {/* Features */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Why LumenQuery?</h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            Skip the infrastructure headaches. We handle the complexity so you can focus on building.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[#7366FF]/10 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Optimized infrastructure with global edge caching. Sub-100ms response times for most queries.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[#7366FF]/10 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                🔒
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Secure by Default</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                API key authentication, HTTPS encryption, and rate limiting protect your applications.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10 sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[#7366FF]/10 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                📈
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Built to Scale</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                From prototype to production. Handle millions of requests without changing a line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Pricing */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="pricing-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="pricing-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base">
            Start free, scale as you grow
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Free */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10 bg-[#262932]">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$0</div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Perfect for getting started</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 10,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 60 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Community support
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/10 hover:border-[#7366FF] text-white hover:text-[#7366FF] font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10 bg-[#262932]">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$29<span className="text-base sm:text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">For small applications</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 100,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 300 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Email support
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/10 hover:border-[#7366FF] text-white hover:text-[#7366FF] font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-[#7366FF] bg-[#262932] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#7366FF] text-white text-xs font-bold rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Professional</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$99<span className="text-base sm:text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">For growing businesses</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 1,000,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 1,000 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Analytics dashboard
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/10 bg-[#262932]">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Custom</div>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">For large organizations</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Unlimited requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> 5,000+ requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#7366FF]">✓</span> SLA guarantee
                </li>
              </ul>
              <a href="mailto:sales@lumenquery.io" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/10 hover:border-[#7366FF] text-white hover:text-[#7366FF] font-medium transition-colors text-sm sm:text-base">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Developer Guides */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="guides-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="guides-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Developer Guides</h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              In-depth guides for the Stellar API, RPC, and blockchain data infrastructure
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Link href="/guides/stellar-rpc-guide" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#7366FF]/10 flex items-center justify-center mb-3 group-hover:bg-[rgba(40,85,255,0.2)] transition-colors">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2">What is Stellar RPC?</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">Complete guide to the Stellar RPC API service, JSON-RPC methods, and production best practices.</p>
              </Link>
              <Link href="/guides/stellar-api-tutorial" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2">Stellar API Tutorial</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">Step-by-step guide to querying accounts, transactions, and smart contracts on Stellar.</p>
              </Link>
              <Link href="/guides/horizon-vs-rpc-vs-indexers" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2">Horizon vs RPC vs Indexers</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">Deep comparison to help you choose the right data access architecture for your app.</p>
              </Link>
              <Link href="/guides/lumenquery-tutorial" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-lg bg-[#7366FF]/10 flex items-center justify-center mb-3 group-hover:bg-[rgba(40,85,255,0.2)] transition-colors">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2">LumenQuery Tutorial</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3">Complete walkthrough of every feature in the Stellar Web3 developer platform.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Latest from the Blog */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="blog-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="blog-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Latest from the Blog</h2>
            <p className="text-center text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
              Industry insights, developer guides, and deep dives into the Stellar ecosystem
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Link href="/blog/stellar-foundation-real-world-assets" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">Industry Insights</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">How the Stellar Foundation Is Driving Real World Asset Adoption</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-3">Explore how SDF is positioning Stellar as the go-to blockchain for tokenized real world assets.</p>
                <span className="text-xs text-gray-400">2026-03-27 &middot; 12 min read</span>
              </Link>
              <Link href="/blog/stellar-foundation-roadmap-2026" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">Industry Insights</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">The Stellar Foundation Roadmap for 2026</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-3">Key milestones including 5000 TPS targets, Stellar RPC unification, and state archival improvements.</p>
                <span className="text-xs text-gray-400">2026-03-27 &middot; 14 min read</span>
              </Link>
              <Link href="/blog/using-stellar-rpc-access-blockchain-data" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">Developer Guide</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">Using the Stellar RPC to Access Blockchain Data</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-3">Hands-on guide to querying real-time ledger state, simulating transactions, and streaming events.</p>
                <span className="text-xs text-gray-400">2026-03-27 &middot; 13 min read</span>
              </Link>
              <Link href="/blog/stellar-expanding-developer-ecosystem" className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#262932] border border-white/10 hover:border-[#7366FF] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF] text-xs font-medium">Industry Insights</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base mb-2 line-clamp-2">How Stellar Is Expanding the Developer Ecosystem</h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-3">From Soroban smart contracts to improved SDKs, tooling, and grant programs for builders.</p>
                <span className="text-xs text-gray-400">2026-03-27 &middot; 11 min read</span>
              </Link>
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <Link href="/blog" className="inline-block px-6 py-3 rounded-lg border-2 border-white/10 hover:border-[#7366FF] text-white hover:text-[#7366FF] font-medium text-sm sm:text-base transition-colors">
                View All Articles
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#1D1E26]" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Ready to Build on Stellar?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-10">
              Join developers building the future of finance with LumenQuery.
            </p>
            <Link href="/auth/signup" className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#7366FF] hover:bg-[#5A4FCF] text-white font-semibold text-base sm:text-lg transition-colors">
              Start Building for Free
            </Link>
          </div>
        </section>
      </main>

      <Footer variant="full" />
    </div>
  );
}
