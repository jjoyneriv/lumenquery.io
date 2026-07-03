import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stellar API Rate Limits and Scaling Guide',
  description: 'Learn how Stellar API rate limits affect production apps and how LumenQuery helps developers scale Horizon and RPC access.',
  keywords: ['Stellar API rate limits', 'Stellar Horizon rate limit', 'Stellar RPC rate limit', 'Stellar API scaling', 'Horizon API throttling', 'Stellar production API'],
  alternates: { canonical: 'https://lumenquery.io/stellar-api-rate-limits' },
  openGraph: {
    title: 'Stellar API Rate Limits and Scaling Guide',
    description: 'Learn how Stellar API rate limits affect production apps and how LumenQuery helps developers scale Horizon and RPC access.',
    type: 'website',
    url: 'https://lumenquery.io/stellar-api-rate-limits',
  },
  robots: { index: true, follow: true },
};

export default function StellarApiRateLimitsPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Stellar API Rate Limits and Scaling Guide',
    description: 'Learn how Stellar API rate limits affect production apps and how LumenQuery helps developers scale Horizon and RPC access.',
    url: 'https://lumenquery.io/stellar-api-rate-limits',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the rate limits on the public Stellar Horizon API?',
        acceptedAnswer: { '@type': 'Answer', text: 'The SDF-operated public Horizon instance at horizon.stellar.org enforces rate limits that vary but are generally around 1 request per second for unauthenticated users. During peak network activity, limits may be tightened further. There is no SLA or guarantee of availability.' },
      },
      {
        '@type': 'Question',
        name: 'What happens when I exceed Stellar API rate limits?',
        acceptedAnswer: { '@type': 'Answer', text: 'When you exceed rate limits, the Horizon API returns HTTP 429 (Too Many Requests) responses. Your application must handle this gracefully with retry logic and exponential backoff, or risk dropped data, broken user experiences, and incomplete transaction processing.' },
      },
      {
        '@type': 'Question',
        name: 'How do I scale beyond public Stellar API rate limits?',
        acceptedAnswer: { '@type': 'Answer', text: 'You have three main options: self-host a Horizon instance (complex and expensive), use a managed provider like LumenQuery (simplest), or implement aggressive caching and request batching. Most production applications combine a managed API provider with application-level caching.' },
      },
      {
        '@type': 'Question',
        name: 'Does self-hosting Horizon remove rate limits?',
        acceptedAnswer: { '@type': 'Answer', text: 'Self-hosting removes external rate limits, but you are now responsible for server provisioning, database management (PostgreSQL), captive core synchronization, monitoring, security patching, and disaster recovery. The infrastructure cost for a reliable Horizon instance starts at $200-500/month.' },
      },
      {
        '@type': 'Question',
        name: 'What rate limits does LumenQuery offer?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery offers tiered rate limits starting with 10,000 requests/month on the free plan. Paid plans increase limits to 100,000+ requests/month with burst capacity for traffic spikes. All plans include built-in caching that reduces the effective number of upstream requests.' },
      },
      {
        '@type': 'Question',
        name: 'How does caching help with Stellar API rate limits?',
        acceptedAnswer: { '@type': 'Answer', text: 'LumenQuery uses Redis-backed caching with configurable TTLs. Network metrics are cached for 30 seconds, historical data for 5-10 minutes. This means repeated requests for the same data are served from cache without consuming your rate limit quota, and response times drop from 200-500ms to under 10ms.' },
      },
      {
        '@type': 'Question',
        name: 'Are Soroban RPC rate limits different from Horizon?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. The public Soroban RPC endpoint has its own rate limits, separate from Horizon. Soroban RPC handles smart contract simulation, state queries, and event streaming. LumenQuery proxies both Horizon and Soroban RPC, applying unified rate limits and caching across both APIs.' },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io/' },
      { '@type': 'ListItem', position: 2, name: 'Stellar API Rate Limits', item: 'https://lumenquery.io/stellar-api-rate-limits' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
            <Link href="/" className="hover:text-[#7366FF]">Home</Link>
            <span>/</span>
            <span className="text-white">Stellar API Rate Limits</span>
          </div>
        </nav>

        {/* Hero */}
        <header className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7366FF]/10 border border-[#7366FF]/20 text-[#7366FF] text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Scaling Guide
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Stellar API Rate Limits<br />
            <span className="text-[#7366FF]">and Scaling Guide</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mx-auto mb-8">
            Understand how Stellar Horizon and Soroban RPC rate limits affect production applications, and learn strategies to scale your access reliably.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/pricing" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              View Pricing Plans
            </Link>
            <Link href="/docs" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              API Documentation
            </Link>
          </div>
        </header>

        {/* Why Rate Limits Matter */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Why Rate Limits Matter in Production</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-red-900/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Dropped Transactions</h3>
              <p className="text-sm text-[#A8A9AD]">
                When your app hits a 429 response, pending transaction submissions may fail silently. Wallet users see errors, payment confirmations are delayed, and reconciliation gaps appear in your records.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Stale Data</h3>
              <p className="text-sm text-[#A8A9AD]">
                If you cannot poll Horizon frequently enough, your application shows outdated balances, missed incoming payments, and delayed analytics. For trading applications, stale data means missed opportunities.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-[#262932] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-orange-900/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Service Outages</h3>
              <p className="text-sm text-[#A8A9AD]">
                The public Horizon endpoint has no SLA. During network-wide events or surges in usage, rate limits tighten and availability drops. Applications without a fallback strategy experience downtime.
              </p>
            </div>
          </div>
        </section>

        {/* Public Endpoint Limitations */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Public Endpoint Limitations</h2>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#262932] border border-white/5">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Horizon (horizon.stellar.org)</h3>
                <ul className="space-y-2 text-sm text-[#A8A9AD]">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> No guaranteed uptime or SLA</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Rate limits vary and are not documented</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> No burst capacity for traffic spikes</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> No caching layer (every request hits the server)</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Shared infrastructure with all other users</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> No support or escalation path</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3">Soroban RPC (soroban-rpc.stellar.org)</h3>
                <ul className="space-y-2 text-sm text-[#A8A9AD]">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Separate rate limits from Horizon</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Contract simulation can be expensive</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Event streaming may disconnect during load</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> No analytics or monitoring included</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Limited historical data availability</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">x</span> Intended for development, not production</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scaling Strategies */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">Production Scaling Strategies</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-8">
            Implement these strategies to handle rate limits gracefully and keep your application responsive under load.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Response Caching', desc: 'Cache Horizon responses with appropriate TTLs. Network state data can be cached for 5-30 seconds. Historical ledger data can be cached for hours or days since it never changes.', badge: 'Essential' },
              { title: 'Exponential Backoff', desc: 'When you receive a 429 response, wait before retrying. Start with a 1-second delay and double it on each retry, up to a maximum of 30 seconds. Include jitter to avoid thundering herd.', badge: 'Essential' },
              { title: 'Request Batching', desc: 'Combine multiple account lookups or transaction queries into fewer API calls by using Horizon\'s pagination and filtering parameters effectively.', badge: 'Recommended' },
              { title: 'Cursor-Based Pagination', desc: 'Use Horizon\'s cursor parameter to page through large result sets efficiently. Store the last cursor to resume from where you left off without re-fetching data.', badge: 'Recommended' },
              { title: 'SSE Streaming', desc: 'Use Server-Sent Events for real-time data instead of polling. A single SSE connection replaces hundreds of polling requests per minute.', badge: 'Recommended' },
              { title: 'Health Monitoring', desc: 'Track your API usage, response times, and error rates. Set up alerts when you approach rate limits so you can scale proactively rather than reactively.', badge: 'Best Practice' },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-[#262932] border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#7366FF]/10 text-[#7366FF]">{item.badge}</span>
                </div>
                <p className="text-sm text-[#A8A9AD]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Public vs LumenQuery Rate Limits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD]">Feature</th>
                  <th className="py-3 px-4 font-semibold text-[#A8A9AD]">Public Horizon</th>
                  <th className="py-3 px-4 font-semibold text-[#7366FF]">LumenQuery Free</th>
                  <th className="py-3 px-4 font-semibold text-[#7366FF]">LumenQuery Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Monthly Requests', public: 'Varies (no guarantee)', free: '10,000/month', pro: '100,000+/month' },
                  { feature: 'Burst Capacity', public: 'None', free: '10 req/sec', pro: '50 req/sec' },
                  { feature: 'Response Caching', public: 'None', free: 'Redis (30s-10m TTL)', pro: 'Redis (configurable)' },
                  { feature: 'Uptime SLA', public: 'None', free: 'Best effort', pro: '99.9%' },
                  { feature: 'Horizon API', public: 'Yes', free: 'Yes', pro: 'Yes' },
                  { feature: 'Soroban RPC', public: 'Separate endpoint', free: 'Unified access', pro: 'Unified access' },
                  { feature: 'Analytics Layer', public: 'None', free: 'Basic metrics', pro: 'Full analytics' },
                  { feature: 'SSE Streaming', public: 'Yes (may drop)', free: 'Yes (reliable)', pro: 'Yes (guaranteed)' },
                  { feature: 'Support', public: 'Community only', free: 'Email', pro: 'Priority support' },
                  { feature: 'Rate Limit Headers', public: 'Inconsistent', free: 'Always present', pro: 'Always present' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium text-white">{row.feature}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.public}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.free}</td>
                    <td className="py-3 px-4 text-[#A8A9AD]">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Handling Rate Limits in Code</h2>
          <p className="text-[#A8A9AD] text-center max-w-2xl mx-auto mb-6">
            Implement exponential backoff with jitter to handle 429 responses gracefully. This pattern works with any Stellar API provider.
          </p>
          <div className="bg-[#1D1E26] rounded-2xl p-4 sm:p-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  let delay = 1000; // Start with 1 second

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok) {
      return response.json();
    }

    if (response.status === 429) {
      // Check for Retry-After header
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter
        ? parseInt(retryAfter) * 1000
        : delay + Math.random() * 1000; // Add jitter

      console.warn(
        \`Rate limited (attempt \${attempt + 1}/\${maxRetries + 1}). \` +
        \`Waiting \${Math.round(waitTime / 1000)}s...\`
      );

      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, waitTime));
        delay *= 2; // Exponential backoff
        continue;
      }
    }

    throw new Error(\`API request failed: \${response.status}\`);
  }
}

// Usage with LumenQuery API
const ledger = await fetchWithRetry(
  'https://lumenquery.io/api/analytics/network?range=24h'
);

// Usage with public Horizon (more likely to hit limits)
const account = await fetchWithRetry(
  'https://horizon.stellar.org/accounts/GABC...',
  { headers: { 'Accept': 'application/json' } }
);`}</code></pre>
          </div>
        </section>

        {/* Internal Links */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Learn More</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/pricing" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Pricing Plans</h3>
              <p className="text-xs text-[#A8A9AD]">Compare tiers and rate limits</p>
            </Link>
            <Link href="/docs" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">API Documentation</h3>
              <p className="text-xs text-[#A8A9AD]">Endpoints, authentication, and examples</p>
            </Link>
            <Link href="/stellar-horizon-api" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Horizon API</h3>
              <p className="text-xs text-[#A8A9AD]">Accounts, transactions, and ledgers</p>
            </Link>
            <Link href="/stellar-rpc-provider" className="p-5 rounded-2xl bg-[#262932] border border-white/5 hover:border-[#7366FF]/30 transition-colors group">
              <h3 className="font-bold mb-1 group-hover:text-[#7366FF] transition-colors">Stellar RPC Provider</h3>
              <p className="text-xs text-[#A8A9AD]">Soroban RPC access and smart contracts</p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="group rounded-2xl bg-[#262932] border border-white/5 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm sm:text-base">
                  <span>{faq.name}</span>
                  <svg className="w-5 h-5 text-[#A8A9AD] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-[#A8A9AD] leading-relaxed">
                  {faq.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-12 rounded-2xl bg-[#7366FF] text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Scale Past Rate Limits</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get reliable Stellar API access with guaranteed rate limits, built-in caching, and unified Horizon + Soroban RPC endpoints. Free tier available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/pricing" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium hover:border-white/60 transition-colors">
              Compare Plans
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
