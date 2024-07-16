"use client";
import { useEffect } from "react";

import { GetCurrentLogin } from "@/server/action/account/current-login";
import useAccountStore from "@/store/auth";
import { redirect } from "next/navigation";
import { removeAccessTokenCookies } from "@/server/action/account/remove-cookies";

type AuthCurrentLoginProps = {
  token: string;
};

export default function AuthCurrentLogin({ token }: AuthCurrentLoginProps) {
  const { setAccount } = useAccountStore();

  useEffect(() => {
    const handleGetCurrentLogin = async () => {
      const accountData = await GetCurrentLogin(token);
      if (accountData) {
        setAccount(accountData);
      }
    };
    handleGetCurrentLogin().catch(() => {
      removeAccessTokenCookies();
      redirect("/auth/login");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
