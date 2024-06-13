"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import React from "react";

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

  return <div>StreamPlayer</div>;
}
