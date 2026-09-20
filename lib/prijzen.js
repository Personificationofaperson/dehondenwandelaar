// Eén bron van waarheid voor alle prijzen op de site.
// Pas hier aan, dan volgen de calculator én de dienstenkaarten automatisch.

export const KM_TARIEF = 0.52 // euro per gereden kilometer

export const DIENSTEN = [
  {
    id: "wandeling",
    naam: "Wandeling",
    korteNaam: "Wandeling 30 min",
    prijs: 15,
    eenheid: "per wandeling",
    duur: "30 min",
    inCalculator: true,
  },
  {
    id: "weekend-1",
    naam: "Weekendwandeling — 1 dag",
    korteNaam: "Weekendwandeling 1 dag",
    prijs: 70,
    eenheid: "per dag",
    duur: "Een dag lang",
    inCalculator: true,
  },
  {
    id: "weekend-2",
    naam: "Weekendwandeling — 2 dagen",
    korteNaam: "Weekendwandeling 2 dagen",
    prijs: 140,
    eenheid: "per weekend",
    duur: "Twee dagen",
    inCalculator: true,
  },
]

// Maximaal twee honden, en alleen als hun karakters bij elkaar passen.
// Dat blijkt tijdens de kennismaking.
export const HONDEN_OPTIES = [
  { aantal: 1, naam: "1 hond", meerprijs: 0 },
  { aantal: 2, naam: "2 honden", meerprijs: 5 },
]

export const FREQUENTIES = [
  { id: "structureel", naam: "Structureel, elke week" },
  { id: "vakantie", naam: "Eenmalig of tijdens een vakantie" },
  { id: "sporadisch", naam: "Sporadisch, op losse momenten" },
]

export const DAGEN = [
  { kort: "Ma", lang: "maandag" },
  { kort: "Di", lang: "dinsdag" },
  { kort: "Wo", lang: "woensdag" },
  { kort: "Do", lang: "donderdag" },
  { kort: "Vr", lang: "vrijdag" },
  { kort: "Za", lang: "zaterdag" },
  { kort: "Zo", lang: "zondag" },
]

export const MOMENTEN = [
  { id: "ochtend", naam: "Vroege ochtend (ma, di of wo)" },
  { id: "avond", naam: "Avond (vanaf 17:30, elke dag)" },
  { id: "middag", naam: "Middag (alleen als duo met een retriever)" },
  { id: "overleg", naam: "Nog te bespreken" },
]

/**
 * Reiskost voor een enkele opdracht.
 * De klant zit op `km` rijafstand, dus heen én terug is 2 × km.
 * We rekenen eerst de volledige rit en ronden daarna pas af naar een hele euro.
 */
export function reiskost(km) {
  if (!Number.isFinite(km) || km <= 0) return 0
  return Math.ceil(km * 2 * KM_TARIEF)
}

export function euro(bedrag) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(bedrag) ? 0 : 2,
  }).format(bedrag)
}

export const WHATSAPP_NUMMER = "32468584998"
export const RINGTWICE_URL = "https://ringtwice.be/nl/listworkers/495768-kimberly-v"

export function whatsappLink(tekst) {
  return `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(tekst)}`
}
