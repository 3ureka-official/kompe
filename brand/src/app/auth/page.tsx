'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuthForm, UserLoginData, UserSignupData } from '@/components/auth/UserAuthForm';
import { BrandCreationForm, BrandCreationData } from '@/components/brand/BrandCreationForm';
import { FeatureLandingPage } from '@/components/onboarding/FeatureLandingPage';

type OnboardingStep = 'auth' | 'brand-creation' | 'feature-intro' | 'payment';

export default function AuthPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('auth');
  const [userData, setUserData] = useState<UserSignupData | null>(null);
  const [brandData, setBrandData] = useState<BrandCreationData | null>(null);

  // ログイン処理
  const handleLogin = async (loginData: UserLoginData) => {
    try {
      // TODO: 実際のログインAPI呼び出し
      console.log('ログイン:', loginData);
      
      // 仮の認証処理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ダッシュボードにリダイレクト
      router.push('/dashboard');
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    }
  };

  // サインアップ処理
  const handleSignup = async (signupData: UserSignupData) => {
    try {
      // TODO: 実際のサインアップAPI呼び出し
      console.log('サインアップ:', signupData);
      
      // 仮の認証処理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // ユーザーデータを保存してブランド作成ステップに進む
      setUserData(signupData);
      setCurrentStep('brand-creation');
    } catch (error) {
      console.error('サインアップエラー:', error);
      alert('アカウント作成に失敗しました。しばらく時間をおいて再度お試しください。');
    }
  };

  // ブランド作成処理
  const handleBrandCreation = async (brandCreationData: BrandCreationData) => {
    try {
      // TODO: 実際のブランド作成API呼び出し
      console.log('ブランド作成:', brandCreationData);
      console.log('ユーザーデータ:', userData);
      
      // 仮の処理
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // ブランドデータを保存して機能紹介ステップに進む
      setBrandData(brandCreationData);
      setCurrentStep('feature-intro');
    } catch (error) {
      console.error('ブランド作成エラー:', error);
      alert('ブランド作成に失敗しました。しばらく時間をおいて再度お試しください。');
    }
  };

  // ブランド作成ステップから戻る
  const handleBackToBrandCreation = () => {
    setCurrentStep('brand-creation');
  };

  // 機能紹介から支払い設定へ
  const handleContinueToPayment = () => {
    setCurrentStep('payment');
  };

  // 支払い設定をスキップしてダッシュボードへ
  const handleSkipPayment = () => {
    router.push('/dashboard');
  };

  // 支払い設定完了後ダッシュボードへ
  const handlePaymentComplete = () => {
    router.push('/dashboard');
  };

  // 現在のステップに応じてコンポーネントを表示
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'auth':
        return (
          <UserAuthForm
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        );
      
      case 'brand-creation':
        return (
          <BrandCreationForm
            onSubmit={handleBrandCreation}
            onBack={handleBackToBrandCreation}
            userEmail={userData?.email}
          />
        );
      
      case 'feature-intro':
        return (
          <FeatureLandingPage
            onContinue={handleContinueToPayment}
            onSkip={handleSkipPayment}
          />
        );
      
      case 'payment':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Stripe設定を開始
                    </button>
                    
                    <button
                      onClick={handleSkipPayment}
                      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      後で設定する
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return renderCurrentStep();
} 