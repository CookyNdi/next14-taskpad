import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./item";
import { type HTMLAttributes } from "react";
import { type Task } from "@/type/task";

type Props = {
  isDisabled: boolean;
  item: Task;
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, isDisabled, ...props }: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: item.id,
  });

  const styles = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? undefined,
  };

  return (
    <Item
      item={item}
      isDisabled={isDisabled}
      ref={setNodeRef}
      style={styles}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableItem;
