import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
  children: React.ReactNode;
}

export function AuthLayout({ 
  title, 
  subtitle, 
  linkText, 
  linkHref, 
  children 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">ブランドコンテスト</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && linkText && linkHref && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}{' '}
              <Link href={linkHref} className="font-medium text-blue-600 hover:text-blue-500">
                {linkText}
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
} 