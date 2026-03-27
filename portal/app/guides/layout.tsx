import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header activePage="docs" />
      <main>{children}</main>
      <Footer variant="full" />
    </div>
  );
}
