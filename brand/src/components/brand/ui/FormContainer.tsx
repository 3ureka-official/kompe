'use client';

import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLogo?: boolean;
};

const maxWidthClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl'
};

export function FormContainer({ 
  title, 
  subtitle, 
  children, 
  maxWidth = 'md',
  showLogo = false 
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className={`sm:mx-auto sm:w-full ${maxWidthClasses[maxWidth]}`}>
        {showLogo && (
          <div className="flex justify-center mb-6">
            {/* ロゴコンポーネントがあればここに配置 */}
          </div>
        )}
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className={`mt-8 sm:mx-auto sm:w-full ${maxWidthClasses[maxWidth]}`}>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
} 