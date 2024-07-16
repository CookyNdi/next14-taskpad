"use server";

import { env } from "@/env";
import { type ApiResponse } from "@/type/web";
import { type Account } from "@/type/account";

export const GetCurrentLogin = async (token: string) => {
  try {
    const res = await fetch(`${env.API_URL}/api/account/current`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const response = (await res.json()) as ApiResponse<Account>;
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("GET CURRENT LOGGIN ISSUE");
    return null;
  }
};
