"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
      <p>Something went wrong!</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
