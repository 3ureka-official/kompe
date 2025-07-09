import React from 'react';

interface ErrorMessageProps {
  error?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
      {error}
    </div>
  );
} 