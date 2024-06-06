"use client";

import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Hint } from "@/components/hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden md:flex w-full items-center justify-center p-2">
          <Hint label={label} side={"right"} asChild>
            <Button onClick={onExpand} className="h-auto p-1" variant={"ghost"}>
              <ArrowRightFromLine className="h-5 w-5" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="hidden md:flex items-center w-full justify-between p-2 pl-4">
          <p className="text-primary font-semibold">Dashboard</p>
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
