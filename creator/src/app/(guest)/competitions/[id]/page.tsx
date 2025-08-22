import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightIcon, CalendarClockIcon, CircleDollarSignIcon, VideoIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Markdown from "react-markdown"
import Link from "next/link";

export default async function CompetitionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await prisma.contests.findUnique({ where: { id }, include: { brands: true } });
  const mockLeaderboard = [
    { id: 1, creator: "クリエイターA", views: 1000, prize: 250000 },
    { id: 2, creator: "クリエイターB", views: 800, prize: 200000 },
    { id: 3, creator: "クリエイターC", views: 600, prize: 150000 },
  ];

  if (!data) {
    return <div>コンペティションが見つかりませんでした。</div>;
  }

  return (
    <>
      <div className="grid gap-8 p-4 pb-16">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Kompeクリエイターダッシュボード</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/competitions">コンペティション一覧</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Image
          src={data.thumbnail_url || '' /* todo: add fallback image */}
          alt={data.title || 'タイトル未設定のコンペティション'}
          width={500}
          height={300}
          className="rounded-lg"
        />
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={data.brands.logo_url || '' /* todo: fallback image */} />
            <AvatarFallback className="uppercase">{data.brands.name.split('', 2)}</AvatarFallback>
          </Avatar>
          <p>{data.brands.name}</p>
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
                <p className="text-lg font-semibold">{formatDistanceToNow(new Date(data.contest_end_date), { locale: ja })}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <VideoIcon className="size-4 stroke-2" />
                  <p>応募件数</p>
                </div>
                <p className="text-lg font-semibold">{data.videos}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1">
                  <CircleDollarSignIcon className="size-4 stroke-2" />
                  <p>賞金プール</p>
                </div>
                <p className="text-lg font-semibold">{`¥${data.prize_pool?.toLocaleString()}`}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <Markdown>{data.description}</Markdown>
            </div>
          </TabsContent>
          <TabsContent value="assets">
            <div className="grid gap-8 py-8">
              <h2 className="text-xl font-bold">アセット</h2>
            </div>
          </TabsContent>
          <TabsContent value="leaderboard">
            <Table>
              <TableCaption>リーダーボードは現時点での暫定順位です。情報の更新には遅れがある場合があります。</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>順位</TableHead>
                  <TableHead>クリエイター</TableHead>
                  <TableHead>再生数</TableHead>
                  <TableHead className="text-right">賞金</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  mockLeaderboard.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">#{index + 1}</TableCell>
                      <TableCell>{item.creator}</TableCell>
                      <TableCell>{item.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">¥{item.prize.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-0 bg-card border rounded-t-2xl w-full p-4">
        <Button asChild>
          <Link href={`/competitions/${data.id}`} className="w-full">
            <ArrowRightIcon />今すぐ参加
          </Link>
        </Button>
      </div>
    </>
  );
}
