import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      large: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface userAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  imageUrl: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  username,
  imageUrl,
  isLive,
  showBadge,
  size,
}: userAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          "",
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface userAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: userAvatarSkeletonProps) => {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
