import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription - LumenQuery',
  description: 'Manage your LumenQuery subscription and billing.',
  robots: { index: false, follow: false },
};

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
