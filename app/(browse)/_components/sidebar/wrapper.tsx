"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface wrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: wrapperProps) => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full w-60 bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-16"
      )}
    >
      {children}
    </aside>
  );
};
