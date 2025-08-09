import NextAuth from "next-auth";
import TikTok from "next-auth/providers/tiktok";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    signIn({ user, account, profile }) {
      console.log("signIn callback", user, account, profile);
      return true;
    },
    redirect({ url, baseUrl }) {
      console.log("redirect callback", url, baseUrl);
      return baseUrl;
    },
    jwt({ token, user }) {
      console.log("jwt callback", token, user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, user }) {
      console.log("session callback", session, user);
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [TikTok],
});
