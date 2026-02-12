import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - LumenQuery | Soroban Pro & Compliance Plans',
  description: 'Simple, transparent pricing for LumenQuery services. From free exploration to enterprise auditing. Smart contract explorer, compliance & AML monitoring, and more.',
  keywords: ['Pricing', 'Plans', 'Soroban Pro', 'Compliance', 'AML', 'Smart Contract Explorer', 'Stellar'],
  alternates: {
    canonical: 'https://lumenquery.io/pricing',
  },
  openGraph: {
    title: 'LumenQuery Pricing - Soroban Pro & Compliance Plans',
    description: 'Simple, transparent pricing for smart contract exploration and compliance monitoring.',
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
  return <>{children}</>;
}
