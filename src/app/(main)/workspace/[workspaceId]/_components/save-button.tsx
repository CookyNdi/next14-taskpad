import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SaveButtonProps = {
  visible: boolean;
};

export default function SaveButton({ visible }: SaveButtonProps) {
  return (
    <div
      className={cn(
        "fixed bottom-8 right-[50%] hidden -translate-x-[-50%] -translate-y-[-50%] shadow-2xl shadow-white animate-bounce",
        visible && "block",
      )}
    >
      <Button>Save</Button>
    </div>
  );
}
