import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MyTooltipProps = {
  message: string;
  children: React.ReactNode;
};

export default function MyTooltip({ message, children }: MyTooltipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="border border-primary/20 bg-background/80 text-white max-w-96 h-auto text-wrap">
          <span>{message}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
