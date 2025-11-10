import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSignIcon,
  ClockIcon,
  Loader2Icon,
  VideoIcon,
} from "lucide-react";
import { formatDistanceToNow, getYear } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import {
  contests,
  brands,
  applications,
  contest_transfers,
} from "@prisma/client";
import { formatDate } from "@/utils/format";

type ContestCardProps = {
  contest: contests;
  applications: applications[];
  my_application: applications | null;
  contest_transfer: contest_transfers | null;
  brands: brands;
};

const getNotReceivedPrize = (
  applications: applications[],
  contest_transfer: contest_transfers | null,
  my_application: applications | null,
  contest?: contests,
) => {
  if (!my_application || !contest) {
    return false;
  }

  return (
    !contest_transfer?.stripe_transfer_id &&
    applications.findIndex((app) => app.id === my_application.id) <
      contest.prize_distribution.length
  );
};

export default function ContestCard({
  contest,
  applications,
  my_application,
  contest_transfer,
  brands,
}: ContestCardProps) {
  const isNotReceivedPrize = getNotReceivedPrize(
    applications,
    contest_transfer,
    my_application,
    contest,
  );

  const today = formatDate(new Date());
  const boundary = new Date(`${today}T00:00:00Z`);

  const isEnded =
    contest.contest_end_date < boundary &&
    contest.contest_start_date < boundary;
  const isScheduled =
    contest.contest_start_date > boundary &&
    contest.contest_end_date > boundary;

  const isNextYear = (date: Date): boolean => {
    const currentYear = getYear(new Date());
    const targetYear = getYear(date);
    return targetYear > currentYear;
  };

  return (
    <Link href={`/competitions/${contest.id}`}>
      <Card className="py-3 gap-2">
        <CardHeader className="px-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={brands.logo_url || "" /* todo: fallback image */}
                alt={brands.name}
              />
              <AvatarFallback className="uppercase">
                {brands.name.split("", 2)}
              </AvatarFallback>
            </Avatar>
            <p className="font-bold">{brands.name}</p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 px-3">
          <div className="relative w-full aspect-[16/9] rounded-lg border border-foreground/20">
            {contest.thumbnail_url ? (
              <Image
                src={contest.thumbnail_url}
                alt={contest.title || "タイトル未設定のコンテスト"}
                fill
                quality={80}
                className="rounded-lg object-cover w-full h-full"
              />
            ) : (
              <div className="rounded-lg object-cover w-full h-full bg-gray-200 flex items-center justify-center">
                <Loader2Icon className="size-4 stroke-2" />
              </div>
            )}
          </div>
          {isEnded && isNotReceivedPrize && (
            <Badge
              variant="secondary"
              className="bg-white text-destructive font-bold border-destructive py-1"
            >
              <CircleDollarSignIcon className="size-4 stroke-2" />
              賞金未受け取り
            </Badge>
          )}
          <CardTitle className="text-lg font-bold my-2 h-[3em] overflow-hidden text-ellipsis line-clamp-2">
            {contest.title}
          </CardTitle>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-between px-3 pb-2">
          <CardAction className="h-full flex items-center gap-2 font-bold text-xl text-primary py-2">
            ¥{contest.prize_pool?.toLocaleString()}
          </CardAction>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 text-muted-foreground font-bold">
              <VideoIcon className="size-5 stroke-2" />
              <p>{applications?.length}</p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground font-bold">
              <ClockIcon className="size-5 stroke-2" />
              {isEnded ? (
                <p>{`終了しました`}</p>
              ) : isScheduled ? (
                <p>
                  {`${formatDate(contest.contest_start_date, isNextYear(contest.contest_start_date) ? "yyyy年MM月dd日" : "MM月dd日")}~${formatDate(contest.contest_end_date, isNextYear(contest.contest_end_date) ? "yyyy年MM月dd日" : "MM月dd日")}`}
                </p>
              ) : (
                <p>
                  {`${formatDistanceToNow(contest.contest_end_date, { addSuffix: true, locale: ja })}終了`}
                </p>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
