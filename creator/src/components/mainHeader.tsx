import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import HeaderAvatar from "./headerAvatar";
import SignInButton from "./signInButton";

export const MainHeader = ({ session }: { session: Session | null }) => {
  return (
    <nav className="w-full flex items-center justify-between gap-4 px-6 pt-4 pb-2 border-b">
      <Link href="/">
        <Image
          src="/logo-colored.svg"
          alt="Kompe logo"
          width={120}
          height={38}
          priority
        />
      </Link>
      {session ? (
        <HeaderAvatar session={session} />
      ) : (
        <SignInButton variant="minimal" />
      )}
    </nav>
  );
};
