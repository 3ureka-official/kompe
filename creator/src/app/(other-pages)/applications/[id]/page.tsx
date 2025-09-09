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
import {
  CalendarClockIcon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  FileVideoCameraIcon,
  PlayIcon,
  VideoIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/auth";
import SubmitVideoForm from "@/components/submitVideoForm";
import { tikTokAPIClient } from "@/lib/api/tiktok";
import { redirect } from "next/navigation";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const videoList = await tikTokAPIClient.listVideos([
    "id",
    "title",
    "cover_image_url",
    "view_count",
  ]);

  const application = await prisma.applications.findFirst({
    where: { contest_id: id, creator_id: session.user?.creator_id },
    include: { contests: { include: { brands: true } } },
  });

  const appliedVideo = application?.tiktok_url
    ? (
        await tikTokAPIClient.queryVideos(
          [application.tiktok_url],
          ["id", "title", "cover_image_url", "view_count"],
        )
      ).data.videos[0]
    : null;

  if (!application) {
    return <div>応募が見つかりませんでした。</div>;
  }

  const competition = application.contests;

  return (
    <div className="flex flex-col max-h-full">
      <div className="grow min-h-0 overflow-auto p-4 pb-16">
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
                参加中コンペティション
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{competition.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold pt-8">{competition.title}</h1>
        <div className="*:border-b *:border-b-foreground/10">
          <section className="grid gap-2 py-6">
            <h2 className="text-sm font-bold text-muted-foreground px-2">
              自分の動画
            </h2>
            {application.tiktok_url && appliedVideo ? (
              <Link href={application.tiktok_url}>
                <Card className="h-[100px] py-4">
                  <CardContent className="h-full px-4">
                    <div className="h-full flex items-center gap-4">
                      <Image
                        src={
                          appliedVideo.cover_image_url ||
                          "" /* todo: add fallback image */
                        }
                        alt={appliedVideo.title || "タイトル未設定の動画"}
                        width={500}
                        height={500}
                        className="h-full w-auto rounded-lg"
                      />
                      <div>
                        <p className="text-md">{appliedVideo.title}</p>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <PlayIcon className="size-4" />
                          <p className="text-sm">{`${appliedVideo.view_count}回再生`}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div className="h-[200px] w-full rounded-lg border border-dashed border-foreground/10 flex flex-col items-center justify-center gap-2 text-sm text-foreground/50">
                <FileVideoCameraIcon className="size-8 stroke-1" />
                <p>まだ動画が提出されていません。</p>
              </div>
            )}
          </section>
          <section className="grid gap-2 py-6">
            <h2 className="text-sm font-bold text-muted-foreground px-2">
              コンペティション情報
            </h2>
            <Link href={`/competitions/${competition.id}`}>
              <Card className="h-[100px] py-4">
                <CardContent className="h-full px-4">
                  <div className="h-full flex items-center gap-4">
                    <Image
                      src={
                        competition.thumbnail_url ||
                        "" /* todo: add fallback image */
                      }
                      alt={
                        competition.title || "タイトル未設定のコンペティション"
                      }
                      width={500}
                      height={300}
                      className="h-full w-auto rounded-lg"
                    />
                    <p>{competition.title}</p>
                    <ChevronRightIcon className="size-4 stroke-2 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="w-full flex items-center gap-2 flex-wrap justify-around pt-4">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <CalendarClockIcon className="size-4 stroke-2" />
                  <p>終了まで</p>
                </div>
                <p className="text-lg font-semibold">
                  {formatDistanceToNow(new Date(competition.contest_end_date), {
                    locale: ja,
                  })}
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
          </section>
          <section className="grid gap-2 py-6">
            <h2 className="text-sm font-bold text-muted-foreground px-2">
              主催者情報
            </h2>
            <Card>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        competition.brands.logo_url ||
                        "" /* todo: fallback image */
                      }
                    />
                    <AvatarFallback className="uppercase">
                      {competition.brands.name.split("", 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{competition.brands.name}</p>
                  <ChevronRightIcon className="size-4 stroke-2 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <div className="bg-card border border-b-0 rounded-t-2xl w-full p-4">
        <SubmitVideoForm
          competitionId={competition.id}
          previousValue={application.tiktok_url}
          videos={
            // TODO: tiktokAPIClientでここらへんの型の絞り込みをする
            videoList.data.videos.filter(
              (
                video,
              ): video is {
                id: string;
                title: string;
                cover_image_url: string;
                view_count: number;
              } =>
                video.id !== undefined &&
                video.title !== undefined &&
                video.cover_image_url !== undefined &&
                video.view_count !== undefined,
            )
          }
        />
      </div>
    </div>
  );
}
