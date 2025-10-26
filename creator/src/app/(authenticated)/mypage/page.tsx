import { auth } from "@/auth";
import CheckStripeHistoryButton from "@/components/CheckStripeHistoryButton";
import ConnectStripeButton from "@/components/ConnectStripeButton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tikTokAPIClient } from "@/lib/api/tiktok";
import prisma from "@/lib/prisma";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MyPage() {
  const session = await auth();
  if (!session) {
    return <p>ログインしてください</p>;
  }
  const creator = await prisma.creators.findUnique({
    where: {
      id: session.user.creator_id,
    },
  });
  if (!creator) {
    return <p>ユーザー情報の取得に失敗しました。</p>;
  }
  const tikTokAPIClientInstance = tikTokAPIClient(creator);
  const userInfo = await tikTokAPIClientInstance.getUserInfo([
    "display_name",
    "username",
    "avatar_url_100",
    "follower_count",
    "following_count",
    "video_count",
    "likes_count",
  ]);
  if (!userInfo) {
    return <div>ユーザー情報の取得に失敗しました。</div>;
  }

  const tiktokUser = userInfo.data.user;

  const creatorId = session?.user?.creator_id;
  const account = await prisma.stripe_connect_accounts.findUnique({
    where: {
      creator_id: creatorId,
    },
  });

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 min-h-full">
      <Card className="bg-black text-white">
        <CardHeader>
          <CardTitle className="text-sm font-bold">
            TikTokプロフィール
          </CardTitle>
          <CardDescription className="text-gray-500 font-semibold">
            TikTokアカウントと連携しています
          </CardDescription>
          <CardAction>
            <Badge className="bg-pink-600">
              連携済み
              <BadgeCheckIcon />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Image
            src={tiktokUser.avatar_url_100 || ""}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full m-4 size-24"
          />
          <p className="text-center text-lg font-bold">
            {tiktokUser.display_name}
          </p>
          <p className="text-center text-sm text-gray-500 font-semibold">
            @{tiktokUser.username}
          </p>
        </CardContent>
        <CardFooter className="grid grid-cols-3 text-center">
          <div>
            <p className="font-bold">{tiktokUser.following_count}</p>
            <p className="text-sm text-gray-500 font-semibold">フォロー中</p>
          </div>
          <div>
            <p className="font-bold">{tiktokUser.follower_count}</p>
            <p className="text-sm text-gray-500 font-semibold">フォロワー</p>
          </div>
          <div>
            <p className="font-bold">{tiktokUser.likes_count}</p>
            <p className="text-sm text-gray-500 font-semibold">いいね</p>
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-indigo-700 text-white">
        <CardHeader>
          <CardTitle className="text-sm font-bold">Stripe口座情報</CardTitle>
          <CardDescription className="text-indigo-400 font-semibold">
            {account
              ? "Stripeアカウントと連携しています"
              : "Stripeアカウントが登録されていません"}
          </CardDescription>
          {account && (
            <CardAction>
              <Badge className="bg-cyan-600">
                連携済み
                <BadgeCheckIcon />
              </Badge>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-4">
          {account ? <CheckStripeHistoryButton /> : <ConnectStripeButton />}
        </CardContent>
      </Card>
    </div>
  );
}
