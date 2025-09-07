# TikTok Display API Integration

This document describes the TikTok Display API integration implementation for the creator application.

## Overview

The implementation provides a complete solution for integrating with TikTok's Display API, including:

- **Type-safe API models** with Zod validation
- **API client** with axios and error handling
- **Server-side authentication** with automatic token retrieval
- **Environment configuration**
- **Secure server-side execution**

## Architecture

```
creator/src/
├── models/tiktok/          # Type definitions and Zod schemas
│   ├── user.ts            # User info models
│   └── video.ts           # Video query models
└── lib/api/               # API clients
    └── tiktok.ts          # TikTok API client (server-side only)
```

## API Endpoints Implemented

### 1. Get User Info
- **Endpoint**: `GET /v2/user/info/`
- **Purpose**: Retrieve user profile information
- **Scopes**: `user.info.basic`, `user.info.profile`, `user.info.stats`

### 2. Query Videos
- **Endpoint**: `POST /v2/video/query/`
- **Purpose**: Query video details by video IDs
- **Scopes**: `video.list`

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# TikTok OAuth Configuration
AUTH_TIKTOK_ID=your_tiktok_client_id
AUTH_TIKTOK_SECRET=your_tiktok_client_secret

# TikTok Display API Configuration
TIKTOK_API_BASE_URL=https://open.tiktokapis.com
TIKTOK_API_VERSION=v2
TIKTOK_API_TIMEOUT=10000
```

### 2. Update TikTok App Scopes

Ensure your TikTok app has the necessary scopes:

```javascript
// In src/auth.ts
scope: "user.info.profile,user.info.stats,video.list"
```

### 3. Access Token Handling

The access token is automatically handled by the API client through NextAuth session:

```javascript
// In src/auth.ts - callbacks (already configured)
jwt({ token, account }) {
  if (account?.access_token) {
    token.accessToken = account.access_token;
  }
  return token;
},
session({ session, token }) {
  session.accessToken = token.accessToken;
  return session;
}
```

## Usage Examples

### Server Component Usage

```tsx
import { tikTokAPIClient } from "@/lib/api/tiktok";

// Server Component (サーバーサイドでのみ実行)
async function TikTokUserProfile() {
  try {
    // アクセストークンは自動で取得されます
    const userInfo = await tikTokAPIClient.getUserInfo([
      'display_name', 
      'username', 
      'follower_count'
    ]);

    if (tikTokAPIClient.isSuccessResponse(userInfo)) {
      return (
        <div>
          <h3>{userInfo.data.user.display_name}</h3>
          <p>Username: @{userInfo.data.user.username}</p>
          <p>Followers: {userInfo.data.user.follower_count}</p>
        </div>
      );
    }
  } catch (error) {
    return <div>Error loading user info</div>;
  }
}
```

### Server Action Usage

```tsx
"use server";

import { tikTokAPIClient } from "@/lib/api/tiktok";

export async function getTikTokVideos(videoIds: string[]) {
  try {
    const videos = await tikTokAPIClient.queryVideos(
      videoIds,
      ['title', 'like_count', 'duration']
    );
    
    return { success: true, data: videos.data.videos };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### API Route Usage

```tsx
// app/api/tiktok/user/route.ts
import { tikTokAPIClient } from "@/lib/api/tiktok";

export async function GET() {
  try {
    const userInfo = await tikTokAPIClient.getUserInfo([
      'display_name', 
      'follower_count'
    ]);
    
    return Response.json(userInfo.data.user);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch user info' }, 
      { status: 500 }
    );
  }
}
```

## Available Fields

### User Info Fields

| Field | Scope | Description |
|-------|-------|-------------|
| `open_id` | `user.info.basic` | User's open ID |
| `union_id` | `user.info.basic` | User's union ID |
| `avatar_url` | `user.info.basic` | Profile image URL |
| `display_name` | `user.info.basic` | Display name |
| `username` | `user.info.profile` | Username |
| `bio_description` | `user.info.profile` | Bio description |
| `follower_count` | `user.info.stats` | Number of followers |
| `following_count` | `user.info.stats` | Number of following |
| `likes_count` | `user.info.stats` | Total likes received |
| `video_count` | `user.info.stats` | Number of videos |

### Video Fields

| Field | Description |
|-------|-------------|
| `id` | Video ID |
| `title` | Video title |
| `create_time` | Creation timestamp |
| `cover_image_url` | Cover image URL |
| `share_url` | Share URL |
| `video_description` | Video description |
| `duration` | Video duration in seconds |
| `like_count` | Number of likes |
| `comment_count` | Number of comments |
| `share_count` | Number of shares |
| `view_count` | Number of views |

## Error Handling

The implementation includes comprehensive error handling:

### API Errors
```tsx
const { userInfo } = useTikTokDisplayAPI();

if (userInfo.error) {
  console.error('User info error:', userInfo.error);
}
```

### Network Errors
All network errors are caught and wrapped in `TikTokAPIError`:

```tsx
try {
  await tikTokAPIClient.getUserInfo(token, fields);
} catch (error) {
  if (error instanceof TikTokAPIError) {
    console.error('TikTok API Error:', error.message, error.statusCode);
  }
}
```

## Type Safety

All API responses are validated using Zod schemas:

```tsx
// User info is fully typed
const userInfo: TikTokUser | null = userInfo.userInfo;

// Video data is fully typed
const videos: TikTokVideo[] = videos.videos;
```

## Testing

Test the integration by creating a Server Component:

```tsx
// app/test-tiktok/page.tsx
import { tikTokAPIClient } from "@/lib/api/tiktok";

export default async function TestTikTokPage() {
  try {
    const userInfo = await tikTokAPIClient.getUserInfo(['display_name']);
    
    return (
      <div>
        <h1>TikTok API Test</h1>
        <p>User: {userInfo.data.user.display_name}</p>
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1>TikTok API Test</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}
```

## Limitations

1. **Server-side Only**: API client can only be used in Server Components, Server Actions, or API Routes
2. **Rate Limiting**: TikTok API has rate limits - implement appropriate caching
3. **Video IDs**: Video query requires valid video IDs that belong to the authenticated user
4. **Scopes**: Different fields require different OAuth scopes
5. **Token Expiry**: Access tokens expire - implement refresh logic if needed

## Troubleshooting

### Common Issues

1. **"User not authenticated"**
   - Ensure user is signed in with TikTok
   - Check if access token is available in session
   - Verify JWT and Session callbacks are properly configured

2. **"Network error"**
   - Verify environment variables are set correctly
   - Check if TikTok API is accessible

3. **"Invalid fields"**
   - Ensure requested fields match available scopes

4. **"Can only be used in server components"**
   - API client is server-side only
   - Use Server Components, Server Actions, or API Routes

5. **TypeScript errors**
   - Ensure all types are imported correctly
   - Check if NextAuth types are extended properly

## Dependencies

- `axios`: HTTP client
- `zod`: Schema validation
- `next-auth`: Authentication
- `react`: React hooks

## License

This implementation follows the same license as the main project.
