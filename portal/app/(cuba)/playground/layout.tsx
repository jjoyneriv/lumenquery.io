import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Playground - Try Stellar Horizon API Live',
  description: 'Interactive API playground for the Stellar Horizon API. Query accounts, transactions, and ledgers in real-time. No signup required.',
  alternates: {
    canonical: 'https://lumenquery.io/playground',
  },
  openGraph: {
    title: 'API Playground - Try Stellar Horizon API Live',
    description: 'Query the Stellar network in real-time. No signup required.',
    url: 'https://lumenquery.io/playground',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
