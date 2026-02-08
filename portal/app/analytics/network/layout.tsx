import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Network Metrics - Stellar Analytics | LumenQuery',
  description: 'Detailed Stellar network metrics including ledger sequences, transaction volumes, TPS, success rates, and fee statistics updated in real-time.',
};

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
