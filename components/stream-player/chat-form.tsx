"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
  isFollowing: boolean;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isChatDelayed,
  isChatFollowersOnly,
  isFollowing,
  isHidden,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = !isFollowing && isChatFollowersOnly;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else onSubmit();
  };

  if (isHidden) return null;

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-2"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo
          isFollowersOnly={isChatFollowersOnly}
          isDelayed={isChatDelayed}
        />
        <Input
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message..."
          className={cn(
            "border-white/10 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
            isChatFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant={"primary"}
          disabled={isDisabled}
          size={"sm"}
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 p-2">
      <Skeleton className="w-full h-12" />
      <div className="flex items-center ml-auto">
        <Skeleton className="h-8 w-14" />
      </div>
    </div>
  );
};
