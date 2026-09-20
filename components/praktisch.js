const MOMENTEN = [
  {
    dagen: "Maandag, dinsdag & woensdag",
    items: [
      { titel: "Middagwandelingen", tekst: "Tussen 12:00 en 13:30" },
      { titel: "Drop-ins", tekst: "Korte bezoekjes of een plaspauze" },
    ],
  },
  {
    dagen: "Donderdag & vrijdag",
    items: [
      { titel: "Avond- of namiddagwandelingen", tekst: "Vanaf 17:30 de deur uit" },
      { titel: "Vroege ochtend", tekst: "Lukt het 's ochtends niet? Ik spring graag bij" },
    ],
  },
]

const ZONES = [
  {
    titel: "Wandelingen & drop-ins",
    straal: "Max 8 km",
    tekst:
      "Gefocust op Dilsen-Stokkem en de directe omstreken. Door lokaal te blijven gaat de tijd naar de wandeling in plaats van naar de auto.",
  },
  {
    titel: "Weekendwandeling",
    straal: "Tot 10 km",
    tekst:
      "Die dag is volledig voor jouw hond gereserveerd, dus houd ik de afstand beperkt tot 10 km van het centrum van Dilsen.",
  },
  {
    titel: "Hondenoppas",
    straal: "Tot 30 km",
    tekst:
      "Voor oppas kom ik verder. Woon je net buiten de zone? Stuur gerust een berichtje, dan kijken we samen wat kan.",
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
            voor de wandeling zelf — en past een ander moment beter, stuur dan
            gewoon een berichtje.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h3 className="mb-5 flex items-center gap-2.5">
              <Icoon>
                <rect x="3" y="4" width="18" height="18" rx="3" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </Icoon>
              Beschikbaarheid
            </h3>
            <ul className="space-y-4">
              {MOMENTEN.map((blok) => (
                <li key={blok.dagen} className="card reveal p-6">
                  <p className="font-display text-lg text-brand-900">{blok.dagen}</p>
                  <ul className="mt-4 space-y-3">
                    {blok.items.map((item) => (
                      <li key={item.titel} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                        <span className="text-[15px] leading-snug">
                          <strong className="text-brand-900">{item.titel}</strong>
                          <span className="block text-muted">{item.tekst}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Een andere dag of een ander uur nodig? Dat kan bijna altijd in overleg.
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
                    <span className="font-display text-base leading-none text-brand-900">
                      {zone.straal.replace(/[^0-9]/g, "")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted">km</span>
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
          </div>
        </div>
      </div>
    </section>
  )
}

function Icoon({ children }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A5A70" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </span>
  )
}
