import prisma from "@/lib/prisma";
import { applications } from "@prisma/client";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClockIcon,
  CheckIcon,
  CircleDollarSignIcon,
  DownloadCloudIcon,
  ExternalLinkIcon,
  VideoIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ApplyDialog from "@/components/applyDialog";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SessionProvider } from "next-auth/react";
import SignInButton from "@/components/signInButton";
import GetPrizeDialog from "@/components/getPrizeDialog";
import LeaderBoard from "@/components/leaderBoard";

const getIsApplied = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.find(
    (app) => app.creator_id === session.user?.creator_id,
  );
};

const getRanking = async (applications: applications[]) => {
  const session = await auth();
  if (!session) return null;
  return applications.findIndex(
    (app) => app.creator_id === session.user?.creator_id,
  );
};

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const competition = await prisma.contests.findUnique({
    where: { id },
    include: {
      applications: {
        include: {
          creators: true,
          contest_transfers: true,
        },
      },
      brands: true,
      contests_assets: true,
      contests_inspirations: true,
    },
  });

  const isApplied = await getIsApplied(competition?.applications || []);
  const ranking = await getRanking(competition?.applications || []);

  if (!competition) {
    return <div>コンペティションが見つかりませんでした。</div>;
  }

  const isEnded = new Date(competition.contest_end_date) < new Date();

  return (
    <SessionProvider>
      <div className="flex flex-col max-h-full">
        <div className="grow min-h-0 overflow-auto grid gap-8 p-4 pb-20">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Kompeクリエイターダッシュボード
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/competitions">
                  コンペティション一覧
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{competition.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Image
            src={competition.thumbnail_url || "" /* todo: add fallback image */}
            alt={competition.title || "タイトル未設定のコンペティション"}
            width={500}
            height={300}
            className="rounded-lg"
          />
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {competition.title}
            {isApplied && (
              <Badge>
                <CheckIcon />
                応募済み
              </Badge>
            )}
          </h1>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={
                  competition.brands.logo_url || "" /* todo: fallback image */
                }
              />
              <AvatarFallback className="uppercase">
                {competition.brands.name.split("", 2)}
              </AvatarFallback>
            </Avatar>
            <p>{competition.brands.name}</p>
          </div>
          <Tabs defaultValue="summary">
            <TabsList className="w-full">
              <TabsTrigger value="summary">概要</TabsTrigger>
              <TabsTrigger value="assets">アセット</TabsTrigger>
              <TabsTrigger value="leaderboard">リーダーボード</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="grid gap-8 py-8">
              <div className="w-full flex items-center gap-2 flex-wrap justify-around">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <CalendarClockIcon className="size-4 stroke-2" />
                    <p>終了まで</p>
                  </div>
                  <p className="text-lg font-semibold">
                    {isEnded
                      ? formatDistanceToNow(
                          new Date(competition.contest_end_date),
                          { addSuffix: true, locale: ja },
                        ) + "終了"
                      : formatDistanceToNow(
                          new Date(competition.contest_end_date),
                          {
                            locale: ja,
                          },
                        )}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <VideoIcon className="size-4 stroke-2" />
                    <p>応募件数</p>
                  </div>
                  <p className="text-lg font-semibold">{competition.videos}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1">
                    <CircleDollarSignIcon className="size-4 stroke-2" />
                    <p>賞金プール</p>
                  </div>
                  <p className="text-lg font-semibold">{`¥${competition.prize_pool?.toLocaleString()}`}</p>
                </div>
              </div>
              <section className="py-6 border-t border-t-foreground/10">
                <p className="mb-1">コンテスト概要</p>
                <p className="text-sm">{competition.description}</p>
              </section>

              <section className="py-6 border-t border-t-foreground/10">
                <p className="mb-1">試供品について</p>
                <p className="text-sm">{competition.supply_of_samples}</p>
              </section>

              <section className="py-6 border-t border-t-foreground/10 border-b border-b-foreground/10">
                <p className="mb-1">動画の条件</p>
                <p className="text-sm">{competition.requirements}</p>
              </section>
            </TabsContent>
            <TabsContent value="assets">
              <div className="*:border-b *:border-b-foreground/10">
                <section className="grid gap-2 py-6">
                  <h2 className="text-sm font-bold text-muted-foreground px-2">
                    インスピレーション
                  </h2>
                  <div className="grid gap-4">
                    {competition.contests_inspirations.map((item) => (
                      <Link href={item.url || ""} key={item.id}>
                        <Card>
                          <CardContent>
                            <div className="flex items-center gap-4">
                              <p>{item.description}</p>
                              <ExternalLinkIcon className="size-4 stroke-2 ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
                <section className="grid gap-2 py-6">
                  <h2 className="text-sm font-bold text-muted-foreground px-2">
                    アセット
                  </h2>
                  <div className="grid gap-2">
                    {competition.contests_assets.map((asset) => (
                      <Link href={asset.url || ""} key={asset.id}>
                        <Card>
                          <CardContent>
                            <div className="flex items-center gap-4">
                              <DownloadCloudIcon className="size-4 stroke-2" />
                              <p>{asset.description}</p>
                              <ExternalLinkIcon className="size-4 stroke-2 ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="leaderboard">
              <LeaderBoard
                competition={competition}
                applications={competition.applications || []}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="bg-card border border-b-0 rounded-t-2xl w-full p-4">
          {session ? (
            isApplied ? (
              isEnded && ranking !== null ? (
                competition.applications[ranking]?.contest_transfers
                  ?.stripe_transfer_id ? (
                  <p className="text-sm text-muted-foreground">
                    このコンテストは終了しました。
                    <br />
                    順位：{ranking + 1}位
                  </p>
                ) : (
                  <GetPrizeDialog
                    competition={competition}
                    application={competition.applications[ranking]}
                    contestTransfers={
                      competition.applications[ranking]?.contest_transfers
                    }
                    ranking={ranking}
                  />
                )
              ) : (
                <Button className="w-full" asChild>
                  <Link href={`/applications/${competition.id}`}>
                    <Badge variant={"secondary"}>
                      <CheckIcon />
                      応募済み
                    </Badge>
                    提出を管理
                  </Link>
                </Button>
              )
            ) : (
              <ApplyDialog competitionId={competition.id} />
            )
          ) : (
            <SignInButton
              className="*:w-full"
              redirectTo={`/competitions/${competition.id}`}
            />
          )}
        </div>
      </div>
    </SessionProvider>
  );
}
