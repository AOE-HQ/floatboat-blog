"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { resolveDisplayImageUrl } from "@openblog/core";

import { obBorder } from "../tokens";
import { cn } from "../utils";

export function FeaturedImage({
  src,
  alt,
  className,
  layout = "stacked",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  /** stacked = below hero (default margin); hero = beside hero text in article header */
  layout?: "stacked" | "hero";
  /** First-screen covers only. Cards stay lazy. */
  priority?: boolean;
}) {
  const resolved = resolveDisplayImageUrl(src) ?? src;
  const isExternal = resolved.startsWith("http");
  const holdTimer = useRef<number>(0);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = loadedSrc === resolved;
  const markLoaded = useCallback(() => {
    window.clearTimeout(holdTimer.current);
    // next dev only. Production builds inline NODE_ENV=production so this
    // delay is stripped. Lets you watch shimmer for a few seconds locally.
    if (process.env.NODE_ENV === "development") {
      holdTimer.current = window.setTimeout(() => setLoadedSrc(resolved), 4000);
      return;
    }
    setLoadedSrc(resolved);
  }, [resolved]);

  useEffect(() => {
    return () => window.clearTimeout(holdTimer.current);
  }, [resolved]);

  const imgClassName =
    layout === "hero"
      ? "block h-auto w-full"
      : "aspect-[4/3] w-full object-cover lg:aspect-[16/10]";

  const fadeClassName = cn(
    "bg-[var(--ob-color-image-slot)] transition-opacity duration-300 ease-out",
    loaded ? "opacity-100" : "opacity-0",
    imgClassName,
  );

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-[var(--ob-color-image-slot)]",
        obBorder,
        layout === "stacked" ? "mt-8" : "mt-0",
        !loaded && "ob-image-shimmer aspect-[16/10] min-h-[10rem]",
        className,
      )}
    >
      {!loaded ? (
        <span className="ob-image-shimmer-bar" aria-hidden="true" />
      ) : null}
      {isExternal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          className={fadeClassName}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={markLoaded}
        />
      ) : (
        <Image
          src={resolved}
          alt={alt}
          width={1200}
          height={750}
          className={fadeClassName}
          priority={priority}
          decoding="async"
          onLoad={markLoaded}
        />
      )}
    </figure>
  );
}
