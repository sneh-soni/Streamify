"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import qs from "query-string";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-md flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="search"
        className={`rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 ${
          value ? "pr-6" : ""
        }`}
      />
      {value && (
        <X
          className="absolute right-12 h-4 w-4 cursor-pointer text-muted-foreground hover:opacity-75 transition"
          onClick={() => setValue("")}
        />
      )}
      <Button
        type="submit"
        variant={"secondary"}
        size={"sm"}
        className="rounded-l-none h-10"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
