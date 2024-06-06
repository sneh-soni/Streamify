"use client";

import { useSidebar } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./useritem";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedProps {
  data: User[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showlabel = !collapsed && data.length > 0;

  return (
    <div>
      {showlabel && (
        <div className="mb-4 pl-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => {
          return (
            <UserItem
              key={user.id}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={false}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <>
      <div className="hidden md:block w-full py-3 px-4">
        <Skeleton className="h-4 w-1/2" />
      </div>
      <ul className="px-2">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    </>
  );
};
