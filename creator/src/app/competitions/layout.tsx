import BottomNavigationBar from "@/components/bottomNavigationBar";

export default async function CompetitionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grow min-h-0 overflow-auto relative">{children}</main>
      <BottomNavigationBar currentPage="competitions" />
    </>
  );
}
