import BottomNavigationBar from "@/components/bottomNavigationBar";
import QueryProvider from "@/components/QueryProvider";
import { ApplicationHeader } from "@/components/applicationHeader";

export default async function CompetitionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ApplicationHeader />
      <main className="grow min-h-0 overflow-auto relative pb-[66px]">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <BottomNavigationBar currentPage="other" />
    </>
  );
}
