import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 shrink-0 mr-8 md:hidden lg:block lg:mr-0 ">
          <Image src="/logo.svg" alt="streamify" height="40" width="40" />
        </div>
        <div className={cn("mr-4 hidden md:block", font.className)}>
          <p className="text-lg font-semibold">Streamify</p>
          <p className="text-xs text-muted-foreground">Let's Play</p>
        </div>
      </div>
    </Link>
  );
};
