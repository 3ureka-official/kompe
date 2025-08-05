import { Contest } from "@/types/Contest";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  contest: Contest;
};

// const statusLabels = {
//   draft: { text: "下書き", color: "bg-gray-100 text-gray-800" },
//   ready: { text: "予定", color: "bg-yellow-100 text-yellow-800" },
//   active: { text: "公開中", color: "bg-green-100 text-green-800" },
//   ended: { text: "終了", color: "bg-red-100 text-red-800" },
// };

export const ContestCard = ({ contest }: Props) => {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   return `${year}年${month}月${day}日`;
  // };

  // const formatNumber = (num: number) => {
  //   return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  // };

  // const formatCurrency = (amount: number) => {
  //   return `¥${formatNumber(amount)}`;
  // };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 px-5 py-6">
      <div className="flex justify-center">
        {/* サムネイル */}
        <Image
          src="/images/contest-thumbnail.png"
          alt={contest.title}
          className="w-56 h-42 rounded-lg object-cover border"
        />

        {/* コンテンツ */}
        <div className="flex-1 px-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {contest.title}
              </h2>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                // statusLabels[contest.status].color
                "bg-gray-100 text-gray-800"
              }`}
            >
              {/* {statusLabels[contest.status].text} */}
              draft
            </span>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">応募期間</span>
                <p className="text-base text-gray-900">
                  {/* {formatDate(contest.startDate)} -{" "}
                  {formatDate(contest.endDate)} */}
                  2025/08/01 - 2025/08/31
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500">賞金総額</span>
                <p className="text-base text-gray-900">
                  {/* {formatCurrency(contest.prizePool)} */}
                  ¥200,000
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 flex items-end justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {/* {formatNumber(contest.videos)} */}
                  20
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {/* {formatNumber(contest.views)} */}
                  20
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {/* {formatNumber(contest.likes)} */}
                  20
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {/* {formatNumber(contest.comments)} */}
                  20
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  {/* {formatNumber(contest.shares)} */}
                  20
                </span>
              </div>
            </div>
            <Link href={`/dashboard/contests/${contest.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-100 border-gray-500 text-gray-600 cursor-pointer"
              >
                詳細を見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
