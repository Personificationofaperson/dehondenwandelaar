// Google Tag Manager.
// De container-ID mag gewoon in de code staan, die is sowieso zichtbaar in de
// broncode van elke pagina. Wil je later wisselen, zet dan NEXT_PUBLIC_GTM_ID
// in Vercel, dan heeft die voorrang.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MBQXPVVJ"

const SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`

/**
 * Hoort zo hoog mogelijk in de <head> te staan, in de HTML die de server
 * verstuurt. Dit stond eerder via next/script onderaan de <body>, en daar
 * struikelt Search Console over bij het verifiëren via Tag Manager
 * ("snippet is in the wrong location on the page"). Daarom een gewone
 * script-tag die letterlijk in de broncode staat, en geen next/script.
 */
export function GtmHeadScript() {
  if (!GTM_ID) return null
  return <script id="gtm-init" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
}

// Hoort meteen na de opening van <body>, voor bezoekers zonder JavaScript.
export function GtmNoScript() {
  if (!GTM_ID) return null
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
