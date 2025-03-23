import CredentialsProvider from "next-auth/providers/credentials";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { prismaClient } from "@repo/db/prismaclient";

export interface sessionT extends Session {
  user: {
    id: string;
    jwtToken: string;
    email: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const generateJWT = (id: { id: any }) => {
  return Jwt.sign(id, "vinodpr");
};

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter Name" },
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) return null;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(credentials?.password, salt);

        const user = {
          name: credentials?.email,
          email: credentials?.email,
          password: credentials?.password,
        };

        console.log("user input", user);

        const isUser = await prismaClient.user.findFirst({
          where: { email: user.email },
          select: {
            email: true,
            password: true,
            id: true,
            name: true,
          },
        });

        // is user is present then try to signin
        if (isUser) {
          console.log("Exixting", isUser);
          if (bcrypt.compareSync(user.password, isUser.password)) {
            const jwt = generateJWT({ id: isUser.id });
            return {
              id: isUser.id,
              name: isUser.name,
              email: isUser.email,
              token: jwt,
            };
          } else {
            return null;
          }
        }
        // is user is'n present then try to signup
        try {
          const newUser = await prismaClient.user.create({
            data: {
              name: user.name,
              email: user.email,
              password: hashPassword,
            },
          });
          console.log("newUser", newUser);
          const jwt = generateJWT({ id: newUser.id });
          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: jwt,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "s3cret",
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<sessionT> {
      const newSession: sessionT = session as sessionT;
      if (newSession.user && token.uid) {
        newSession.user.id = token.uid as string;
        newSession.user.jwtToken = token.jwtToken as string;
      }
      return newSession;
    },

    jwt: async ({ token, user }: any): Promise<JWT> => {
      const newToken = token;
      if (user) {
        newToken.uid = user.id;
        newToken.jwtToken = (user as User).token;
      }
      return newToken;
    },
    async redirect({ url, baseUrl }: any) {
      return `${baseUrl}`;
    },
  },
};
