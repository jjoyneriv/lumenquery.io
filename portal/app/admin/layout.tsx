import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import { AdminNav } from '@/components/admin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console - LumenQuery',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { role: true },
  });

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Header activePage="dashboard" />
      <div className="flex">
        <AdminNav />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
