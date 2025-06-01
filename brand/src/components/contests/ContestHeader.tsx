import { Button } from '@/components/ui/button';
import { ContestDetail } from '@/types/contest';

type Props = {
  contest: ContestDetail;
};

export function ContestHeader({ contest }: Props) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('ja-JP');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              開催中
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{contest.title}</h1>
          <p className="text-gray-600 mb-6">{contest.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-16 text-sm text-gray-500">
              <div className="flex flex-col items-start">
                <p className="text-gray-500">応募期間</p>
                <p className="text-black font-bold text-base">{formatDate(contest.startDate)} - {formatDate(contest.endDate)}</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-500">総賞金</p>
                <p className="text-black font-bold text-base">¥{formatNumber(contest.prizePool)}</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-gray-500">カテゴリー</p>
                <p className="text-black font-bold text-base">{contest.category}</p>
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="primary"
          style={{ 
            backgroundColor: '#25F4EE', 
            color: '#000000',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#00E6D9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#25F4EE';
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <p className="text-black font-bold text-base">編集</p>
        </Button>
      </div>
    </div>
  );
} 