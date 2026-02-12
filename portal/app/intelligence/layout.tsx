import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F7]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer variant="simple" />
    </div>
  );
}
