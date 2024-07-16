"use server";

import { cookies } from "next/headers";

import { type Account } from "@/type/account";
import { decodeAuthAccount } from "./jwt";

export const getSession = async () => {
  let session: Account | null;
  const sessionToken = cookies().get("auth-account");
  if (sessionToken) {
    const sessionAccount = await decodeAuthAccount(sessionToken.value);
    if (sessionAccount) {
      session = sessionAccount as Account;
    } else {
      session = null;
    }
  } else {
    session = null;
  }
  return session;
};
