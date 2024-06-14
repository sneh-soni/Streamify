"use client";

import { Skeleton } from "../ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";

export default function ChatHeader() {
  return (
    <div className="border-b p-2 relative">
      <div className="absolute left-2 top-2 hidden md:block">
        <ChatToggle />
      </div>
      <div className="font-semibold text-primary text-center">Live Chat</div>
      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
    </div>
  );
}

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative border-b p-2 hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-2 top-2" />
      <Skeleton className="h-6 w-28 mx-auto" />
    </div>
  );
};
