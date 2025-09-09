import { z } from "zod";

// TikTok User Object schema based on API documentation
export const TikTokUserSchema = z.object({
  open_id: z.string().optional(),
  union_id: z.string().optional(),
  avatar_url: z.string().url().optional(),
  avatar_url_100: z.string().url().optional(),
  avatar_large_url: z.string().url().optional(),
  display_name: z.string().optional(),
  bio_description: z.string().optional(),
  profile_deep_link: z.string().url().optional(),
  is_verified: z.boolean().optional(),
  username: z.string().optional(),
  follower_count: z.number().int().optional(),
  following_count: z.number().int().optional(),
  likes_count: z.number().int().optional(),
  video_count: z.number().int().optional(),
});

// Error object schema
export const TikTokErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  log_id: z.string(),
});

// User info response schema
export const TikTokUserInfoResponseSchema = z.object({
  data: z.object({
    user: TikTokUserSchema,
  }),
  error: TikTokErrorSchema,
});

// User info request parameters
export const UserInfoFieldsSchema = z.enum([
  "open_id",
  "union_id",
  "avatar_url",
  "avatar_url_100",
  "avatar_large_url",
  "display_name",
  "bio_description",
  "profile_deep_link",
  "is_verified",
  "username",
  "follower_count",
  "following_count",
  "likes_count",
  "video_count",
]);

export const GetUserInfoParamsSchema = z.object({
  fields: z.array(UserInfoFieldsSchema).min(1),
});

// TypeScript types
export type TikTokUser = z.infer<typeof TikTokUserSchema>;
export type TikTokError = z.infer<typeof TikTokErrorSchema>;
export type TikTokUserInfoResponse = z.infer<typeof TikTokUserInfoResponseSchema>;
export type UserInfoFields = z.infer<typeof UserInfoFieldsSchema>;
export type GetUserInfoParams = z.infer<typeof GetUserInfoParamsSchema>;

// Scope mapping for different fields
export const FIELD_SCOPES = {
  open_id: "user.info.basic",
  union_id: "user.info.basic",
  avatar_url: "user.info.basic",
  avatar_url_100: "user.info.basic",
  avatar_large_url: "user.info.basic",
  display_name: "user.info.basic",
  bio_description: "user.info.profile",
  profile_deep_link: "user.info.profile",
  is_verified: "user.info.profile",
  username: "user.info.profile",
  follower_count: "user.info.stats",
  following_count: "user.info.stats",
  likes_count: "user.info.stats",
  video_count: "user.info.stats",
} as const;

// Helper function to validate fields based on available scopes
export function validateFieldsForScopes(
  fields: UserInfoFields[],
  availableScopes: string[]
): UserInfoFields[] {
  return fields.filter(field => {
    const requiredScope = FIELD_SCOPES[field];
    return availableScopes.includes(requiredScope);
  });
}
