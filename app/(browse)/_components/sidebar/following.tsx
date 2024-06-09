"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./useritem";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: Stream | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => {
          return (
            <UserItem
              key={user.following.id}
              username={user.following.username}
              imageUrl={user.following.imageUrl}
              isLive={user.following.stream?.isLive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
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
