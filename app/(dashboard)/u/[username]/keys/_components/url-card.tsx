import { Input } from "@/components/ui/input";
import React from "react";
import { CopyButton } from "./copy-button";

interface UrlCardProps {
  value: string | null;
}

export const Urlcard = ({ value }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-muted py-6 px-4">
      <div className="flex items-center gap-x-6">
        <p className="font-semibold shrink-0 ">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center">
            <Input
              value={value || ""}
              disabled
              placeholder="Server URL"
              className="rounded-r-none"
            />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};
