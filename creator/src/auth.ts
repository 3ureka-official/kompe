import NextAuth from "next-auth";
import TikTok from "next-auth/providers/tiktok";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    TikTok({
      clientId: process.env.AUTH_TIKTOK_ID,
      clientSecret: process.env.AUTH_TIKTOK_SECRET,
      userinfo:
        "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username",
      profile(profile) {
        console.log("TikTok profile", profile);
        return {
          id: profile.data.user.open_id || profile.data.user.union_id,
          name: profile.data.user.display_name,
          image: profile.data.user.avatar_url,
          email: profile.data.user.email || profile.data.user.username || null,
        };
      },
    }),
  ],
});
