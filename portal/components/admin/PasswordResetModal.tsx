'use client';

import { useState } from 'react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userEmail: string;
  userName: string | null;
}

export default function PasswordResetModal({
  isOpen,
  onClose,
  userId,
  userEmail,
  userName,
}: PasswordResetModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendReset = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/users/${userId}/password`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send password reset email');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#262932] rounded-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Reset Password</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Sent!</h3>
              <p className="text-gray-400 mb-6">
                A password reset link has been sent to <span className="font-medium">{userEmail}</span>.
                The link will expire in 1 hour.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#7366FF] flex items-center justify-center text-white text-lg font-medium">
                  {(userName || userEmail).charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{userName || 'No name'}</p>
                  <p className="text-sm text-gray-400">{userEmail}</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">This will send a password reset email</p>
                    <p className="text-yellow-700 mt-1">
                      The user will receive an email with a link to reset their password.
                      Any existing password will remain valid until they complete the reset.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-white/10 rounded-lg font-medium text-gray-400 hover:bg-white/5 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReset}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#7366FF] text-white rounded-lg font-medium hover:bg-[#1e40af] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Email'
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
