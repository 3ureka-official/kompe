import BottomNavigationBar from "@/components/bottomNavigationBar";
import QueryProvider from "@/components/QueryProvider";
import { CompetitionHeader } from "@/components/competitionHeader";

export default async function CompetitionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CompetitionHeader />
      <main className="grow min-h-0 overflow-auto relative">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <BottomNavigationBar currentPage="competitions" />
    </>
  );
}
