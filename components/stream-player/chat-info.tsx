import { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only followers can send messages";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds";
    }
    if (isDelayed && isFollowersOnly) {
      return "Only followers can send messages, messages are delayed by 3 seconds";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only";
    }
    if (isDelayed && !isFollowersOnly) {
      return "Slow Mode";
    }
    if (isDelayed && isFollowersOnly) {
      return "Followers Only and Slow Mode";
    }
    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) return null;

  return (
    <div className="text-muted-foreground p-2 bg-white/5 border border-white/10 w-full flex items-center gap-x-2 rounded-t-md">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
