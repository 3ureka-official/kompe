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
import { formatDate } from "@/utils/format";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ContestPeriodStepper } from "@/components/ContestPeriodStepper";
import { getContestDetailStatusType } from "@/utils/getContestStatus";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { SampleShippingStepper } from "@/components/SampleShippingStepper";
import SampleReceivedButton from "@/components/sampleReceivedButton";

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
  const session = await auth();

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

  const today = formatDate(new Date());
  const boundary = new Date(`${today}T00:00:00Z`);

  const isEnded =
    competition.contest_end_date < boundary &&
    competition.contest_start_date < boundary;
  const isScheduled =
    competition.contest_start_date > boundary &&
    competition.contest_end_date > boundary;

  const detailStatus = getContestDetailStatusType(competition);

  // 現在のユーザーの応募情報と発送通知を取得
  let myApplication = null;
  let shippingNotification = null;
  if (session?.user?.creator_id) {
    myApplication = competition.applications.find(
      (app) => app.creator_id === session.user.creator_id,
    );

    if (myApplication) {
      shippingNotification =
        await prisma.shipping_sample_notifications.findFirst({
          where: {
            application_id: myApplication.id,
          },
        });
    }
  }

  return (
    <div className="relative flex flex-col min-h-full max-h-full">
      <div className="grow min-h-0 overflow-auto gap-4 pb-30">
        <section className="flex flex-col gap-4">
          <ImageCarousel
            images={competition.contest_images || []}
            alt={competition.title || "タイトル未設定のコンテスト"}
          />

          <div className="px-4">
            <IsAppliedChip
              title={competition.title || "タイトルなしのコンテスト"}
              applications={competition.applications || []}
            />
            <p className="text-2xl font-semibold">{`¥${competition.contest_prizes?.reduce((sum, prize) => sum + Number(prize.amount), 0).toLocaleString() || 0}`}</p>
          </div>

          <div className="flex items-center gap-2 px-4">
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

          {/* ステッパー */}
          <div className="pt-4 px-4 rounded-lg border-t border-t-foreground/10">
            <ContestPeriodStepper contest={competition} />
          </div>
        </section>

        {/* 試供品についての誘導メッセージ */}
        {competition.has_sample && myApplication && (
          <div className="px-4 py-3 bg-blue-50 border-l-4 border-blue-500">
            <p className="text-sm text-blue-900">
              試供品の配送情報は「試供品」タブから確認できます。
            </p>
          </div>
        )}

        <Tabs defaultValue="summary">
          <TabsList className="w-full bg-[#f9fafb] sticky top-0 z-10">
            <TabsTrigger value="summary">概要</TabsTrigger>
            {competition.has_sample && (
              <TabsTrigger value="sample">
                <span className="relative">
                  試供品
                  {shippingNotification?.status === "shipped" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </span>
              </TabsTrigger>
            )}
            <TabsTrigger value="assets">資料など</TabsTrigger>
            <TabsTrigger value="leaderboard">ランキング</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="grid gap-8 pb-8">
            <section className="pt-2">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                コンテストの概要
              </h2>
              <p className="text-md px-4 font-medium leading-[1.7] whitespace-pre-line break-words">
                {competition.description}
              </p>
            </section>

            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                動画の条件
              </h2>
              <p className="text-md px-4 font-medium leading-[1.7] whitespace-pre-line break-words">
                {competition.requirements}
              </p>
            </section>

            <section className="py-6 border-t border-t-foreground/10">
              <h2 className="text-sm font-bold text-muted-foreground px-4 mb-2">
                賞金
              </h2>
              <PrizeTable contestPrizes={competition.contest_prizes ?? []} />
            </section>
          </TabsContent>
          {competition.has_sample && (
            <TabsContent value="sample" className="grid gap-8 pb-8">
              {/* 試供品ステッパー */}
              {myApplication && (
                <section className="px-4 pt-2">
                  <h2 className="text-sm font-bold text-muted-foreground mb-2">
                    配送状況
                  </h2>
                  <SampleShippingStepper
                    status={
                      shippingNotification?.status as
                        | "pending"
                        | "shipped"
                        | "delivered"
                        | null
                    }
                  />
                  {shippingNotification?.status === "shipped" && (
                    <div className="mt-6">
                      <Card className="py-2">
                        <CardContent className="p-4 space-y-2">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              運送会社
                            </p>
                            <p className="text-base font-medium">
                              {shippingNotification.carrier}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              追跡番号
                            </p>
                            <p className="text-base font-medium">
                              {shippingNotification.tracking_number}
                            </p>
                          </div>
                          {shippingNotification.message && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                メッセージ
                              </p>
                              <p className="text-base font-medium">
                                {shippingNotification.message}
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {shippingNotification?.status === "shipped" && (
                    <div className="mt-4 px-4">
                      <SampleReceivedButton
                        applicationId={myApplication.id}
                        contestId={contestId}
                      />
                    </div>
                  )}
                </section>
              )}
              <section>
                {competition.sample_product_name && (
                  <div className="px-4 mb-2">
                    <p className="text-md font-medium">
                      {competition.sample_product_name}
                    </p>
                  </div>
                )}
                {competition.sample_provide_type && (
                  <div className="px-4 mb-2">
                    <p className="text-sm text-muted-foreground">
                      提供方法:{" "}
                      {competition.sample_provide_type === "RENTAL"
                        ? "レンタル"
                        : "提供"}
                    </p>
                  </div>
                )}
                {competition.sample_image_url && (
                  <div className="px-4 mb-4">
                    <img
                      src={competition.sample_image_url}
                      alt={competition.sample_product_name || "試供品"}
                      className="w-full max-w-md rounded-lg"
                    />
                  </div>
                )}
                <p className="text-md px-4 font-medium leading-[1.7] whitespace-pre-line break-words">
                  {competition.supply_of_samples}
                </p>
              </section>
            </TabsContent>
          )}
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
                            <p className="whitespace-pre-line break-words">
                              {item.description}
                            </p>
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
                            <p className="whitespace-pre-line break-words">
                              {asset.description}
                            </p>
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
            {detailStatus === "contest" ? (
              <LeaderBoard
                competition={competition}
                applications={competition.applications || []}
              />
            ) : (
              <div className="px-4 py-8">
                <p className="text-sm text-muted-foreground text-center">
                  ランキングは開催期間に表示されます
                </p>
              </div>
            )}
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
