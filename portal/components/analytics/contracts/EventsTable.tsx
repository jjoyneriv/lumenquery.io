'use client';

interface ContractEvent {
  contractId: string;
  type: string;
  ledger: number;
  timestamp: string;
  txHash: string;
}

interface EventsTableProps {
  events: ContractEvent[];
}

export function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E6E7E9] overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-[#E6E7E9]">
        <h3 className="font-semibold text-black flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Recent Contract Events
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Contract
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Event Type
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Ledger
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E7E9]">
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <code className="text-sm font-mono text-[#2855FF]">{event.contractId}</code>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right text-sm font-mono text-[#6A6A6A]">
                    {event.ledger.toLocaleString()}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right text-sm text-[#6A6A6A]">
                    {event.timestamp}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 sm:px-6 py-8 text-center text-[#6A6A6A]">
                  No contract events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
