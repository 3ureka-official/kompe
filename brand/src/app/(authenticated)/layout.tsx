import { Sidebar } from "@/components/app/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
