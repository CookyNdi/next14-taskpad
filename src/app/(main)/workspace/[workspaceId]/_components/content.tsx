import { type Workspace } from "@/type/workspace";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BoardCard from "../_components/board-card";

type WorkspaceContentProps = {
  workspace: Workspace;
};

export default function WorkspaceContent({ workspace }: WorkspaceContentProps) {
  return (
    <div className="flex w-full flex-col gap-y-4 pb-12">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">{workspace.title}</h1>
        <Button>Create Board</Button>
      </div>
      <ScrollArea className="h-[cacl(100dvh-132px)] w-[cacl(100dvh-20%)] whitespace-nowrap rounded-md border">
        <div className="flex gap-x-4 p-4">
          {workspace.Board && workspace.Board.length > 0 ? (
            <>
              {workspace.Board.map((item) => (
                <BoardCard key={item.id} board={item} />
              ))}
            </>
          ) : (
            <div className="flex w-full justify-center">
              <p>Please add at least one board</p>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
