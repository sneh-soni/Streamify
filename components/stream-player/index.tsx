"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import React from "react";
import { Video } from "./Video";

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

  if (!identity || !name || !token) {
    return <div>Not Authorized, Cannot watch stream</div>;
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
        className="grid grid-cols-1 md:grid-cols-3 md:gap-y-0 2xl:grid-cols-6 h-full"
      >
        <div className="space-y-4 col-span-1 md:col-span-2 2xl:col-span-5 md:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostIdentity={user.id} hostName={user.username} />
        </div>
      </LiveKitRoom>
    </>
  );
}
