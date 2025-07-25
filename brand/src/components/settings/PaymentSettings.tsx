'use client';

import { useState } from 'react';
import { PaymentInfo } from '@/types/User';

type Props = {
  paymentInfo: PaymentInfo;
  onSave: (updatedPaymentInfo: PaymentInfo) => void;
};

export function PaymentSettings({ paymentInfo, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(paymentInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const handleChange = (field: keyof PaymentInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setFormData(paymentInfo);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">支払い先情報</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            編集
          </button>
        )}
      </div>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <div className="flex">
          <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-yellow-800">重要な情報</h3>
            <p className="text-sm text-yellow-700 mt-1">
              この情報は賞金の振込に使用されます。正確な情報を入力してください。
            </p>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* 銀行名 */}
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                銀行名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="bankName"
                value={formData.bankName}
                onChange={(e) => handleChange('bankName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="例：みずほ銀行"
                required
              />
            </div>

            {/* 支店名 */}
            <div>
              <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-1">
                支店名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="branchName"
                value={formData.branchName}
                onChange={(e) => handleChange('branchName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="例：新宿支店"
                required
              />
            </div>

            {/* 口座種別 */}
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">
                口座種別 <span className="text-red-500">*</span>
              </label>
              <select
                id="accountType"
                value={formData.accountType}
                onChange={(e) => handleChange('accountType', e.target.value)}
                className="appearance-none block w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-base text-gray-900 transition duration-150 ease-in-out hover:border-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"              
                required
              >
                <option value="savings">普通預金</option>
                <option value="checking">当座預金</option>
              </select>
            </div>

            {/* 口座番号 */}
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                口座番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleChange('accountNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="例：1234567"
                pattern="[0-9]*"
                required
              />
            </div>

            {/* 口座名義人 */}
            <div>
              <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                口座名義人（カタカナ） <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="accountHolderName"
                value={formData.accountHolderName}
                onChange={(e) => handleChange('accountHolderName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                placeholder="例：タナカ タロウ"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                銀行口座に登録されている名義人と同じカタカナ表記で入力してください
              </p>
            </div>

            {/* ボタン */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary-400 text-white rounded-md text-sm font-medium hover:bg-primary-500"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* 銀行名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">銀行名</label>
            <p className="text-gray-900">{paymentInfo.bankName || '未設定'}</p>
          </div>

          {/* 支店名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">支店名</label>
            <p className="text-gray-900">{paymentInfo.branchName || '未設定'}</p>
          </div>

          {/* 口座種別 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">口座種別</label>
            <p className="text-gray-900">
              {paymentInfo.accountType === 'savings' ? '普通預金' : 
               paymentInfo.accountType === 'checking' ? '当座預金' : '未設定'}
            </p>
          </div>

          {/* 口座番号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">口座番号</label>
            <p className="text-gray-900">{paymentInfo.accountNumber || '未設定'}</p>
          </div>

          {/* 口座名義人 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">口座名義人</label>
            <p className="text-gray-900">{paymentInfo.accountHolderName || '未設定'}</p>
          </div>
        </div>
      )}
    </div>
  );
} 