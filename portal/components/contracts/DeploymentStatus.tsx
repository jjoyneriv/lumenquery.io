'use client';

import { DeploymentStep } from '@/lib/wallet';

interface DeploymentStatusProps {
  step: DeploymentStep;
  wasmHash?: string | null;
  contractId?: string | null;
  uploadTxHash?: string | null;
  createTxHash?: string | null;
  error?: string | null;
}

const STEP_LABELS: Record<DeploymentStep, string> = {
  IDLE: 'Ready',
  CONNECTING: 'Connecting wallet...',
  UPLOADING: 'Processing file...',
  SIMULATING: 'Simulating transaction...',
  SIGNING_UPLOAD: 'Sign in Freighter...',
  SUBMITTING_UPLOAD: 'Submitting to network...',
  CONFIRMING_UPLOAD: 'Waiting for confirmation...',
  SIGNING_CREATE: 'Sign in Freighter...',
  SUBMITTING_CREATE: 'Creating contract...',
  CONFIRMING_CREATE: 'Waiting for confirmation...',
  SUCCESS: 'Deployment complete!',
  ERROR: 'Deployment failed',
};

export function DeploymentStatus({
  step,
  wasmHash,
  contractId,
  uploadTxHash,
  createTxHash,
  error,
}: DeploymentStatusProps) {
  const isProcessing = ![
    'IDLE',
    'SUCCESS',
    'ERROR',
  ].includes(step);

  const getStepNumber = (): number => {
    switch (step) {
      case 'IDLE':
        return 0;
      case 'CONNECTING':
      case 'UPLOADING':
        return 1;
      case 'SIMULATING':
        return 2;
      case 'SIGNING_UPLOAD':
      case 'SUBMITTING_UPLOAD':
      case 'CONFIRMING_UPLOAD':
        return 3;
      case 'SIGNING_CREATE':
      case 'SUBMITTING_CREATE':
      case 'CONFIRMING_CREATE':
        return 4;
      case 'SUCCESS':
        return 5;
      case 'ERROR':
        return -1;
      default:
        return 0;
    }
  };

  const stepNumber = getStepNumber();

  const explorerBaseUrl = 'https://stellar.expert/explorer/public';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full">
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-6">
        {['Connect', 'Upload', 'Simulate', 'Sign & Submit', 'Complete'].map((label, index) => {
          const isActive = stepNumber === index + 1;
          const isComplete = stepNumber > index + 1 || step === 'SUCCESS';
          const isError = step === 'ERROR' && stepNumber === -1;

          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ${isComplete ? 'bg-green-500 text-white' : ''}
                  ${isActive ? 'bg-[#7366FF] text-white' : ''}
                  ${isError && index === 0 ? 'bg-red-500 text-white' : ''}
                  ${!isComplete && !isActive && !isError ? 'bg-[#E6E7E9] text-gray-400' : ''}
                `}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 text-gray-400">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Current status */}
      <div
        className={`
          p-4 rounded-lg text-center
          ${step === 'ERROR' ? 'bg-red-50 border border-red-200' : ''}
          ${step === 'SUCCESS' ? 'bg-green-50 border border-green-200' : ''}
          ${isProcessing ? 'bg-[#7366FF]/5 border border-[#7366FF]/20' : ''}
          ${step === 'IDLE' ? 'bg-white/5 border border-white/10' : ''}
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {isProcessing && (
            <svg className="w-5 h-5 animate-spin text-[#7366FF]" fill="none" viewBox="0 0 24 24">
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
          )}
          {step === 'SUCCESS' && (
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {step === 'ERROR' && (
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          <span
            className={`
              font-medium
              ${step === 'ERROR' ? 'text-red-700' : ''}
              ${step === 'SUCCESS' ? 'text-green-700' : ''}
              ${isProcessing ? 'text-[#7366FF]' : ''}
              ${step === 'IDLE' ? 'text-gray-400' : ''}
            `}
          >
            {STEP_LABELS[step]}
          </span>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Results */}
      {(wasmHash || contractId) && (
        <div className="mt-4 space-y-3">
          {wasmHash && (
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">WASM Hash:</span>
                <button
                  onClick={() => copyToClipboard(wasmHash)}
                  className="text-xs text-[#7366FF] hover:underline"
                >
                  Copy
                </button>
              </div>
              <p className="font-mono text-xs mt-1 break-all">{wasmHash}</p>
            </div>
          )}

          {contractId && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Contract ID:</span>
                <button
                  onClick={() => copyToClipboard(contractId)}
                  className="text-xs text-green-600 hover:underline"
                >
                  Copy
                </button>
              </div>
              <p className="font-mono text-sm mt-1 break-all text-green-800">{contractId}</p>
              <a
                href={`/contracts/${contractId}`}
                className="inline-flex items-center gap-1 mt-2 text-sm text-[#7366FF] hover:underline"
              >
                View in Explorer
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Transaction links */}
      {(uploadTxHash || createTxHash) && (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {uploadTxHash && (
            <a
              href={`${explorerBaseUrl}/tx/${uploadTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#7366FF] hover:underline"
            >
              Upload TX
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          {createTxHash && (
            <a
              href={`${explorerBaseUrl}/tx/${createTxHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#7366FF] hover:underline"
            >
              Create TX
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
