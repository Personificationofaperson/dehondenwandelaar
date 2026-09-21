// Korte regels in plaats van alinea's. Wie dit blok bekijkt wil weten of
// zijn moment erbij zit, niet de redenering erachter lezen.
const MOMENTEN = [
  {
    titel: "Avond",
    dagen: "Elke dag",
    tekst: "Vanaf 17:30. Dit is het ruimste moment in mijn agenda.",
  },
  {
    titel: "Vroege ochtend",
    dagen: "Ma, di en wo",
    tekst: "Voor jij zelf de deur uitgaat.",
  },
  {
    titel: "Middag",
    dagen: "Alleen in duo",
    tekst:
      "Solo-plekken zijn volzet. Kan enkel als je hond meeloopt met een retriever die ik al uitlaat.",
  },
]

export const STRAAL_KM = 7

// De twee zones stonden eerst als aparte kaarten, allebei met dezelfde
// straal en bijna dezelfde tekst. Dat was pure herhaling. Nu één blok met
// de plaatsen waar ik echt kom, wat meteen scanbaarder is.
const PLAATSEN = [
  "Dilsen",
  "Stokkem",
  "Lanklaar",
  "Rotem",
  "Elen",
  "Meeswijk",
]

export default function Praktisch() {
  return (
    <section id="werkgebied" className="full-bleed bg-white">
      <div className="shell section">
        <div className="max-w-2xl">
          <span className="eyebrow">Praktisch</span>
          <h2 className="mt-3">Beschikbaarheid en werkgebied rond Dilsen-Stokkem</h2>
          <p className="lead mt-4">
            Vaste momenten, één duidelijke zone. Past er niets, stuur dan gewoon een
            berichtje.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="mb-5 flex items-center gap-2.5">
              <Icoon>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </Icoon>
              Beschikbaarheid
            </h3>

            <ul className="space-y-3">
              {MOMENTEN.map((moment) => (
                <li key={moment.titel} className="card reveal p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-display text-lg text-ink">{moment.titel}</p>
                    <span className="rounded-pill bg-moss-soft px-3 py-1 text-xs font-bold text-ink">
                      {moment.dagen}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{moment.tekst}</p>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-muted">
              Past geen van deze momenten? Stuur een berichtje, soms schuift er wel
              iets in overleg.
            </p>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2.5">
              <Icoon>
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </Icoon>
              Werkgebied
            </h3>

            <div className="card reveal p-6">
              <p className="font-display text-2xl leading-none text-ink">
                {STRAAL_KM} km rond Dilsen-Stokkem
              </p>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                Voor wandelingen én dagpakketten. Door lokaal te blijven gaat de tijd
                naar je hond in plaats van naar de weg.
              </p>

              <p className="mt-6 text-xs font-bold uppercase tracking-wider text-muted">
                Waar ik kom
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {PLAATSEN.map((plaats) => (
                  <li key={plaats} className="chip">
                    {plaats}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-sm text-muted">
              Woon je net buiten de zone? Vraag het gerust, dan kijken we samen wat
              haalbaar is.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Icoon({ children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-moss-soft">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#355B47"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  )
}
