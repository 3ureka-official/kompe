import { mockContests, mockApplications } from '@/types/mocks';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default function ContestDetailPage({ params }: Props) {
  const contest = mockContests.find(c => c.id === params.id);
  const applications = mockApplications.filter(a => a.contestId === params.id);

  if (!contest) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            ← 一覧に戻る
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="relative h-64">
          <img 
            src={contest.imageUrl} 
            alt={contest.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900">{contest.title}</h1>
          <p className="mt-4 text-gray-600 whitespace-pre-wrap">{contest.description}</p>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">募集期間</h3>
                <p className="text-gray-600">
                  {formatDate(contest.startAt)} - {formatDate(contest.endAt)}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">賞金</h3>
                <div className="space-y-1">
                  <p className="text-gray-600">
                    総額: <span className="text-green-600 font-semibold">{formatCurrency(contest.prizePool)}</span>
                  </p>
                  {contest.rewards.map((reward, index) => (
                    <p key={index} className="text-gray-600">
                      {reward.rank}位: {formatCurrency(reward.amount)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">審査基準</h3>
              <p className="text-gray-600">
                {contest.criteria === 'views' && '動画の再生回数'}
                {contest.criteria === 'likes' && 'いいね数'}
                {contest.criteria === 'brand' && 'ブランドによる審査'}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">応募作品</h2>
            {applications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map(app => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <img 
                      src={app.thumbnailUrl} 
                      alt={app.title} 
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="mt-2 font-semibold">{app.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      再生数: {app.metrics.views.toLocaleString()} / 
                      いいね: {app.metrics.likes.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                まだ応募作品はありません
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 