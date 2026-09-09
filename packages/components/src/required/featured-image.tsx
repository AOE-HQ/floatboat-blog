"use client";

import Image from "next/image";

import { resolveDisplayImageUrl } from "@openblog/core";

import { obBorder, obCodeBg } from "../tokens";
import { cn } from "../utils";

export function FeaturedImage({
  src,
  alt,
  className,
  layout = "stacked",
}: {
  src: string;
  alt: string;
  className?: string;
  /** stacked = below hero (default margin); hero = beside hero text in article header */
  layout?: "stacked" | "hero";
}) {
  const resolved = resolveDisplayImageUrl(src) ?? src;
  const isExternal = resolved.startsWith("http");

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl border",
        obBorder,
        obCodeBg,
        layout === "stacked" ? "mt-8" : "mt-0",
        className,
      )}
    >
      {isExternal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          className="aspect-[4/3] w-full object-cover lg:aspect-[16/10]"
          loading="eager"
        />
      ) : (
        <Image
          src={resolved}
          alt={alt}
          width={1200}
          height={750}
          className="aspect-[4/3] w-full object-cover lg:aspect-[16/10]"
          priority
        />
      )}
    </figure>
  );
}
