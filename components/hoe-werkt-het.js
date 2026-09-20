const STAPPEN = [
  {
    nummer: "01",
    titel: "Je stuurt een berichtje",
    tekst:
      "Via WhatsApp of Ring Twice. Vertel kort over je hond en wanneer je hulp zoekt. Ik antwoord meestal dezelfde dag.",
  },
  {
    nummer: "02",
    titel: "We maken kennis, gratis",
    tekst:
      "Ik kom langs, leer je hond en zijn routines kennen en jij leert mij kennen. Er wordt niet gewandeld, het is puur kennismaken. Pas daarna beslis je iets.",
  },
  {
    nummer: "03",
    titel: "De wandelingen starten",
    tekst:
      "Je boekt via Ring Twice, waardoor elke opdracht verzekerd is en de betaling veilig verloopt. Na elke wandeling krijg je een berichtje met foto's en hoe het gegaan is.",
  },
]

export default function HoeWerktHet() {
  return (
    <section id="hoe-werkt-het" className="section">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="eyebrow">Zo gaat het in zijn werk</span>
          <h2 className="mt-3">Zo werkt de uitlaatservice, stap voor stap</h2>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STAPPEN.map((stap) => (
            <li key={stap.nummer} className="card reveal relative p-7 pt-9">
              <span
                aria-hidden="true"
                className="absolute right-6 top-5 font-display text-5xl leading-none text-moss-soft"
              >
                {stap.nummer}
              </span>
              <h3 className="relative">{stap.titel}</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{stap.tekst}</p>
            </li>
          ))}
        </ol>

        <div className="card reveal mt-6 flex flex-col gap-5 bg-accent-soft p-7 sm:flex-row sm:items-center">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-soft">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#355B47" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </span>
          <p className="text-[15px] leading-relaxed text-muted">
            <strong className="text-ink">Alle boekingen lopen via Ring Twice.</strong>{" "}
            Daardoor is elke opdracht automatisch verzekerd en verloopt de betaling voor
            jou volledig veilig. Geen gedoe met cash of facturen, wel zekerheid.
          </p>
        </div>
      </div>
    </section>
  )
}
