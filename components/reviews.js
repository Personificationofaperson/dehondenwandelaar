import Image from "next/image"
import { ZICHTBARE_REVIEWS, BRONNEN } from "../lib/reviews"
import Sterren from "./sterren"

// Drie gelijke kaarten naast elkaar. Heeft een review een foto, dan staat
// die bovenaan. Heeft ze er geen, dan krijgt de tekst de volle kaart en wordt
// ze wat groter gezet. Geen leeg vlak op de plek van de foto, want dat leest
// als een ontbrekende foto in plaats van als een keuze.
export default function Reviews() {
  if (ZICHTBARE_REVIEWS.length === 0) return null

  return (
    <section id="reviews" className="px-3 py-6 sm:px-6 lg:px-10">
      <div className="rounded-[2.5rem] bg-moss py-16 text-white sm:rounded-[2.75rem] sm:py-20">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow !text-moss-text">Wat klanten zeggen</span>
              <h2 className="mt-3 !text-white">Baasjes over de uitlaatservice in Dilsen-Stokkem</h2>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white/10 px-5 py-4">
              <Sterren aantal={5} label="5 van de 5 sterren" />
              <span className="text-sm font-bold text-white">
                5,0 gemiddeld
                <span className="block text-xs font-semibold text-moss-text">
                  op Google en Ring Twice
                </span>
              </span>
            </div>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ZICHTBARE_REVIEWS.map((review) => (
              <li key={review.id} className="flex">
                <ReviewKaart review={review} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ReviewKaart({ review }) {
  const bron = BRONNEN[review.bron]

  return (
    <figure className="reveal flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white/[.09]">
      {review.foto && (
        <div className="relative h-44 w-full shrink-0 bg-moss-deep">
          <Image
            src={review.foto}
            alt={review.fotoAlt ?? ""}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Zonder foto staat het hele blok verticaal gecentreerd en wordt de
            tekst wat groter. Zo vult de review de kaart uit in plaats van er
            een leeg vlak achter te laten. */}
        <div
          className={`flex flex-1 flex-col ${review.foto ? "justify-start" : "justify-center"}`}
        >
          <div className="flex items-center justify-between gap-3">
            <Sterren aantal={review.sterren} />
            <BronBadge bron={bron} />
          </div>

          {review.titel && (
            <h3 className={`mt-3 !text-white ${review.foto ? "text-lg" : "text-xl"}`}>
              {review.titel}
            </h3>
          )}

          <blockquote
            className={`mt-3 leading-relaxed text-white/90 ${
              review.foto ? "text-[15px]" : "text-[17px]"
            }`}
          >
            &ldquo;{review.tekst}&rdquo;
          </blockquote>
        </div>

        <figcaption className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-sm font-semibold text-white"
          >
            {review.naam.charAt(0)}
          </span>
          <span className="text-sm">
            <span className="block font-bold leading-tight text-white">{review.naam}</span>
            {review.datum && (
              <span className="block text-xs font-semibold text-moss-text">{review.datum}</span>
            )}
          </span>
          {bron.url && (
            <a
              href={bron.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 text-xs font-bold text-moss-text underline underline-offset-4"
            >
              Bekijken
            </a>
          )}
        </figcaption>
      </div>
    </figure>
  )
}

function BronBadge({ bron }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-white/15 px-2.5 py-1 text-xs font-bold text-white">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: bron.kleur }}
      />
      {bron.naam}
    </span>
  )
}
