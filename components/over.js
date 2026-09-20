import Image from "next/image"

const PUNTEN = [
  {
    titel: "Veiligheid voorop",
    tekst:
      "Ik behandel je hond alsof het de mijne is. Ik neem jouw vertrouwen serieus en scan de omgeving continu om problemen vóór te zijn.",
  },
  {
    titel: "20+ jaar ervaring",
    tekst:
      "Van kleine maltezers tot grote herders, van explosieve energiebommen tot rustige levensgenieters. Ik heb ze allemaal aan de lijn gehad.",
  },
  {
    titel: "Analytisch ingesteld",
    tekst:
      "Ik kijk echt naar de lichaamstaal en gedragingen van je hond, en pas mijn aanpak daarop aan. Elke hond krijgt zijn eigen tempo.",
  },
  {
    titel: "Flexibel waar het kan",
    tekst:
      "Twijfel je of ik beschikbaar ben op jouw moment? Stuur gewoon een berichtje, er is vaker iets mogelijk dan je denkt.",
  },
]

export default function Over() {
  return (
    <section id="over" className="section">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
            <Image
              src="/hondenoppas.webp"
              alt="Kimberly, de hondenwandelaar, met een hond"
              width={800}
              height={900}
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="h-[22rem] w-full object-cover sm:h-[28rem]"
            />
          </div>
          <span className="absolute -bottom-5 left-6 rounded-2xl bg-white px-5 py-3 shadow-lift">
            <span className="block font-display text-2xl leading-none text-clay-700">20+</span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              jaar met honden
            </span>
          </span>
        </div>

        <div>
          <span className="eyebrow">Over mij</span>
          <h2 className="mt-3">Hoi, ik ben Kimberly</h2>
          <p className="lead mt-4">
            Jouw hond is een waardevol deel van je gezin. Mijn doel is om jullie
            allebei te ontzorgen, met een veilige en begripvolle aanpak.
          </p>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {PUNTEN.map((punt) => (
              <li key={punt.titel}>
                <strong className="block font-display text-lg text-brand-900">{punt.titel}</strong>
                <span className="mt-1.5 block text-[15px] leading-relaxed text-muted">
                  {punt.tekst}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
