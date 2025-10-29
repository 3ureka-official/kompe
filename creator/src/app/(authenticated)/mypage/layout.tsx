import BottomNavigationBar from "@/components/bottomNavigationBar";
import { MainHeader } from "@/components/mainHeader";
import { auth } from "@/auth";

export default async function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <MainHeader session={session} className="border-b-2" />
      <main className="grow min-h-0 overflow-auto relative pb-[66px]">
        {children}
      </main>
      <BottomNavigationBar currentPage="mypage" />
    </>
  );
}
