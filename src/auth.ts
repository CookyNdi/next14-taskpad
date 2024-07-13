import NextAuth from "next-auth";

import authConfig from "./auth-config";
import { register } from "./server/action/account/register";
import { GetAccountByEmail } from "./server/action/account/get-by-email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async signIn({ user }) {
      const existingAccount = await GetAccountByEmail(user.email!);
      if (!existingAccount.success) {
        const response = await register({
          email: user.email!,
          image_url: user.image!,
          name: user.name!,
          password: "********",
          provider: "Oauth",
        });
        console.log(response);
      }
    },
  },
  ...authConfig,
});
