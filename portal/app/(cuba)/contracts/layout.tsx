import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Contract Explorer - LumenQuery | Soroban Pro',
  description: 'Explore Stellar Soroban smart contracts with decoded calls, storage visualization, and event streams. Premium contract analytics for developers.',
  keywords: ['Soroban', 'Smart Contracts', 'Stellar', 'Explorer', 'XDR Decoder', 'Contract Analytics'],
  alternates: {
    canonical: 'https://lumenquery.io/contracts',
  },
  openGraph: {
    title: 'Soroban Pro - Smart Contract Explorer',
    description: 'Explore Stellar Soroban smart contracts with decoded calls, storage visualization, and event streams.',
    type: 'website',
    url: 'https://lumenquery.io/contracts',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
