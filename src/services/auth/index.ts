import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../database";

import Nodemailer from "next-auth/providers/nodemailer";

export const { auth, handlers, signIn, signOut } = NextAuth({
 pages: {
  signIn: "/auth",
  signOut: "/auth",
  error: "/auth",
  verifyRequest: "/auth",
  newUser: "/app",
 },
 
 adapter: PrismaAdapter(prisma),
 providers: [
  Nodemailer({
   server: process.env.EMAIL_SERVER,
   from: process.env.EMAIL_FROM,
  }),
 ],
});
