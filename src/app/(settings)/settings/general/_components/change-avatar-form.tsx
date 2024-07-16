"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormSuccess } from "@/components/layout/form-message/form-success";
import { FormError } from "@/components/layout/form-message/form-error";
import { useState, useTransition } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { changeAccountAvatar } from "@/server/action/account/change-avatar";
import { useToast } from "@/components/ui/use-toast";

export default function ChangeAvatarForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const onSubmit = (image: string) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      changeAccountAvatar({ image_url: image })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avatar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UploadDropzone
          disabled={isPending}
          className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-label:text-foreground"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const image = res[0]?.url;
            if (image) {
              onSubmit(image);
            }
            toast({
              title: "Success!",
              description: "Upload Completed",
            });
          }}
          onUploadError={(error: Error) => {
            toast({
              title: "Error!",
              description: `ERROR! ${error.message}`,
            });
          }}
        />
        <FormSuccess message={success} />
        <FormError message={error} />
      </CardContent>
    </Card>
  );
}
