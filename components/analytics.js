import Script from "next/script"

// Google Analytics 4.
// Zet NEXT_PUBLIC_GA_ID in je Vercel-omgevingsvariabelen (bv. G-XXXXXXXXXX).
// Zonder die variabele wordt er niets geladen, handig voor lokaal werken.

export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID
  if (!id) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
