import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="home" />

      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#F5F6F7]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium">Horizon API</span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium">Soroban RPC</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Stellar Infrastructure
            <br />
            <span className="text-[#6A6A6A]">Made Simple</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A] mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
            Enterprise-grade Horizon API and Soroban RPC for the Stellar network.
            Build blockchain apps and smart contracts with reliable, scalable infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link href="/auth/signup" className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold text-base sm:text-lg transition-colors text-center">
              Start for Free
            </Link>
            <Link href="/docs" className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-semibold text-base sm:text-lg transition-colors text-center">
              View Documentation
            </Link>
          </div>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[#6A6A6A]">
            Free tier includes 10,000 requests/month • No credit card required
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Horizon API Example */}
            <div className="bg-[#0D0D0D] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
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
            <div className="bg-[#0D0D0D] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
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
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#F5F6F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Why LumenQuery?</h2>
          <p className="text-center text-[#6A6A6A] mb-8 sm:mb-12 md:mb-16 max-w-2xl mx-auto text-sm sm:text-base">
            Skip the infrastructure headaches. We handle the complexity so you can focus on building.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                ⚡
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Lightning Fast</h3>
              <p className="text-[#6A6A6A] text-sm sm:text-base">
                Optimized infrastructure with global edge caching. Sub-100ms response times for most queries.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                🔒
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Secure by Default</h3>
              <p className="text-[#6A6A6A] text-sm sm:text-base">
                API key authentication, HTTPS encryption, and rate limiting protect your applications.
              </p>
            </div>
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border border-[#E6E7E9] sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-6">
                📈
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Built to Scale</h3>
              <p className="text-[#6A6A6A] text-sm sm:text-base">
                From prototype to production. Handle millions of requests without changing a line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-[#6A6A6A] mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base">
            Start free, scale as you grow
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Free */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$0</div>
              <p className="text-[#6A6A6A] mb-4 sm:mb-6 text-sm sm:text-base">Perfect for getting started</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 10,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 60 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Community support
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Starter</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$29<span className="text-base sm:text-lg font-normal text-[#6A6A6A]">/mo</span></div>
              <p className="text-[#6A6A6A] mb-4 sm:mb-6 text-sm sm:text-base">For small applications</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 100,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 300 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Email support
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-[#2855FF] bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2855FF] text-white text-xs font-bold rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Professional</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">$99<span className="text-base sm:text-lg font-normal text-[#6A6A6A]">/mo</span></div>
              <p className="text-[#6A6A6A] mb-4 sm:mb-6 text-sm sm:text-base">For growing businesses</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 1,000,000 requests/month
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 1,000 requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Analytics dashboard
                </li>
              </ul>
              <Link href="/auth/signup" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-medium transition-colors text-sm sm:text-base">
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Custom</div>
              <p className="text-[#6A6A6A] mb-4 sm:mb-6 text-sm sm:text-base">For large organizations</p>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-6 sm:mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Unlimited requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> 5,000+ requests/minute
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2855FF]">✓</span> SLA guarantee
                </li>
              </ul>
              <a href="mailto:sales@lumenquery.io" className="block text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors text-sm sm:text-base">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">Ready to Build on Stellar?</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#6A6A6A] mb-6 sm:mb-10">
            Join developers building the future of finance with LumenQuery.
          </p>
          <Link href="/auth/signup" className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold text-base sm:text-lg transition-colors">
            Start Building for Free
          </Link>
        </div>
      </section>

      <Footer variant="full" />
    </div>
  );
}
