"use client";

import { obText } from "../tokens";

export function PostTitle({ children }: { children: string }) {
  return (
    <h1
      className={`mt-4 font-serif text-4xl font-normal leading-[1.15] tracking-tight ${obText} sm:text-5xl`}
    >
      {children}
    </h1>
  );
}
