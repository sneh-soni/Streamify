"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

interface ChatMessageProps {
  data: ReceivedChatMessage;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "");
  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/10 select-none">
      <p className="text-sm text-white/40">{format(data.timestamp, "HH:MM")}</p>
      <div className="flex flex-wrap items-baseline grow gap-1">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};
