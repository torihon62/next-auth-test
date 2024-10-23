import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { auth as firebaseAuth } from "@/firebase/admin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        idToken: {},
      },
      authorize: async ({ idToken }: any, _req) => {
        if (idToken) {
          try {
            const decoded = await firebaseAuth.verifyIdToken(idToken);
            return { ...decoded, id: decoded.uid };
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(token);
      if (session.user !== null && token.id !== undefined) {
        session.user.id = token.id as string; // token.id は型 unknown でエラーが出るので as で型宣言。
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
