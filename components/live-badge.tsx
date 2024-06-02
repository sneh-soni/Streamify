import { cn } from "@/lib/utils";

interface liveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: liveBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-1 rounded-md uppercase border border-background font-semibold text-xs",
        className
      )}
    >
      Live
    </div>
  );
};
