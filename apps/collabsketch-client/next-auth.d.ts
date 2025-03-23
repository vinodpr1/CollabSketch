import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      jwtToken: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    jwtToken: string;
  }
}
