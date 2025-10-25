import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ClockIcon, VideoIcon } from "lucide-react";

export default async function Competitions() {
  const data = await prisma.contests.findMany({
    include: {
      brands: true,
      applications: {
        where: {
          tiktok_url: {
            not: null,
          },
        },
      },
    },
    orderBy: {
      contest_start_date: "desc",
    },
    where: {
      contest_end_date: {
        gte: new Date(),
      },
    },
  });

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-lg font-bold pb-4">開催中のコンテスト</h1>
      <div className="grid gap-4">
        {data.length > 0 ? (
          data.map((competition) => (
            <Link href={`/competitions/${competition.id}`} key={competition.id}>
              <Card className="py-3 gap-2">
                <CardHeader className="px-3">
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
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 px-3">
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
                    className="rounded-lg"
                  />
                  <CardTitle className="text-lg font-bold my-2 h-[3em] overflow-hidden text-ellipsis line-clamp-2">
                    {competition.title}
                  </CardTitle>
                </CardContent>
                <CardFooter className="justify-between px-3 py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground font-bold">
                      <VideoIcon className="size-5 stroke-2" />
                      <p>{competition.applications.length}</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground font-bold">
                      <ClockIcon className="size-5 stroke-2" />
                      <p>{`残り${formatDistanceToNow(new Date(competition.contest_end_date), { locale: ja })}`}</p>
                    </div>
                  </div>
                  <CardAction className="h-full flex items-center gap-2 font-bold text-xl text-primary">
                    ¥{competition.prize_pool?.toLocaleString()}
                  </CardAction>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-sm text-muted-foreground">
            開催中のコンテストがありません
          </div>
        )}
      </div>
    </div>
  );
}
