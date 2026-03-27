import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Header activePage="docs" />
      <main>{children}</main>
      <Footer variant="full" />
    </div>
  );
}
