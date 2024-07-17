import { type Workspace } from "@/type/workspace";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type WorkspaceContentProps = {
  workspace: Workspace;
};

export default function WorkspaceContent({ workspace }: WorkspaceContentProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 pb-20 lg:grid-cols-2">
      {workspace.Board && workspace.Board.length > 0 ? (
        <>
          {workspace?.Board.map((data) => (
            <Card className="h-[320px] space-y-2 p-4" key={data.id}>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">
                  {data.title}
                </h1>
                {/* <Button size="sm">Expand</Button> */}
              </div>
              <ScrollArea className="mt-2 h-[calc(100%-56px)]">
                <div className="flex flex-col gap-y-2 px-3">
                  {data.Tasks && data.Tasks.length > 0 ? (
                    <>
                      {data.Tasks.map((item) => (
                        <Button
                          key={item.id}
                          className="w-full"
                          variant="outline"
                        >
                          {item.title}
                        </Button>
                      ))}
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Button>Create Task</Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
          ))}
        </>
      ) : (
        <div>
          <Button>Create Board</Button>
        </div>
      )}
    </div>
  );
}
