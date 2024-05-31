"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden md:flex w-full items-center justify-center p-1 mb-2">
          <Hint label={label} side={"right"} asChild>
            <Button onClick={onExpand} className="h-auto p-1" variant={"ghost"}>
              <ArrowRightFromLine className="h-5 w-5" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="flex items-center w-full justify-between mb-2 p-1 pl-6">
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
