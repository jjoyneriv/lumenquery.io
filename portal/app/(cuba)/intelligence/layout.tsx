import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transaction Intelligence - LumenQuery',
  description: 'Real-time Stellar transaction intelligence dashboard. Monitor whale movements, trustline changes, account behavior, and custom alerts.',
  robots: 'noindex, nofollow',
};

export default function IntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
