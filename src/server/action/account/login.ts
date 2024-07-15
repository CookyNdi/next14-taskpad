"use server";
import type * as z from "zod";
// import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/dist/client/components/redirect";

import { LoginSchema } from "@/schema/account";
import { signIn } from "@/auth";
import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";

export const login = async (request: z.infer<typeof LoginSchema>) => {
  const requestValidation = LoginSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { email, password, provider } = requestValidation.data;

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

  let account: Account | null = null;

  const response = (await res.json()) as ApiResponse<Account>;
  if (response) {
    if (response.data) {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      cookies().set("access_token", response.data.token, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: Date.now() + oneWeek,
      });

      account = response.data;

      if (provider === "Credentials") {
        // try {
        await signIn(provider.toLocaleLowerCase(), {
          name: account.name,
          image: account.image_url,
          email: account.email,
          token: account.token,
        });
        redirect("/");
        //   } catch (error) {
        //     console.log({ error });
        //     if (error instanceof AuthError) {
        //       switch (error.type) {
        //         case "CredentialsSignin":
        //           return { error: "Invalid credentials!" };
        //         case "CallbackRouteError":
        //           return error.cause?.err?.toString();
        //         default:
        //           return { error: "Something went wrong!" };
        //       }
        //     }
        //     throw error;
        //   }
      }
      // return { success: response.message };
    } else {
      return { error: response.message ?? response.errors![0]?.message };
    }
  }
};
