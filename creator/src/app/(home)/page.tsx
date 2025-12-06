import prisma from "@/lib/prisma";
import { formatDate } from "@/utils/format";
import { Suspense } from "react";
import ContestCard from "@/components/contestCard";
import { SkeletonCardContent } from "@/components/skeletonCardContent";
import ContestFilterSelect from "@/components/contestFilterSelect";
import { auth } from "@/auth";
import RegisterLineSection from "@/components/registerLineSection";

type HomePageProps = { searchParams?: Promise<{ period?: string }> };

export default async function HomePage({ searchParams }: HomePageProps) {
  const period = (await searchParams)?.period ?? "all";

  return (
    <div className="p-4 min-h-full pb-30 flex flex-col gap-4">
      <div className="flex flex-col gap-4 items-start justify-between pb-4">
        <h1 className="text-lg font-bold ">公式LINE</h1>
        <RegisterLineSection />
      </div>
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-lg font-bold ">コンテスト一覧</h1>
        <ContestFilterSelect />
      </div>
      <Suspense fallback={<SkeletonCardContent />}>
        <ContestsList periodOptions={period} />
      </Suspense>
    </div>
  );
}

const filterPrismaContests = (period: string) => {
  const today = formatDate(new Date());
  const boundary = new Date(`${today}T00:00:00Z`);

  switch (period) {
    case "ongoing":
      return {
        contest_start_date: { lte: boundary },
        contest_end_date: { gte: boundary },
      };

    case "scheduled":
      return {
        contest_start_date: { gt: boundary },
        contest_end_date: { gt: boundary },
      };

    case "ended":
      return {
        contest_start_date: { lt: boundary },
        contest_end_date: { lt: boundary },
      };

    case "all":
    default:
      return {};
  }
};

async function ContestsList({ periodOptions }: { periodOptions: string }) {
  const session = await auth();

  const filter = await filterPrismaContests(periodOptions);

  const data = await prisma.contests.findMany({
    include: {
      brands: true,
      contest_transfers: true,
      applications: {
        where: {
          tiktok_url: {
            not: null,
          },
        },
        orderBy: {
          views: "asc",
        },
      },
      contest_prizes: true,
      contest_images: {
        orderBy: {
          display_order: "asc",
        },
      },
    },
    orderBy: {
      contest_start_date: "desc",
    },
    where: { ...filter, is_draft: false },
  });

  return (
    <div className="grid gap-6">
      {data.length > 0 ? (
        data.map((competition) => {
          let my_contest_transfer = null;
          let my_application = null;

          if (session?.user?.creator_id) {
            my_contest_transfer =
              competition.contest_transfers.find(
                (contest_transfer) =>
                  contest_transfer.creator_id === session?.user?.creator_id,
              ) || null;
            my_application =
              competition.applications.find(
                (application) =>
                  application.creator_id === session?.user?.creator_id,
              ) || null;
          }

          return (
            <ContestCard
              key={competition.id}
              contest={competition}
              applications={competition.applications}
              brands={competition.brands}
              contest_transfer={my_contest_transfer}
              my_application={my_application}
              contest_prizes={competition.contest_prizes ?? []}
            />
          );
        })
      ) : (
        <div className="text-sm text-muted-foreground">
          コンテストがありません
        </div>
      )}
    </div>
  );
}
