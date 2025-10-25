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
      <MainHeader session={session} />
      <main className="grow min-h-0 overflow-auto relative">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <BottomNavigationBar currentPage="competitions" />
    </>
  );
}
