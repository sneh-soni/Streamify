"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state);
  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? "Community" : "Go back to chat";

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
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
