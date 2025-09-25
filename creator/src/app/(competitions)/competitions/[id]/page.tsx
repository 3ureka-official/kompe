import prisma from "@/lib/prisma";
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
  CircleDollarSignIcon,
  DownloadCloudIcon,
  ExternalLinkIcon,
  VideoIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SessionProvider } from "next-auth/react";
import LeaderBoard from "@/components/leaderBoard";
import ButtomActionBar from "@/components/buttomActionBar";
import IsAppliedChip from "@/components/isAppliedChip";
import { getTikTokMetricsAndUpdate } from "@/services/videoService";

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { competition } = await getTikTokMetricsAndUpdate(id);

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
                <BreadcrumbLink href="/">ホーム</BreadcrumbLink>
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
          <IsAppliedChip
            title={competition.title || ""}
            applications={competition.applications || []}
          />
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
        <ButtomActionBar
          competition={competition}
          applications={competition.applications || []}
          isEnded={isEnded}
        />
      </div>
    </SessionProvider>
  );
}
