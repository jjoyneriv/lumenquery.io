import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deploy Contract | Soroban Pro',
  description: 'Deploy Soroban smart contracts to the Stellar network',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeployLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
