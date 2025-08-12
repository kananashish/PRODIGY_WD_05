import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-md rounded-3xl border border-red-500/20 p-8 shadow-2xl text-center">
      <div className="flex justify-center mb-4">
        <AlertCircle className="w-16 h-16 text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-white/70 mb-6">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-all duration-300 hover:scale-105"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;