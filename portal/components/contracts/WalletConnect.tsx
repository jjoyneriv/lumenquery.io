'use client';

import { useFreighter } from '@/hooks/useFreighter';
import { formatPublicKey } from '@/lib/wallet';

interface WalletConnectProps {
  onConnect?: () => void;
  className?: string;
}

export function WalletConnect({ onConnect, className = '' }: WalletConnectProps) {
  const { installed, connected, publicKey, network, loading, error, connect, disconnect } =
    useFreighter();

  const handleConnect = async () => {
    const success = await connect();
    if (success && onConnect) {
      onConnect();
    }
  };

  // Not installed state
  if (!installed && !loading) {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="text-center">
          <p className="text-gray-400 mb-2">Freighter wallet required</p>
          <a
            href="https://www.freighter.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7366FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Install Freighter
          </a>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Checking wallet...
        </div>
      </div>
    );
  }

  // Connected state
  if (connected && publicKey) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-mono text-sm">{formatPublicKey(publicKey, 6)}</span>
          {network && (
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">
              {network}
            </span>
          )}
        </div>
        <button
          onClick={disconnect}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // Not connected state
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <button
        onClick={handleConnect}
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#7366FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Connect Freighter
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
