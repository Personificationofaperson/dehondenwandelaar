import Image from "next/image"
import { DIENSTEN, euro } from "../lib/prijzen"
import DienstKnop from "./dienst-knop"

const KAARTEN = [
  {
    id: "wandeling",
    titel: "De wandeling",
    foto: "/3-honden-wandeling.jpg",
    alt: "Kimberly wandelt met drie kleine honden",
    objectPosition: "center 35%",
    tekst:
      "Een actieve, verfrissende wandeling in de eigen buurt. Ideaal terwijl jij aan het werk bent, even geen tijd hebt of gewoon een helpende hand kan gebruiken.",
    kenmerken: ["30 – 60 min", "Max 8 km rond Dilsen", "Eén hond per wandeling"],
    uitgelicht: true,
  },
  {
    id: "weekend-1",
    titel: "Weekendwandeling",
    foto: "/weekend-wandeling.webp",
    alt: "Kimberly aait een grote zwarte hond",
    objectPosition: "center",
    tekst:
      "Weekendje weg of gewoon geen tijd? Ik neem je hond uren mee op sjok, in zijn vertrouwde omgeving, zodat hij daarna voldaan kan soezen.",
    kenmerken: ["Uren plezier", "Tot 10 km van Dilsen", "Ook twee dagen mogelijk"],
    uitgelicht: false,
  },
  {
    id: "dropin",
    titel: "De drop-in",
    foto: "/hondenoppas.webp",
    alt: "Hond wacht bij de deur op de hondenoppas",
    objectPosition: "center",
    tekst:
      "Voor actieve pups die nog niet volledig zindelijk zijn, en voor senioren die extra aandacht, vers water of een korte sanitaire stop kunnen gebruiken.",
    kenmerken: ["15 min", "Max 5 km rond Dilsen", "Aangepast aan de hond"],
    uitgelicht: false,
  },
]

export default function Diensten() {
  return (
    <section id="diensten" className="full-bleed bg-white">
      <div className="shell section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Mijn diensten</span>
            <h2 className="mt-3">Drie manieren waarop ik je dag lichter maak</h2>
          </div>
          <p className="lead md:max-w-sm md:text-right">
            Alle prijzen zijn exclusief reiskost. Hoeveel dat voor jouw adres
            precies is, reken je{" "}
            <a href="#tarieven" className="font-bold text-clay-700 underline underline-offset-4">
              hieronder in twee tellen uit
            </a>
            .
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {KAARTEN.map((kaart) => {
            const dienst = DIENSTEN.find((d) => d.id === kaart.id)
            return (
              <li
                key={kaart.id}
                className={`card card-hover reveal relative flex flex-col overflow-hidden ${
                  kaart.uitgelicht ? "ring-2 ring-clay-500/40" : ""
                }`}
              >
                {kaart.uitgelicht && (
                  <span className="absolute left-4 top-4 z-10 rounded-pill bg-clay-700 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    Meest gekozen
                  </span>
                )}

                <div className="relative h-52 w-full overflow-hidden bg-brand-100">
                  <Image
                    src={kaart.foto}
                    alt={kaart.alt}
                    width={700}
                    height={520}
                    sizes="(max-width: 768px) 92vw, 30vw"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: kaart.objectPosition }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3>{kaart.titel}</h3>
                    {dienst?.prijs != null && (
                      <span className="whitespace-nowrap font-display text-2xl text-clay-700">
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

                  <DienstKnop
                    dienstId={kaart.id}
                    label={kaart.id === "dropin" ? "Drop-in aanvragen" : "Deze dienst boeken"}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
