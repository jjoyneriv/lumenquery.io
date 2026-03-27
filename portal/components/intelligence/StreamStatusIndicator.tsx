'use client';

interface StreamStatusIndicatorProps {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastUpdate?: Date;
}

const statusConfig = {
  connecting: {
    color: 'bg-yellow-500',
    text: 'Connecting...',
    pulse: true,
  },
  connected: {
    color: 'bg-green-500',
    text: 'Live',
    pulse: true,
  },
  disconnected: {
    color: 'bg-white/50',
    text: 'Disconnected',
    pulse: false,
  },
  error: {
    color: 'bg-red-500',
    text: 'Error',
    pulse: false,
  },
};

export function StreamStatusIndicator({ status, lastUpdate }: StreamStatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="relative flex h-3 w-3">
        {config.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${config.color}`} />
      </span>
      <span className="text-gray-400">{config.text}</span>
      {lastUpdate && status === 'connected' && (
        <span className="text-xs text-gray-400">
          Last: {lastUpdate.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
