import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plain English Queries for Stellar Blockchain',
  description: 'Query the Stellar blockchain using natural language. No SQL required. Get instant insights on transactions, wallets, assets, and validators.',
  keywords: ['Stellar blockchain', 'natural language query', 'blockchain analytics', 'XLM', 'crypto data', 'SQL-free'],
  openGraph: {
    title: 'Plain English Queries for Stellar Blockchain | LumenQuery',
    description: 'Query the Stellar blockchain using natural language. No SQL required. Get instant insights on transactions, wallets, assets, and validators.',
    url: 'https://lumenquery.io/query',
    siteName: 'LumenQuery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plain English Queries for Stellar Blockchain',
    description: 'Query the Stellar blockchain using natural language. No SQL required.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://lumenquery.io/query',
  },
};

export default function QueryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
