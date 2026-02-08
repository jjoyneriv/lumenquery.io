import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Contract Analytics - Stellar Analytics | LumenQuery',
  description: 'Soroban smart contract analytics including invocation frequency, gas usage trends, and contract event monitoring on the Stellar network.',
};

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
