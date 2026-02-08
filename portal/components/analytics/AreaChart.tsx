'use client';

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AreaChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  valueFormatter?: (value: number) => string;
  showGrid?: boolean;
}

export default function AreaChart({
  data,
  dataKey,
  xAxisKey,
  color = '#2855FF',
  height = 300,
  valueFormatter = (v) => v.toLocaleString(),
  showGrid = true,
}: AreaChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-[#F5F6F7] rounded-lg"
        style={{ height }}
      >
        <p className="text-[#6A6A6A] text-sm">No data available</p>
      </div>
    );
  }

  const formatXAxis = (value: string) => {
    try {
      const date = new Date(value);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return value;
    }
  };

  const formatTooltipValue = (value: number) => {
    return valueFormatter(value);
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="#E6E7E9" vertical={false} />
        )}
        <XAxis
          dataKey={xAxisKey}
          tickFormatter={formatXAxis}
          tick={{ fill: '#6A6A6A', fontSize: 12 }}
          axisLine={{ stroke: '#E6E7E9' }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => formatTooltipValue(v)}
          tick={{ fill: '#6A6A6A', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E6E7E9',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          labelFormatter={(label) => {
            try {
              const date = new Date(label);
              return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            } catch {
              return label;
            }
          }}
          formatter={(value: number) => [formatTooltipValue(value), dataKey]}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${dataKey})`}
          animationDuration={500}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
