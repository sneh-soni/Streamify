"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import React from "react";
import { Video, VideoSkeleton } from "./Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";

interface StreamPlayerProps {
  user: User & {
    stream: Stream | null;
  };
  stream: Stream;
  isFollowing: boolean;
}

export default function StreamPlayer({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) {
  const { identity, token, name } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!identity || !name || !token) {
    return <StreamPlayerSkelton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden md:block z-50 fixed top-24 right-6">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 md:gap-y-0 2xl:grid-cols-6 h-full",
          collapsed && "md:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 md:col-span-2 2xl:col-span-5 md:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostIdentity={user.id} hostName={user.username} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export const StreamPlayerSkelton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-y-0 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 md:col-span-2 2xl:col-span-5 md:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
