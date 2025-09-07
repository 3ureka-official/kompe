"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { tikTokAPIClient, TikTokAPIClient, TikTokAPIError } from "@/lib/api/tiktok";
import {
  TikTokUser,
  TikTokUserInfoResponse,
  UserInfoFields,
} from "@/models/tiktok/user";
import {
  TikTokVideo,
  TikTokVideoQueryResponse,
  VideoFields,
} from "@/models/tiktok/video";

// Hook state interface
interface UseTikTokDisplayAPIState {
  loading: boolean;
  error: string | null;
}

// User info hook result interface
interface UserInfoResult extends UseTikTokDisplayAPIState {
  userInfo: TikTokUser | null;
  getUserInfo: (fields?: UserInfoFields[]) => Promise<void>;
}

// Videos query hook result interface
interface VideosQueryResult extends UseTikTokDisplayAPIState {
  videos: TikTokVideo[];
  queryVideos: (videoIds: string[], fields?: VideoFields[]) => Promise<void>;
}

// Combined hook result interface
interface UseTikTokDisplayAPIResult {
  // Authentication state
  isAuthenticated: boolean;
  accessToken: string | null;

  // User info functionality
  userInfo: UserInfoResult;

  // Videos query functionality
  videos: VideosQueryResult;

  // Utility methods
  clearErrors: () => void;
  isApiResponseSuccessful: (response: { error: { code: string } }) => boolean;
}

// Default fields for user info
const DEFAULT_USER_FIELDS: UserInfoFields[] = [
  "open_id",
  "union_id",
  "avatar_url",
  "display_name",
  "username",
];

// Default fields for video query
const DEFAULT_VIDEO_FIELDS: VideoFields[] = [
  "id",
  "title",
  "create_time",
  "cover_image_url",
  "share_url",
  "video_description",
  "duration",
  "like_count",
  "comment_count",
  "share_count",
  "view_count",
];

export function useTikTokDisplayAPI(): UseTikTokDisplayAPIResult {
  const { data: session, status } = useSession();

  // User info state
  const [userInfoState, setUserInfoState] = useState<{
    data: TikTokUser | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  // Videos state
  const [videosState, setVideosState] = useState<{
    data: TikTokVideo[];
    loading: boolean;
    error: string | null;
  }>({
    data: [],
    loading: false,
    error: null,
  });

  // Check if user is authenticated and has access token
  const isAuthenticated = status === "authenticated" && !!session?.accessToken;
  const accessToken = session?.accessToken || null;

  // Get user info function
  const getUserInfo = useCallback(
    async (fields: UserInfoFields[] = DEFAULT_USER_FIELDS) => {
      if (!isAuthenticated || !accessToken) {
        setUserInfoState(prev => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      setUserInfoState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response: TikTokUserInfoResponse = await tikTokAPIClient.getUserInfo(
          accessToken,
          fields
        );

        if (TikTokAPIClient.isSuccessResponse(response)) {
          setUserInfoState({
            data: response.data.user,
            loading: false,
            error: null,
          });
        } else {
          throw new Error(`API Error: ${response.error.message}`);
        }
      } catch (error) {
        const errorMessage = error instanceof TikTokAPIError
          ? error.message
          : `Failed to get user info: ${error}`;

        setUserInfoState({
          data: null,
          loading: false,
          error: errorMessage,
        });
      }
    },
    [isAuthenticated, accessToken]
  );

  // Query videos function
  const queryVideos = useCallback(
    async (videoIds: string[], fields: VideoFields[] = DEFAULT_VIDEO_FIELDS) => {
      if (!isAuthenticated || !accessToken) {
        setVideosState(prev => ({
          ...prev,
          error: "User not authenticated",
        }));
        return;
      }

      if (videoIds.length === 0) {
        setVideosState(prev => ({
          ...prev,
          error: "Video IDs are required",
        }));
        return;
      }

      setVideosState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response: TikTokVideoQueryResponse = await tikTokAPIClient.queryVideos(
          accessToken,
          videoIds,
          fields
        );

        if (TikTokAPIClient.isSuccessResponse(response)) {
          setVideosState({
            data: response.data.videos,
            loading: false,
            error: null,
          });
        } else {
          throw new Error(`API Error: ${response.error.message}`);
        }
      } catch (error) {
        const errorMessage = error instanceof TikTokAPIError
          ? error.message
          : `Failed to query videos: ${error}`;

        setVideosState({
          data: [],
          loading: false,
          error: errorMessage,
        });
      }
    },
    [isAuthenticated, accessToken]
  );

  // Clear all errors
  const clearErrors = useCallback(() => {
    setUserInfoState(prev => ({
      ...prev,
      error: null,
    }));
    setVideosState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  // Utility method to check API response success
  const isApiResponseSuccessful = useCallback(
    (response: { error: { code: string } }) => {
      return TikTokAPIClient.isSuccessResponse(response);
    },
    []
  );

  return {
    // Authentication state
    isAuthenticated,
    accessToken,

    // User info functionality
    userInfo: {
      userInfo: userInfoState.data,
      loading: userInfoState.loading,
      error: userInfoState.error,
      getUserInfo,
    },

    // Videos query functionality
    videos: {
      videos: videosState.data,
      loading: videosState.loading,
      error: videosState.error,
      queryVideos,
    },

    // Utility methods
    clearErrors,
    isApiResponseSuccessful,
  };
}
