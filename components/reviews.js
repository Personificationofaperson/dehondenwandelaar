import Image from "next/image"
import { ZICHTBARE_REVIEWS, BRONNEN } from "../lib/reviews"
import Sterren from "./sterren"

export default function Reviews() {
  if (ZICHTBARE_REVIEWS.length === 0) return null

  return (
    <section id="reviews" className="section">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Wat klanten zeggen</span>
            <h2 className="mt-3">Baasjes die hun hond met een gerust hart meegeven</h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-soft">
            <Sterren aantal={5} label="5 van de 5 sterren" />
            <span className="text-sm font-bold text-brand-900">
              5,0 gemiddeld
              <span className="block text-xs font-semibold text-muted">
                op Google en Ring Twice
              </span>
            </span>
          </div>
        </div>

        {/* Kolomlayout: reviews verschillen in lengte, dus laten we ze netjes
            in elkaar schuiven in plaats van een raster met gaten. */}
        <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
          {ZICHTBARE_REVIEWS.map((review) => (
            <ReviewKaart key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewKaart({ review }) {
  const bron = BRONNEN[review.bron]

  return (
    <figure className="card reveal mb-5 flex break-inside-avoid flex-col overflow-hidden">
      {review.foto && (
        <div className="relative h-44 w-full bg-brand-100">
          <Image
            src={review.foto}
            alt={review.fotoAlt ?? ""}
            width={600}
            height={500}
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 30vw"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          {review.sterren ? <Sterren aantal={review.sterren} /> : <Aanhaling />}
          <BronBadge bron={bron} />
        </div>

        {review.titel && <h3 className="mt-3 text-lg">{review.titel}</h3>}

        <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">
          &ldquo;{review.tekst}&rdquo;
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-700/10 pt-4">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm text-brand-900"
          >
            {review.naam.charAt(0)}
          </span>
          <span className="text-sm">
            <span className="block font-bold leading-tight text-brand-900">{review.naam}</span>
            {review.datum && (
              <span className="block text-xs font-semibold text-muted">{review.datum}</span>
            )}
          </span>
          {bron.url && (
            <a
              href={bron.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 text-xs font-bold text-clay-700 underline underline-offset-4"
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
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-pill border border-brand-700/15 bg-white px-2.5 py-1 text-xs font-bold text-muted">
      <span
        aria-hidden="true"
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: bron.kleur }}
      />
      {bron.naam}
    </span>
  )
}

function Aanhaling() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#B6D8F2" aria-hidden="true">
      <path d="M7.5 5C5 5 3 7 3 9.5S5 14 7.5 14c.3 0 .6 0 .9-.1-.5 2.2-2.2 3.9-4.4 4.4l.5 1.6c3.9-.9 6.5-4.3 6.5-8.4V9.5C11 7 9 5 7.5 5Zm9 0C14 5 12 7 12 9.5S14 14 16.5 14c.3 0 .6 0 .9-.1-.5 2.2-2.2 3.9-4.4 4.4l.5 1.6c3.9-.9 6.5-4.3 6.5-8.4V9.5C20 7 18 5 16.5 5Z" />
    </svg>
  )
}
