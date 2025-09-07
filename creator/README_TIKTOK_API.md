# TikTok Display API Integration

This document describes the TikTok Display API integration implementation for the creator application.

## Overview

The implementation provides a complete solution for integrating with TikTok's Display API, including:

- **Type-safe API models** with Zod validation
- **API client** with axios and error handling
- **React hooks** for easy component integration
- **Environment configuration**
- **Example components**

## Architecture

```
creator/src/
├── models/tiktok/          # Type definitions and Zod schemas
│   ├── user.ts            # User info models
│   └── video.ts           # Video query models
├── lib/api/               # API clients
│   └── tiktok.ts          # TikTok API client
├── hooks/                 # Custom React hooks
│   └── useTikTokDisplayAPI.ts
└── components/            # Example components
    └── TikTokAPIExample.tsx
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

Update your NextAuth configuration to include access tokens in the session:

```javascript
// In src/auth.ts - callbacks
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

### Basic Hook Usage

```tsx
import { useTikTokDisplayAPI } from "@/hooks/useTikTokDisplayAPI";

function MyComponent() {
  const { userInfo, videos, isAuthenticated } = useTikTokDisplayAPI();

  const handleGetUserInfo = async () => {
    await userInfo.getUserInfo(['display_name', 'username', 'follower_count']);
  };

  const handleQueryVideos = async () => {
    await videos.queryVideos(['video_id_1', 'video_id_2'], ['title', 'like_count']);
  };

  if (!isAuthenticated) {
    return <div>Please sign in with TikTok</div>;
  }

  return (
    <div>
      <button onClick={handleGetUserInfo}>
        {userInfo.loading ? 'Loading...' : 'Get User Info'}
      </button>
      
      {userInfo.userInfo && (
        <div>
          <h3>{userInfo.userInfo.display_name}</h3>
          <p>Followers: {userInfo.userInfo.follower_count}</p>
        </div>
      )}
    </div>
  );
}
```

### Direct API Client Usage

```tsx
import { tikTokAPIClient } from "@/lib/api/tiktok";

// Get user info
const userInfo = await tikTokAPIClient.getUserInfo(
  accessToken,
  ['display_name', 'username', 'follower_count']
);

// Query videos
const videos = await tikTokAPIClient.queryVideos(
  accessToken,
  ['video_id_1', 'video_id_2'],
  ['title', 'like_count', 'duration']
);
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

Use the example component to test the integration:

```tsx
import { TikTokAPIExample } from "@/components/TikTokAPIExample";

function TestPage() {
  return <TikTokAPIExample />;
}
```

## Limitations

1. **Rate Limiting**: TikTok API has rate limits - implement appropriate caching
2. **Video IDs**: Video query requires valid video IDs that belong to the authenticated user
3. **Scopes**: Different fields require different OAuth scopes
4. **Token Expiry**: Access tokens expire - implement refresh logic if needed

## Troubleshooting

### Common Issues

1. **"User not authenticated"**
   - Ensure user is signed in with TikTok
   - Check if access token is available in session

2. **"Network error"**
   - Verify environment variables are set correctly
   - Check if TikTok API is accessible

3. **"Invalid fields"**
   - Ensure requested fields match available scopes
   - Use `validateFieldsForScopes` helper function

4. **TypeScript errors**
   - Ensure all types are imported correctly
   - Check if NextAuth types are extended properly

## Dependencies

- `axios`: HTTP client
- `zod`: Schema validation
- `next-auth`: Authentication
- `react`: React hooks

## License

This implementation follows the same license as the main project.
