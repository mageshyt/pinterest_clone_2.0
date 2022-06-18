import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: "Javascript",
  callbacks: {
    signIn: async (user, account, profile) => {
      // Do something with the user and account
      return user;
    },

    redirect: async (url, _baseUrl) => {
      if (url === "/login") {
        return Promise.resolve("/");
      }
      return Promise.resolve("/");
    },
  },
});
