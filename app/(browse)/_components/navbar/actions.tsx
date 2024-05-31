import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ClapperboardIcon } from "lucide-react";
import Link from "next/link";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-2 md:ml-0">
      {!user && (
        <SignInButton>
          <Button variant={"primary"} size={"sm"}>
            Login
          </Button>
        </SignInButton>
      )}

      {user && (
        <div className="flex items-center gap-x-2">
          <Button
            size={"sm"}
            variant={"ghost"}
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <ClapperboardIcon className="w-5 h-5 md:mr-2" />
              <span className="hidden md:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
