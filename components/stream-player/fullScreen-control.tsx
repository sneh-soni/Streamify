"use client";

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullScreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export default function FullscreenControl({
  isFullScreen,
  onToggle,
}: FullScreenControlProps) {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit Fullscreen" : "Fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
    </div>
  );
}
