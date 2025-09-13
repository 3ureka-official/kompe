import NextAuth, { Session } from "next-auth";
import TikTok from "next-auth/providers/tiktok";
import prisma from "./lib/prisma";
import type { JWT } from "next-auth/jwt";

const AUTH_TIKTOK_ID = process.env.AUTH_TIKTOK_ID!;
const AUTH_TIKTOK_SECRET = process.env.AUTH_TIKTOK_SECRET!;

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, account }) {
      // TikTokDisplayAPIなどで利用するためにaccessTokenを保存(ログイン直後のみ値が入る)
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.creator_id = user.creator_id;
        token.display_name = user.display_name;
        token.avatar_url = user.avatar_url;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      session.user.creator_id = token.creator_id;
      session.user.display_name = token.display_name;
      session.user.avatar_url = token.avatar_url;
      session.user.username = token.username;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  providers: [
    TikTok({
      clientId: AUTH_TIKTOK_ID,
      clientSecret: AUTH_TIKTOK_SECRET,
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize",
        params: {
          client_key: AUTH_TIKTOK_ID,
          scope: "user.info.profile,user.info.stats,video.list",
        },
      },
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=union_id,avatar_url,display_name,username",
      profile: async (profile) => {
        let creator = await prisma.creators.findFirst({
          where: { tiktok_union_id: profile.data.user.union_id! },
        });
        if (!creator) {
          creator = await prisma.creators.create({
            data: {
              tiktok_union_id: profile.data.user.union_id!,
              display_name: profile.data.user.display_name,
              avatar_url: profile.data.user.avatar_url,
              username: profile.data.user.username,
            },
          });
        }
        return {
          creator_id: creator.id,
          display_name: creator.display_name,
          avatar_url: creator.avatar_url,
          username: creator.username,
        };
      },
    }),
  ],
});
