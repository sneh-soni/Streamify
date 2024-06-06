"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface wrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: wrapperProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full w-16 md:w-60 bg-background border-r border-[#2D2E35] z-50",
        collapsed && "md:w-16"
      )}
    >
      {children}
    </aside>
  );
};
