/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import jwt from "jsonwebtoken";

import { env } from "@/env";
import { type Account } from "@/type/account";

export const createAuthAccount = (account: Account) => {
  try {
    const token = jwt.sign(account, env.JWT_SECRET);
    return token;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("JWT signing error:", error.message);
    }
    return "";
  }
};

export const decodeAuthAccount = async (token: string) => {
  try {
    const decodedToken = jwt.decode(token);
    return decodedToken as jwt.JwtPayload;
  } catch (error: unknown) {
    return null;
  }
};
