'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ContractNav } from '@/components/contracts';

export default function ContractLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const contractId = params.contractId as string;

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col">
      <Header activePage="contracts" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Contract ID Header */}
        <div className="mb-6">
          <p className="text-sm text-[#6A6A6A] mb-1">Contract</p>
          <h1 className="text-lg sm:text-xl font-mono text-[#2855FF] break-all">
            {contractId}
          </h1>
        </div>

        {/* Navigation + Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <ContractNav contractId={contractId} />
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  );
}
