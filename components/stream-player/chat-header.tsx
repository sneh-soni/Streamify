"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { Skeleton } from "../ui/skeleton";
import { ChatToggle } from "./chat-toggle";
import { VariantToggle } from "./variant-toggle";

export default function ChatHeader() {
  const { variant } = useChatSidebar((state) => state);
  return (
    <div className="border-b p-2 relative">
      <div className="absolute left-2 top-2 hidden md:block">
        <ChatToggle />
      </div>
      <div className="font-semibold text-primary text-center text-lg">
        {variant === ChatVariant.CHAT ? "Live Chat" : "Live Community"}
      </div>
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
      <Skeleton className="absolute h-6 w-6 right-2 top-2" />
    </div>
  );
};
