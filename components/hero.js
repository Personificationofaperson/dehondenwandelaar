import Image from "next/image"
import CtaKnoppen from "./cta-knoppen"
import Sterren from "./sterren"

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+2rem)]">
      {/* zachte kleurvlek achter de hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-brand-100 opacity-70 blur-3xl"
      />

      <div className="shell relative grid items-center gap-12 pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-20">
        <div>
          <span className="chip mb-5 bg-white shadow-soft">
            <span className="h-2 w-2 rounded-full bg-[#2BA84A]" aria-hidden="true" />
            Nu plaats voor nieuwe honden
          </span>

          <h1>
            Hondenuitlaatservice
            <span className="mt-2 block text-clay-700">in Dilsen-Stokkem</span>
          </h1>

          <p className="lead mt-6">
            Geen massale groepen of gehaaste rondjes. Ik wandel solo, of met een
            vast duo waarvan de karakters écht bij elkaar passen. Ik lees de
            lichaamstaal en houd de omgeving in de gaten, zodat jij je viervoeter
            met een gerust hart meegeeft.
          </p>

          <CtaKnoppen plek="hero" className="mt-8" />

          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-muted">
            <li className="flex items-center gap-2">
              <Sterren aantal={5} klein />
              <span>5,0 uit klantreviews</span>
            </li>
            <li className="flex items-center gap-2">
              <Vink />
              20+ jaar ervaring met honden
            </li>
            <li className="flex items-center gap-2">
              <Vink />
              Verzekerd via Ring Twice
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-100 shadow-lift">
            <Image
              src="/hondenuitlaatservice-met-mechelse-herder.webp"
              alt="Kimberly wandelt met een Mechelse herder in de buurt van Dilsen-Stokkem"
              width={900}
              height={1100}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="h-[24rem] w-full object-cover object-[72%_68%] sm:h-[30rem] lg:h-[34rem]"
            />
          </div>

          {/* zwevende reviewkaart, sociale bewijskracht meteen bovenaan */}
          <figure className="card mt-4 p-4 sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0 sm:max-w-[19rem] sm:p-5">
            <Sterren aantal={5} />
            <blockquote className="mt-2 text-[15px] leading-snug text-ink">
              &ldquo;Ze houdt rekening met de hitte en wat jouw hondje wel of niet
              aankan.&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs font-semibold text-muted">
              Lara H., via Google
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

function Vink() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A84A30"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
