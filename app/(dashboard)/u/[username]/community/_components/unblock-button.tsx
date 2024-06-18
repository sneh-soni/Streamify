"use client";

import { onUnblock } from "@/actions/block";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((res) => toast.success(`Unblocked ${res.blocked.username}`))
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Hint asChild label="Unblock" side="bottom">
      <Button
        disabled={isPending}
        onClick={onClick}
        variant={"link"}
        size={"sm"}
        className="p-0 text-blue-600"
      >
        Unblock
      </Button>
    </Hint>
  );
};
