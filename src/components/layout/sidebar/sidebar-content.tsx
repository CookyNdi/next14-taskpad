import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import CreateWorkspace from "@/components/dialog/create-workspace";
// import { workspace } from "@/lib/temporary-data";
import { type Workspace } from "@/type/workspace";

type SidebarContentProps = {
  workspace: Workspace[]
};

export default function SidebarContent({ workspace }: SidebarContentProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="lg:px-4">
        <CreateWorkspace>
          <Button className="w-full">New Workspace</Button>
        </CreateWorkspace>
      </div>
      <ScrollArea className="h-[calc(100dvh-56px)] pb-4">
        <div className="flex flex-col gap-y-2 lg:px-4">
          {workspace.length > 0 ? (
            <>
              {workspace.map((item) => (
                <Link key={item.id} href={`/workspace/${item.id}`}>
                  <Button className="w-full" variant="outline">
                    {item.title}
                  </Button>
                </Link>
              ))}
            </>
          ) : (
            <p>Workspace Not Found!</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
