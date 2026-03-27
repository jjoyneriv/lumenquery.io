'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: 'ledger' | 'transactions' | 'success' | 'fee' | 'custom';
  customIcon?: React.ReactNode;
}

const icons = {
  ledger: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  transactions: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fee: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  custom: null,
};

const trendColors = {
  up: 'text-green-500',
  down: 'text-red-500',
  neutral: 'text-gray-400',
};

const trendIcons = {
  up: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  down: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  neutral: null,
};

export default function MetricCard({
  title,
  value,
  subtitle,
  trend = 'neutral',
  icon = 'custom',
  customIcon,
}: MetricCardProps) {
  const IconComponent = icon === 'custom' ? customIcon : icons[icon];

  return (
    <div className="bg-[#262932] rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-2">
        <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
        {IconComponent && (
          <div className="text-[#7366FF]">
            {IconComponent}
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{value}</p>
        {trend !== 'neutral' && trendIcons[trend] && (
          <span className={trendColors[trend]}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-gray-400 text-xs sm:text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}
