import axios, { AxiosInstance, AxiosError } from "axios";
import {
  TikTokUserInfoResponse,
  TikTokUserInfoResponseSchema,
  UserInfoFields,
  UserInfoFieldsSchema,
  GetUserInfoParamsSchema,
} from "@/models/tiktok/user";
import {
  TikTokVideoQueryResponse,
  TikTokVideoQueryResponseSchema,
  TikTokVideoListResponse,
  TikTokVideoListResponseSchema,
  VideoFields,
  VideoQueryRequest,
  VideoListRequest,
  createVideoQueryRequest,
  createVideoListRequest,
  VideoFieldsSchema,
  TikTokVideo,
} from "@/models/tiktok/video";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

// TikTok API configuration
const TIKTOK_API_BASE_URL =
  process.env.TIKTOK_API_BASE_URL || "https://open.tiktokapis.com";
const TIKTOK_API_VERSION = process.env.TIKTOK_API_VERSION || "v2";
const API_TIMEOUT = parseInt(process.env.TIKTOK_API_TIMEOUT || "10000");

// Custom error class for TikTok API errors
export class TikTokAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public apiError?: unknown,
  ) {
    super(message);
    this.name = "TikTokAPIError";
  }
}

// TikTok API Client class
export class TikTokAPIClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${TIKTOK_API_BASE_URL}/${TIKTOK_API_VERSION}`,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          throw new TikTokAPIError(
            `TikTok API Error: ${error.response.status} ${error.response.statusText}`,
            error.response.status,
            error.response.data,
          );
        } else if (error.request) {
          throw new TikTokAPIError(
            "Network error: No response from TikTok API",
          );
        } else {
          throw new TikTokAPIError(`Request setup error: ${error.message}`);
        }
      },
    );
  }

  /**
   * Get user information from TikTok API
   * Automatically retrieves access token from NextAuth session
   * @param fields - Array of fields to request
   * @returns Promise<TikTokUserInfoResponse>
   */
  async getUserInfo(
    fields?: UserInfoFields[],
  ): Promise<TikTokUserInfoResponse> {
    try {
      // Get access token from jwt
      const token = await getToken({
        req: {
          headers: await headers(),
        },
        secret: process.env.AUTH_SECRET,
        cookieName: "__Secure-authjs.session-token",
      });

      if (!token?.accessToken) {
        throw new TikTokAPIError(
          "No access token available. User must be authenticated.",
        );
      }

      if (fields === undefined) {
        fields = UserInfoFieldsSchema.options as UserInfoFields[];
      }

      // Validate input parameters
      const validatedParams = GetUserInfoParamsSchema.parse({ fields });

      // Prepare query parameters
      const fieldsQuery = validatedParams.fields.join(",");

      // Make API request
      const response = await this.axiosInstance.get("/user/info/", {
        params: {
          fields: fieldsQuery,
        },
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      // Validate and parse response
      const validatedResponse = TikTokUserInfoResponseSchema.parse(
        response.data,
      );

      return validatedResponse;
    } catch (error) {
      if (error instanceof TikTokAPIError) {
        throw error;
      }
      throw new TikTokAPIError(`Failed to get user info: ${error}`);
    }
  }

  /**
   * Query videos from TikTok API
   * Automatically retrieves access token from NextAuth session
   * @param videoIds - Array of video IDs (max 20)
   * @param fields - Array of fields to request
   * @returns Promise<TikTokVideoQueryResponse>
   */
  async queryVideos(
    videoIds: string[],
    fields: VideoFields[],
  ): Promise<TikTokVideoQueryResponse> {
    try {
      // Get access token from jwt
      const token = await getToken({
        req: {
          headers: await headers(),
        },
        secret: process.env.AUTH_SECRET,
        cookieName: "__Secure-authjs.session-token",
      });

      if (!token?.accessToken) {
        throw new TikTokAPIError(
          "No access token available. User must be authenticated.",
        );
      }

      // Validate and create request body
      const requestBody: VideoQueryRequest = createVideoQueryRequest(videoIds);

      // Prepare query parameters
      const fieldsQuery = fields.join(",");

      // Make API request
      const response = await this.axiosInstance.post(
        "/video/query/",
        requestBody,
        {
          params: {
            fields: fieldsQuery,
          },
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      // Validate and parse response
      const validatedResponse = TikTokVideoQueryResponseSchema.parse(
        response.data,
      );

      return validatedResponse;
    } catch (error) {
      if (error instanceof TikTokAPIError) {
        throw error;
      }
      throw new TikTokAPIError(`Failed to query videos: ${error}`);
    }
  }

  /**
   * List videos from TikTok API
   * Automatically retrieves access token from NextAuth session
   * @param fields - Array of fields to request
   * @param options - Optional parameters for pagination and count
   * @returns Promise<TikTokVideoListResponse>
   */
  async listVideos(
    fields: VideoFields[],
    options?: { cursor?: number; maxCount?: number },
  ): Promise<TikTokVideoListResponse> {
    try {
      // Get access token from jwt
      const token = await getToken({
        req: {
          headers: await headers(),
        },
        secret: process.env.AUTH_SECRET,
        cookieName: "__Secure-authjs.session-token",
      });

      if (!token?.accessToken) {
        throw new TikTokAPIError(
          "No access token available. User must be authenticated.",
        );
      }

      if (fields === undefined) {
        fields = VideoFieldsSchema.options as VideoFields[];
      }

      // Validate and create request body
      const requestBody: VideoListRequest = createVideoListRequest(options);

      // Prepare query parameters
      const fieldsQuery = fields.join(",");

      // Make API request
      const response = await this.axiosInstance.post(
        "/video/list/",
        requestBody,
        {
          params: {
            fields: fieldsQuery,
          },
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      const validatedVideos = response.data.data.videos.filter(
        (video: TikTokVideo) =>
          video.id !== undefined &&
          video.title !== undefined &&
          video.cover_image_url !== undefined &&
          video.view_count !== undefined,
      );

      // Validate and parse response
      const validatedResponse = TikTokVideoListResponseSchema.parse({
        data: {
          videos: validatedVideos,
          cursor: response.data.data.cursor,
          has_more: response.data.data.has_more,
        },
        error: response.data.error,
      });

      return validatedResponse;
    } catch (error) {
      if (error instanceof TikTokAPIError) {
        throw error;
      }
      throw new TikTokAPIError(`Failed to list videos: ${error}`);
    }
  }

  /**
   * Helper method to check if API response indicates success
   * @param response - TikTok API response
   * @returns boolean indicating success
   */
  static isSuccessResponse(response: { error: { code: string } }): boolean {
    return response.error.code === "ok";
  }
}

// Singleton instance for easy usage
export const tikTokAPIClient = new TikTokAPIClient();
