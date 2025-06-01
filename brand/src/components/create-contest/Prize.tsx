import { Button } from '@/components/ui/button';
import { useState } from 'react';

const prizeOptions = [
  { 
    value: 200000, 
    label: '20万円',
    icon: (
      <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
      </svg>
    ),
    color: 'text-amber-600'
  },
  { 
    value: 500000, 
    label: '50万円',
    icon: (
      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
      </svg>
    ),
    color: 'text-gray-400'
  },
  { 
    value: 1000000, 
    label: '100万円',
    icon: (
      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
      </svg>
    ),
    color: 'text-yellow-500'
  }
  // { value: 'custom', label: 'カスタム設定' },
];

type Props = {
  onPrev: () => void;
  onSubmit: () => void;
};

export function Prize({ onPrev, onSubmit }: Props) {
  const [winners, setWinners] = useState([
    { rank: '1位', amount: 100000 },
    { rank: '2位', amount: 50000 },
    { rank: '3位', amount: 30000 },
  ]);

  const [totalPrize, setTotalPrize] = useState(0);
  const [selectedPrizeOption, setSelectedPrizeOption] = useState<string | number>('');

  const addWinner = () => {
    if (winners.length < 10) {
      setWinners([...winners, { rank: `${winners.length + 1}位`, amount: 0 }]);
    }
  };

  const removeWinner = (index: number) => {
    if (winners.length > 1) {
      setWinners(winners.filter((_, i) => i !== index));
    }
  };

  const updateAmount = (index: number, amount: number) => {
    const newWinners = [...winners];
    newWinners[index].amount = amount;
    setWinners(newWinners);
    
    // 合計金額を更新
    const total = newWinners.reduce((sum, winner) => sum + winner.amount, 0);
    setTotalPrize(total);
  };

  return (
    <div>
      <div className=" bg-white rounded-lg p-8 shadow-sm">
        <h3 className="text-base font-medium text-gray-700 mb-4">総賞金額</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {prizeOptions.map((option) => (
            <label
              key={option.value}
              className={`relative flex cursor-pointer rounded-lg border p-4 transition-colors ${
                selectedPrizeOption === option.value 
                  ? 'border-gray-900 bg-gray-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="prizePool"
                value={option.value}
                className="sr-only"
                checked={selectedPrizeOption === option.value}
                onChange={() => {
                  setSelectedPrizeOption(option.value);
                  setTotalPrize(option.value as number);
                }}
              />
              <span className="flex flex-col items-center w-full justify-center">
                <div className="mb-2">
                  {option.icon}
                </div>
                <span className="block text-sm font-medium text-gray-900">
                  {option.label}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className=" bg-white rounded-lg p-8 shadow-sm mt-8">
      <div>
        <h3 className="text-base font-medium text-gray-700 mb-4">配分金額</h3>
        <div className='flex justify-between items-center mb-6'>
          <h4 className="text-base font-medium text-gray-700">入賞者数</h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => removeWinner(winners.length - 1)}
              disabled={winners.length <= 1}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: winners.length <= 1 ? '#9CA3AF' : '#25F4EE',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                if (winners.length > 1) {
                  e.currentTarget.style.backgroundColor = '#00E6D9';
                }
              }}
              onMouseLeave={(e) => {
                if (winners.length > 1) {
                  e.currentTarget.style.backgroundColor = '#25F4EE';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-base font-medium text-gray-700 min-w-[3rem] text-center">
              {winners.length}人
            </span>
            <button
              type="button"
              onClick={addWinner}
              disabled={winners.length >= 10}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ 
                backgroundColor: winners.length >= 10 ? '#9CA3AF' : '#25F4EE',
                color: '#000000'
              }}
              onMouseEnter={(e) => {
                if (winners.length < 10) {
                  e.currentTarget.style.backgroundColor = '#00E6D9';
                }
              }}
              onMouseLeave={(e) => {
                if (winners.length < 10) {
                  e.currentTarget.style.backgroundColor = '#25F4EE';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {winners.map((winner, index) => (
            <div key={index} className="w-full flex gap-6 items-center justify-between">
              <label className="block text-base font-medium text-gray-700">{winner.rank}</label>
              <input
                type="number"
                value={winner.amount}
                onChange={(e) => updateAmount(index, Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onFocus={(e) => {
                  e.target.style.borderColor = '#25F4EE';
                  e.target.style.boxShadow = '0 0 0 2px rgba(37, 244, 238, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#D1D5DB';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          ))}
        </div>
        {selectedPrizeOption && totalPrize !== (selectedPrizeOption as number) && (
          <p className="text-sm text-red-700 mt-6">
            配分金額の合計（{totalPrize.toLocaleString()}円）が選択した総賞金額（{(selectedPrizeOption as number).toLocaleString()}円）と一致しません
          </p>
        )}
        {selectedPrizeOption && totalPrize === 0 && (
          <p className="text-sm text-red-700 mt-6">
            配分金額を設定してください（総賞金額: {(selectedPrizeOption as number).toLocaleString()}円）
          </p>
        )}
      </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button
          type="button"
          variant="secondary"
        >
          下書き保存
        </Button>
        <Button
          type="button"
          onClick={onPrev}
          variant="secondary"
        >
          前へ戻る
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          variant="primary"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00E6D9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#25F4EE';
          }}
        >
          コンテストを作成
        </Button>
      </div>
    </div>
  );
} 