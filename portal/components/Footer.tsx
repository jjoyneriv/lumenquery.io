import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  variant?: 'full' | 'simple';
}

export default function Footer({ variant = 'simple' }: FooterProps) {
  if (variant === 'full') {
    return (
      <footer className="bg-[#1D1E26] py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="LumenQuery"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="font-bold text-white">LumenQuery</span>
              </div>
              <p className="text-gray-400 text-sm">
                Enterprise Stellar Horizon API and Soroban RPC infrastructure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/docs" className="hover:text-[#7366FF]">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-[#7366FF]">Blog</Link></li>
                <li><Link href="/pricing" className="hover:text-[#7366FF]">Pricing</Link></li>
                <li><Link href="/query" className="hover:text-[#7366FF]">Query</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-white">Solutions</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/stellar-horizon-api" className="hover:text-[#7366FF]">Stellar Horizon API</Link></li>
                <li><Link href="/stellar-rpc-provider" className="hover:text-[#7366FF]">Stellar RPC Provider</Link></li>
                <li><Link href="/soroban-rpc-api" className="hover:text-[#7366FF]">Soroban RPC API</Link></li>
                <li><Link href="/stellar-blockchain-analytics-api" className="hover:text-[#7366FF]">Blockchain Analytics</Link></li>
                <li><Link href="/stellar-transaction-monitoring" className="hover:text-[#7366FF]">Transaction Monitoring</Link></li>
                <li><Link href="/xlm-whale-alerts" className="hover:text-[#7366FF]">XLM Whale Alerts</Link></li>
                <li><Link href="/stellar-api-rate-limits" className="hover:text-[#7366FF]">API Rate Limits</Link></li>
                <li><Link href="/stellar-api-provider-comparison" className="hover:text-[#7366FF]">Provider Comparison</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://developers.stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#7366FF]">Stellar Docs</a></li>
                <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#7366FF]">Stellar.org</a></li>
                <li><a href="mailto:support@lumenquery.io" className="hover:text-[#7366FF]">Contact Us</a></li>
                <li><Link href="/dashboard" className="hover:text-[#7366FF]">Dashboard</Link></li>
                <li><Link href="/sitemap.xml" className="hover:text-[#7366FF]">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-sm text-gray-500">
            © 2026 LumenQuery. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-white/10 bg-[#1D1E26] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LumenQuery"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-gray-500">© 2026 LumenQuery</span>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <Link href="/docs" className="hover:text-[#7366FF]">Docs</Link>
          <Link href="/blog" className="hover:text-[#7366FF]">Blog</Link>
          <Link href="/dashboard" className="hover:text-[#7366FF]">Dashboard</Link>
          <Link href="/sitemap.xml" className="hover:text-[#7366FF]">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
