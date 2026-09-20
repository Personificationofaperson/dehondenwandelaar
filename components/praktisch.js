const MOMENTEN = [
  {
    titel: "Avond",
    dagen: "Elke dag",
    tekst: "Vanaf 17:30 de deur uit. Dit is het ruimste moment in mijn agenda.",
  },
  {
    titel: "Vroege ochtend",
    dagen: "Maandag, dinsdag & woensdag",
    tekst:
      "Lukt het 's ochtends zelf niet? Dan spring ik graag bij, voor jij de deur uitgaat.",
  },
  {
    titel: "Middag",
    dagen: "Alleen in duo",
    tekst:
      "Mijn solo-plekken in de middag zijn volzet. Een middagwandeling kan enkel nog als jouw hond kan meelopen met een retriever die ik al vast uitlaat, en alleen als de karakters bij elkaar passen.",
  },
]

const ZONES = [
  {
    titel: "Wandelingen",
    straal: "6",
    tekst:
      "Gefocust op Dilsen-Stokkem en de directe omstreken. Door lokaal te blijven gaat de tijd naar de wandeling in plaats van naar de auto.",
  },
  {
    titel: "Dagpakket",
    straal: "6",
    tekst:
      "Bij een dagpakket rijd ik twee keer heen en terug op dezelfde dag. Daarom blijft ook hier 6 km de grens, zodat de tijd naar je hond gaat in plaats van naar de weg.",
  },
]

export default function Praktisch() {
  return (
    <section id="werkgebied" className="full-bleed bg-white">
      <div className="shell section">
        <div className="max-w-2xl">
          <span className="eyebrow">Praktisch</span>
          <h2 className="mt-3">Wanneer ik er ben, en waar ik kom</h2>
          <p className="lead mt-4">
            Ik werk met vaste momenten en duidelijke zones. Zo blijft er tijd over
            voor de wandeling zelf. Past een ander moment beter, stuur dan gewoon
            een berichtje.
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
                    <p className="font-display text-lg text-brand-900">{moment.titel}</p>
                    <span className="rounded-pill bg-brand-100 px-3 py-1 text-xs font-bold text-brand-900">
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

            <ul className="space-y-3">
              {ZONES.map((zone) => (
                <li key={zone.titel} className="card reveal flex gap-5 p-6">
                  <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-brand-100 text-center">
                    <span className="font-display text-xl leading-none text-brand-900">
                      {zone.straal}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                      km
                    </span>
                  </span>
                  <span>
                    <strong className="block text-brand-900">{zone.titel}</strong>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted">
                      {zone.tekst}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

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
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3A5A70"
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
