import AppShell from '@/components/cuba/AppShell';
import PageTracker from '@/components/PageTracker';

export default function CubaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <PageTracker />
      {children}
    </AppShell>
  );
}
