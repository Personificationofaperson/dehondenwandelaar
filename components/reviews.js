import Image from "next/image"
import { ZICHTBARE_REVIEWS, BRONNEN } from "../lib/reviews"
import Sterren from "./sterren"

export default function Reviews() {
  if (ZICHTBARE_REVIEWS.length === 0) return null

  // Reviews met een foto krijgen een brede kaart met de foto links naast de
  // tekst. Reviews zonder foto komen er in gelijke kolommen onder. Zo blijven
  // de hoogtes bij elkaar in de buurt en vallen er geen gaten in het raster.
  const metFoto = ZICHTBARE_REVIEWS.filter((r) => r.foto)
  const zonderFoto = ZICHTBARE_REVIEWS.filter((r) => !r.foto)

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

        <div className="mt-12 space-y-5">
          {metFoto.map((review) => (
            <ReviewKaart key={review.id} review={review} breed />
          ))}

          {zonderFoto.length > 0 && (
            <ul className="grid gap-5 md:grid-cols-2">
              {zonderFoto.map((review) => (
                <li key={review.id} className="flex">
                  <ReviewKaart review={review} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

function ReviewKaart({ review, breed = false }) {
  const bron = BRONNEN[review.bron]

  return (
    <figure
      className={`card reveal flex w-full flex-col overflow-hidden sm:flex-row ${
        breed ? "" : "h-full"
      }`}
    >
      {review.foto && (
        <div
          className={`relative h-56 w-full shrink-0 bg-brand-100 sm:h-auto ${
            breed ? "sm:w-[34%] lg:w-[30%]" : "sm:w-[40%]"
          }`}
        >
          <Image
            src={review.foto}
            alt={review.fotoAlt ?? ""}
            fill
            loading="lazy"
            sizes={breed ? "(max-width: 640px) 92vw, 34vw" : "(max-width: 768px) 92vw, 22vw"}
            className="object-cover"
          />
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${breed ? "sm:p-8 lg:p-10" : "sm:p-7"}`}>
        <div className="flex items-center justify-between gap-3">
          {review.sterren ? <Sterren aantal={review.sterren} /> : <Aanhaling />}
          <BronBadge bron={bron} />
        </div>

        {review.titel && (
          <h3 className={`mt-3 ${breed ? "text-xl" : "text-lg"}`}>{review.titel}</h3>
        )}

        <blockquote
          className={`mt-3 flex-1 leading-relaxed text-ink ${breed ? "text-base sm:text-lg" : "text-[15px]"}`}
        >
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
