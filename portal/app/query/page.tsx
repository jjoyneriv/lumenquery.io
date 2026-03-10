'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

const exampleQueries = [
  {
    query: "Show the top 10 wallets holding XLM",
    result: "Ranked table of addresses with balances, last activity, and account age"
  },
  {
    query: "Which wallets received the most XLM today?",
    result: "Leaderboard of inbound transfer recipients with transaction counts"
  },
  {
    query: "Show transactions larger than 1,000,000 XLM in the last 24 hours",
    result: "Filtered transaction list with sender, receiver, amount, and timestamp"
  },
  {
    query: "What assets on Stellar had the highest trading volume today?",
    result: "Asset table ranked by 24h volume with issuer info and trade count"
  },
  {
    query: "Which validators processed the most transactions this week?",
    result: "Validator performance table with ledger counts and uptime metrics"
  },
  {
    query: "Compare USDC and yXLM trading volume over the past month",
    result: "Side-by-side time-series chart with daily volume breakdown"
  }
];

const features = [
  {
    title: "Natural Language → SQL Translation",
    description: "Our query engine converts your questions into optimized SQL, executed against a fully-indexed Stellar dataset. View the generated SQL anytime—learn as you query.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Real-Time Blockchain Indexing",
    description: "Data refreshes every 5 seconds. Query the latest ledgers, not stale snapshots. Monitor live transactions and catch network anomalies as they happen.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Interactive Charts & Dashboards",
    description: "Every result is interactive. Click a wallet to explore its history. Select a time range to zoom in. Build custom views without code.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Export Results via API",
    description: "Every query generates an API endpoint. Fetch JSON results programmatically, integrate with your data pipelines, or embed live data in your applications.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    )
  },
  {
    title: "Multi-Dataset Support",
    description: "Query across transactions, operations, effects, accounts, assets, trades, and ledgers. Join data naturally—we handle the complexity.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  }
];

const useCases = [
  {
    title: "Blockchain Analytics",
    description: "Answer ad-hoc questions without building custom queries. Explore transaction patterns and validate hypotheses in seconds."
  },
  {
    title: "Whale Tracking",
    description: "Monitor large holders and significant transfers. Set up alerts when major wallets move funds or change trustlines."
  },
  {
    title: "Token Ecosystem Monitoring",
    description: "Track asset distribution, holder counts, trading volume, and issuer activity across any Stellar token."
  },
  {
    title: "Validator Performance",
    description: "Compare validator uptime, transaction throughput, and fee behavior. Identify the most reliable nodes."
  },
  {
    title: "Web3 Research",
    description: "Support due diligence, market research, and competitive analysis with on-demand blockchain data."
  }
];

export default function QueryPage() {
  const { data: session } = useSession();
  const [queryInput, setQueryInput] = useState('');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="LumenQuery"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
            <span className="text-lg font-semibold">LumenQuery</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/query" className="text-sm text-[#2855FF] font-medium">
              Query
            </Link>
            <Link href="/contracts" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">
              Contracts
            </Link>
            <Link href="/analytics" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">
              Analytics
            </Link>
            <Link href="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/pricing" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">
              Pricing
            </Link>
            {session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-[#2855FF] text-white text-sm font-medium hover:bg-[#1E44CC] transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-lg bg-[#2855FF] text-white text-sm font-medium hover:bg-[#1E44CC] transition-colors"
              >
                Get Started
              </Link>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2855FF]/10 border border-[#2855FF]/20 text-[#2855FF] text-sm mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            New Feature
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ask Questions.<br />
            <span className="text-[#2855FF]">Get Answers.</span><br />
            No SQL Required.
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Query the Stellar blockchain like you're asking a colleague. Transform natural language into powerful blockchain queries and get instant insights.
          </p>

          {/* Query Input Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask anything about the Stellar blockchain..."
                className="w-full px-5 py-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2855FF] focus:ring-1 focus:ring-[#2855FF] text-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-[#2855FF] text-white text-sm font-medium hover:bg-[#1E44CC] transition-colors">
                Query
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Try: "Show me the largest XLM transfers in the last hour"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-[#2855FF] text-white font-medium hover:bg-[#1E44CC] transition-colors"
            >
              Try the Query Interface
            </Link>
            <Link
              href="/docs"
              className="px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            LumenQuery's query engine bridges the gap between human language and blockchain data.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Ask a Question</h3>
                <p className="text-gray-400 text-sm">Type your query in plain English. No need to know table schemas or SQL syntax.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2855FF] to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">2. We Translate</h3>
                <p className="text-gray-400 text-sm">Our engine parses your intent and generates an optimized query against our real-time Stellar index.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2855FF] to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Query Blockchain</h3>
                <p className="text-gray-400 text-sm">Execute against indexed Stellar data—transactions, accounts, assets, and more.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#2855FF] to-transparent"></div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10 h-full">
                <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">4. Get Results</h3>
                <p className="text-gray-400 text-sm">View data as interactive tables, time-series charts, or exportable JSON.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Queries */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Example Queries</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            LumenQuery understands the questions that matter to blockchain analysts, developers, and operators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQueries.map((example, index) => (
              <div key={index} className="p-5 rounded-xl bg-[#1A1A1A] border border-white/10 hover:border-[#2855FF]/50 transition-colors cursor-pointer group">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2855FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2855FF]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">"{example.query}"</p>
                    <p className="text-gray-500 text-sm">{example.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Output */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Example Output</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Results appear instantly in a clean, dark-themed dashboard designed for analysis.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table Preview */}
            <div className="rounded-xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-medium">Top XLM Holders</span>
                <span className="text-xs text-gray-500">Live</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Wallet</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400">Balance (XLM)</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-400">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-[#2855FF]">GAXJ...7K2F</td>
                      <td className="py-3 px-4 text-right">125,430,000.00</td>
                      <td className="py-3 px-4 text-right text-gray-500">2 hours ago</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-[#2855FF]">GBCD...X9PL</td>
                      <td className="py-3 px-4 text-right">98,750,000.00</td>
                      <td className="py-3 px-4 text-right text-gray-500">5 mins ago</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-[#2855FF]">GCEF...M3NK</td>
                      <td className="py-3 px-4 text-right">67,200,000.00</td>
                      <td className="py-3 px-4 text-right text-gray-500">1 hour ago</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-[#2855FF]">GDEF...Q8RT</td>
                      <td className="py-3 px-4 text-right">45,100,000.00</td>
                      <td className="py-3 px-4 text-right text-gray-500">3 hours ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart Preview */}
            <div className="rounded-xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm font-medium">Transaction Volume (24h)</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2855FF]"></span>
                  <span className="text-xs text-gray-500">Live</span>
                </div>
              </div>
              <div className="p-4 h-64 flex items-end justify-between gap-2">
                {/* Simulated bar chart */}
                {[35, 42, 58, 45, 62, 78, 65, 82, 70, 55, 48, 60].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#2855FF] to-[#2855FF]/50 rounded-t-sm transition-all hover:from-[#3366FF] hover:to-[#3366FF]/50"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="px-4 pb-3 flex justify-between text-xs text-gray-500">
                <span>12:00</span>
                <span>18:00</span>
                <span>00:00</span>
                <span>06:00</span>
                <span>Now</span>
              </div>
            </div>
          </div>

          {/* SQL Preview */}
          <div className="mt-8 rounded-xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium">Generated SQL</span>
              <button className="text-xs text-[#2855FF] hover:underline">Copy</button>
            </div>
            <div className="p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-300">
<span className="text-purple-400">SELECT</span> account_id, balance, last_modified_time
<span className="text-purple-400">FROM</span> accounts
<span className="text-purple-400">WHERE</span> asset_type = <span className="text-green-400">'native'</span>
<span className="text-purple-400">ORDER BY</span> balance <span className="text-purple-400">DESC</span>
<span className="text-purple-400">LIMIT</span> <span className="text-orange-400">10</span>;
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Key Features</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to explore blockchain data without writing code.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#1A1A1A] border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-[#2855FF]/10 flex items-center justify-center mb-4 text-[#2855FF]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Friendly */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Developer Friendly</h2>
              <p className="text-gray-400 mb-8">
                LumenQuery is built for developers who want transparency and control.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">SQL Visibility</h3>
                    <p className="text-gray-400 text-sm">Every query shows its SQL equivalent. Copy, modify, or run raw SQL directly.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">API Access</h3>
                    <p className="text-gray-400 text-sm">Programmatic access to all query results. Build dashboards, alerts, and automated reports.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2855FF]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2855FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Data Pipelines</h3>
                    <p className="text-gray-400 text-sm">Export to CSV, JSON, or stream to your data warehouse. Connect to BigQuery, Snowflake, or Postgres.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <div className="rounded-xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-xs text-gray-500">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-gray-300">
<span className="text-gray-500"># Query via API</span>
<span className="text-green-400">curl</span> -H <span className="text-yellow-400">"Authorization: Bearer YOUR_API_KEY"</span> \
  <span className="text-yellow-400">"https://api.lumenquery.io/v1/query?q=top+10+xlm+holders"</span>

<span className="text-gray-500"># Response</span>
{`{`}
  <span className="text-[#2855FF]">"data"</span>: [{`{`}
    <span className="text-[#2855FF]">"account_id"</span>: <span className="text-yellow-400">"GAXJ...7K2F"</span>,
    <span className="text-[#2855FF]">"balance"</span>: <span className="text-orange-400">125430000</span>,
    <span className="text-[#2855FF]">"last_active"</span>: <span className="text-yellow-400">"2026-03-10T14:30:00Z"</span>
  {`}`}, ...],
  <span className="text-[#2855FF]">"sql"</span>: <span className="text-yellow-400">"SELECT account_id, balance..."</span>,
  <span className="text-[#2855FF]">"execution_time_ms"</span>: <span className="text-orange-400">42</span>
{`}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Use Cases</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From whale tracking to validator analysis, LumenQuery powers critical blockchain insights.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-[#1A1A1A] to-[#141414] border border-white/10">
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-gray-400 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Query the Stellar blockchain<br />in plain English
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Stop writing SQL. Start asking questions. Get instant access to the Stellar blockchain's most valuable data—no database expertise required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-lg bg-[#2855FF] text-white font-medium hover:bg-[#1E44CC] transition-colors text-lg"
            >
              Try the Query Interface
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 rounded-lg border border-white/20 text-white font-medium hover:bg-white/5 transition-colors text-lg"
            >
              View API Docs
            </Link>
          </div>

          <Link href="/analytics" className="text-[#2855FF] hover:underline text-sm">
            Explore sample queries →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="LumenQuery"
              width={24}
              height={24}
            />
            <span className="text-sm text-gray-500">© 2026 LumenQuery. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-gray-500 hover:text-white transition-colors">Docs</Link>
            <Link href="/pricing" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
