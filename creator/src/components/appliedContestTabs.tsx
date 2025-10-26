"use client";

import { formatDate } from "date-fns";
import {
  applications,
  contests,
  brands,
  contest_transfers,
} from "@prisma/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardAction,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { CircleDollarSignIcon, ClockIcon, VideoIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";

const getRankingApplications = (
  applications: (applications & {
    contest_transfers: contest_transfers | null;
    contests: (contests & { applications: applications[] }) & {
      brands: brands;
    };
  })[],
) => {
  return applications.filter(
    (application) =>
      application.contest_transfers?.stripe_transfer_id !== null &&
      application.contests.applications.findIndex(
        (app) => app.id === application.id,
      ) < application.contests.prize_distribution.length,
  );
};

type CompetitionsListProps = {
  applications: (applications & {
    contest_transfers: contest_transfers | null;
    contests: (contests & { applications: applications[] }) & {
      brands: brands;
    };
  })[];
  rankingApplications?: (applications & {
    contest_transfers: contest_transfers | null;
    contests: (contests & { applications: applications[] }) & {
      brands: brands;
    };
  })[];
  isOngoing: boolean;
};

export default function AppliedContestTabs({
  applications,
}: {
  applications: (applications & {
    contest_transfers: contest_transfers | null;
    contests: (contests & { applications: applications[] }) & {
      brands: brands;
    };
  })[];
}) {
  const today = formatDate(new Date(), "yyyy-MM-dd");
  const todayDate = new Date(today);

  const ongoingApplications = applications.filter((application) => {
    return application.contests.contest_end_date > todayDate;
  });

  const endedApplications = applications.filter((application) => {
    return application.contests.contest_end_date < todayDate;
  });

  const rankingApplications = getRankingApplications(endedApplications);

  return (
    <Tabs defaultValue="ongoing" className="relative min-h-full bg-gray-50">
      <TabsList className="w-full sticky top-[-0.5px] z-10">
        <TabsTrigger value="ongoing" className="py-2">
          開催中
        </TabsTrigger>
        <TabsTrigger value="ended" className="py-2">
          <span className="w-4 h-4 flex items-center justify-center top-[-10px] right-[-20px] bg-red-500 text-white font-bold rounded-full">
            {rankingApplications.length}
          </span>
          終了
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ongoing" className="pb-16">
        <div className="p-4 bg-gray-50 min-h-full">
          <h1 className="text-lg font-bold pb-4">参加中のコンテスト</h1>
          <CompetitionsList
            applications={ongoingApplications}
            isOngoing={true}
          />
        </div>
      </TabsContent>
      <TabsContent value="ended" className="pb-16">
        <div className="p-4 bg-gray-50 min-h-full">
          <h1 className="text-lg font-bold pb-4">過去に参加したコンテスト</h1>
          <CompetitionsList
            applications={endedApplications}
            rankingApplications={rankingApplications}
            isOngoing={false}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

const CompetitionsList = ({
  applications,
  rankingApplications = [],
  isOngoing,
}: CompetitionsListProps) => {
  return (
    <div className="grid gap-4">
      {applications.length > 0 ? (
        applications.map((application) => (
          <Link
            href={`/competitions/${application.contest_id}`}
            key={application.id}
          >
            <Card className="py-3 gap-2">
              <CardHeader className="px-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        application.contests.brands.logo_url ||
                        "" /* todo: fallback image */
                      }
                    />
                    <AvatarFallback className="uppercase">
                      {application.contests.brands.name.split("", 2)}
                    </AvatarFallback>
                  </Avatar>
                  <p>{application.contests.brands.name}</p>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 px-3">
                <Image
                  src={
                    application.contests.thumbnail_url ||
                    "" /* todo: add fallback image */
                  }
                  alt={
                    application.contests.title || "タイトル未設定のコンテスト"
                  }
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
                {!isOngoing &&
                  rankingApplications.find(
                    (rankingApplication) =>
                      rankingApplication.id === application.id,
                  ) && (
                    <Badge
                      variant="secondary"
                      className="bg-white text-destructive font-bold border-destructive py-1"
                    >
                      <CircleDollarSignIcon className="size-4 stroke-2" />
                      賞金未受け取り
                    </Badge>
                  )}
                <CardTitle className="text-lg font-bold my-2 h-[3em] overflow-hidden text-ellipsis line-clamp-2">
                  {application.contests.title}
                </CardTitle>
              </CardContent>
              <CardFooter className="justify-between px-3 py-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground font-bold">
                    <VideoIcon className="size-5 stroke-2" />
                    <p>{application.contests.applications.length}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground font-bold">
                    <ClockIcon className="size-5 stroke-2" />
                    {isOngoing ? (
                      <p>
                        {`残り${formatDistanceToNow(new Date(application.contests.contest_end_date), { locale: ja })}`}
                      </p>
                    ) : (
                      <p>
                        {`${formatDistanceToNow(new Date(application.contests.contest_end_date), { locale: ja })}前に終了`}
                      </p>
                    )}
                  </div>
                </div>
                <CardAction className="h-full flex items-center gap-2 font-bold text-xl text-primary">
                  ¥{application.contests.prize_pool?.toLocaleString()}
                </CardAction>
              </CardFooter>
            </Card>
          </Link>
        ))
      ) : (
        <div className="text-sm text-muted-foreground">
          {isOngoing
            ? "開催中のコンテストがありません"
            : "過去に参加したコンテストがありません"}
        </div>
      )}
    </div>
  );
};
