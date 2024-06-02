"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="flex w-full items-center justify-center p-1">
          <Hint label={label} side={"right"} asChild>
            <Button onClick={onExpand} className="h-auto p-1" variant={"ghost"}>
              <ArrowRightFromLine className="h-5 w-5" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="flex items-center w-full justify-between p-1 pl-4">
          <p className="text-primary font-semibold text-sm">For You</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-1 ml-auto"
              variant={"ghost"}
            >
              <ArrowLeftFromLine className="h-5 w-5" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSketeton = () => {
  return (
    <div className="w-full p-1">
      <Skeleton className="h-8 w-full" />
    </div>
  );
};
