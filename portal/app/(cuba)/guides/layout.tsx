import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1D1E26] text-white">
      <Header activePage="docs" />
      <main>{children}</main>
      <Footer variant="full" />
    </div>
  );
}
