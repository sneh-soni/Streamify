"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { UnblockButton } from "./unblock-button";
import { Hint } from "@/components/hint";

export type BlockedUser = {
  id: string;
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Hint asChild label="sort A-Z" side="right">
        <Button
          className="p-0"
          variant={"link"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </Hint>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <UserAvatar
          username={row.original.username}
          imageUrl={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Hint asChild label="Sort by date" side="right">
        <Button
          variant={"link"}
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </Hint>
    ),
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
  },
];
