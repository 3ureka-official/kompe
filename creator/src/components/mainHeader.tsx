import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import HeaderAvatar from "./headerAvatar";
import SignInButton from "./signInButton";
import { cn } from "@/lib/utils";

export const MainHeader = ({
  session,
  className,
}: {
  session: Session | null;
  className?: string;
}) => {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <nav
      className={cn(
        "bg-white w-full flex items-center justify-between gap-4 px-6 py-3",
        className,
      )}
    >
      <Link href="/">
        <Image
          src="/logo-colored.svg"
          alt="Kompe logo"
          width={120}
          height={38}
          priority
        />
      </Link>
      {!isDev &&
        (session ? (
          <HeaderAvatar session={session} />
        ) : (
          <SignInButton variant="minimal" />
        ))}
    </nav>
  );
};
