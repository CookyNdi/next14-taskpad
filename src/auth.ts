import NextAuth from "next-auth";

import authConfig from "./auth-config";
import { register } from "./server/action/account/register";
import { GetAccountByEmail } from "./server/action/account/get-by-email";
import { login } from "./server/action/account/login";
import { logout } from "./server/action/account/logout";

export const { handlers, signIn, signOut, auth } = NextAuth({
  events: {
    async signIn({ user }) {
      const existingAccount = await GetAccountByEmail(user.email!);
      if (!existingAccount.success) {
        await register({
          email: user.email!,
          image_url: user.image!,
          name: user.name!,
          password: "********",
          provider: "Oauth",
        }).then(async (data) => {
          if (data.success) {
            await login({
              email: user.email!,
              password: "********",
              provider: "Oauth",
            });
          }
        });
      } else {
        await login({
          email: user.email!,
          password: "********",
          provider: "Oauth",
        });
      }
    },
    signOut: async function () {
      await logout();
    },
  },
  ...authConfig,
});
