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
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowRightIcon, BanknoteIcon, CalendarClockIcon } from "lucide-react";

export default async function Competitions() {
  const data = await prisma.contests.findMany({ include: { brands: true } });
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold p-2">開催中のコンペティション</h1>
      <div>
        {data.map((competition) => (
          <Link href={`/competitions/${competition.id}`} key={competition.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={competition.brands.logo_url || '' /* todo: fallback image */} />
                    <AvatarFallback className="uppercase">{competition.brands.name.split('', 2)}</AvatarFallback>
                  </Avatar>
                  <p>{competition.brands.name}</p>
                </div>
                <CardAction className="h-full flex items-center gap-2 font-bold text-xl">
                  <BanknoteIcon className="size-6 stroke-2" />¥{competition.prize_pool?.toLocaleString()}
                </CardAction>
              </CardHeader>
              <CardContent className="grid gap-2">
                <CardTitle className="text-lg font-bold">{competition.title}</CardTitle>
                <Image
                  src={competition.thumbnail_url || ''/* todo: add fallback image */}
                  alt={competition.title || 'タイトル未設定のコンペティション'}
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </CardContent>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <CalendarClockIcon />
                  <p>{`残り${formatDistanceToNow(new Date(competition.contest_end_date), { locale: ja })}`}</p>
                </div>
                <Button><ArrowRightIcon />今すぐ参加</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
