// Dunne wrapper rond GA4. Veilig aan te roepen: als GA niet geladen is
// (adblocker, geen meet-ID ingesteld, server-side render) gebeurt er niets.

export function track(naam, parameters = {}) {
  if (typeof window === "undefined") return
  if (typeof window.gtag !== "function") return
  try {
    window.gtag("event", naam, parameters)
  } catch {
    // analytics mag nooit de site breken
  }
}

// De events die op deze site gemeten worden:
//
//   calculator_start      iemand past voor het eerst iets aan in de calculator
//   prijs_berekend        het adres is gevalideerd en er staat een echte prijs
//   details_geopend       de optionele extra vragen worden uitgeklapt
//   contact_klik          er wordt doorgeklikt naar WhatsApp of Ring Twice
//
// In GA4 markeer je `contact_klik` als sleutelgebeurtenis (conversie). De
// verhouding prijs_berekend → contact_klik is je belangrijkste CRO-cijfer:
// die vertelt je of je prijzen mensen afschrikken of net overtuigen.
export const EVENTS = {
  CALCULATOR_START: "calculator_start",
  PRIJS_BEREKEND: "prijs_berekend",
  DETAILS_GEOPEND: "details_geopend",
  CONTACT_KLIK: "contact_klik",
}
