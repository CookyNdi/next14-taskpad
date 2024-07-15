import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateWorkspace from "@/components/dialog/create-workspace";
import PageContainer from "@/components/layout/page-container/page-container";
import { workspace } from "@/lib/temporary-data";

export default async function HomePage() {
  return (
    <PageContainer>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <h1 className="text-2xl font-semibold">Pick Or Create New Workspace</h1>
        <Card className="h-[320px] w-full p-4 lg:w-[420px]">
          <CreateWorkspace>
            <Button className="w-full">Create New</Button>
          </CreateWorkspace>
          <ScrollArea className="mt-2 h-[calc(100%-56px)]">
            <div className="flex flex-col gap-y-2 px-3">
              {workspace.map((item) => (
                <Link key={item.id} href={`/workspace/${item.id}`}>
                  <Button className="w-full" variant="outline">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </PageContainer>
  );
}
