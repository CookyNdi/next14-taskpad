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

import BoardOptions from "@/components/dropdown/board-options";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Board } from "@/type/board";
import { Ellipsis, Plus } from "lucide-react";
import { type Task } from "@/type/task";
import Item from "./item";
import SortableItem from "./SortableItem";

type BoardCardProps = {
  board: Board;
};

export default function BoardCard({ board }: BoardCardProps) {
  const [task, setTask] = useState<Task[]>(board.Tasks!);

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
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  const handleButtonClick = () => {
    const itemIds = task.map((item) => item.title);
    alert(itemIds);
  };
  return (
    <Card className="h-[520px] w-[360px] space-y-2 overflow-hidden p-4">
      <div className="flex items-center justify-between border-b">
        <h1 className="pb-2 text-xl font-semibold capitalize">{board.title}</h1>
        <div className="flex items-center gap-2">
          <Plus className="cursor-pointer" size={18} onClick={handleButtonClick} />
          <BoardOptions>
            <Ellipsis className="cursor-pointer" size={18} />
          </BoardOptions>
        </div>
      </div>
      <div className="flex flex-col">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={task} strategy={rectSortingStrategy}>
            <ScrollArea className="h-[calc(520px-44px)] w-[calc(360px-32px)]">
              {task.length > 0 ? (
                <>
                  {task.map((item) => (
                    <SortableItem key={item.id} item={item} />
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
            {activeItem ? <Item item={activeItem} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </Card>
  );
}
