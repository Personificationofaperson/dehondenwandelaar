const PUNTEN = [
  {
    titel: "De scan",
    tekst:
      "Met een waakzame blik anticipeer ik continu op de omgeving. Andere honden, fietsers, een luide bestelwagen: ik zie ze lang voordat jouw hond ze opmerkt.",
    icoon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    titel: "Lichaamstaal lezen",
    tekst:
      "Ik kijk écht naar de hond. We wandelen tot jouw viervoeter voldaan en rustig is. De behoeften van je hond bepalen het tempo, niet de klok.",
    icoon: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    titel: "Solo of een vast duo",
    tekst:
      "Nooit meer dan twee honden samen, en alleen als hun karakters matchen. Geen groep waarin jouw hond ondersneeuwt of een maatje moet verdragen.",
    icoon: (
      <>
        <path d="M19 14c1.5-1.5 2-3 2-4.5a3.5 3.5 0 0 0-6-2.5L12 10 9 7a3.5 3.5 0 0 0-6 2.5C3 11 3.5 12.5 5 14l7 7 7-7Z" />
      </>
    ),
  },
  {
    titel: "Verplichte kennismaking",
    tekst:
      "Vertrouwen bouw je op. Ik wil jouw hond kennen en begrijpen nog voor we samen de deur uitgaan. Daarom kom ik eerst langs, gratis en vrijblijvend.",
    icoon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
]

export default function Voordelen() {
  return (
    <section id="voordelen" className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Waarom bij mij</span>
          <h2 className="mt-3">Rust, aandacht en een paar ogen die meekijken</h2>
          <p className="lead mt-4">
            Elk detail telt wanneer het om het welzijn van jouw viervoeter gaat.
            Dit is wat het verschil maakt:
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PUNTEN.map((p) => (
            <li key={p.titel} className="card card-hover reveal p-7">
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3A5A70"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icoon}
                </svg>
              </span>
              <h3>{p.titel}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.tekst}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
