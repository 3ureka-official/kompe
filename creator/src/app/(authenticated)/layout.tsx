import { auth } from "@/auth";
import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return <div>Please sign in to access the dashboard.</div>;
  return (
    <div>
      <nav className="w-full flex items-center justify-between gap-4 p-4">
        <Image
          src="/logo-colored.svg"
          alt="Kompe logo"
          width={180}
          height={38}
          priority
        />
        <p>
          logged in as{" "}
          <span className="border rounded p-1 bg-card">
            {session.user?.name}
          </span>
        </p>
      </nav>
      <main>{children}</main>
    </div>
  );
}
