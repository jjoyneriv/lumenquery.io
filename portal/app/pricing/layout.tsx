import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - LumenQuery | Soroban Pro Plans',
  description: 'Simple, transparent pricing for Soroban Pro. Choose the plan that fits your needs - from free exploration to enterprise auditing.',
  keywords: ['Pricing', 'Plans', 'Soroban Pro', 'Smart Contract Explorer', 'Stellar'],
  robots: 'index, follow',
  openGraph: {
    title: 'LumenQuery Pricing - Soroban Pro Plans',
    description: 'Simple, transparent pricing for smart contract exploration.',
    type: 'website',
    url: 'https://lumenquery.io/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
