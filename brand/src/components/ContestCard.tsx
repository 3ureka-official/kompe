import { Contest } from '@/types/contest';
import { Button } from './ui/Button';
import Link from 'next/link';

type Props = {
  contest: Contest;
};

export const ContestCard = ({ contest }: Props) => {
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

  const getStatusBadge = (status: Contest['status']) => {
    const styles = {
      upcoming: 'bg-yellow-100 text-yellow-800',
      active: 'bg-green-100 text-green-800',
      ended: 'bg-gray-100 text-gray-800'
    };

    const labels = {
      upcoming: '開催予定',
      active: '開催中',
      ended: '終了'
    };

    return (
      <span className={`${styles[status]} px-2 py-1 rounded-full text-sm font-medium`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img 
          src={contest.imageUrl} 
          alt={contest.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          {getStatusBadge(contest.status)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{contest.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>募集期間</span>
            <span>{formatDate(contest.startAt)} - {formatDate(contest.endAt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">賞金総額</span>
            <span className="font-semibold text-green-600">{formatCurrency(contest.prizePool)}</span>
          </div>
        </div>

        <div className="mt-4">
          <Link href={`/dashboard/${contest.id}`}>
            <Button variant="primary" className="w-full">
              詳細を見る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 