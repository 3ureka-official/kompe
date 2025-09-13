import BottomNavigationBar from "@/components/bottomNavigationBar";

export default async function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grow min-h-0 overflow-auto relative">{children}</main>
      <BottomNavigationBar currentPage="mypage" />
    </>
  );
}
