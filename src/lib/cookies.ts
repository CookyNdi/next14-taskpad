"use server";

import { cookies } from "next/headers";

import { GetCurrentLogin } from "@/server/action/account/current-login";
import { createAuthAccount } from "./jwt";

export const removeAccessTokenCookies = () => {
  cookies().delete("access_token");
};

export const setAuthAccountCookies = async (token: string) => {
  const oneYear = 365 * 100 * 24 * 60 * 60 * 1000;
  const account = await GetCurrentLogin(token);
  if (account) {
    const authAccount = createAuthAccount(account);
    cookies().set("auth-account", authAccount, {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      expires: Date.now() + oneYear,
    });
  }
};
