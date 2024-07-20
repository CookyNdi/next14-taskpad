/* eslint-disable @next/next/no-img-element */
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { type Task } from "@/type/task";
import { type CSSProperties, forwardRef, type HTMLAttributes } from "react";

type Props = {
  item: Task;
  isDisabled: boolean;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

// eslint-disable-next-line react/display-name
const Item = forwardRef<HTMLDivElement, Props>(
  (
    { item, isOpacityEnabled, isDisabled, isDragging, style, ...props },
    ref,
  ) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    };

    return (
      <div ref={ref} style={styles} {...props}>
        <div
          className={cn(
            "group cursor-grab overflow-hidden rounded-sm border-b px-2 hover:bg-muted",
            isDisabled && "cursor-default",
          )}
          key={item.id}
        >
          <div className="grid grid-cols-10 items-center justify-between gap-x-2">
            <div className="col-span-10 flex items-center gap-2 py-2">
              <Checkbox />
              <p className="truncate text-sm" title={item.title}>
                {item.title}
              </p>
            </div>
            {/* <div className="col-span-2 flex h-full w-full items-center justify-center">
                      <Ellipsis size={18} />
                    </div> */}
          </div>
        </div>
      </div>
    );
  },
);

export default Item;
