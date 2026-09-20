import "./globals.css"
import { Lilita_One, Nunito } from "next/font/google"
import Nav from "../components/nav"
import Footer from "../components/footer"
import Whatsapp from "../components/whatsapp"
import Analytics from "../components/analytics"

// next/font host de fonts mee vanaf je eigen domein en zet ze in de
// <head> met preload. Dat scheelt twee render-blokkerende requests naar
// Google Fonts en is meteen ook AVG-vriendelijker.
const display = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const body = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata = {
  metadataBase: new URL("https://dehondenwandelaar.be"),
  title: {
    default: "Hondenuitlaatservice Dilsen-Stokkem | De Hondenwandelaar",
    template: "%s | De Hondenwandelaar",
  },
  description:
    "Persoonlijke hondenuitlaatservice in Dilsen-Stokkem en omgeving. Kleine groepen, verplichte kennismaking en 20+ jaar ervaring. Bereken meteen je richtprijs.",
  keywords: [
    "hondenuitlaatservice",
    "hond uitlaten Dilsen-Stokkem",
    "hondenoppas Limburg",
    "hondenuitlaatservice Maasmechelen",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_BE",
    url: "https://dehondenwandelaar.be",
    siteName: "De Hondenwandelaar",
    title: "Hondenuitlaatservice Dilsen-Stokkem | De Hondenwandelaar",
    description:
      "Persoonlijke hondenuitlaatservice in Dilsen-Stokkem. Geen massale groepen, wel rust en aandacht. Bereken meteen je richtprijs.",
  },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: "#F4F2EC",
}

// Gestructureerde data zodat Google weet dat dit een lokaal bedrijf is.
// Bewust géén AggregateRating: reviews die elders verzameld zijn (Google,
// Ring Twice) mag je volgens Googles eigen richtlijnen niet als markup op
// je eigen site zetten. De reviews blijven gewoon zichtbaar voor bezoekers.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "De Hondenwandelaar",
  description:
    "Persoonlijke hondenuitlaatservice en hondenoppas in Dilsen-Stokkem en omgeving.",
  url: "https://dehondenwandelaar.be",
  telephone: "+32468584998",
  image: "https://dehondenwandelaar.be/dehondenwandelaar-logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dilsen-Stokkem",
    addressRegion: "Limburg",
    addressCountry: "BE",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 51.0347,
      longitude: 5.7381,
    },
    geoRadius: 8000,
  },
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday"],
      opens: "12:00",
      closes: "13:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday"],
      opens: "17:30",
      closes: "20:00",
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#hoofdinhoud"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-white focus:px-5 focus:py-3 focus:font-bold focus:shadow-lift"
        >
          Naar de inhoud
        </a>
        <Nav />
        <main id="hoofdinhoud">{children}</main>
        <Footer />
        <Whatsapp />
        <Analytics />
      </body>
    </html>
  )
}
