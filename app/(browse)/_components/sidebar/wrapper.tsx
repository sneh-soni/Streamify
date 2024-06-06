"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect, useState } from "react";
import { RecommendedSkeleton } from "./recommended";
import { ToggleSketeton } from "./toggle";
import { FollowingSkeleton } from "./following";
import { useIsClient } from "usehooks-ts";

interface wrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: wrapperProps) => {
  /*  Hydration error fix ==> Hydration (process of matching SSR DOM and CSR DOM)
      // UseEffect() only runs on client side.

      const [isClient, setIsClient] = useState(false);

      useEffect(() => {
        setIsClient(true);
      }, []);

      if(!isClient) {
        expected SSR
      }
  */

  const isClient = useIsClient();

  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-16 md:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSketeton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

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
