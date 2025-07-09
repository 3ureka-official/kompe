import { useState, useEffect } from 'react';
import { Contest, Application } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { getContests } from '@/services/contentestService';
import { getApplicationsByContestId } from '@/services/applicationService';

// 統計情報付きのContest型
export interface ContestWithStats extends Contest {
  stats: {
    submissions: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
  };
}

interface UseContestsReturn {
  contests: ContestWithStats[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContests(): UseContestsReturn {
  const [contests, setContests] = useState<ContestWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userBrand } = useAuth();

  // アプリケーションの統計情報を集計
  const calculateContestStats = async (contest: Contest): Promise<ContestWithStats> => {
    try {
      // ApplicationのserviceからcontestIdでアプリケーションを取得
      const applications = await getApplicationsByContestId(contest.id);
      
      const stats = {
        submissions: applications.length,
        totalViews: applications.reduce((sum, app) => sum + app.metrics.views, 0),
        totalLikes: applications.reduce((sum, app) => sum + app.metrics.likes, 0),
        totalComments: 0, // Application型にcommentsがないので0
      };
      
      return {
        ...contest,
        stats
      };
    } catch (error) {
      console.error(`コンテスト ${contest.id} の統計計算エラー:`, error);
      // エラーの場合は0で初期化
      return {
        ...contest,
        stats: {
          submissions: 0,
          totalViews: 0,
          totalLikes: 0,
          totalComments: 0,
        }
      };
    }
  };

  const fetchContests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (userBrand?.id) {
        const userContests = await getContests(userBrand.id);
        console.log('userContests', userContests);
        
        // 各コンテストの統計情報を集計
        const contestsWithStats = await Promise.all(
          userContests.map(contest => calculateContestStats(contest))
        );
        
        setContests(contestsWithStats);
      } else {
        setContests([]);
      }
      
    } catch (err) {
      console.error('コンテスト取得エラー:', err);
      setError('コンテストの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && userBrand) {
      fetchContests();
    } else if (user) {
      // ユーザーはログインしているがブランドがない場合
      setLoading(false);
    }
  }, [user, userBrand]);

  return {
    contests,
    loading,
    error,
    refetch: fetchContests
  };
} 