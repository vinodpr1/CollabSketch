import NextAuth from "next-auth";
import { AuthOptions } from "@/app/lib/auth";

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
