"use client";

import React from "react";
import { useTikTokDisplayAPI } from "@/hooks/useTikTokDisplayAPI";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Example component demonstrating TikTok Display API usage
 * This component shows how to:
 * 1. Use the useTikTokDisplayAPI hook
 * 2. Fetch user information
 * 3. Query videos
 * 4. Handle loading states and errors
 */
export function TikTokAPIExample() {
  const {
    isAuthenticated,
    userInfo,
    videos,
    clearErrors,
  } = useTikTokDisplayAPI();

  // Example video IDs (replace with actual video IDs)
  const exampleVideoIds = ["7077642457847991554", "7080217258529737986"];

  const handleGetUserInfo = async () => {
    clearErrors();
    await userInfo.getUserInfo([
      "open_id",
      "union_id",
      "avatar_url",
      "display_name",
      "username",
      "follower_count",
      "video_count",
    ]);
  };

  const handleQueryVideos = async () => {
    clearErrors();
    await videos.queryVideos(exampleVideoIds, [
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
    ]);
  };

  if (!isAuthenticated) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">TikTok Display API Example</h2>
        <p className="text-gray-600">
          Please sign in with TikTok to use the Display API features.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">TikTok Display API Example</h2>

        {/* User Info Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">User Information</h3>
          <Button
            onClick={handleGetUserInfo}
            disabled={userInfo.loading}
            className="mb-4"
          >
            {userInfo.loading ? "Loading..." : "Get User Info"}
          </Button>

          {userInfo.error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-red-800 text-sm">Error: {userInfo.error}</p>
            </div>
          )}

          {userInfo.userInfo && (
            <div className="bg-gray-50 rounded p-4">
              <h4 className="font-medium mb-2">User Data:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><strong>Display Name:</strong> {userInfo.userInfo.display_name}</div>
                <div><strong>Username:</strong> {userInfo.userInfo.username}</div>
                <div><strong>Open ID:</strong> {userInfo.userInfo.open_id}</div>
                <div><strong>Union ID:</strong> {userInfo.userInfo.union_id}</div>
                <div><strong>Followers:</strong> {userInfo.userInfo.follower_count?.toLocaleString()}</div>
                <div><strong>Videos:</strong> {userInfo.userInfo.video_count?.toLocaleString()}</div>
              </div>
              {userInfo.userInfo.avatar_url && (
                <div className="mt-3">
                  <img
                    src={userInfo.userInfo.avatar_url}
                    alt="Profile Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Video Query</h3>
          <Button
            onClick={handleQueryVideos}
            disabled={videos.loading}
            className="mb-4"
          >
            {videos.loading ? "Loading..." : "Query Videos"}
          </Button>

          {videos.error && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
              <p className="text-red-800 text-sm">Error: {videos.error}</p>
            </div>
          )}

          {videos.videos.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Videos ({videos.videos.length}):</h4>
              {videos.videos.map((video) => (
                <div key={video.id} className="bg-gray-50 rounded p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div><strong>ID:</strong> {video.id}</div>
                    <div><strong>Title:</strong> {video.title}</div>
                    <div><strong>Duration:</strong> {video.duration}s</div>
                    <div><strong>Likes:</strong> {video.like_count?.toLocaleString()}</div>
                    <div><strong>Comments:</strong> {video.comment_count?.toLocaleString()}</div>
                    <div><strong>Shares:</strong> {video.share_count?.toLocaleString()}</div>
                    <div><strong>Views:</strong> {video.view_count?.toLocaleString()}</div>
                  </div>
                  {video.cover_image_url && (
                    <div className="mt-3">
                      <img
                        src={video.cover_image_url}
                        alt="Video Cover"
                        className="w-32 h-48 object-cover rounded"
                      />
                    </div>
                  )}
                  {video.share_url && (
                    <div className="mt-3">
                      <a
                        href={video.share_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View on TikTok →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Errors Button */}
        {(userInfo.error || videos.error) && (
          <Button
            onClick={clearErrors}
            variant="outline"
            className="mt-4"
          >
            Clear Errors
          </Button>
        )}
      </Card>
    </div>
  );
}
