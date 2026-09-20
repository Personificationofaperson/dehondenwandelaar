// Reviews. Zet `toon` op false om er eentje tijdelijk te verbergen.
//
// Google en Ring Twice zijn openbare reviews, die mag je gewoon tonen.
// Zet je hier ooit een WhatsApp-bericht bij, vraag de klant dan eerst
// of dat mag.

export const BRONNEN = {
  google: {
    naam: "Google",
    kleur: "#4285F4",
    // TODO Kimberly: vervang dit door de link naar je eigen Google-bedrijfsprofiel,
    // dan kunnen bezoekers de review zelf natrekken. Dat is het sterkste bewijs.
    url: null,
  },
  ringtwice: {
    naam: "Ring Twice",
    kleur: "#F5A623",
    url: "https://ringtwice.be/nl/listworkers/495768-kimberly-v",
  },
  whatsapp: {
    naam: "WhatsApp",
    kleur: "#25D366",
    url: null,
  },
}

export const REVIEWS = [
  {
    id: "lara",
    bron: "google",
    naam: "Lara Hagen",
    sterren: 5,
    titel: "Great price",
    datum: "juli 2026",
    tekst:
      "Kimberly is een super lieve en fijne meid voor op je trouwe viervoeter te letten. Ze laat duidelijk zien dat ze kennis heeft van omgang met honden, en heeft dan ook mijn hondje fijn uitgelaten toen ik zelf niet kon. Ze houd rekening met de hitte en wat jou hondje wel of niet aankan. Al bij al een dikke aanrader!",
    uitgelicht: true,
    foto: "/review-lara-hond.webp",
    fotoAlt: "De pomeriaan van Lara met zijn bal in het gras",
    toon: true,
  },
  {
    id: "martine",
    bron: "google",
    naam: "Martine Ponsen",
    sterren: 5,
    titel: null,
    datum: "april 2026",
    tekst:
      "Heel tevreden van Kimberly. Neemt de tijd om kennis te maken, samen een keertje wandelen om de routines te leren kennen. Altijd stipt op haar afspraak. Stelt vragen bij twijfels. Fijn haar te leren kennen. Hoop dat ik veel op haar kan rekenen.",
    uitgelicht: false,
    foto: null,
    fotoAlt: null,
    toon: true,
  },
  {
    id: "annegret",
    bron: "ringtwice",
    naam: "Annegret B.",
    sterren: 5,
    titel: "Honden wandeling",
    datum: "15 mei 2026",
    tekst: "Super fijne samenwerking, stipt, lief, initiatief nemend, mee denkend!",
    uitgelicht: true,
    foto: "/review-annegret-hond.webp",
    fotoAlt: "De zwarte retriever van Annegret kijkt lachend omhoog tijdens de wandeling",
    toon: true,
  },
  // Het afscheidsbericht van Myrthe stond hier eerst, maar "wij gaan je heel
  // erg missen" leest op een website als: deze hondenwandelaar is gestopt.
  // Precies het verkeerde signaal voor iemand die net overweegt te boeken.
  // Zoek je nog een tweede WhatsApp-review, kies er dan een die vooruitkijkt
  // ("we komen zeker terug", "top geregeld") in plaats van terugblikt.
  // De oppasreview stond hier eerst, maar die ging over hondenoppas — een
  // dienst die niet meer wordt aangeboden. Een review over iets wat je niet
  // meer doet, roept alleen vragen op.
]

export const ZICHTBARE_REVIEWS = REVIEWS.filter((r) => r.toon)
