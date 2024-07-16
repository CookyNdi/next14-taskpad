"use server";

import { cookies } from "next/headers";

export const removeAccessTokenCookies = () => {
  cookies().delete("access_token");
};
