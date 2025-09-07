import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { tikTokAPIClient } from "@/lib/api/tiktok";

export default async function Dashboard() {
  const session = await auth();
  const userInfo = await tikTokAPIClient.getUserInfo(['display_name', 'username', 'avatar_large_url', 'follower_count', 'following_count', 'video_count', 'likes_count']);
  if (!session) {
    return <div>ログインしてください。</div>;
  }
  if (!userInfo) {
    return <div>ユーザー情報の取得に失敗しました。</div>;
  }
  const user = userInfo.data.user;
  return (
    <div className="w-full grid gap-8 p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user.display_name}</CardTitle>
          <CardDescription>@{user.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Followers: {user.follower_count}</p>
          <p>Following: {user.following_count}</p>
          <p>Videos: {user.video_count}</p>
          <p>Likes: {user.likes_count}</p>
        </CardContent>
      </Card>
    </div>
  );
}
