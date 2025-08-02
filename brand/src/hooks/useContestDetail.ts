import { useState, useEffect, useCallback } from 'react';
import { Contest } from '@/types/Contest';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
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

interface UseContestDetailReturn {
  contests: ContestWithStats[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContestDetail(): UseContestDetailReturn {
  const [contests, setContests] = useState<ContestWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useContext(AuthContext);

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

  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (profile?.id) {
        const userContests = await getContests(profile.id);
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
  }, [profile]);

  useEffect(() => {
    if (user && profile) {
      fetchContests();
    } else if (user) {
      // ユーザーはログインしているがブランドがない場合
      setLoading(false);
    }
  }, [user, profile, fetchContests]);

  return {
    contests,
    loading,
    error,
    refetch: fetchContests
  };
} 