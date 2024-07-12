import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateWorkspace from "@/components/dialog/create-workspace";

export default function SidebarContent() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="lg:px-4">
        <CreateWorkspace>
          <Button className="w-full">New Workspace</Button>
        </CreateWorkspace>
      </div>
      <ScrollArea className="h-[521px]">
        <div className="space-y-4 lg:px-4">
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
    </div>
  );
}
