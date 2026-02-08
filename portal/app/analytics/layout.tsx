import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsNav from '@/components/analytics/AnalyticsNav';

export const metadata: Metadata = {
  title: 'Stellar Network Analytics - LumenQuery | Real-Time Blockchain Metrics',
  description: 'Real-time Stellar network analytics. Monitor ledger sequences, transaction volumes, TPS, success rates, and fee statistics. Free public access.',
  keywords: ['Stellar analytics', 'XLM metrics', 'blockchain analytics', 'Stellar network stats', 'cryptocurrency analytics'],
  alternates: {
    canonical: 'https://lumenquery.io/analytics',
  },
  openGraph: {
    title: 'Stellar Network Analytics - LumenQuery',
    description: 'Real-time analytics and insights into the Stellar blockchain network.',
    type: 'website',
    url: 'https://lumenquery.io/analytics',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col">
      <Header activePage="analytics" />

      <div className="flex-1 flex flex-col lg:flex-row">
        <AnalyticsNav />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <Footer variant="simple" />
    </div>
  );
}
