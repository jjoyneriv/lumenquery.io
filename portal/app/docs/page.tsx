import Link from 'next/link';

export const metadata = {
  title: 'Documentation - LumenQuery',
  description: 'LumenQuery Horizon API and Soroban RPC documentation. Build on Stellar with managed infrastructure.',
};

export default function DocsPage() {
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
            <Link href="/docs" className="text-[#2855FF] font-medium">Docs</Link>
            <Link href="/blog" className="text-[#6A6A6A] hover:text-black font-medium">Blog</Link>
            <Link href="/auth/signin" className="text-[#6A6A6A] hover:text-black font-medium">Sign In</Link>
            <Link href="/auth/signup" className="px-4 py-2 rounded-lg bg-[#2855FF] hover:bg-[#1E44CC] text-white text-sm font-medium transition-colors">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Getting Started</h3>
                <ul className="space-y-2">
                  <li><a href="#introduction" className="text-[#6A6A6A] hover:text-[#2855FF]">Introduction</a></li>
                  <li><a href="#authentication" className="text-[#6A6A6A] hover:text-[#2855FF]">Authentication</a></li>
                  <li><a href="#quick-start" className="text-[#6A6A6A] hover:text-[#2855FF]">Quick Start</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Horizon API</h3>
                <ul className="space-y-2">
                  <li><a href="#base-url" className="text-[#6A6A6A] hover:text-[#2855FF]">Base URL</a></li>
                  <li><a href="#endpoints" className="text-[#6A6A6A] hover:text-[#2855FF]">Endpoints</a></li>
                  <li><a href="#rate-limits" className="text-[#6A6A6A] hover:text-[#2855FF]">Rate Limits</a></li>
                  <li><a href="#errors" className="text-[#6A6A6A] hover:text-[#2855FF]">Errors</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Soroban RPC</h3>
                <ul className="space-y-2">
                  <li><a href="#soroban-overview" className="text-[#6A6A6A] hover:text-[#2855FF]">Overview</a></li>
                  <li><a href="#soroban-methods" className="text-[#6A6A6A] hover:text-[#2855FF]">Methods</a></li>
                  <li><a href="#soroban-examples" className="text-[#6A6A6A] hover:text-[#2855FF]">Examples</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#6A6A6A] uppercase tracking-wider mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#sdks" className="text-[#6A6A6A] hover:text-[#2855FF]">SDKs</a></li>
                  <li><a href="#examples" className="text-[#6A6A6A] hover:text-[#2855FF]">Examples</a></li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <h1 className="text-4xl font-bold mb-4">LumenQuery API Documentation</h1>
            <p className="text-xl text-[#6A6A6A] mb-12">
              Enterprise-grade Stellar infrastructure. Horizon API for blockchain data, Soroban RPC for smart contracts.
            </p>

            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Introduction</h2>
              <p className="text-[#6A6A6A] mb-4">
                LumenQuery provides fully-managed Stellar infrastructure for building blockchain applications.
                Access both the <strong>Horizon REST API</strong> for blockchain data and the <strong>Soroban RPC</strong> for
                smart contract interactions. Our infrastructure handles the complexity of running nodes,
                so you can focus on building your application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 mb-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">REST</span>
                    <h3 className="font-semibold">Horizon API</h3>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">Access accounts, transactions, ledgers, and all blockchain data via REST API.</p>
                  <code className="text-xs text-blue-600 mt-2 block">api.lumenquery.io</code>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-medium">JSON-RPC</span>
                    <h3 className="font-semibold">Soroban RPC</h3>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">Deploy and invoke smart contracts, simulate transactions, query contract state.</p>
                  <code className="text-xs text-purple-600 mt-2 block">rpc.lumenquery.io</code>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-2xl mb-2">⚡</div>
                  <h3 className="font-semibold mb-1">Fast</h3>
                  <p className="text-sm text-[#6A6A6A]">Low-latency responses from optimized infrastructure</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-1">Secure</h3>
                  <p className="text-sm text-[#6A6A6A]">HTTPS encryption and API key authentication</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="text-[#2855FF] text-2xl mb-2">📈</div>
                  <h3 className="font-semibold mb-1">Scalable</h3>
                  <p className="text-sm text-[#6A6A6A]">Handle millions of requests with ease</p>
                </div>
              </div>
            </section>

            {/* Authentication */}
            <section id="authentication" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Authentication</h2>
              <p className="text-[#6A6A6A] mb-4">
                All API requests require authentication using an API key. Include your API key in the 
                <code className="mx-1 px-2 py-1 rounded bg-[#F5F6F7] text-[#2855FF] border border-[#E6E7E9]">X-API-Key</code> header.
              </p>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`X-API-Key: lq_your_api_key_here`}
                </pre>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
                <strong>Keep your API key secure!</strong> Never expose your API key in client-side code or public repositories.
              </div>
            </section>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Quick Start</h2>
              <ol className="list-decimal list-inside space-y-4 text-[#6A6A6A]">
                <li><strong className="text-black">Create an account</strong> at <Link href="/auth/signup" className="text-[#2855FF] hover:underline">lumenquery.io/auth/signup</Link></li>
                <li><strong className="text-black">Generate an API key</strong> from your <Link href="/dashboard" className="text-[#2855FF] hover:underline">dashboard</Link></li>
                <li><strong className="text-black">Make your first request:</strong></li>
              </ol>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mt-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -H "X-API-Key: lq_your_api_key" \\
  https://api.lumenquery.io/ledgers?limit=1`}
                </pre>
              </div>
            </section>

            {/* Base URL */}
            <section id="base-url" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Base URL</h2>
              <p className="text-[#6A6A6A] mb-4">All API requests should be made to:</p>
              <div className="bg-[#0D0D0D] rounded-lg p-4">
                <code className="text-[#2855FF] text-lg">https://api.lumenquery.io</code>
              </div>
            </section>

            {/* Endpoints */}
            <section id="endpoints" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Endpoints</h2>
              <p className="text-[#6A6A6A] mb-6">
                LumenQuery provides full access to the Stellar Horizon API. All standard Horizon endpoints are available.
              </p>
              
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-lg font-semibold mb-2">Accounts</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/accounts/&#123;account_id&#125;</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/accounts/&#123;account_id&#125;/transactions</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-lg font-semibold mb-2">Ledgers</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/ledgers</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/ledgers/&#123;sequence&#125;</code>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="text-lg font-semibold mb-2">Transactions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 font-mono text-xs">GET</span>
                      <code className="text-[#6A6A6A]">/transactions</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-[#2855FF]/10 text-[#2855FF] font-mono text-xs">POST</span>
                      <code className="text-[#6A6A6A]">/transactions</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Rate Limits */}
            <section id="rate-limits" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Rate Limits</h2>
              <p className="text-[#6A6A6A] mb-4">
                Horizon API and Soroban RPC have separate rate limits. Both are tracked independently per organization.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs mr-2">REST</span>
                Horizon API
              </h3>
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                    <th className="text-left py-3 px-4 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 font-medium">Requests/Minute</th>
                    <th className="text-left py-3 px-4 font-medium">Requests/Month</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Free</td>
                    <td className="py-3 px-4">60</td>
                    <td className="py-3 px-4">10,000</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Starter</td>
                    <td className="py-3 px-4">300</td>
                    <td className="py-3 px-4">100,000</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Professional</td>
                    <td className="py-3 px-4">1,000</td>
                    <td className="py-3 px-4">1,000,000</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Enterprise</td>
                    <td className="py-3 px-4">5,000</td>
                    <td className="py-3 px-4">Unlimited</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-lg font-semibold mt-6 mb-3">
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs mr-2">JSON-RPC</span>
                Soroban RPC
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E6E7E9] bg-[#F5F6F7]">
                    <th className="text-left py-3 px-4 font-medium">Plan</th>
                    <th className="text-left py-3 px-4 font-medium">Requests/Minute</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Free</td>
                    <td className="py-3 px-4">30</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Starter</td>
                    <td className="py-3 px-4">150</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Professional</td>
                    <td className="py-3 px-4">500</td>
                  </tr>
                  <tr className="border-b border-[#E6E7E9]">
                    <td className="py-3 px-4">Enterprise</td>
                    <td className="py-3 px-4">2,500</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Errors */}
            <section id="errors" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Errors</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded bg-red-100 text-red-700 font-mono text-sm">401</span>
                    <span className="font-semibold">Unauthorized</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">Missing or invalid API key</p>
                </div>
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 font-mono text-sm">429</span>
                    <span className="font-semibold">Too Many Requests</span>
                  </div>
                  <p className="text-sm text-[#6A6A6A]">Rate limit exceeded</p>
                </div>
              </div>
            </section>

            {/* Soroban RPC Overview */}
            <section id="soroban-overview" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-sm mr-2">JSON-RPC</span>
                Soroban RPC
              </h2>
              <p className="text-[#6A6A6A] mb-4">
                Soroban RPC provides access to Stellar&apos;s smart contract platform. Use it to deploy contracts,
                invoke contract functions, simulate transactions, and query contract state.
              </p>
              <div className="bg-[#0D0D0D] rounded-lg p-4">
                <p className="text-[#6A6A6A] text-sm mb-2">RPC Endpoint:</p>
                <code className="text-[#2855FF] text-lg">https://rpc.lumenquery.io</code>
              </div>
            </section>

            {/* Soroban Methods */}
            <section id="soroban-methods" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Soroban RPC Methods</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2">Network & Health</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getHealth</code>
                      <span className="text-[#6A6A6A]">- Check RPC server health</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getNetwork</code>
                      <span className="text-[#6A6A6A]">- Get network configuration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getLatestLedger</code>
                      <span className="text-[#6A6A6A]">- Get current ledger sequence</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2">Transactions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">simulateTransaction</code>
                      <span className="text-[#6A6A6A]">- Simulate a transaction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">sendTransaction</code>
                      <span className="text-[#6A6A6A]">- Submit a transaction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getTransaction</code>
                      <span className="text-[#6A6A6A]">- Get transaction by hash</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getTransactions</code>
                      <span className="text-[#6A6A6A]">- List recent transactions</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#F5F6F7] border border-[#E6E7E9]">
                  <h3 className="font-semibold mb-2">Contract Data</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getLedgerEntries</code>
                      <span className="text-[#6A6A6A]">- Read contract state</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getEvents</code>
                      <span className="text-[#6A6A6A]">- Query contract events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 font-mono text-xs">RPC</span>
                      <code className="text-[#6A6A6A]">getFeeStats</code>
                      <span className="text-[#6A6A6A]">- Get fee statistics</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Soroban Examples */}
            <section id="soroban-examples" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Soroban RPC Examples</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Check RPC Health</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mb-3">Get Latest Ledger</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getLatestLedger"}' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mb-3">Simulate Transaction</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST -H "X-API-Key: lq_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"simulateTransaction",
    "params":{"transaction":"AAAAAgAAAA...base64_xdr"}
  }' \\
  https://rpc.lumenquery.io`}
                </pre>
              </div>
            </section>

            {/* SDKs */}
            <section id="sdks" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">SDKs</h2>

              <h3 className="text-lg font-semibold mt-6 mb-3">Horizon API (JavaScript)</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4 mb-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { Horizon } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://api.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' }
});`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mb-3">Soroban RPC (JavaScript)</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { SorobanRpc } from '@stellar/stellar-sdk';

const server = new SorobanRpc.Server('https://rpc.lumenquery.io', {
  headers: { 'X-API-Key': 'lq_your_api_key' }
});

// Get latest ledger
const ledger = await server.getLatestLedger();
console.log('Latest ledger:', ledger.sequence);`}
                </pre>
              </div>
            </section>

            {/* Examples */}
            <section id="examples" className="mb-16">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-[#E6E7E9]">Examples</h2>
              <h3 className="text-lg font-semibold mt-6 mb-3">Get Account Balance</h3>
              <div className="bg-[#0D0D0D] rounded-lg p-4">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -H "X-API-Key: lq_your_api_key" \\
  "https://api.lumenquery.io/accounts/GABC...XYZ"`}
                </pre>
              </div>
            </section>

            {/* Support */}
            <section className="p-6 rounded-2xl bg-[#2855FF] text-white">
              <h2 className="text-xl font-bold mb-2">Need Help?</h2>
              <p className="text-white/80 mb-4">Have questions or need assistance? We&apos;re here to help.</p>
              <div className="flex gap-4">
                <a href="mailto:support@lumenquery.io" className="px-4 py-2 rounded-lg bg-white text-[#2855FF] text-sm font-medium hover:bg-gray-100 transition-colors">
                  Contact Support
                </a>
                <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors">
                  Go to Dashboard
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#E6E7E9] mt-16 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2855FF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">LQ</span>
            </div>
            <span className="text-[#6A6A6A]">© 2026 LumenQuery</span>
          </div>
          <div className="flex gap-6 text-sm text-[#6A6A6A]">
            <Link href="/docs" className="hover:text-[#2855FF]">Docs</Link>
            <Link href="/blog" className="hover:text-[#2855FF]">Blog</Link>
            <Link href="/dashboard" className="hover:text-[#2855FF]">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
