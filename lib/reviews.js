// Reviews. Zet `toon` op false om er eentje tijdelijk te verbergen.
//
// LET OP — het WhatsApp-bericht komt uit een privégesprek. Vraag de klant
// even of je haar woorden op de site mag zetten voor je publiceert.
// Bij Google en Ring Twice is publiceren de bedoeling, daar hoef je niets
// te vragen.

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
    foto: "/3-honden-wandeling.jpg",
    fotoAlt: "Kimberly op wandeling met drie kleine honden",
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
    uitgelicht: false,
    foto: null,
    fotoAlt: null,
    toon: true,
  },
  // Het afscheidsbericht van Myrthe stond hier eerst, maar "wij gaan je heel
  // erg missen" leest op een website als: deze hondenwandelaar is gestopt.
  // Precies het verkeerde signaal voor iemand die net overweegt te boeken.
  // Zoek je nog een tweede WhatsApp-review, kies er dan een die vooruitkijkt
  // ("we komen zeker terug", "top geregeld") in plaats van terugblikt.
  {
    id: "oppasklant",
    bron: "whatsapp",
    naam: "Oppasklant",
    sterren: null,
    titel: null,
    datum: null,
    tekst:
      "Heel veel dank voor de goede oppas. Wij zullen zeker in de toekomst nog van jouw diensten gebruik maken.",
    uitgelicht: true,
    foto: null,
    fotoAlt: null,
    toon: true, // zet op false tot je toestemming hebt
  },
]

export const ZICHTBARE_REVIEWS = REVIEWS.filter((r) => r.toon)
