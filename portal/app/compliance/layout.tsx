import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ComplianceNav } from '@/components/compliance';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Compliance - LumenQuery',
  description: 'AML compliance monitoring and alerting for Stellar blockchain',
  robots: 'noindex, nofollow',
};

async function getComplianceStatus(organizationId: string) {
  const [pendingCount] = await Promise.all([
    prisma.complianceViolation.count({
      where: {
        organizationId,
        status: { in: ['PENDING', 'UNDER_REVIEW'] },
      },
    }),
  ]);
  return { pendingCount };
}

export default async function ComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/auth/signin?callbackUrl=/compliance');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { organization: true },
  });

  if (!user?.organizationId) {
    redirect('/dashboard');
  }

  const status = await getComplianceStatus(user.organizationId);

  return (
    <main className="min-h-screen bg-[#F5F6F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-[#E6E7E9] p-4 sticky top-8">
              <h2 className="font-semibold text-black mb-4">Compliance</h2>
              <ComplianceNav pendingViolations={status.pendingCount} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
