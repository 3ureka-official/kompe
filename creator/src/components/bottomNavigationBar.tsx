import { CrownIcon, UserIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  currentPage: "competitions" | "mypage" | "other";
};

export default async function BottomNavigationBar({ currentPage }: Props) {
  return (
    <nav className="bg-card border rounded-t-2xl w-full p-4">
      <div className="grid grid-cols-2 text-center">
        <Link href="/">
          <div className="flex flex-col items-center text-primary">
            <CrownIcon
              className={`size-4 stroke-2 ${currentPage === "competitions" && "fill-primary"}`}
            />
            <p className="text-xs font-semibold">コンテスト</p>
          </div>
        </Link>
        <Link href="/mypage">
          <div className="flex flex-col items-center text-primary">
            <UserIcon
              className={`size-4 stroke-2 ${currentPage === "mypage" && "fill-primary"}`}
            />
            <p className="text-xs font-semibold">マイページ</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
