"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [allowSrc, setAllowSrc] = useState(true);
  const markLoaded = useCallback(() => setLoaded(true), []);

  useLayoutEffect(() => {
    if (!window.location.search.includes("slowimg")) return;
    setAllowSrc(false);
    setLoaded(false);
    const timer = window.setTimeout(() => setAllowSrc(true), 4000);
    return () => window.clearTimeout(timer);
  }, [resolved]);

  useEffect(() => {
    if (allowSrc && imgRef.current?.complete) setLoaded(true);
  }, [resolved, allowSrc]);

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
      {allowSrc && isExternal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={resolved}
          alt={alt}
          className={fadeClassName}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={markLoaded}
        />
      ) : null}
      {allowSrc && !isExternal ? (
        <Image
          ref={imgRef}
          src={resolved}
          alt={alt}
          width={1200}
          height={750}
          className={fadeClassName}
          priority={priority}
          decoding="async"
          onLoad={markLoaded}
        />
      ) : null}
    </figure>
  );
}
