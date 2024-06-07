"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}
export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-xl bg-muted py-6 px-4">
      <div className="flex items-center gap-x-6">
        <p className="font-semibold shrink-0 ">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center">
            <Input
              value={value || ""}
              type={show ? "text" : "password"}
              disabled
              placeholder="Stream Key"
              className="rounded-r-none"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button size={"sm"} variant={"link"} onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
