"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  TouchSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Pencil, Plus, SquareX, Trash2 } from "lucide-react";
import { RxBorderWidth } from "react-icons/rx";

import Item from "./item";
import SortableItem from "./SortableItem";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Board } from "@/type/board";
import { type Task } from "@/type/task";
import { useToast } from "@/components/ui/use-toast";
import DeleteBoard from "@/components/dialog/delete-board";
import MyTooltip from "@/components/ui/my-tooltip";
import SaveButton from "./save-button";
import EditBoard from "@/components/dialog/edit-board";
import { Separator } from "@/components/ui/separator";
import CreateTask from "@/components/dialog/create-task";

type BoardCardProps = {
  board: Board;
};

export default function BoardCard({ board }: BoardCardProps) {
  const [task, setTask] = useState<Task[]>(board.Tasks!);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isReordering, setIsReordering] = useState<boolean>(false);

  const { toast } = useToast();

  // for drag overlay
  const [activeItem, setActiveItem] = useState<Task>();

  // for input methods detection
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  // triggered when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(task.find((item) => item.id === active.id));
  };

  // triggered when dragging ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log({ active, over });
    if (!over) return;

    const activeItem = task.find((item) => item.id === active.id);
    const overItem = task.find((item) => item.id === over.id);

    console.log({ activeItem, overItem });
    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = task.findIndex((item) => item.id === active.id);
    const overIndex = task.findIndex((item) => item.id === over.id);

    console.log({ activeIndex, overIndex });

    if (activeIndex !== overIndex) {
      setTask((prev) => arrayMove<Task>(prev, activeIndex, overIndex));
      setIsReordering(true);
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const handleDisabledDrag = () => {
    if (disabled) {
      setDisabled(false);
      toast({
        description: "Edit position enabled!",
      });
    } else {
      setDisabled(true);
      setTask(board.Tasks!);
      setIsReordering(false);
      toast({
        description: "Edit position disabled!",
      });
    }
  };

  return (
    <>
      <Card className="h-[520px] w-[360px] space-y-2 overflow-hidden p-4">
        <div className="flex items-center justify-between">
          <MyTooltip message={board.title}>
            <h1 className="truncate text-xl font-semibold capitalize">
              {board.title}
            </h1>
          </MyTooltip>
          <div className="flex items-center gap-2">
            <MyTooltip message="Add Task">
              <div>
                <CreateTask
                  workspaceId={board.workspaceId}
                  boardId={board.id}
                  title={board.title}
                >
                  <Plus className="cursor-pointer" size={18} />
                </CreateTask>
              </div>
            </MyTooltip>
            <MyTooltip message="Order Task">
              <div>
                {disabled ? (
                  <RxBorderWidth
                    className="cursor-pointer"
                    onClick={() => handleDisabledDrag()}
                    size={16}
                  />
                ) : (
                  <SquareX
                    className="cursor-pointer"
                    size={18}
                    onClick={() => handleDisabledDrag()}
                  />
                )}
              </div>
            </MyTooltip>
            <MyTooltip message="Edit Board">
              <div>
                <EditBoard board={board}>
                  <Pencil className="cursor-pointer" size={18} />
                </EditBoard>
              </div>
            </MyTooltip>
            <MyTooltip message="Delete Board">
              <div>
                <DeleteBoard>
                  <Trash2 className="cursor-pointer" size={18} />
                </DeleteBoard>
              </div>
            </MyTooltip>
          </div>
        </div>
        <p
          className="truncate text-sm text-muted-foreground"
          title={board.description}
        >
          {board.description}
        </p>
        <Separator />
        <div className="flex flex-col">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={task}
              strategy={rectSortingStrategy}
              disabled={disabled}
            >
              <ScrollArea className="h-[calc(520px-44px)] w-[calc(360px-32px)]">
                {task.length > 0 ? (
                  <>
                    {task.map((item) => (
                      <SortableItem
                        key={item.id}
                        item={item}
                        isDisabled={disabled}
                      />
                    ))}
                  </>
                ) : (
                  <div className="flex w-full justify-center">
                    <p>No task for now!</p>
                  </div>
                )}
              </ScrollArea>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
              {activeItem ? (
                <Item item={activeItem} isDragging isDisabled={false} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </Card>
      <SaveButton visible={isReordering} />
    </>
  );
}
