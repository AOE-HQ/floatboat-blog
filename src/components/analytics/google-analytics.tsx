"use client";

import Script from "next/script";

// Same GA4 web stream as the Floatboat homepage. Shared by all locale routes.
const measurementId = "G-1MSQ86E7CY";

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="floatboat-ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
      <Script
        id="floatboat-ga-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
