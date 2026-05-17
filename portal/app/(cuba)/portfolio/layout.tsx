import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Intelligence - LumenQuery',
  description: 'Track your Stellar portfolio with P&L, yield tracking, and risk analysis.',
  robots: 'noindex, nofollow',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
