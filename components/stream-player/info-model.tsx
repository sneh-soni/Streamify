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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { Hint } from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModelProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModel = ({
  initialName,
  initialThumbnailUrl,
}: InfoModelProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThubnailUrl] = useState(initialThumbnailUrl);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ values: { name: name } })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ values: { thumbnailUrl: null } })
        .then(() => {
          setThubnailUrl("");
          toast.success("Thumbnail removed successfully");
          closeRef?.current?.click();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const resetState = () => {
    setName(initialName);
    setThubnailUrl(initialThumbnailUrl);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      resetState();
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
        <Button variant="link" size={"sm"} className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              placeholder="Stream name"
              disabled={isPending}
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-10">
                  <Hint label="Remove thumbnail" asChild side="left">
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  alt="Thumbnail"
                  src={thumbnailUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  className="hover:cursor-pointer"
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#ffffff",
                    },
                    allowedContent: {
                      color: "#ffffff",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThubnailUrl(res?.[0].url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            )}
          </div>
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
