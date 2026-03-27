'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DeploymentWizard } from '@/components/contracts';

export default function DeployContractPage() {
  return (
    <div className="min-h-screen bg-[#1D1E26] flex flex-col">
      <Header activePage="contracts" />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/contracts" className="hover:text-[#7366FF]">
              Contracts
            </Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">Deploy</span>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7366FF]/10 rounded-full text-sm text-[#7366FF] mb-4">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Soroban Pro
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Deploy Smart Contract
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Upload your compiled WASM file and deploy it to the Stellar network
              using your Freighter wallet.
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="font-medium text-amber-800">Mainnet Deployment</p>
                <p className="text-sm text-amber-700 mt-1">
                  This will deploy to the Stellar mainnet. Deployment requires XLM for
                  transaction fees. Make sure your wallet has sufficient funds.
                </p>
              </div>
            </div>
          </div>

          {/* Deployment Wizard */}
          <DeploymentWizard />

          {/* Help Section */}
          <div className="mt-12 bg-[#262932] border border-white/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://developers.stellar.org/docs/build/smart-contracts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-white/10 rounded-lg hover:border-[#7366FF]/50 transition-colors"
              >
                <div className="w-10 h-10 bg-[#7366FF]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Soroban Docs</p>
                  <p className="text-sm text-gray-400">Learn how to build contracts</p>
                </div>
              </a>

              <a
                href="https://github.com/stellar/soroban-examples"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border border-white/10 rounded-lg hover:border-[#7366FF]/50 transition-colors"
              >
                <div className="w-10 h-10 bg-[#7366FF]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#7366FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Example Contracts</p>
                  <p className="text-sm text-gray-400">Browse sample WASM files</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
