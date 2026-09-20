// Meten gebeurt via Google Tag Manager. Elk event wordt in de dataLayer
// geduwd, waar je het in GTM oppikt met een trigger van het type
// "Aangepaste gebeurtenis" en doorstuurt naar GA4.
//
// Veilig aan te roepen: bestaat de dataLayer nog niet (adblocker, GTM nog aan
// het laden, server-side render) dan gebeurt er gewoon niets.

export function track(naam, parameters = {}) {
  if (typeof window === "undefined") return
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: naam, ...parameters })
  } catch {
    // meten mag nooit de site breken
  }
}

// De events die op deze site gemeten worden:
//
//   calculator_start      iemand past voor het eerst iets aan in de calculator
//   prijs_berekend        het adres is gevalideerd en er staat een echte prijs
//   details_geopend       de extra vragen worden open- of dichtgeklapt
//   contact_klik          er wordt doorgeklikt naar WhatsApp of Ring Twice
//
// In GA4 markeer je `contact_klik` als sleutelgebeurtenis. De verhouding
// prijs_berekend naar contact_klik is je belangrijkste CRO-cijfer: die vertelt
// je of je prijzen mensen afschrikken of net overtuigen.
export const EVENTS = {
  CALCULATOR_START: "calculator_start",
  PRIJS_BEREKEND: "prijs_berekend",
  DETAILS_GEOPEND: "details_geopend",
  CONTACT_KLIK: "contact_klik",
}
