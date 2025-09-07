import { z } from "zod";

// TikTok Video Object schema based on API documentation
export const TikTokVideoSchema = z.object({
  id: z.string().optional(),
  create_time: z.number().int().optional(),
  cover_image_url: z.string().url().optional(),
  share_url: z.string().url().optional(),
  video_description: z.string().optional(),
  duration: z.number().optional(),
  height: z.number().int().optional(),
  width: z.number().int().optional(),
  title: z.string().optional(),
  embed_html: z.string().optional(),
  embed_link: z.string().url().optional(),
  like_count: z.number().int().optional(),
  comment_count: z.number().int().optional(),
  share_count: z.number().int().optional(),
  view_count: z.number().int().optional(),
});

// Error object schema (reused from user model)
export const TikTokErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  log_id: z.string(),
});

// Video filters for query request
export const VideoFiltersSchema = z.object({
  video_ids: z.array(z.string()).min(1).max(20), // Max 20 video IDs per request
});

// Video query request body schema
export const VideoQueryRequestSchema = z.object({
  filters: VideoFiltersSchema,
});

// Video query response data schema
export const QueryUserVideoResponseDataSchema = z.object({
  videos: z.array(TikTokVideoSchema),
});

// Video query response schema
export const TikTokVideoQueryResponseSchema = z.object({
  data: QueryUserVideoResponseDataSchema,
  error: TikTokErrorSchema,
});

// Video fields enum for field selection
export const VideoFieldsSchema = z.enum([
  "id",
  "create_time",
  "cover_image_url",
  "share_url",
  "video_description",
  "duration",
  "height",
  "width",
  "title",
  "embed_html",
  "embed_link",
  "like_count",
  "comment_count",
  "share_count",
  "view_count",
]);

// Video query parameters schema
export const VideoQueryParamsSchema = z.object({
  fields: z.array(VideoFieldsSchema).min(1),
});

// TypeScript types
export type TikTokVideo = z.infer<typeof TikTokVideoSchema>;
export type TikTokError = z.infer<typeof TikTokErrorSchema>;
export type VideoFilters = z.infer<typeof VideoFiltersSchema>;
export type VideoQueryRequest = z.infer<typeof VideoQueryRequestSchema>;
export type QueryUserVideoResponseData = z.infer<typeof QueryUserVideoResponseDataSchema>;
export type TikTokVideoQueryResponse = z.infer<typeof TikTokVideoQueryResponseSchema>;
export type VideoFields = z.infer<typeof VideoFieldsSchema>;
export type VideoQueryParams = z.infer<typeof VideoQueryParamsSchema>;

// Helper function to validate video IDs
export function validateVideoIds(videoIds: string[]): boolean {
  return videoIds.length > 0 && videoIds.length <= 20;
}

// Helper function to create video query request
export function createVideoQueryRequest(videoIds: string[]): VideoQueryRequest {
  if (!validateVideoIds(videoIds)) {
    throw new Error("Video IDs must be between 1 and 20 items");
  }

  return {
    filters: {
      video_ids: videoIds,
    },
  };
}

// Helper function to parse video query response
export function parseVideoQueryResponse(data: unknown): TikTokVideoQueryResponse {
  return TikTokVideoQueryResponseSchema.parse(data);
}
