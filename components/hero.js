import Image from "next/image"
import CtaKnoppen from "./cta-knoppen"
import Sterren from "./sterren"

// De KPI's staan als losse blokken in plaats van als pilletjes: cijfers
// overtuigen sterker dan losse woorden, en ze vullen de kolom netjes uit.
const KPIS = [
  { cijfer: "20+", label: "jaar met honden" },
  { cijfer: "5,0", label: "uit klantreviews" },
  { cijfer: "6 km", label: "rond Dilsen" },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+1.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-32 h-[36rem] w-[36rem] rounded-full bg-accent-soft opacity-70 blur-3xl"
      />

      <div className="shell relative grid items-center gap-12 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-24">
        <div>
          {/* De H1 draagt het zoekwoord voluit: dienst plus plaats. */}
          <h1>
            Hondenuitlaatservice
            <span className="mt-1 block text-accent">in Dilsen-Stokkem</span>
          </h1>

          <p className="lead mt-6">
            Geen massale groepen, geen gehaaste rondjes. Ik wandel solo of met een
            vast duo dat bij elkaar past, en lees ondertussen elke beweging van je
            hond.
          </p>

          <CtaKnoppen plek="hero" className="mt-8" />

          <dl className="mt-11 grid max-w-md grid-cols-3 gap-3">
            {KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-white px-4 py-4 shadow-soft">
                <dt className="sr-only">{kpi.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold leading-none text-accent">
                    {kpi.cijfer}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-tight text-muted">
                    {kpi.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="blob shadow-deep">
            <Image
              src="/hondenuitlaatservice-met-mechelse-herder.webp"
              alt="Kimberly laat een Mechelse herder uit in de buurt van Dilsen-Stokkem"
              width={900}
              height={1100}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 92vw, 44vw"
              className="h-[26rem] w-full object-cover object-[72%_68%] sm:h-[32rem] lg:h-[35rem]"
            />
          </div>

          <figure className="card mt-4 p-5 sm:absolute sm:-bottom-2 sm:-left-10 sm:mt-0 sm:max-w-[16.5rem]">
            <Sterren aantal={5} />
            <blockquote className="mt-2 text-[15px] leading-snug text-ink">
              &ldquo;Ze houdt rekening met de hitte en wat jouw hondje wel of niet
              aankan.&rdquo;
            </blockquote>
            <figcaption className="mt-2.5 text-xs font-semibold text-muted">
              Lara H. via Google
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
