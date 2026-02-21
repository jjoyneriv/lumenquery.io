import { Metadata } from 'next';
import BlogLayoutClient from './layout-client';

export const metadata: Metadata = {
  title: 'Blog - LumenQuery | Stellar Blockchain Insights & Tutorials',
  description: 'Explore tutorials, developer guides, and insights about Stellar blockchain, Soroban smart contracts, XLM cryptocurrency, and Web3 development from the LumenQuery team.',
  keywords: ['Stellar blog', 'blockchain tutorials', 'Soroban development', 'XLM guides', 'Web3 tutorials', 'cryptocurrency development'],
  alternates: {
    canonical: 'https://lumenquery.io/blog',
  },
  openGraph: {
    title: 'LumenQuery Blog - Stellar Blockchain Insights',
    description: 'Tutorials, developer guides, and insights about Stellar blockchain and Soroban smart contracts.',
    type: 'website',
    url: 'https://lumenquery.io/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogLayoutClient>{children}</BlogLayoutClient>;
}
