import Image from "next/image"
import { ZICHTBARE_REVIEWS, BRONNEN } from "../lib/reviews"
import Sterren from "./sterren"

// Alle reviews krijgen een even grote kaart in hetzelfde raster, zodat geen
// enkele belangrijker oogt dan de andere. De kaarten met een foto worden
// diagonaal geplaatst, linksboven en rechtsonder, zodat de foto's niet samen
// in één kolom belanden en er alsnog een rangorde lijkt te ontstaan.
function diagonaal(reviews) {
  const metFoto = reviews.filter((r) => r.foto)
  const zonder = reviews.filter((r) => !r.foto)
  const volgorde = []
  let rij = 0

  while (metFoto.length || zonder.length) {
    const links = rij % 2 === 0 ? metFoto : zonder
    const rechts = rij % 2 === 0 ? zonder : metFoto
    const eerste = links.shift() ?? rechts.shift()
    const tweede = rechts.shift() ?? links.shift()
    if (eerste) volgorde.push(eerste)
    if (tweede) volgorde.push(tweede)
    rij += 1
  }

  return volgorde
}

export default function Reviews() {
  if (ZICHTBARE_REVIEWS.length === 0) return null
  const reviews = diagonaal(ZICHTBARE_REVIEWS)

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

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.id} className="flex">
              <ReviewKaart review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ReviewKaart({ review }) {
  const bron = BRONNEN[review.bron]

  return (
    <figure className="card reveal flex h-full w-full flex-col overflow-hidden sm:flex-row">
      {review.foto && (
        <div className="relative h-48 w-full shrink-0 bg-brand-100 sm:h-auto sm:w-[34%]">
          <Image
            src={review.foto}
            alt={review.fotoAlt ?? ""}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 18vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          {review.sterren ? <Sterren aantal={review.sterren} /> : <Aanhaling />}
          <BronBadge bron={bron} />
        </div>

        {review.titel && <h3 className="mt-3 text-lg">{review.titel}</h3>}

        {/* Kortere reviews staan verticaal gecentreerd, zodat de extra ruimte
            boven en onder verdeeld wordt in plaats van als een gat onderaan. */}
        <div className="flex flex-1 items-center">
          <blockquote className="mt-3 text-[15px] leading-relaxed text-ink">
            &ldquo;{review.tekst}&rdquo;
          </blockquote>
        </div>

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
