'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSetupPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 支払い設定完了後ダッシュボードへ
  const handlePaymentComplete = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Stripe設定API呼び出し
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/dashboard');
    } catch (error) {
      console.error('支払い設定エラー:', error);
      alert('支払い設定に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 支払い設定をスキップしてダッシュボードへ
  const handleSkipPayment = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BrandContest</h1>
          <h2 className="text-2xl font-bold text-gray-900">支払い設定</h2>
          <p className="mt-2 text-sm text-gray-600">
            Stripe決済の設定を行います
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Stripe決済設定
            </h3>
            <p className="text-sm text-gray-600 mb-8">
              コンテストの賞金支払いにはStripeを使用します。<br />
              後で設定することも可能です。
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handlePaymentComplete}
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Stripe設定中...' : 'Stripe設定を開始'}
              </button>
              
              <button
                onClick={handleSkipPayment}
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                後で設定する
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 