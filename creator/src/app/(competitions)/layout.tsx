import BottomNavigationBar from "@/components/bottomNavigationBar";
import QueryProvider from "@/components/QueryProvider";

export default async function CompetitionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grow min-h-0 overflow-auto relative">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <BottomNavigationBar currentPage="competitions" />
    </>
  );
}
