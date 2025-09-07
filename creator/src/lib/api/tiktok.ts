import axios, { AxiosInstance, AxiosError } from "axios";
import {
  TikTokUserInfoResponse,
  TikTokUserInfoResponseSchema,
  UserInfoFields,
  GetUserInfoParamsSchema,
} from "@/models/tiktok/user";
import {
  TikTokVideoQueryResponse,
  TikTokVideoQueryResponseSchema,
  VideoFields,
  VideoQueryRequest,
  createVideoQueryRequest,
} from "@/models/tiktok/video";

// TikTok API configuration
const TIKTOK_API_BASE_URL = process.env.TIKTOK_API_BASE_URL || "https://open.tiktokapis.com";
const TIKTOK_API_VERSION = process.env.TIKTOK_API_VERSION || "v2";
const API_TIMEOUT = parseInt(process.env.TIKTOK_API_TIMEOUT || "10000");

// Custom error class for TikTok API errors
export class TikTokAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public apiError?: unknown
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
            error.response.data
          );
        } else if (error.request) {
          throw new TikTokAPIError("Network error: No response from TikTok API");
        } else {
          throw new TikTokAPIError(`Request setup error: ${error.message}`);
        }
      }
    );
  }

  /**
   * Get user information from TikTok API
   * @param accessToken - OAuth access token
   * @param fields - Array of fields to request
   * @returns Promise<TikTokUserInfoResponse>
   */
  async getUserInfo(
    accessToken: string,
    fields: UserInfoFields[]
  ): Promise<TikTokUserInfoResponse> {
    try {
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
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Validate and parse response
      const validatedResponse = TikTokUserInfoResponseSchema.parse(response.data);

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
   * @param accessToken - OAuth access token
   * @param videoIds - Array of video IDs (max 20)
   * @param fields - Array of fields to request
   * @returns Promise<TikTokVideoQueryResponse>
   */
  async queryVideos(
    accessToken: string,
    videoIds: string[],
    fields: VideoFields[]
  ): Promise<TikTokVideoQueryResponse> {
    try {
      // Validate and create request body
      const requestBody: VideoQueryRequest = createVideoQueryRequest(videoIds);

      // Prepare query parameters
      const fieldsQuery = fields.join(",");

      // Make API request
      const response = await this.axiosInstance.post("/video/query/", requestBody, {
        params: {
          fields: fieldsQuery,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // Validate and parse response
      const validatedResponse = TikTokVideoQueryResponseSchema.parse(response.data);

      return validatedResponse;
    } catch (error) {
      if (error instanceof TikTokAPIError) {
        throw error;
      }
      throw new TikTokAPIError(`Failed to query videos: ${error}`);
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
