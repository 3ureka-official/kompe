import NextAuth, { Session } from "next-auth";
import TikTok from "next-auth/providers/tiktok";
import type { JWT } from "next-auth/jwt";
import prisma from "./lib/prisma";
import { refreshAccessToken } from "./services/creatorService";

const AUTH_TIKTOK_ID = process.env.AUTH_TIKTOK_ID!;
const AUTH_TIKTOK_SECRET = process.env.AUTH_TIKTOK_SECRET!;

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // TikTokDisplayAPIなどで利用するためにaccessTokenを保存(ログイン直後のみ値が入る)
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (account.expires_at) {
          token.accessTokenExpires = account.expires_at * 1000;
        }
      }
      if (user) {
        token.creator_id = user.creator_id;
        token.display_name = user.display_name;
        token.avatar_url = user.avatar_url;
        token.username = user.username;
      }

      if (!token.accessTokenExpires) {
        const newToken = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = newToken.access_token;
        token.refreshToken = newToken.refresh_token;
        token.accessTokenExpires =
          Date.now() + Number(newToken.expires_in) * 1000;

        return token;
      }

      // 期限切れチェック
      const shouldRefresh =
        Date.now() > (token.accessTokenExpires as number) - 60_000;
      if (shouldRefresh) {
        const newToken = await refreshAccessToken(token.refreshToken as string);
        token.accessToken = newToken.access_token;
        token.refreshToken = newToken.refresh_token;
        token.accessTokenExpires =
          Date.now() + Number(newToken.expires_in) * 1000;

        return token;
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
      profile: async (profile, tokens) => {
        const accessToken = (tokens.access_token || "").toString();
        const refreshToken = (tokens.refresh_token || "").toString();
        const expires_at =
          tokens.expires_in != null
            ? new Date(Date.now() + Number(tokens.expires_in) * 1000)
            : undefined;
        const creator = await prisma.creators.upsert({
          where: { tiktok_union_id: profile.data.user.union_id! },
          create: {
            tiktok_union_id: profile.data.user.union_id!,
            display_name: profile.data.user.display_name,
            avatar_url: profile.data.user.avatar_url,
            username: profile.data.user.username,
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expires_at,
          },
          update: {
            display_name: profile.data.user.display_name, // 変更される可能性があるので毎回更新
            avatar_url: profile.data.user.avatar_url, // 有効期限がある
            username: profile.data.user.username, // 変更される可能性がある
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_at: expires_at,
          },
        });

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
