import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateWorkspace from "@/components/dialog/create-workspace";
import PageContainer from "@/components/layout/page-container/page-container";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <h1 className="text-2xl font-semibold">Pick Or Create New Workspace</h1>
        <Card className="h-[320px] w-[420px] p-4">
          <CreateWorkspace>
            <Button className="w-full">Create New</Button>
          </CreateWorkspace>
          <ScrollArea className="mt-2 h-[calc(100%-56px)]">
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Workspace 1
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 2
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 3
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 4
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 5
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 6
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 7
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 8
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 9
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 10
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 11
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 12
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 13
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 14
              </Button>
              <Button className="w-full" variant="outline">
                Workspace 15
              </Button>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </PageContainer>
  );
}
