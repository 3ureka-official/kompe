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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  CircleDollarSignIcon,
  DownloadCloudIcon,
  ExternalLinkIcon,
  VideoIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Markdown from "react-markdown";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function CompetitionPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const competition = await prisma.contests.findUnique({
    where: { id },
    include: { brands: true },
  });
  const applications = await prisma.applications.findMany({
    where: { contest_id: id },
    include: { creators: true },
    orderBy: { views: "desc" },
  });
  const assets = await prisma.contests_assets.findMany({
    where: { contest_id: id },
  });
  const inspirations = await prisma.contests_inspirations.findMany({
    where: { contest_id: id },
  });

  if (!competition) {
    return <div>コンペティションが見つかりませんでした。</div>;
  }

  return (
    <>
      <div className="grid gap-8 p-4 pb-16">
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
        <h1 className="text-2xl font-bold">{competition.title}</h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={competition.brands.logo_url || "" /* todo: fallback image */}
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
            <div className="text-sm text-gray-500">
              <Markdown>{competition.description}</Markdown>
            </div>
          </TabsContent>
          <TabsContent value="assets">
            <div className="*:border-b *:border-b-foreground/10">
              <section className="grid gap-2 py-6">
                <h2 className="text-sm font-bold text-muted-foreground px-2">
                  インスピレーション
                </h2>
                <div className="grid gap-4">
                  {inspirations.map((item) => (
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
                  {assets.map((asset) => (
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
            <Table>
              <TableCaption>
                リーダーボードは現時点での暫定順位です。情報の更新には遅れがある場合があります。
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>順位</TableHead>
                  <TableHead>クリエイター</TableHead>
                  <TableHead className="text-right">再生数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application, index) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>{application.creators.display_name}</TableCell>
                    <TableCell className="text-right">
                      {application.views.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-0 bg-card border rounded-t-2xl w-full p-4">
        <Button asChild>
          <Link href={`/competitions/${competition.id}`} className="w-full">
            <ArrowRightIcon />
            今すぐ参加
          </Link>
        </Button>
      </div>
    </>
  );
}
