import { Metadata } from 'next';

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
  return <>{children}</>;
}
