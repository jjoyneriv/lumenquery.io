import Link from 'next/link';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Stellar API Tutorial: Step-by-Step Guide for Developers | LumenQuery',
  description: 'Step-by-step Stellar API tutorial for developers. Learn to query accounts, stream transactions, and build apps using the Stellar blockchain data API with code examples.',
  keywords: ['Stellar API for developers', 'Stellar transaction query API', 'Stellar blockchain data API', 'Stellar Web3 developer platform', 'Stellar smart contract API', 'Horizon API tutorial'],
  alternates: { canonical: 'https://lumenquery.io/guides/stellar-api-tutorial' },
  openGraph: {
    title: 'Stellar API Tutorial: Step-by-Step for Developers | LumenQuery',
    description: 'Step-by-step Stellar API tutorial with code examples. Build blockchain applications on the Stellar network.',
    type: 'article',
    url: 'https://lumenquery.io/guides/stellar-api-tutorial',
  },
  robots: { index: true, follow: true },
};

export default function StellarApiTutorialPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Stellar API Tutorial: Step-by-Step Guide for Developers',
    datePublished: '2026-03-27',
    dateModified: '2026-03-27',
    author: { '@type': 'Organization', name: 'LumenQuery' },
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  return (
    <>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#7366FF]">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </div>
        </nav>

        <header className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-700 text-xs font-medium">Step-by-Step Tutorial</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Stellar API Tutorial: Step-by-Step Guide for Developers
          </h1>
          <p className="text-lg text-gray-400">
            Build your first Stellar application from scratch with this hands-on tutorial.
          </p>
        </header>

        <section className="prose prose-gray max-w-none" aria-label="Tutorial content">
          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            This <strong className="font-semibold text-white">Stellar API for developers</strong> tutorial walks you through building a complete blockchain application using LumenQuery&apos;s infrastructure. You&apos;ll learn to query accounts, fetch transactions, read smart contract data, and build a real-time dashboard—all using the <strong className="font-semibold text-white">Stellar blockchain data API</strong>. By the end, you&apos;ll have a working application that demonstrates the power of the <strong className="font-semibold text-white">Stellar transaction query API</strong> and the broader <strong className="font-semibold text-white">Stellar Web3 developer platform</strong> ecosystem.
          </p>

          <div className="my-8 p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-base font-bold mb-2">Prerequisites</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>- Node.js 18+ installed</li>
              <li>- Basic JavaScript/TypeScript knowledge</li>
              <li>- A free <Link href="/auth/signup" className="text-[#7366FF] hover:underline">LumenQuery account</Link></li>
            </ul>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 1: Set Up Your Stellar API Environment</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            First, <Link href="/auth/signup" className="text-[#7366FF] hover:underline">sign up for a free LumenQuery account</Link> and get your API key from the <Link href="/dashboard" className="text-[#7366FF] hover:underline">dashboard</Link>. Then set up your project:
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`mkdir stellar-app && cd stellar-app
npm init -y
npm install @stellar/stellar-sdk node-fetch

# Set your API key
export LUMENQUERY_API_KEY="lq_your_key_here"`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 2: Query Account Balances with the Stellar API</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The most common operation is querying account balances. The <strong className="font-semibold text-white">Stellar API for developers</strong> makes this straightforward through the Horizon REST API:
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-blue-900/50 text-blue-300 text-xs">Horizon API</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// query-account.js
const API_BASE = 'https://api.lumenquery.io';

async function getAccountBalances(accountId) {
  const response = await fetch(
    \`\${API_BASE}/accounts/\${accountId}\`,
    { headers: { 'X-API-Key': process.env.LUMENQUERY_API_KEY } }
  );
  const account = await response.json();

  return account.balances.map(b => ({
    asset: b.asset_type === 'native' ? 'XLM' : b.asset_code,
    balance: parseFloat(b.balance).toLocaleString(),
    type: b.asset_type,
  }));
}

// Try it
getAccountBalances('GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN')
  .then(b => console.table(b));`}</code></pre>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            You can also query accounts interactively using our <Link href="/query" className="text-[#7366FF] hover:underline">Natural Language Query Interface</Link>—just type &quot;account info for GXXX...&quot; and get instant results.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 3: Fetch Transaction History Using the Stellar Transaction Query API</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar transaction query API</strong> via Horizon lets you fetch recent transactions, filter by account, and stream updates in real time:
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// fetch-transactions.js
async function getRecentTransactions(limit = 10) {
  const response = await fetch(
    \`\${API_BASE}/transactions?order=desc&limit=\${limit}\`,
    { headers: { 'X-API-Key': process.env.LUMENQUERY_API_KEY } }
  );
  const data = await response.json();

  return data._embedded.records.map(tx => ({
    hash: tx.hash.substring(0, 12) + '...',
    source: tx.source_account.substring(0, 8) + '...',
    operations: tx.operation_count,
    fee: (parseInt(tx.fee_charged) / 10_000_000) + ' XLM',
    status: tx.successful ? 'Success' : 'Failed',
    time: new Date(tx.created_at).toLocaleString(),
  }));
}

getRecentTransactions(5).then(txs => console.table(txs));`}</code></pre>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            See this data visualized on our <Link href="/dashboard/transactions" className="text-[#7366FF] hover:underline">Live Transaction Viewer</Link>, which decodes operations into human-readable descriptions.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 4: Read Smart Contract State with the Stellar Smart Contract API</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            The <strong className="font-semibold text-white">Stellar smart contract API</strong> (via Stellar RPC) lets you read Soroban contract storage. For a deeper dive into RPC methods, see our <Link href="/guides/stellar-rpc-guide" className="text-[#7366FF] hover:underline">complete Stellar RPC guide</Link>.
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-xs">Stellar RPC</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// read-contract.js
async function getLatestLedger() {
  const response = await fetch('https://rpc.lumenquery.io', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.LUMENQUERY_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'getLatestLedger',
    }),
  });
  const data = await response.json();
  return data.result;
}

getLatestLedger().then(l =>
  console.log('Ledger:', l.sequence, 'Protocol:', l.protocolVersion)
);`}</code></pre>
          </div>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Browse decoded contract storage visually using our <Link href="/contracts" className="text-[#7366FF] hover:underline">Smart Contract Explorer</Link>. Read the <Link href="/docs/contracts" className="text-[#7366FF] hover:underline">Soroban contracts documentation</Link> for the full API reference.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 5: Build a Real-Time Dashboard</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            Now combine both APIs to build a dashboard that shows live network metrics. This is the same pattern used in our <Link href="/analytics" className="text-[#7366FF] hover:underline">Stellar Network Analytics Dashboard</Link>:
          </p>

          <div className="bg-[#1D1E26] rounded-xl p-4 sm:p-6 my-6 overflow-x-auto">
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// dashboard.js - Combine Horizon + RPC
async function getDashboardData() {
  // Parallel API calls for speed
  const [ledger, feeStats, txs] = await Promise.all([
    getLatestLedger(),                    // Stellar RPC
    fetch(\`\${API_BASE}/fee_stats\`)        // Horizon
      .then(r => r.json()),
    getRecentTransactions(5),             // Horizon
  ]);

  return {
    network: {
      ledger: ledger.sequence,
      protocol: ledger.protocolVersion,
    },
    fees: {
      min: feeStats.last_ledger_base_fee,
      median: feeStats.fee_charged?.p50,
    },
    recentTransactions: txs,
  };
}

// Refresh every 5 seconds
setInterval(async () => {
  const data = await getDashboardData();
  console.clear();
  console.log('Ledger:', data.network.ledger);
  console.table(data.recentTransactions);
}, 5000);`}</code></pre>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Step 6: Explore Data with Natural Language</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            LumenQuery also provides a <Link href="/query" className="text-[#7366FF] hover:underline">Natural Language Query Interface</Link> where you can explore data without writing code. Try queries like:
          </p>

          <ul className="space-y-2 my-4">
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">&quot;Show the top 10 XLM holders&quot;</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">&quot;Recent payments larger than 100,000 XLM&quot;</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">&quot;What assets are on Stellar?&quot;</li>
            <li className="text-gray-400 ml-4 list-disc text-sm sm:text-base">&quot;Latest ledger status&quot;</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-10 mb-4">Next Steps for Stellar API Developers</h2>

          <p className="text-gray-400 leading-relaxed mb-4 text-sm sm:text-base">
            You now have a working <strong className="font-semibold text-white">Stellar API for developers</strong> foundation. Here&apos;s where to go next:
          </p>

          <div className="my-8 p-5 sm:p-8 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-bold mb-3">Continue Learning</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides/stellar-rpc-guide" className="text-[#7366FF] hover:underline">What is Stellar RPC? (Complete Guide)</Link> — Deep dive into all RPC methods</li>
              <li><Link href="/guides/horizon-vs-rpc-vs-indexers" className="text-[#7366FF] hover:underline">Horizon vs RPC vs Indexers</Link> — Choose the right data access pattern</li>
              <li><Link href="/guides/lumenquery-tutorial" className="text-[#7366FF] hover:underline">LumenQuery Tutorial</Link> — Explore all platform features</li>
              <li><Link href="/blog/build-stellar-blockchain-explorer-horizon-api" className="text-[#7366FF] hover:underline">Build a Stellar Blockchain Explorer</Link> — Full Next.js project tutorial</li>
              <li><Link href="/blog/stellar-expanding-developer-ecosystem" className="text-[#7366FF] hover:underline">How Stellar Is Expanding the Developer Ecosystem</Link></li>
              <li><Link href="/docs" className="text-[#7366FF] hover:underline">API Documentation</Link> — Full endpoint reference</li>
              <li><Link href="/docs/portfolio" className="text-[#7366FF] hover:underline">Portfolio Intelligence Docs</Link> — Build portfolio tracking apps</li>
            </ul>
          </div>
        </section>

        <aside className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#7366FF] text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Start Building with the Stellar API</h2>
          <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Free tier includes 10,000 requests/month. Get your API key in seconds.</p>
          <Link href="/auth/signup" className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white text-[#7366FF] font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
            Create Free Account
          </Link>
        </aside>
      </article>
    </>
  );
}
