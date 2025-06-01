'use client';

import { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export function Card({ title, children, actions, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow p-8 ${className}`}>
      {(title || actions) && (
        <div className="flex justify-between items-start mb-6">
          {title && (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          )}
          {actions && (
            <div className="flex space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
} 