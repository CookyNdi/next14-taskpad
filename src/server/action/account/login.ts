"use server";
import type * as z from "zod";
import { cookies } from "next/headers";

import { env } from "@/env";
import { LoginSchema } from "@/schema/account";
import { type ApiResponse } from "@/type/web";
import { type AccountResponse } from "@/type/account";

export const login = async (request: z.infer<typeof LoginSchema>) => {
  const requestValidation = LoginSchema.safeParse(request);
  if (!requestValidation.success) {
    return { error: "Invalid request!" };
  }
  const { email, password, provider } = requestValidation.data;

  try {
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

    if (!res.ok) {
      return { error: "Internal Server Error" };
    }

    const response = (await res.json()) as ApiResponse<AccountResponse>;
    if (response.data) {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      cookies().set("access_token", response.data.token!, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: Date.now() + oneWeek,
      });
      return { success: response.message };
    } else {
      return { error: response.message };
    }
  } catch (error) {
    return { error: "Internal Server Error" };
  }
};
