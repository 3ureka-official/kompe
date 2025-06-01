'use client';

import { useState } from 'react';

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type Props = {
  onLogin: (data: UserLoginData) => void;
  onSignup: (data: UserSignupData) => void;
};

export function UserAuthForm({ onLogin, onSignup }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState<UserLoginData>({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState<UserSignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onLogin(loginData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      alert('パスワードが一致しません');
      return;
    }

    if (signupData.password.length < 8) {
      alert('パスワードは8文字以上で入力してください');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSignup(signupData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginChange = (field: keyof UserLoginData, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignupChange = (field: keyof UserSignupData, value: string) => {
    setSignupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BrandContest</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'ログイン' : 'アカウント作成'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'アカウントにログインしてください' 
              : 'TikTokクリエイターとのコラボレーションを始めましょう'
            }
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* タブ切り替え */}
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-md border ${
                isLogin
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              ログイン
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-md border-t border-r border-b ${
                !isLogin
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-500 hover:text-gray-700'
              }`}
            >
              新規登録
            </button>
          </div>

          {/* ログインフォーム */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => handleLoginChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="your@example.com"
                  required
                />
              </div>

              {/* パスワード */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  パスワード
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={loginData.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    placeholder="パスワードを入力"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* パスワードを忘れた場合 */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    パスワードを忘れた場合
                  </a>
                </div>
              </div>

              {/* ログインボタン */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ログイン中...' : 'ログイン'}
                </button>
              </div>
            </form>
          ) : (
            /* サインアップフォーム */
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              {/* 名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={signupData.name}
                  onChange={(e) => handleSignupChange('name', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="田中太郎"
                  required
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="signup-email"
                  value={signupData.email}
                  onChange={(e) => handleSignupChange('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                  placeholder="your@example.com"
                  required
                />
              </div>

              {/* パスワード */}
              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                  パスワード <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password"
                    value={signupData.password}
                    onChange={(e) => handleSignupChange('password', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    placeholder="8文字以上のパスワード"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* パスワード確認 */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  パスワード確認 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    value={signupData.confirmPassword}
                    onChange={(e) => handleSignupChange('confirmPassword', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                    placeholder="パスワードを再入力"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 利用規約 */}
              <div className="text-sm text-gray-600">
                <p>
                  アカウントを作成することで、
                  <a href="#" className="text-blue-600 hover:text-blue-500">利用規約</a>
                  および
                  <a href="#" className="text-blue-600 hover:text-blue-500">プライバシーポリシー</a>
                  に同意したものとみなされます。
                </p>
              </div>

              {/* サインアップボタン */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'アカウント作成中...' : 'アカウントを作成'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 