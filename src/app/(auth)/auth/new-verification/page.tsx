import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewVerificationPage() {
  return (
    <Card className="w-full lg:w-[400px]">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
      </CardHeader>
      <CardFooter>
        <Link href={"/"} className="flex w-full">
          <Button className="w-full">Back To Home</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
