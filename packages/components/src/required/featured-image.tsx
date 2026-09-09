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

  // hero: show the whole image at natural ratio (never crop); it may render
  // smaller than the old fixed-aspect crop, but nothing is cut off.
  // stacked (cards): keep fixed aspect + cover so grid cards stay uniform.
  const imgClassName =
    layout === "hero"
      ? "block h-auto w-full"
      : "aspect-[4/3] w-full object-cover lg:aspect-[16/10]";

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
          className={imgClassName}
          loading="eager"
        />
      ) : (
        <Image
          src={resolved}
          alt={alt}
          width={1200}
          height={750}
          className={imgClassName}
          priority
        />
      )}
    </figure>
  );
}
