import Image from "next/image"
import { DIENSTEN, euro } from "../lib/prijzen"
import DienstKnop from "./dienst-knop"
import Poot from "./poot"

const KAARTEN = [
  {
    id: "wandeling",
    titel: "De wandeling",
    // TODO Kimberly: hier hoort eigenlijk een foto van één hond of een duo.
    // De oude foto met drie honden sprak de belofte "hoogstens twee" tegen.
    foto: "/hondenuitlaatservice-met-mechelse-herder.webp",
    alt: "Kimberly met een Mechelse herder tijdens een wandeling",
    objectPosition: "center 65%",
    tekst:
      "Een actieve, verfrissende wandeling in de eigen buurt. Ideaal terwijl jij aan het werk bent, even geen tijd hebt of gewoon een helpende hand kan gebruiken. Bij vaste klanten trekken we er geregeld op uit, naar de losloopzone in Rotem of de Negenoordplas.",
    kenmerken: ["30 min", "Max 7 km rond Dilsen", "Solo of in duo", "Wisselende routes"],
    uitgelicht: true,
  },
  {
    id: "dagpakket-1",
    titel: "Het dagpakket",
    foto: "/weekend-wandeling.webp",
    alt: "Kimberly aait een grote zwarte hond tijdens een lange wandeling",
    objectPosition: "center",
    tekst:
      "Ben je de hele dag weg? Dan kom ik twee keer langs, 's ochtends en 's avonds, telkens voor drie kwartier. Je hond komt buiten, krijgt aandacht en blijft in zijn vertrouwde omgeving.",
    kenmerken: ["2 × 45 min", "Ochtend en avond", "Max 7 km rond Dilsen"],
    uitgelicht: false,
  },
]

export default function Diensten() {
  return (
    <section id="diensten" className="full-bleed bg-white">
      <div className="shell section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow"><Poot size={13} /> Mijn diensten</span>
            <h2 className="mt-3">Wandelingen in Dilsen-Stokkem</h2>
          </div>
          <p className="lead md:max-w-sm md:text-right">
            Alle prijzen zijn exclusief reiskost. Hoeveel dat voor jouw adres
            precies is, reken je{" "}
            <a href="#tarieven" className="font-bold text-accent underline underline-offset-4">
              hieronder in twee tellen uit
            </a>
            .
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {KAARTEN.map((kaart) => {
            const dienst = DIENSTEN.find((d) => d.id === kaart.id)
            return (
              <li
                key={kaart.id}
                className={`card card-hover reveal relative flex flex-col overflow-hidden ${
                  kaart.uitgelicht ? "ring-2 ring-accent-bright/40" : ""
                }`}
              >
                {kaart.uitgelicht && (
                  <span className="absolute left-4 top-4 z-10 rounded-pill bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    Meest gekozen
                  </span>
                )}

                <div className="relative h-60 w-full overflow-hidden bg-moss-soft md:h-72">
                  <Image
                    src={kaart.foto}
                    alt={kaart.alt}
                    fill
                    sizes="(max-width: 768px) 92vw, 45vw"
                    className="object-cover"
                    style={{ objectPosition: kaart.objectPosition }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3>{kaart.titel}</h3>
                    {dienst?.prijs != null && (
                      <span className="whitespace-nowrap font-display text-2xl text-accent">
                        {euro(dienst.prijs)}
                      </span>
                    )}
                  </div>
                  {dienst?.prijs != null && (
                    <span className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-muted">
                      {dienst.eenheid}
                    </span>
                  )}

                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{kaart.tekst}</p>

                  <ul className="mb-6 mt-5 flex flex-wrap gap-2">
                    {kaart.kenmerken.map((k) => (
                      <li key={k} className="chip">
                        {k}
                      </li>
                    ))}
                  </ul>

                  <DienstKnop dienstId={kaart.id} label="Deze dienst boeken" />
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 rounded-2xl border border-ink/12 bg-accent-soft px-6 py-5 text-[15px] leading-relaxed text-muted">
          <strong className="text-ink">Hoogstens twee honden samen.</strong> Ik wandel
          solo of in duo, en een duo vormen we alleen als de karakters bij elkaar passen.
          Dat beoordeel ik tijdens de kennismaking. Geen groepen, geen honden die elkaar
          moeten verdragen.
        </p>
      </div>
    </section>
  )
}
