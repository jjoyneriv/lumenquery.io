import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://lumenquery.io'),
  title: {
    default: 'LumenQuery - Enterprise Stellar Horizon API',
    template: '%s | LumenQuery',
  },
  description: 'Enterprise-grade Stellar Horizon API infrastructure. Fast, reliable, and scalable API access to the Stellar network.',
  keywords: ['Stellar', 'Horizon API', 'Blockchain', 'API', 'Cryptocurrency', 'Fintech', 'XLM', 'Lumens'],
  authors: [{ name: 'LumenQuery' }],
  creator: 'LumenQuery',
  publisher: 'LumenQuery',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumenquery.io',
    siteName: 'LumenQuery',
    title: 'LumenQuery - Enterprise Stellar Horizon API',
    description: 'Enterprise-grade Stellar Horizon API infrastructure. Fast, reliable, and scalable.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LumenQuery - Enterprise Stellar Horizon API',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LumenQuery - Enterprise Stellar Horizon API',
    description: 'Enterprise-grade Stellar Horizon API infrastructure. Fast, reliable, and scalable.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
