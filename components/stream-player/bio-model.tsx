"use client";

import { ElementRef, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModelProps {
  initialBio: string | null;
}

export const BioModel = ({ initialBio }: BioModelProps) => {
  const [value, setValue] = useState(initialBio || "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  useEffect(() => {
    if (!isDialogOpen && initialBio) {
      setValue(initialBio);
    }

    return () => setIsDialogOpen(false);
  }, [isDialogOpen]);

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="link"
          size={"sm"}
          className="ml-auto hover:bg-white/10"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Textarea
            placeholder="Bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
            className="resize-none focus-visible:ring-0 hidden-scrollbar"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
