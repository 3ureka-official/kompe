import Image from "next/image";
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
import PrizeTable from "@/components/prizeTable";
import { Suspense } from "react";
import Loading from "@/components/loading";

export default async function CompetitionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <SessionProvider>
      <Suspense fallback={<Loading />}>
        <CompetitionPageContent contestId={id} />
      </Suspense>
    </SessionProvider>
  );
}

async function CompetitionPageContent({ contestId }: { contestId: string }) {
  const { competition } = await getTikTokMetricsAndUpdate(contestId);

  if (!competition) {
    return (
      <div className="text-sm text-muted-foreground">
        コンテストが見つかりませんでした。
      </div>
    );
  }

  const applicationLength = competition.applications.filter(
    (app) => app.tiktok_url !== null,
  ).length;

  const isEnded = new Date(competition.contest_end_date) < new Date();

  return (
    <div className="relative flex flex-col min-h-full max-h-full">
      <div className="grow min-h-0 overflow-auto gap-4 pb-30">
        <section className="flex flex-col gap-4 p-4">
          <Image
            src={competition.thumbnail_url || "" /* todo: add fallback image */}
            alt={competition.title || "タイトル未設定のコンテスト"}
            width={500}
            height={300}
            className="rounded-lg"
          />
          <IsAppliedChip
            title={competition.title || "タイトルなしのコンテスト"}
            applications={competition.applications || []}
          />
          <div className="flex items-center gap-2">
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
            <p className="font-bold">{competition.brands.name}</p>
          </div>
        </section>

        <Tabs defaultValue="summary">
          <TabsList className="w-full bg-[#f9fafb] sticky top-0 z-10">
            <TabsTrigger value="summary">概要</TabsTrigger>
            <TabsTrigger value="assets">資料など</TabsTrigger>
            <TabsTrigger value="leaderboard">ランキング</TabsTrigger>
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
                <p className="text-lg font-semibold">{applicationLength}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-semibold">{`¥${competition.prize_pool?.toLocaleString()}`}</p>
                <div className="flex items-center gap-1">
                  <CircleDollarSignIcon className="size-4 stroke-2" />
                  <p>賞金プール</p>
                </div>
              </div>
            </div>
            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                コンテストの概要
              </h2>
              <p className="text-sm px-4">{competition.description}</p>
            </section>

            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                試供品について
              </h2>
              <p className="text-sm px-4">{competition.supply_of_samples}</p>
            </section>

            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                動画の条件
              </h2>
              <p className="text-sm px-4">{competition.requirements}</p>
            </section>

            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                賞金
              </h2>
              <PrizeTable prizeDistribution={competition.prize_distribution} />
            </section>
          </TabsContent>
          <TabsContent value="assets">
            <div className="*:border-b *:border-b-foreground/10">
              <section className="grid gap-2 py-4">
                <h2 className="text-sm font-bold text-muted-foreground px-4">
                  参考動画
                </h2>
                <div className="grid gap-4 px-4">
                  {competition.contests_inspirations.map((item) => (
                    <Link href={item.url || ""} key={item.id}>
                      <Card className="p-4">
                        <CardContent className="p-0">
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
                <h2 className="text-sm font-bold text-muted-foreground px-4">
                  動画素材
                </h2>
                <div className="grid gap-2 px-4">
                  {competition.contests_assets.map((asset) => (
                    <Link href={asset.url || ""} key={asset.id}>
                      <Card className="p-4">
                        <CardContent className="p-0">
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
  );
}
