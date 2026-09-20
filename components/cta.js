import Image from "next/image"
import CtaKnoppen from "./cta-knoppen"

const FOTOS = [
  { src: "/hondenoppas.webp", alt: "Kimberly met een witte hond" },
  { src: "/weekend-wandeling.webp", alt: "Kimberly aait een grote zwarte hond" },
  { src: "/hondenuitlaatservice-met-mechelse-herder.webp", alt: "Kimberly met een Mechelse herder" },
  { src: "/review-lara-hond.webp", alt: "Pomeriaan met zijn bal in het gras" },
]

export default function Cta() {
  return (
    <section className="full-bleed bg-moss">
      <div className="shell section text-center">
        <span className="eyebrow !text-moss-text">Klaar om te starten?</span>
        <h2 className="mx-auto mt-3 max-w-3xl !text-white">
          Hondenuitlaatservice boeken in Dilsen-Stokkem
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-moss-text">
Ik kom vrijblijvend langs om je hond te leren kennen. Daarna beslis je pas of je verder wil.
        </p>

        <div className="mt-9 flex justify-center">
          <CtaKnoppen plek="cta-onderaan" licht />
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {FOTOS.map((foto) => (
            <li key={foto.src} className="overflow-hidden rounded-2xl">
              <Image
                src={foto.src}
                alt={foto.alt}
                width={500}
                height={600}
                loading="lazy"
                sizes="(max-width: 768px) 46vw, 22vw"
                className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-60"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
