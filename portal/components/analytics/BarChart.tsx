'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface BarChartProps {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  valueFormatter?: (value: number) => string;
  showGrid?: boolean;
  chartId?: string;
}

export default function BarChart({
  data,
  dataKey,
  xAxisKey,
  color = '#2855FF',
  height = 300,
  valueFormatter = (v) => v.toLocaleString(),
  showGrid = true,
}: BarChartProps) {
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

  // Determine time span of data to format x-axis appropriately
  const getDataSpanHours = () => {
    if (data.length < 2) return 24;
    const first = new Date(data[0][xAxisKey] as string).getTime();
    const last = new Date(data[data.length - 1][xAxisKey] as string).getTime();
    return Math.abs(last - first) / (1000 * 60 * 60);
  };

  const dataSpanHours = getDataSpanHours();

  const formatXAxis = (value: string) => {
    try {
      const date = new Date(value);
      // For data spanning more than 3 days, show date only
      if (dataSpanHours > 72) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
      // For data spanning 1-3 days, show date and hour
      if (dataSpanHours > 24) {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric' });
      }
      // For data spanning less than 24 hours, show just the time
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } catch {
      return value;
    }
  };

  const formatTooltipValue = (value: number) => {
    return valueFormatter(value);
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
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
          cursor={{ fill: 'rgba(40, 85, 255, 0.1)' }}
        />
        <Bar
          dataKey={dataKey}
          fill={color}
          radius={[4, 4, 0, 0]}
          animationDuration={500}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
