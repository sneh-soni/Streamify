"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface containerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: containerProps) => {
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  const matches = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1", collapsed ? "ml-16" : "ml-16 md:ml-60")}>
      {children}
    </div>
  );
};
