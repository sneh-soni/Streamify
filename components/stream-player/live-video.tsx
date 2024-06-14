"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import FullscreenControl from "./fullScreen-control";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}
export default function LiveVideo({ participant }: LiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(50);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(50);
  }, []);

  const toggleFullscreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (wrapperRef.current) {
      wrapperRef.current?.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);

  return (
    <div className="h-full relative flex" ref={wrapperRef}>
      <video ref={videoRef} className="w-full" />
      <div className="absolute inset-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 h-14 w-full flex items-center justify-between bg-black/50 px-4">
          <VolumeControl
            value={volume}
            onChange={onVolumeChange}
            onToggle={toggleMute}
          />
          <FullscreenControl
            onToggle={toggleFullscreen}
            isFullScreen={isFullScreen}
          />
        </div>
      </div>
    </div>
  );
}
