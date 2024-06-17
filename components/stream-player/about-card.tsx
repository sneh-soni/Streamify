"use client";

import { Separator } from "../ui/separator";
import { VerifiedMark } from "../verified-mark";
import { BioModel } from "./bio-model";

interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard = ({
  hostIdentity,
  bio,
  followedByCount,
  hostName,
  viewerIdentity,
}: AboutCardProps) => {
  const hostAsViewer = `host#${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-4 lg:p-6 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 text-lg lg:text-xl">
            About <span className="font-semibold">{hostName}</span>{" "}
            <VerifiedMark />
          </div>
          {isHost && <BioModel initialBio={bio} />}
        </div>
        <Separator />
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">{bio || "This user prefers being a mystery."}</p>
      </div>
    </div>
  );
};
