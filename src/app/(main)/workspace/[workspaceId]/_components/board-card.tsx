import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Board } from "@/type/board";
import { Ellipsis, Plus } from "lucide-react";

type BoardCardProps = {
  board: Board;
};

export default function BoardCard({ board }: BoardCardProps) {
  return (
    <Card className="h-[520px] w-[360px] space-y-2 overflow-hidden p-4">
      <div className="flex items-center justify-between border-b">
        <h1 className="pb-2 text-xl font-semibold capitalize">{board.title}</h1>
        <Plus className="cursor-pointer" size={18} />
      </div>
      <div className="flex flex-col">
        <ScrollArea className="h-[calc(520px-44px)] w-[calc(360px-32px)]">
          {board.Tasks && board.Tasks.length > 0 ? (
            <>
              {board.Tasks.map((item) => (
                <div
                  className="group cursor-pointer overflow-hidden rounded-sm border-b pl-2 hover:bg-muted"
                  key={item.id}
                >
                  <div className="grid grid-cols-10 items-center justify-between gap-x-2">
                    <div className="col-span-8 py-2">
                      <p className="truncate" title={item.title}>
                        {item.title}
                      </p>
                    </div>
                    <div className="col-span-2 flex h-full w-full items-center justify-center">
                      <Ellipsis size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex w-full justify-center">
              <p>No task for now!</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </Card>
  );
}
