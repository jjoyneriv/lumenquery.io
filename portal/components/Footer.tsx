import Link from 'next/link';

interface FooterProps {
  variant?: 'full' | 'simple';
}

export default function Footer({ variant = 'simple' }: FooterProps) {
  if (variant === 'full') {
    return (
      <footer className="bg-white py-8 sm:py-12 px-4 sm:px-6 border-t border-[#E6E7E9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
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
              <h4 className="font-semibold mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><Link href="/docs" className="hover:text-[#2855FF]">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-[#2855FF]">Blog</Link></li>
                <li><Link href="/auth/signup" className="hover:text-[#2855FF]">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><a href="https://developers.stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#2855FF]">Stellar Docs</a></li>
                <li><a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-[#2855FF]">Stellar.org</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#6A6A6A]">
                <li><a href="mailto:support@lumenquery.io" className="hover:text-[#2855FF]">Contact Us</a></li>
                <li><Link href="/dashboard" className="hover:text-[#2855FF]">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E6E7E9] pt-6 sm:pt-8 text-center text-sm text-[#6A6A6A]">
            © 2026 LumenQuery. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#E6E7E9] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
  );
}
