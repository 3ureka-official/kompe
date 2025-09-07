import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    creator_id: string;
    display_name: string;
    avatar_url: string;
    username: string;
  }
  interface Session {
    user: {
      creator_id: string;
      display_name: string;
      avatar_url: string;
      username: string;
    };
    accessToken?: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    creator_id: string;
    display_name: string;
    avatar_url: string;
    username: string;
  }
}
