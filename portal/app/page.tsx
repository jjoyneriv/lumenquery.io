import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-[#E6E7E9]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#2855FF] flex items-center justify-center">
              <span className="text-white font-bold">LQ</span>
            </div>
            <span className="text-xl font-bold">LumenQuery</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-[#6A6A6A] hover:text-black font-medium">Docs</Link>
            <Link href="/blog" className="text-[#6A6A6A] hover:text-black font-medium">Blog</Link>
            <Link href="/auth/signin" className="text-[#6A6A6A] hover:text-black font-medium">Sign In</Link>
            <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white text-sm font-medium transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 bg-[#F5F6F7]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">Horizon API</span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">Soroban RPC</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Stellar Infrastructure
            <br />
            <span className="text-[#6A6A6A]">Made Simple</span>
          </h1>
          <p className="text-xl text-[#6A6A6A] mb-10 max-w-2xl mx-auto">
            Enterprise-grade Horizon API and Soroban RPC for the Stellar network.
            Build blockchain apps and smart contracts with reliable, scalable infrastructure.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup" className="px-8 py-4 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold text-lg transition-colors">
              Start for Free
            </Link>
            <Link href="/docs" className="px-8 py-4 rounded-lg border-2 border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-semibold text-lg transition-colors">
              View Documentation
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#6A6A6A]">
            Free tier includes 10,000 requests/month • No credit card required
          </p>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horizon API Example */}
            <div className="bg-[#0D0D0D] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
                <span className="ml-4 px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-xs">Horizon API</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
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
            <div className="bg-[#0D0D0D] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28CA41]"></div>
                <span className="ml-4 px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">Soroban RPC</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
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
      <section className="py-24 px-6 bg-[#F5F6F7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Why LumenQuery?</h2>
          <p className="text-center text-[#6A6A6A] mb-16 max-w-2xl mx-auto">
            Skip the infrastructure headaches. We handle the complexity so you can focus on building.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E6E7E9]">
              <div className="w-14 h-14 rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-2xl mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-[#6A6A6A]">
                Optimized infrastructure with global edge caching. Sub-100ms response times for most queries.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-[#E6E7E9]">
              <div className="w-14 h-14 rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-2xl mb-6">
                🔒
              </div>
              <h3 className="text-xl font-bold mb-3">Secure by Default</h3>
              <p className="text-[#6A6A6A]">
                API key authentication, HTTPS encryption, and rate limiting protect your applications.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-[#E6E7E9]">
              <div className="w-14 h-14 rounded-xl bg-[rgba(40,85,255,0.1)] flex items-center justify-center text-2xl mb-6">
                📈
              </div>
              <h3 className="text-xl font-bold mb-3">Built to Scale</h3>
              <p className="text-[#6A6A6A]">
                From prototype to production. Handle millions of requests without changing a line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-center text-[#6A6A6A] mb-16">
            Start free, scale as you grow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-4">$0</div>
              <p className="text-[#6A6A6A] mb-6">Perfect for getting started</p>
              <ul className="space-y-3 text-sm mb-8">
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
              <Link href="/auth/signup" className="block text-center px-6 py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors">
                Get Started
              </Link>
            </div>

            {/* Starter */}
            <div className="p-8 rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal text-[#6A6A6A]">/mo</span></div>
              <p className="text-[#6A6A6A] mb-6">For small applications</p>
              <ul className="space-y-3 text-sm mb-8">
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
              <Link href="/auth/signup" className="block text-center px-6 py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors">
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="p-8 rounded-2xl border-2 border-[#2855FF] bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#2855FF] text-white text-xs font-bold rounded-full">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">$99<span className="text-lg font-normal text-[#6A6A6A]">/mo</span></div>
              <p className="text-[#6A6A6A] mb-6">For growing businesses</p>
              <ul className="space-y-3 text-sm mb-8">
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
              <Link href="/auth/signup" className="block text-center px-6 py-3 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-medium transition-colors">
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl border border-[#E6E7E9] bg-white">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-4xl font-bold mb-4">Custom</div>
              <p className="text-[#6A6A6A] mb-6">For large organizations</p>
              <ul className="space-y-3 text-sm mb-8">
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
              <a href="mailto:sales@lumenquery.io" className="block text-center px-6 py-3 rounded-lg border border-[#E6E7E9] hover:border-[#2855FF] hover:text-[#2855FF] font-medium transition-colors">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Build on Stellar?</h2>
          <p className="text-xl text-[#6A6A6A] mb-10">
            Join developers building the future of finance with LumenQuery.
          </p>
          <Link href="/auth/signup" className="inline-block px-8 py-4 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white font-semibold text-lg transition-colors">
            Start Building for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-[#E6E7E9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#2855FF] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LQ</span>
                </div>
                <span className="font-bold">LumenQuery</span>
              </div>
              <p className="text-[#6A6A6A] text-sm">
                Enterprise Stellar Horizon API and Soroban RPC infrastructure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><Link href="/docs" className="hover:text-[#2855FF]">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-[#2855FF]">Blog</Link></li>
                <li><Link href="/auth/signup" className="hover:text-[#2855FF]">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><a href="https://developers.stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#2855FF]">Stellar Docs</a></li>
                <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#2855FF]">Stellar.org</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><a href="mailto:support@lumenquery.io" className="hover:text-[#2855FF]">Contact Us</a></li>
                <li><Link href="/dashboard" className="hover:text-[#2855FF]">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E6E7E9] pt-8 text-center text-sm text-[#6A6A6A]">
            © 2026 LumenQuery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
