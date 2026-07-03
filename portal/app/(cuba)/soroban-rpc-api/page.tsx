import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soroban RPC API for Smart Contract Developers',
  description: 'Build Soroban smart contract applications with reliable RPC access, contract event data, transaction simulation, and Stellar developer infrastructure.',
  keywords: ['Soroban RPC API', 'Soroban RPC', 'Stellar smart contracts', 'Soroban JSON-RPC', 'Soroban developer tools', 'Soroban contract events', 'Soroban transaction simulation'],
  alternates: { canonical: 'https://lumenquery.io/soroban-rpc-api' },
  openGraph: {
    title: 'Soroban RPC API for Smart Contract Developers',
    description: 'Build Soroban smart contract applications with reliable RPC access, contract event data, transaction simulation, and Stellar developer infrastructure.',
    type: 'website',
    url: 'https://lumenquery.io/soroban-rpc-api',
  },
  robots: { index: true, follow: true },
};

export default function SorobanRpcApiPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Soroban RPC API for Smart Contract Developers',
    description: 'Build Soroban smart contract applications with reliable RPC access, contract event data, transaction simulation, and Stellar developer infrastructure.',
    url: 'https://lumenquery.io/soroban-rpc-api',
    publisher: { '@type': 'Organization', name: 'LumenQuery' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Soroban RPC API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Soroban RPC API is a JSON-RPC 2.0 interface for interacting with Soroban smart contracts on the Stellar network. It provides methods for simulating transactions, submitting transactions, querying contract events, reading contract data (getLedgerEntries), and checking transaction status.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Soroban RPC different from Horizon API?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Horizon API is a REST interface for general Stellar blockchain data (accounts, payments, assets, ledgers). Soroban RPC is a JSON-RPC 2.0 interface specifically for smart contract interactions. You typically need both: Horizon for account and payment data, and Soroban RPC for contract invocations, simulations, and event queries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I simulate Soroban transactions before submitting them?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The simulateTransaction method lets you preview the outcome of a Soroban transaction without actually submitting it to the network. This returns the expected result, resource costs (CPU, memory, storage), and any errors, helping you estimate fees and debug issues before spending real XLM.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I query Soroban contract events?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the getEvents method to query contract events by contract ID, topic filters, event type (contract, system, diagnostic), and ledger range. LumenQuery also provides a smart contract explorer with decoded event streams and real-time SSE streaming for contract events.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does LumenQuery provide a Soroban contract explorer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. LumenQuery includes a Soroban Pro contract explorer that decodes XDR data into human-readable formats. You can browse contract calls, storage state, event history, gas analytics, and get AI-powered explanations of contract interactions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to run my own Soroban RPC node?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. LumenQuery provides managed Soroban RPC access so you can skip the complexity of running your own node. Self-hosting Soroban RPC requires running an embedded Captive Core instance, managing disk space for ledger data, and keeping up with protocol upgrades.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://lumenquery.io' },
      { '@type': 'ListItem', position: 2, name: 'Soroban RPC API', item: 'https://lumenquery.io/soroban-rpc-api' },
    ],
  };

  return (
    <>
      <div className="text-white">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-12">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <div className="flex items-center gap-2 text-sm text-[#A8A9AD]">
              <Link href="/" className="hover:text-[#7366FF]">Home</Link>
              <span>/</span>
              <span className="text-white">Soroban RPC API</span>
            </div>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#FFB829]/10 text-[#FFB829] text-xs font-semibold">Smart Contracts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
            Soroban RPC API for Smart Contract Developers
          </h1>
          <p className="text-lg sm:text-xl text-[#A8A9AD] max-w-3xl mb-8">
            Build, test, and monitor Soroban smart contracts with reliable JSON-RPC access. Simulate transactions, query events, read contract state, and deploy to the Stellar network.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup" className="px-6 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
              Get RPC Access
            </Link>
            <Link href="/contracts" className="px-6 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/5 transition-colors">
              Explore Contracts
            </Link>
          </div>
        </section>

        {/* What is Soroban RPC */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">What is the Soroban RPC API?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#A8A9AD] leading-relaxed mb-4">
                The <strong className="text-white">Soroban RPC API</strong> is a JSON-RPC 2.0 interface for interacting with Soroban smart contracts on the Stellar network. It provides the methods developers need to build decentralized applications: simulating transactions, submitting signed operations, reading contract storage, and querying emitted events.
              </p>
              <p className="text-[#A8A9AD] leading-relaxed mb-4">
                Unlike the Horizon REST API which handles general Stellar data (accounts, payments, assets), Soroban RPC is purpose-built for smart contract workflows. Most Stellar applications need both: Horizon for account and payment operations, and Soroban RPC for contract interactions.
              </p>
              <p className="text-[#A8A9AD] leading-relaxed">
                LumenQuery provides managed access to both APIs through a single platform, so you can build full-stack Stellar applications without running any infrastructure.
              </p>
            </div>
            <div className="bg-[#262932] rounded-2xl p-6 border border-white/5">
              <h3 className="font-semibold mb-4">Core RPC Methods</h3>
              <div className="space-y-3">
                {[
                  { method: 'simulateTransaction', desc: 'Preview transaction outcome and resource costs' },
                  { method: 'sendTransaction', desc: 'Submit signed transaction to the network' },
                  { method: 'getTransaction', desc: 'Check transaction status and result' },
                  { method: 'getEvents', desc: 'Query contract events with filters' },
                  { method: 'getLedgerEntries', desc: 'Read contract storage and data' },
                  { method: 'getHealth', desc: 'Check RPC node health status' },
                  { method: 'getLatestLedger', desc: 'Get current ledger sequence' },
                  { method: 'getNetwork', desc: 'Network passphrase and protocol info' },
                ].map((m) => (
                  <div key={m.method} className="flex items-start gap-3">
                    <code className="text-xs text-[#FFB829] flex-shrink-0 mt-0.5">{m.method}</code>
                    <p className="text-xs text-[#A8A9AD]">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Reliable RPC */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Developers Need Reliable Soroban RPC</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            Smart contract development requires fast, reliable RPC access at every stage: development, testing, deployment, and production monitoring.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Transaction Simulation',
                desc: 'Preview the outcome of any Soroban transaction before submitting it. Catch errors, estimate fees, and validate contract logic without spending XLM.',
                color: 'text-[#7366FF]',
              },
              {
                title: 'Contract Event Monitoring',
                desc: 'Query and stream contract events in real time. Filter by contract ID, event topic, and type. Essential for dApp frontends that need to react to on-chain state changes.',
                color: 'text-green-400',
              },
              {
                title: 'Storage State Reading',
                desc: 'Read contract storage entries directly via getLedgerEntries. Access persistent, temporary, and instance storage without decoding raw ledger data yourself.',
                color: 'text-[#FFB829]',
              },
              {
                title: 'Deployment Pipeline',
                desc: 'Deploy contracts from CI/CD pipelines with reliable RPC access. No flaky connections or rate limits slowing down your development workflow.',
                color: 'text-purple-400',
              },
              {
                title: 'Gas Estimation',
                desc: 'Accurately estimate CPU instructions, memory usage, and storage costs before submitting transactions. Avoid underfunded transactions that fail on-chain.',
                color: 'text-blue-400',
              },
              {
                title: 'Production Monitoring',
                desc: 'Monitor deployed contracts for errors, unexpected gas spikes, and abnormal event patterns. LumenQuery provides contract analytics out of the box.',
                color: 'text-red-400',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className={`font-semibold mb-2 ${card.color}`}>{card.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Contract Monitoring */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Smart Contract Monitoring with LumenQuery</h2>
          <p className="text-[#A8A9AD] max-w-3xl mb-10">
            Beyond raw RPC access, LumenQuery provides a complete smart contract monitoring platform. Our <Link href="/contracts" className="text-[#7366FF] hover:underline">Soroban Pro explorer</Link> decodes XDR into human-readable data so you can understand exactly what your contracts are doing.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Decoded Call History',
                desc: 'Every contract invocation decoded from XDR into readable function names, parameter values, and return data. Filter by function, status, or time range.',
              },
              {
                title: 'Storage State Viewer',
                desc: 'Browse persistent, temporary, and instance storage entries with type badges and TTL information. See exactly what data your contract is storing on-chain.',
              },
              {
                title: 'Real-Time Event Stream',
                desc: 'Server-Sent Events (SSE) streaming for contract events. Monitor your contract in real time without polling. Filter by topic and event type.',
              },
              {
                title: 'Gas and Error Analytics',
                desc: 'Track CPU instructions, memory usage, and storage costs per invocation. Identify expensive functions and error patterns across your contract history.',
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Example: Soroban RPC Request</h2>
          <p className="text-[#A8A9AD] mb-6">
            Query contract events using the JSON-RPC 2.0 protocol. All Soroban RPC methods follow this standard request format.
          </p>
          <div className="bg-[#1D1E26] rounded-2xl p-4 sm:p-6 overflow-x-auto border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded bg-[#FFB829]/20 text-[#FFB829] text-[10px] font-bold">POST</span>
              <span className="text-xs text-[#A8A9AD]">JSON-RPC 2.0</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// Query contract events via Soroban RPC
const response = await fetch('https://rpc.lumenquery.io', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'getEvents',
    params: {
      startLedger: 1000000,
      filters: [
        {
          type: 'contract',
          contractIds: [
            'CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC'
          ],
          topics: [
            ['AAAADwAAAAh0cmFuc2Zlcg==', '*', '*']
          ]
        }
      ],
      pagination: { limit: 100 }
    }
  })
});

const { result } = await response.json();

// result.events contains decoded contract events
result.events.forEach(event => {
  console.log(\`Ledger \${event.ledger}: \${event.type}\`);
  console.log(\`  Topic: \${event.topic}\`);
  console.log(\`  Value: \${event.value}\`);
});`}</code></pre>
          </div>

          <div className="mt-6 bg-[#1D1E26] rounded-2xl p-4 sm:p-6 overflow-x-auto border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 text-[10px] font-bold">POST</span>
              <span className="text-xs text-[#A8A9AD]">Simulate Transaction</span>
            </div>
            <pre className="text-xs sm:text-sm text-gray-300"><code>{`// Simulate a contract invocation before submitting
const simulation = await fetch('https://rpc.lumenquery.io', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'simulateTransaction',
    params: {
      transaction: 'AAAAAgAAAAB...' // Unsigned XDR envelope
    }
  })
});

const { result } = await simulation.json();
console.log('Cost:', result.cost);           // CPU + memory usage
console.log('Result:', result.results);       // Expected return value
console.log('Min Fee:', result.minResourceFee); // Minimum fee in stroops`}</code></pre>
          </div>
          <p className="text-sm text-[#A8A9AD] mt-4">
            See the full <Link href="/docs/contracts" className="text-[#7366FF] hover:underline">Soroban documentation</Link> for all RPC methods, parameters, and response schemas.
          </p>
        </section>

        {/* Use Cases */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Soroban RPC Use Cases</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'DeFi Protocols',
                desc: 'Build lending pools, DEXes, and liquidity protocols. Simulate swaps, monitor pool events, and track position changes in real time.',
              },
              {
                title: 'Token Contracts',
                desc: 'Deploy and manage custom token contracts. Monitor transfers, approvals, and balance changes through event streaming.',
              },
              {
                title: 'DAO Governance',
                desc: 'Implement on-chain voting, proposal creation, and treasury management. Query contract storage for governance state.',
              },
              {
                title: 'NFT Platforms',
                desc: 'Mint, transfer, and query ownership of non-fungible tokens. Track provenance and marketplace events.',
              },
              {
                title: 'Oracle Networks',
                desc: 'Feed external data into Soroban contracts. Monitor price updates and validate oracle submissions through event queries.',
              },
              {
                title: 'Gaming & Collectibles',
                desc: 'Build on-chain game mechanics with Soroban contracts. Track in-game asset ownership and marketplace activity.',
              },
            ].map((uc) => (
              <div key={uc.title} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-2">{uc.title}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'What is the Soroban RPC API?',
                a: 'The Soroban RPC API is a JSON-RPC 2.0 interface for interacting with Soroban smart contracts on the Stellar network. It provides methods for simulating transactions, submitting transactions, querying contract events, reading contract data (getLedgerEntries), and checking transaction status.',
              },
              {
                q: 'How is Soroban RPC different from Horizon API?',
                a: 'Horizon API is a REST interface for general Stellar blockchain data (accounts, payments, assets, ledgers). Soroban RPC is a JSON-RPC 2.0 interface specifically for smart contract interactions. Most applications need both: Horizon for account and payment data, Soroban RPC for contract invocations and simulations.',
              },
              {
                q: 'Can I simulate Soroban transactions before submitting them?',
                a: 'Yes. The simulateTransaction method lets you preview the outcome of a Soroban transaction without actually submitting it to the network. This returns the expected result, resource costs (CPU, memory, storage), and any errors, helping you estimate fees and debug issues before spending real XLM.',
              },
              {
                q: 'How do I query Soroban contract events?',
                a: 'Use the getEvents method to query contract events by contract ID, topic filters, event type (contract, system, diagnostic), and ledger range. LumenQuery also provides a smart contract explorer with decoded event streams and real-time SSE streaming for contract events.',
              },
              {
                q: 'Does LumenQuery provide a Soroban contract explorer?',
                a: 'Yes. LumenQuery includes a Soroban Pro contract explorer that decodes XDR data into human-readable formats. You can browse contract calls, storage state, event history, gas analytics, and get AI-powered explanations of contract interactions.',
              },
              {
                q: 'Do I need to run my own Soroban RPC node?',
                a: 'No. LumenQuery provides managed Soroban RPC access so you can skip the complexity of running your own node. Self-hosting requires an embedded Captive Core instance, significant disk space for ledger data, and ongoing maintenance for protocol upgrades.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-[#262932] rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold mb-3">{faq.q}</h3>
                <p className="text-sm text-[#A8A9AD] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/docs/contracts', label: 'Soroban Pro Docs', desc: 'Contract explorer documentation' },
              { href: '/contracts', label: 'Contract Explorer', desc: 'Browse and decode Soroban contracts' },
              { href: '/stellar-rpc-provider', label: 'Stellar RPC Provider', desc: 'Full managed infrastructure' },
              { href: '/stellar-horizon-api', label: 'Horizon API', desc: 'REST API for general Stellar data' },
              { href: '/blog/soroban-json-rpc-explained', label: 'Soroban RPC Guide', desc: 'Tutorial: JSON-RPC methods' },
              { href: '/pricing', label: 'Pricing', desc: 'Plans and rate limits' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="bg-[#262932] rounded-2xl p-5 border border-white/5 hover:border-[#7366FF]/20 transition-colors group">
                <h3 className="font-semibold text-sm group-hover:text-[#7366FF] transition-colors mb-1">{link.label}</h3>
                <p className="text-xs text-[#A8A9AD]">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-[#7366FF] to-[#a26cf8] rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Building with Soroban RPC</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Get managed Soroban RPC access with your free LumenQuery account. Deploy contracts, simulate transactions, and monitor events today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/signup" className="px-8 py-3 rounded-xl bg-white text-[#7366FF] font-bold text-sm hover:bg-white/90 transition-colors">
                Create Free Account
              </Link>
              <Link href="/docs/contracts" className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors">
                Read Soroban Docs
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'LumenQuery',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          url: 'https://lumenquery.io/soroban-rpc-api',
          description: 'Soroban RPC API for smart contract development, event querying, transaction simulation, and contract monitoring.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            description: 'Free tier available',
            url: 'https://lumenquery.io/pricing',
          },
          softwareHelp: {
            '@type': 'CreativeWork',
            url: 'https://lumenquery.io/docs',
          },
        }) }}
      />
    </>
  );
}
