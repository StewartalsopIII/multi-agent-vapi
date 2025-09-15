'use client';

import { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiAgentProps {
  assistantId: string;
  agentName: string;
  publicKey: string;
}

export default function VapiAgent({ assistantId, agentName, publicKey }: VapiAgentProps) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setError('Public key is required');
      return;
    }

    try {
      vapiRef.current = new Vapi(publicKey);

      vapiRef.current.on('call-start', () => {
        setIsSessionActive(true);
        setIsLoading(false);
        setError(null);
      });

      vapiRef.current.on('call-end', () => {
        setIsSessionActive(false);
        setIsLoading(false);
      });

      vapiRef.current.on('error', (error) => {
        setError(error.message || 'An error occurred');
        setIsLoading(false);
        setIsSessionActive(false);
      });

    } catch (err) {
      setError('Failed to initialize Vapi');
      console.error('Vapi initialization error:', err);
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [publicKey]);

  const startCall = async () => {
    if (!vapiRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      await vapiRef.current.start(assistantId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start call');
      setIsLoading(false);
    }
  };

  const stopCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
            {agentName} Agent
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your personalized AI voice assistant is ready to help you.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Voice Assistant</h2>
              <p className="text-gray-600 mb-4">
                Click the button below to start talking with your AI assistant
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="flex space-x-4">
              {!isSessionActive ? (
                <button
                  onClick={startCall}
                  disabled={isLoading}
                  className={`
                    px-6 py-3 rounded-full font-semibold text-white transition-all duration-200
                    ${isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 hover:scale-105'
                    }
                  `}
                >
                  {isLoading ? 'Starting...' : 'Start Call'}
                </button>
              ) : (
                <button
                  onClick={stopCall}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all duration-200 hover:scale-105"
                >
                  End Call
                </button>
              )}
            </div>

            <div className="text-sm text-gray-500 text-center max-w-md">
              {isSessionActive && (
                <p className="animate-pulse">🎙️ Call in progress... Speak naturally!</p>
              )}
              {!isSessionActive && !isLoading && (
                <p>Ready to start your conversation</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Agent ID: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">{assistantId}</code>
          </p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://vapi.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Vapi.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}