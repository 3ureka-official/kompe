import { useState, useEffect, useCallback } from "react";
import { ContestSummary, FavoriteTab, FavoriteFilters } from "@/types/contest";
import { getUserFavorites, getFavoriteStats } from "@/lib/api/favorites";

interface UseFavoritesOptions {
  userId?: string;
  initialPage?: number;
  initialTab?: FavoriteTab;
  initialFilters?: FavoriteFilters;
  initialSearch?: string;
  autoFetch?: boolean;
}

interface UseFavoritesReturn {
  contests: ContestSummary[];
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  page: number;
  tab: FavoriteTab;
  search: string;
  stats: {
    total: number;
    upcoming: number;
    active: number;
    ended: number;
  } | null;

  // Actions
  refresh: () => Promise<void>;
  reset: () => void;
  setPage: (page: number) => void;
  setTab: (tab: FavoriteTab) => void;
  setSearch: (search: string) => void;
}

export function useFavorites(
  options: UseFavoritesOptions = {},
): UseFavoritesReturn {
  const {
    userId = "user_001",
    initialPage = 1,
    initialTab = "active",
    initialFilters = {},
    initialSearch = "",
    autoFetch = true,
  } = options;

  // State
  const [contests, setContests] = useState<ContestSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<UseFavoritesReturn["stats"]>(null);
  const [page, setPage] = useState(initialPage);
  const [tab, setTab] = useState<FavoriteTab>(initialTab);
  const [search, setSearch] = useState(initialSearch);

  const limit = 12;

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [favoritesResponse, statsResponse] = await Promise.all([
        getUserFavorites({
          userId,
          page,
          limit,
          tab,
          filters: initialFilters,
          search,
        }),
        getFavoriteStats(userId),
      ]);

      setContests(favoritesResponse.contests);
      setTotal(favoritesResponse.total);
      setStats(statsResponse);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "お気に入りコンテストの取得に失敗しました",
      );
      setContests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [userId, page, tab, initialFilters, search, limit]);

  // Refresh (reset page to 1 and fetch)
  const refresh = useCallback(async () => {
    await fetchFavorites();
  }, [fetchFavorites]);

  // Reset all filters and state
  const reset = useCallback(() => {
    setError(null);
    setContests([]);
    setTotal(0);
    setPage(1);
    setTab("active");
    setSearch("");
  }, []);

  // Auto-fetch when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchFavorites();
    }
  }, [autoFetch]);

  return {
    contests,
    loading,
    error,
    total,
    limit,
    page,
    tab,
    search,
    stats,
    refresh,
    reset,
    setPage,
    setTab,
    setSearch,
  };
}
