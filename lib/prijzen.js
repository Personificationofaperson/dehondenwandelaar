// Eén bron van waarheid voor alle prijzen op de site.
// Pas hier aan, dan volgen de calculator én de dienstenkaarten automatisch.

export const KM_TARIEF = 0.52 // euro per gereden kilometer

export const DIENSTEN = [
  {
    id: "wandeling",
    naam: "Wandeling",
    korteNaam: "Wandeling 30 min",
    prijs: 18,
    eenheid: "per wandeling",
    duur: "30 min",
    // Aantal keer dat ik heen en terug rijd. Bij een losse wandeling is dat
    // één rit, bij een dagpakket rijd ik per bezoek opnieuw.
    ritten: 1,
    inCalculator: true,
  },
  {
    id: "dagpakket-1",
    naam: "Dagpakket",
    korteNaam: "Dagpakket 1 dag",
    prijs: 70,
    eenheid: "per dag",
    duur: "2 × 45 min",
    ritten: 2,
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

// De naam is wat de bezoeker kiest, de toelichting zegt wanneer ik kan.
// Die twee stonden eerst samen in één regel, en dan leest "Avond, elke dag"
// als "ik heb elke dag een wandeling nodig" in plaats van als mijn
// beschikbaarheid. Daarom staat het nu los onder het keuzeveld.
export const MOMENTEN = [
  {
    id: "ochtend",
    naam: "Vroege ochtend",
    toelichting: "Ik kan op maandag, dinsdag en woensdag.",
  },
  {
    id: "avond",
    naam: "Avond, vanaf 17:30",
    toelichting: "Ik kan alle dagen van de week, ook in het weekend.",
  },
  {
    id: "middag",
    naam: "Middag",
    toelichting: "Enkel als jouw hond kan meelopen met een retriever.",
  },
  { id: "overleg", naam: "Nog te bespreken", toelichting: "" },
]

// Staat onder het keuzeveld zolang er nog niets gekozen is, zodat iemand in
// één oogopslag ziet wat er mogelijk is.
export const MOMENTEN_SAMENVATTING =
  "Ochtend kan op ma, di of wo. Avond kan alle dagen. Middag enkel als duo."

/**
 * Reiskost voor één heen-en-terugrit naar een klant op `km` rijafstand.
 * We rekenen eerst de volledige rit en ronden daarna pas af naar een hele euro.
 */
export function ritkost(km) {
  if (!Number.isFinite(km) || km <= 0) return 0
  return Math.ceil(km * 2 * KM_TARIEF)
}

/**
 * Totale reiskost voor een opdracht. Een dagpakket telt meerdere bezoeken en
 * dus meerdere ritten. Die werden vroeger maar één keer aangerekend, waardoor
 * er per dag zo'n tien euro netto verloren ging.
 */
export function reiskost(km, ritten = 1) {
  return ritkost(km) * ritten
}

export function euro(bedrag) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(bedrag) ? 0 : 2,
  }).format(bedrag)
}

// Zichtbaar op de pagina en in het schema. Google wil naam, adres en
// telefoonnummer letterlijk op de site zien staan voor lokale resultaten.
export const TELEFOON_WEERGAVE = "0468 58 49 98"
export const TELEFOON_LINK = "+32468584998"
export const WHATSAPP_NUMMER = "32468584998"
export const RINGTWICE_URL = "https://ringtwice.be/nl/listworkers/495768-kimberly-v"

export function whatsappLink(tekst) {
  return `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(tekst)}`
}
