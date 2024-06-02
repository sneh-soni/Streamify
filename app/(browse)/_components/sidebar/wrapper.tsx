"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSketeton } from "./toggle";

interface wrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: wrapperProps) => {
  const { collapsed } = useSidebar((state) => state);
  // Hydration error fix ==> Hydration (process of matching SSR DOM and CSR DOM)
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return (
  //     <aside className="fixed left-0 flex flex-col h-full w-60 bg-background border-r border-[#2D2E35] z-50">
  // <ToggleSkeleton />
  //       <RecommendedSkeleton />
  //     </aside>
  //   );
  // }

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
