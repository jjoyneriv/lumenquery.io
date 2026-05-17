import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - LumenQuery',
  description: 'Manage your LumenQuery API keys and monitor your usage.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
