import { useState, useEffect, useContext, useCallback } from 'react';
import { Contest } from '@/types/contest';
import { AuthContext } from '@/contexts/AuthContext';
import { getContests } from '@/services/contentestService';

interface UseContestsReturn {
  contests: Contest[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContests(): UseContestsReturn {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useContext(AuthContext);

  const fetchContests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 一時的にモックデータを使う
      if (profile?.id) {
        const userContests = await getContests(profile.id);
        console.log('userContests', userContests);
        setContests(userContests);
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