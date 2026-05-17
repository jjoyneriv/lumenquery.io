import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - LumenQuery',
  description: 'Get help with your LumenQuery account, billing, subscriptions, and technical issues.',
  robots: { index: false, follow: false },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
