"use client";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state);
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const label = collapsed ? "Expand" : "Collapse";

  const onToggle = () => {
    if (collapsed) onExpand();
    else onCollapse();
  };

  return (
    <Hint label={label} side={"left"} asChild>
      <Button
        onClick={onToggle}
        className="h-auto p-1 hover:bg-white/10 hover:text-primary bg-transparent"
        variant={"ghost"}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </Hint>
  );
};
