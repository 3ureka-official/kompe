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
import { CalendarClockIcon, CrownIcon } from "lucide-react";
import RegisterLineSection from "@/components/registerLineSection";

export default async function Competitions() {
  const data = await prisma.contests.findMany({ include: { brands: true } });

  return (
    <div className="p-4">
      <RegisterLineSection />
      <h1 className="text-sm font-bold text-muted-foreground px-2 py-4">
        {data.length}件のコンペティションが開催中
      </h1>
      <div className="grid gap-4">
        {data.map((competition) => (
          <Link href={`/competitions/${competition.id}`} key={competition.id}>
            <Card>
              <CardHeader>
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
                <CardAction className="h-full flex items-center gap-2 font-bold text-xl text-primary">
                  <CrownIcon className="size-4 stroke-2" />¥
                  {competition.prize_pool?.toLocaleString()}
                </CardAction>
              </CardHeader>
              <CardContent className="grid gap-2">
                <CardTitle className="text-lg font-bold">
                  {competition.title}
                </CardTitle>
                <Image
                  src={
                    competition.thumbnail_url ||
                    "" /* todo: add fallback image */
                  }
                  alt={competition.title || "タイトル未設定のコンペティション"}
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </CardContent>
              <CardFooter className="justify-end">
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  <CalendarClockIcon />
                  <p>{`残り${formatDistanceToNow(new Date(competition.contest_end_date), { locale: ja })}`}</p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
