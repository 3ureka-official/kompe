import NextAuth, { Session } from "next-auth";
import TikTok from "next-auth/providers/tiktok";
import prisma from "./lib/prisma";
import type { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
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
      return session;
    },
  },
  providers: [
    TikTok({
      clientId: process.env.AUTH_TIKTOK_ID!,
      clientSecret: process.env.AUTH_TIKTOK_SECRET!,
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=union_id,avatar_url,display_name,username",
      profile: async (profile) => {
        let user = await prisma.creators.findFirst({
          where: { tiktok_union_id: profile.data.user.union_id! },
        });
        if (!user) {
          user = await prisma.creators.create({
            data: {
              tiktok_union_id: profile.data.user.union_id!,
              display_name: profile.data.user.display_name,
              avatar_url: profile.data.user.avatar_url,
              username: profile.data.user.username,
            },
          });
        }
        return {
          creator_id: user.id,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          username: user.username,
        };
      },
    }),
  ],
});
