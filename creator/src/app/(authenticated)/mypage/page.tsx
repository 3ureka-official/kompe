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
import { BadgeCheckIcon } from "lucide-react";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { Session } from "next-auth";
import { getAddress } from "@/actions/address";
import AddressDialog from "@/components/addressDialog";

export default async function MyPage() {
  const session = await auth();
  if (!session) {
    return (
      <p className="text-sm text-muted-foreground">ログインしてください</p>
    );
  }

  return (
    <SessionProvider>
      <Suspense fallback={<Loading />}>
        <MyPageContent session={session} />
      </Suspense>
    </SessionProvider>
  );
}

async function MyPageContent({ session }: { session: Session }) {
  const creator = await prisma.creators.findUnique({
    where: {
      id: session.user.creator_id,
    },
  });
  if (!creator) {
    return (
      <p className="text-sm text-muted-foreground">
        ユーザー情報の取得に失敗しました。
      </p>
    );
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
    return (
      <div className="text-sm text-muted-foreground">
        ユーザー情報の取得に失敗しました。
      </div>
    );
  }

  const tiktokUser = userInfo.data.user;

  const creatorId = session?.user?.creator_id;
  const account = await prisma.stripe_connect_accounts.findUnique({
    where: {
      creator_id: creatorId,
    },
  });

  const address = await getAddress();

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
            quality={100}
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
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold">住所情報</CardTitle>
          <CardDescription>
            {address
              ? "試供品送付用の住所が登録されています"
              : "試供品送付用の住所が登録されていません"}
          </CardDescription>
          {address && (
            <CardAction>
              <Badge variant="secondary">
                登録済み
                <BadgeCheckIcon />
              </Badge>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {address ? (
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">郵便番号</p>
                <p className="text-base font-medium">{address.postal_code}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">都道府県</p>
                <p className="text-base font-medium">{address.prefecture}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">市区町村</p>
                <p className="text-base font-medium">{address.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">番地・建物名</p>
                <p className="text-base font-medium">{address.address_line}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              試供品ありのコンテストに応募する際に必要です。
            </p>
          )}
          <div>
            <AddressDialog
              initialData={address}
              triggerLabel={address ? "住所を変更する" : "住所を登録する"}
              title={address ? "住所を変更" : "住所を登録"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
