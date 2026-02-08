import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - LumenQuery',
  description: 'Sign in or create your LumenQuery account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
