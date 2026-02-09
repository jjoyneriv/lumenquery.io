import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Contract Explorer - LumenQuery | Soroban Pro',
  description: 'Explore Stellar Soroban smart contracts with decoded calls, storage visualization, and event streams.',
  keywords: ['Soroban', 'Smart Contracts', 'Stellar', 'Explorer', 'XDR Decoder', 'Contract Analytics'],
  robots: 'index, follow',
  openGraph: {
    title: 'Soroban Pro - Smart Contract Explorer',
    description: 'Explore Stellar Soroban smart contracts with decoded calls, storage visualization, and event streams.',
    type: 'website',
    url: 'https://lumenquery.io/contracts',
  },
};

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
