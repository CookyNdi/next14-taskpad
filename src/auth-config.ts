import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { env } from "./env";
import { LoginSchema } from "./schema/account";
import { type ApiResponse } from "./type/web";
import { type AccountResponse } from "./type/account";
import { cookies } from "next/headers";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        console.log({ credentials });
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password, provider } = validatedFields.data;
          const res = await fetch(`${env.API_URL}/api/account/login`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              provider,
            }),
          });

          const response = (await res.json()) as ApiResponse<AccountResponse>;
          if (response.data) {
            const oneWeek = 7 * 24 * 60 * 60 * 1000;
            cookies().set("access_token", response.data.token!, {
              secure: true,
              httpOnly: true,
              sameSite: "strict",
              expires: Date.now() + oneWeek,
            });
            return response.data;
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
