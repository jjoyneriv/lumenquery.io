'use client';

import { useState, useCallback } from 'react';
import { useFreighter } from '@/hooks/useFreighter';
import { useContractDeploy } from '@/hooks/useContractDeploy';
import { WalletConnect } from './WalletConnect';
import { WasmUploader } from './WasmUploader';
import { DeploymentStatus } from './DeploymentStatus';

type WizardStep = 'connect' | 'upload' | 'review' | 'deploy' | 'complete';

export function DeploymentWizard() {
  const [wizardStep, setWizardStep] = useState<WizardStep>('connect');
  const [preparedUploadXdr, setPreparedUploadXdr] = useState<string | null>(null);
  const [preparedCreateXdr, setPreparedCreateXdr] = useState<string | null>(null);
  const [estimatedUploadFee, setEstimatedUploadFee] = useState<string | null>(null);
  const [estimatedCreateFee, setEstimatedCreateFee] = useState<string | null>(null);

  const wallet = useFreighter();
  const deploy = useContractDeploy();

  // Handle file selection
  const handleFileSelect = useCallback(
    async (file: File | null) => {
      await deploy.setWasmFile(file);
      if (file && !deploy.state.error) {
        setWizardStep('upload');
      }
    },
    [deploy]
  );

  // Simulate upload transaction
  const handleSimulate = useCallback(async () => {
    if (!wallet.publicKey || !wallet.network) return;

    const result = await deploy.simulateUpload(wallet.publicKey, wallet.network);
    if (result) {
      setPreparedUploadXdr(result.xdr);
      setEstimatedUploadFee(result.fee);
      setWizardStep('review');
    }
  }, [wallet.publicKey, wallet.network, deploy]);

  // Sign and submit upload transaction
  const handleUpload = useCallback(async () => {
    if (!preparedUploadXdr) return;

    // Sign the transaction
    const signedXdr = await wallet.signTransaction(preparedUploadXdr);
    if (!signedXdr) return;

    // Submit and get WASM hash
    const wasmHash = await deploy.uploadWasm(signedXdr);
    if (wasmHash && wallet.publicKey && wallet.network) {
      // Immediately simulate create contract transaction
      const result = await deploy.simulateCreate(wasmHash, wallet.publicKey, wallet.network);
      if (result) {
        setPreparedCreateXdr(result.xdr);
        setEstimatedCreateFee(result.fee);
        setWizardStep('deploy');
      }
    }
  }, [preparedUploadXdr, wallet, deploy]);

  // Sign and submit create contract transaction
  const handleCreate = useCallback(async () => {
    if (!preparedCreateXdr) return;

    // Sign the transaction
    const signedXdr = await wallet.signTransaction(preparedCreateXdr);
    if (!signedXdr) return;

    // Submit and get contract ID
    const contractId = await deploy.createContract(signedXdr);
    if (contractId) {
      setWizardStep('complete');
    }
  }, [preparedCreateXdr, wallet, deploy]);

  // Reset wizard
  const handleReset = useCallback(() => {
    deploy.reset();
    setPreparedUploadXdr(null);
    setPreparedCreateXdr(null);
    setEstimatedUploadFee(null);
    setEstimatedCreateFee(null);
    setWizardStep('connect');
  }, [deploy]);

  // Check if wallet is connected
  const isWalletConnected = wallet.connected && wallet.publicKey;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Deployment Status */}
      <div className="mb-8">
        <DeploymentStatus
          step={deploy.state.step}
          wasmHash={deploy.state.wasmHash}
          contractId={deploy.state.contractId}
          uploadTxHash={deploy.state.uploadTxHash}
          createTxHash={deploy.state.createTxHash}
          error={deploy.state.error}
        />
      </div>

      {/* Wizard Content */}
      <div className="bg-white border border-[#E6E7E9] rounded-lg p-6">
        {/* Step 1: Connect Wallet */}
        {!isWalletConnected && (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Connect Your Wallet</h3>
            <p className="text-[#6A6A6A] mb-6">
              Connect your Freighter wallet to deploy a smart contract
            </p>
            <WalletConnect
              onConnect={() => setWizardStep('upload')}
              className="justify-center"
            />
          </div>
        )}

        {/* Step 2: Upload WASM */}
        {isWalletConnected && wizardStep === 'connect' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Connected</h3>
              <WalletConnect />
            </div>
            <button
              onClick={() => setWizardStep('upload')}
              className="w-full py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors"
            >
              Continue to Upload
            </button>
          </div>
        )}

        {isWalletConnected && wizardStep === 'upload' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Contract WASM</h3>
              <WalletConnect />
            </div>
            <WasmUploader
              file={deploy.state.wasmFile}
              onFileSelect={handleFileSelect}
              error={deploy.state.error}
            />
            {deploy.state.wasmFile && !deploy.state.error && (
              <button
                onClick={handleSimulate}
                disabled={deploy.state.step === 'SIMULATING'}
                className="w-full mt-4 py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors disabled:opacity-50"
              >
                {deploy.state.step === 'SIMULATING' ? 'Simulating...' : 'Continue'}
              </button>
            )}
          </div>
        )}

        {/* Step 3: Review & Sign Upload */}
        {isWalletConnected && wizardStep === 'review' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review & Upload WASM</h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A]">File</span>
                  <span className="font-medium">{deploy.state.wasmFile?.name}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A]">Size</span>
                  <span className="font-medium">
                    {deploy.state.wasmFile
                      ? `${(deploy.state.wasmFile.size / 1024).toFixed(1)} KB`
                      : '-'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#2855FF]/5 rounded-lg border border-[#2855FF]/20">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A]">Estimated Fee</span>
                  <span className="font-medium text-[#2855FF]">
                    {estimatedUploadFee || 'Calculating...'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setWizardStep('upload')}
                className="flex-1 py-3 border border-[#E6E7E9] text-[#6A6A6A] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleUpload}
                disabled={!preparedUploadXdr || deploy.state.step !== 'IDLE'}
                className="flex-1 py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors disabled:opacity-50"
              >
                Sign & Upload
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Create Contract */}
        {isWalletConnected && wizardStep === 'deploy' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Create Contract Instance</h3>
            <p className="text-[#6A6A6A] mb-4">
              WASM uploaded successfully! Now create your contract instance.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">WASM Hash</span>
                  <span className="font-mono text-xs truncate max-w-[200px]">
                    {deploy.state.wasmHash?.slice(0, 16)}...
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#2855FF]/5 rounded-lg border border-[#2855FF]/20">
                <div className="flex justify-between items-center">
                  <span className="text-[#6A6A6A]">Estimated Fee</span>
                  <span className="font-medium text-[#2855FF]">
                    {estimatedCreateFee || 'Calculating...'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreate}
              disabled={!preparedCreateXdr}
              className="w-full py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors disabled:opacity-50"
            >
              Sign & Create Contract
            </button>
          </div>
        )}

        {/* Step 5: Complete */}
        {wizardStep === 'complete' && deploy.state.contractId && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Contract Deployed!</h3>
            <p className="text-[#6A6A6A] mb-6">
              Your smart contract is now live on the Stellar network.
            </p>

            <div className="flex gap-3 justify-center">
              <a
                href={`/contracts/${deploy.state.contractId}`}
                className="px-6 py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors"
              >
                View Contract
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-[#E6E7E9] text-[#6A6A6A] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Deploy Another
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {deploy.state.step === 'ERROR' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-red-700">Deployment Failed</h3>
            <p className="text-[#6A6A6A] mb-6">{deploy.state.error}</p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[#2855FF] text-white rounded-lg hover:bg-[#1e44cc] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
