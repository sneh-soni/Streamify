import React from "react";
import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full pt-20">{children}</div>
    </>
  );
};

export default BrowseLayout;
