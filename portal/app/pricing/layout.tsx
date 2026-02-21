import { Metadata } from 'next';
import PricingLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Pricing - LumenQuery | Soroban Pro & Intelligence Plans',
  description: 'Simple, transparent pricing for LumenQuery services. From free exploration to enterprise auditing. Smart contract explorer, transaction intelligence, and more.',
  keywords: ['Pricing', 'Plans', 'Soroban Pro', 'Intelligence', 'Smart Contract Explorer', 'Stellar'],
  alternates: {
    canonical: 'https://lumenquery.io/pricing',
  },
  openGraph: {
    title: 'LumenQuery Pricing - Soroban Pro & Intelligence Plans',
    description: 'Simple, transparent pricing for smart contract exploration and transaction intelligence.',
    type: 'website',
    url: 'https://lumenquery.io/pricing',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PricingLayoutClient>{children}</PricingLayoutClient>;
}
