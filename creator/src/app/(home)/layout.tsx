import BottomNavigationBar from "@/components/bottomNavigationBar";
import QueryProvider from "@/components/QueryProvider";
import { MainHeader } from "@/components/mainHeader";
import { auth } from "@/auth";

export default async function CompetitionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <MainHeader session={session} className="border-b-2" />
      <main className="grow min-h-0 overflow-auto relative pb-[66px]">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <BottomNavigationBar currentPage="competitions" />
    </>
  );
}
