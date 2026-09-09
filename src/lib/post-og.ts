import type { Metadata } from "next";

import { resolvePostImageUrl, type PostMeta } from "@openblog/core";

import { site } from "@/config/site";
import { siteHelpers } from "@/lib/openblog-config";

export type PostOgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

/** Hero cover → OG/Twitter share images (Alignify pattern). */
export function resolvePostOgImages(
  post: Pick<PostMeta, "coverImage" | "title">,
): PostOgImage[] {
  const url = resolvePostImageUrl(post.coverImage, siteHelpers.absoluteUrl);
  if (!url) {
    return [];
  }

  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: post.title,
    },
  ];
}

export function buildPostTwitterMetadata(
  post: Pick<PostMeta, "title" | "description" | "coverImage">,
): NonNullable<Metadata["twitter"]> {
  const images = resolvePostOgImages(post);

  return {
    card: images.length > 0 ? "summary_large_image" : "summary",
    title: post.title,
    description: post.description,
    ...(images.length > 0
      ? {
          images: images.map(({ url, alt }) => ({ url, alt })),
        }
      : {}),
  };
}

export function buildPostOpenGraphImages(
  post: Pick<PostMeta, "coverImage" | "title">,
): PostOgImage[] {
  return resolvePostOgImages(post);
}

export function postOgSiteName(): string {
  return site.name;
}
