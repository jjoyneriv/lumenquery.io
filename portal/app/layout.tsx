import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '700'] });

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
        url: '/api/og',
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
    images: ['/api/og'],
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
    google: 'inSkUaLXCS-P3vSuN2fiRRga8CN4lUOZlUuO-oHWkxs',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'LumenQuery',
              url: 'https://lumenquery.io',
              description: 'Enterprise-grade Stellar Horizon API infrastructure.',
              publisher: {
                '@type': 'Organization',
                name: 'LumenQuery',
                url: 'https://lumenquery.io',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://lumenquery.io/query?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LumenQuery',
              url: 'https://lumenquery.io',
              logo: 'https://lumenquery.io/logo.png',
              description: 'Enterprise Stellar Horizon API and Soroban RPC infrastructure for developers. Blockchain analytics, transaction monitoring, and smart contract tools for the Stellar network.',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@lumenquery.io',
                contactType: 'customer support',
              },
            }),
          }}
        />
      </head>
      <body className={rubik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
