"use client";

interface CopyButtonProps {
  value?: string;
}

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import React, { useState } from "react";
import { Hint } from "@/components/hint";

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Hint label={"Copy"} side={"bottom"} align={"start"} asChild>
      <Button
        onClick={onCopy}
        disabled={!value || isCopied}
        variant={"ghost"}
        className="rounded-l-none"
      >
        <Icon className="h-5 w-5" />
      </Button>
    </Hint>
  );
};
