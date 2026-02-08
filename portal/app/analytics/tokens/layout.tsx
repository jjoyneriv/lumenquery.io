import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Analytics - Stellar Analytics | LumenQuery',
  description: 'Stellar token analytics including velocity metrics, whale movement tracking for large XLM transactions, and issuer risk assessment.',
  alternates: {
    canonical: 'https://lumenquery.io/analytics/tokens',
  },
};

export default function TokensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
