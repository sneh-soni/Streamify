import Image from "next/image";
import { UserAvatar } from "./user-avatar";
import { Skeleton } from "./ui/skeleton";

interface ThumbnailProps {
  src: string | null;
  fallback: string;
  username: string;
  isLive: boolean;
}

export const Thumbnail = ({
  fallback,
  isLive,
  src,
  username,
}: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="flex flex-col rounded-md bg-background items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2">
        <UserAvatar
          size={"large"}
          showBadge
          username={username}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover rounded-md transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
      />
    );
  }
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center" />
      {content}
    </div>
  );
};

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-md cursor-pointer">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
