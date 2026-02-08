import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API Documentation - LumenQuery | Stellar Horizon API & Soroban RPC',
  description: 'Complete API documentation for LumenQuery. Learn how to integrate Stellar Horizon API and Soroban RPC into your blockchain applications with code examples and SDKs.',
  keywords: ['Stellar API', 'Horizon API documentation', 'Soroban RPC', 'blockchain API', 'Stellar SDK', 'Web3 development'],
  alternates: {
    canonical: 'https://lumenquery.io/docs',
  },
  openGraph: {
    title: 'LumenQuery API Documentation',
    description: 'Complete documentation for Stellar Horizon API and Soroban RPC integration.',
    type: 'website',
    url: 'https://lumenquery.io/docs',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
