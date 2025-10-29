"use client";

import { formatDate } from "date-fns";
import {
  applications,
  contests,
  brands,
  contest_transfers,
} from "@prisma/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import ContestCard from "./contestCard";

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
    <Tabs defaultValue="ongoing" className="relative min-h-full">
      <TabsList className="w-full bg-white sticky top-[-0.5px] z-10">
        <TabsTrigger value="ongoing" className="py-2">
          開催中
        </TabsTrigger>
        <TabsTrigger value="ended" className="py-2">
          {rankingApplications.length > 0 && (
            <span className="w-4 h-4 flex items-center justify-center top-[-10px] right-[-20px] bg-red-500 text-white font-bold rounded-full">
              {rankingApplications.length}
            </span>
          )}
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
  isOngoing,
}: CompetitionsListProps) => {
  return (
    <div className="grid gap-4">
      {applications.length > 0 ? (
        applications.map((application) => (
          <ContestCard
            contest={application.contests}
            applications={application.contests.applications}
            my_application={application}
            contest_transfer={application.contest_transfers}
            brands={application.contests.brands}
            key={application.id}
          />
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
