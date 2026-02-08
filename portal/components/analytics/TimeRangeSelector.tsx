'use client';

interface TimeRangeSelectorProps {
  value: '24h' | '7d' | '30d';
  onChange: (value: '24h' | '7d' | '30d') => void;
}

const options: Array<{ value: '24h' | '7d' | '30d'; label: string }> = [
  { value: '24h', label: '24h' },
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
];

export default function TimeRangeSelector({ value, onChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex bg-[#F5F6F7] rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm font-medium transition-colors ${
            value === option.value
              ? 'bg-white text-black shadow-sm'
              : 'text-[#6A6A6A] hover:text-black'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
