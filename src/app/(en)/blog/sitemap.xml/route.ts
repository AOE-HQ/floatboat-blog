import { buildCombinedSitemapXml } from "@/lib/sitemap";

export async function GET() {
  const xml = buildCombinedSitemapXml();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
