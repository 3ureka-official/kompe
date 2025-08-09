import NextAuth from "next-auth";
import TikTok from "next-auth/providers/tiktok";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
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
