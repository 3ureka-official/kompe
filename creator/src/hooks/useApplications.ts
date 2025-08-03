import { useState, useEffect, useCallback } from "react";
import {
  ContestSummary,
  ApplicationTab,
  ApplicationFilters,
} from "@/types/contest";
import {
  getUserApplications,
  getApplicationStats,
} from "@/lib/api/applications";

interface UseApplicationsOptions {
  userId?: string;
  initialPage?: number;
  initialTab?: ApplicationTab;
  initialFilters?: ApplicationFilters;
  initialSearch?: string;
  autoFetch?: boolean;
}

interface UseApplicationsReturn {
  contests: ContestSummary[];
  loading: boolean;
  error: string | null;
  total: number;
  limit: number;
  page: number;
  tab: ApplicationTab;
  search: string;
  stats: {
    total: number;
    active: number;
    ended: number;
    pending: number;
    approved: number;
    rejected: number;
    winner: number;
  } | null;

  // Actions
  refresh: () => Promise<void>;
  reset: () => void;
  setPage: (page: number) => void;
  setTab: (tab: ApplicationTab) => void;
  setSearch: (search: string) => void;
}

export function useApplications(
  options: UseApplicationsOptions = {},
): UseApplicationsReturn {
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
  const [stats, setStats] = useState<UseApplicationsReturn["stats"]>(null);
  const [page, setPage] = useState(initialPage);
  const [tab, setTab] = useState<ApplicationTab>(initialTab);
  const [search, setSearch] = useState(initialSearch);

  const limit = 12;

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [applicationsResponse, statsResponse] = await Promise.all([
        getUserApplications({
          userId,
          page,
          limit,
          tab,
          filters: initialFilters,
          search,
        }),
        getApplicationStats(userId),
      ]);

      setContests(applicationsResponse.contests);
      setTotal(applicationsResponse.total);
      setStats(statsResponse);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "応募コンテストの取得に失敗しました",
      );
      setContests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [userId, page, tab, initialFilters, search, limit]);

  // Refresh (reset page to 1 and fetch)
  const refresh = useCallback(async () => {
    await fetchApplications();
  }, [fetchApplications]);

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
      fetchApplications();
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
