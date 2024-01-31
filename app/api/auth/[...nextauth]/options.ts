import type { NextAuthOptions } from "next-auth";
import loginUserAction from "@/lib/server-actions/login-user-action";
import CredentialsProvier from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/id/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvier({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const result = await loginUserAction({
          email: credentials.email,
          password: credentials.password,
        });

        if (result.status !== 200) {
          return null;
        }

        return result.data as any;
      },
    }),
  ],
};

export default authOptions;
