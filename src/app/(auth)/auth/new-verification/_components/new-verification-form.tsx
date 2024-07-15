"use client";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { newVerification } from "@/server/action/account/new-verification";
import { FormError } from "@/components/layout/form-message/form-error";
import { FormSuccess } from "@/components/layout/form-message/form-success";

type NewVerificationFormProps = {
  token: string;
};

export default function NewVerificationForm({
  token,
}: NewVerificationFormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  console.log({ token });
  const onSubmit = useCallback(() => {
    if (success ?? error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [error, success, token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const closeWindow = () => {
    window.close();
  };

  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        {success && (
          <CardDescription>
            Now You Can Close This Page and Login to your account!
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button onClick={closeWindow} className="w-full">
          Close This Window
        </Button>
      </CardContent>
    </Card>
  );
}
