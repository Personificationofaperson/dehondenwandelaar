// Alle antwoorden komen uit informatie die al op de site stond.
// Voeg gerust vragen toe, de lijst rendert zichzelf.
const VRAGEN = [
  {
    vraag: "Wandel je met groepjes honden?",
    antwoord:
      "Nee. Ik wandel solo of met een duo van hoogstens twee honden, en een duo vormen we alleen als hun karakters echt bij elkaar passen. Geen groep waarin jouw hond ondersneeuwt, en geen gehaaste rondjes: we wandelen tot je hond voldaan en rustig is.",
  },
  {
    vraag: "Wanneer ben je beschikbaar?",
    antwoord:
      "'s Avonds vanaf 17:30, elke dag van de week. In de vroege ochtend op maandag, dinsdag en woensdag. Middagwandelingen kunnen alleen nog als duo: mijn solo-plekken in de middag zijn volzet, dus jouw hond moet dan kunnen meelopen met een retriever die ik al vast uitlaat.",
  },
  {
    vraag: "Is de kennismaking echt verplicht?",
    antwoord:
      "Ja, en ze is gratis en vrijblijvend. Ik kom langs om je hond en zijn routines te leren kennen, en om te zien of hij in duo kan wandelen en met welk maatje dat zou klikken. Er wordt tijdens die kennismaking nog niet gewandeld. Pas daarna beslis je of je verder wil.",
  },
  {
    vraag: "Hoe zit het met de reiskost?",
    antwoord:
      "Ik reken € 0,52 per gereden kilometer, heen en terug. Bij het dagpakket kom ik twee keer langs, dus daar zitten ook twee ritten in. Alles zit automatisch in de richtprijs die je hierboven berekent, dus je weet vooraf precies waar je aan toe bent.",
  },
  {
    vraag: "Ik woon net buiten je werkgebied. Kan het dan niet?",
    antwoord:
      "Ik blijf binnen 7 km rond Dilsen-Stokkem, ook voor het dagpakket. Zit je er net buiten? Stuur een berichtje, dan kijken we samen wat haalbaar is.",
  },
  {
    vraag: "Wat houdt het dagpakket precies in?",
    antwoord:
      "Ik kom twee keer langs op dezelfde dag, 's ochtends en 's avonds, telkens voor drie kwartier. Dat is bedoeld voor baasjes die de hele dag van huis zijn. Je hond komt twee keer goed buiten en blijft de rest van de dag in zijn eigen omgeving.",
  },
  {
    vraag: "Waarom verloopt alles via Ring Twice?",
    antwoord:
      "Omdat elke opdracht daardoor automatisch verzekerd is en de betaling voor jou veilig verloopt. Geen cash, geen facturen, wel zekerheid voor ons allebei.",
  },
]

export default function Faq() {
  return (
    <section id="faq" className="full-bleed bg-white">
      <div className="shell section">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <span className="eyebrow">Veelgestelde vragen</span>
            <h2 className="mt-3">Veelgestelde vragen over de uitlaatservice</h2>
            <p className="lead mt-4">
              Staat je vraag er niet bij? Stuur gerust een berichtje, ik antwoord
              meestal dezelfde dag.
            </p>
          </div>

          <ul className="space-y-3">
            {VRAGEN.map((item) => (
              <li key={item.vraag}>
                <details className="card group overflow-hidden [&[open]]:shadow-lift">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-display text-lg text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                    {item.vraag}
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-moss-soft transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#355B47" strokeWidth="2.6" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted">
                    {item.antwoord}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
