import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderAvatar({ session }: { session: Session }) {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session.user?.avatar_url || undefined} />
          <AvatarFallback>
            {session.user?.display_name?.split("", 2)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <form action={handleSignOut}>
          <DropdownMenuItem
            className="cursor-pointer p-2"
            onClick={handleSignOut}
          >
            <button type="submit" className="text-left">
              ログアウト
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
