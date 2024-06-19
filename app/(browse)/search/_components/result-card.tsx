import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import { User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps {
  data: {
    user: User;
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="flex w-full gap-x-4">
        <div className="relative w-64 h-36">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold cursor-pointer line-clamp-2">
            {data.name}
          </p>
          <div className="flex items-center gap-x-2">
            <UserAvatar
              imageUrl={data.user.imageUrl}
              isLive={data.isLive}
              key={data.id}
              size={"small"}
              username={data.user.username}
            />
            <p className="text-sm">{data.user.username}</p>
            <VerifiedMark />
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(data.updatedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative w-64 h-36">
        <ThumbnailSkeleton />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-48" />
        <div className="flex items-center gap-x-1">
          <UserAvatarSkeleton size={"small"} />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};
