import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import HeaderAvatar from "./headerAvatar";
import SignInButton from "./signInButton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export const WorkHistoriesHeader = ({
  session,
}: {
  session: Session | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    router.push(`/work-histories?tab=${value}`);
  };

  const activeTab =
    (searchParams.get("tab") as "ongoing" | "ended") || "ongoing";

  return (
    <nav className="w-full flex flex-col gap-4 px-6 pt-4 border-b">
      <div className="flex items-center justify-between gap-4">
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
      </div>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="ongoing">開催中</TabsTrigger>
          <TabsTrigger value="ended">終了</TabsTrigger>
        </TabsList>
      </Tabs>
    </nav>
  );
};
