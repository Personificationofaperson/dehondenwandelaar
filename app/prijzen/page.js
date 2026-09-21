import Link from "next/link"
import Calculator from "../../components/calculator"
import Cta from "../../components/cta"
import {
  DIENSTEN,
  HONDEN_OPTIES,
  KM_TARIEF,
  euro,
  ritkost,
  reiskost,
} from "../../lib/prijzen"

const BASIS = "https://dehondenwandelaar.be"

export const metadata = {
  title: "Wat kost een hondenuitlaatservice? Prijzen 2026",
  description:
    "Een wandeling van 30 minuten kost € 18, plus € 0,52 per gereden kilometer. Alle prijzen van de hondenuitlaatservice in Dilsen-Stokkem, met rekenvoorbeelden en een calculator.",
  alternates: { canonical: "/prijzen" },
  openGraph: {
    type: "article",
    locale: "nl_BE",
    url: `${BASIS}/prijzen`,
    siteName: "De Hondenwandelaar",
    title: "Wat kost een hondenuitlaatservice? Prijzen 2026",
    description:
      "Wandeling 30 minuten € 18, dagpakket € 70, plus € 0,52 per gereden kilometer. Alle tarieven op een rij.",
  },
}

const wandeling = DIENSTEN.find((d) => d.id === "wandeling")
const dagpakket = DIENSTEN.find((d) => d.id === "dagpakket-1")
const tweedeHond = HONDEN_OPTIES.find((h) => h.aantal === 2)

// De rekenvoorbeelden komen uit dezelfde functies als de calculator, dus ze
// kunnen nooit uit elkaar lopen met wat een bezoeker zelf uitrekent.
const AFSTANDEN = [2, 4, 7]

const VRAGEN = [
  {
    vraag: "Wat kost een hondenuitlaatservice per uur?",
    antwoord: `Ik reken niet per uur maar per wandeling. Een wandeling duurt 30 minuten en kost ${euro(
      wandeling.prijs,
    )}, plus de reiskost naar jouw adres. Omgerekend komt dat op ongeveer ${euro(
      wandeling.prijs * 2,
    )} per uur wandeltijd, maar je betaalt alleen voor de wandelingen die je afneemt.`,
  },
  {
    vraag: "Zit de reiskost bij de prijs inbegrepen?",
    antwoord: `Nee, die komt er apart bij, zodat je niet meebetaalt aan de kilometers van iemand anders. Het is € ${KM_TARIEF
      .toFixed(2)
      .replace(".", ",")} per gereden kilometer, heen en terug gerekend. Voor de meeste adressen in Dilsen-Stokkem komt dat neer op ${euro(
      ritkost(2),
    )} tot ${euro(ritkost(7))} per bezoek.`,
  },
  {
    vraag: "Wat kost een tweede hond?",
    antwoord: `Een tweede hond kost ${euro(
      tweedeHond.meerprijs,
    )} extra per wandeling. De reiskost betaal je maar één keer, want het is dezelfde rit. Meer dan twee honden doe ik niet, en een duo vormen we alleen als hun karakters bij elkaar passen.`,
  },
  {
    vraag: "Moet ik een abonnement nemen?",
    antwoord:
      "Nee. Je kan structureel elke week boeken, maar ook eenmalig tijdens een vakantie of gewoon op losse momenten. Er is geen opzegtermijn en geen minimum aantal wandelingen.",
  },
  {
    vraag: "Wat kost de kennismaking?",
    antwoord:
      "Niets. De kennismaking is gratis en vrijblijvend, en ze is verplicht voordat we starten. Ik kom langs om je hond en zijn routines te leren kennen. Er wordt tijdens die kennismaking nog niet gewandeld, dus je betaalt er ook niets voor.",
  },
  {
    vraag: "Hoe en wanneer betaal ik?",
    antwoord:
      "Alles verloopt via Ring Twice. Daardoor is elke opdracht automatisch verzekerd en verloopt de betaling veilig. Geen cash, geen facturen achteraf.",
  },
  {
    vraag: "Wat als ik net buiten je werkgebied woon?",
    antwoord:
      "Ik blijf binnen 7 km rond Dilsen-Stokkem, ook voor het dagpakket. Zit je er net buiten, stuur dan een berichtje, dan kijken we samen wat haalbaar is.",
  },
]

// Gestructureerde data voor de twee diensten. Bewust geen FAQPage: Google
// toont die sinds 2023 nog maar voor een handvol sites, en geen
// AggregateRating, want reviews die elders verzameld zijn mag je niet als
// markup op je eigen site zetten.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASIS },
        { "@type": "ListItem", position: 2, name: "Prijzen", item: `${BASIS}/prijzen` },
      ],
    },
    {
      "@type": "Service",
      name: "Hondenuitlaatservice Dilsen-Stokkem",
      serviceType: "Hondenuitlaatservice",
      // Verwijst naar het LocalBusiness-blok dat in de layout staat, in
      // plaats van het bedrijf een tweede keer te beschrijven.
      provider: { "@id": `${BASIS}/#bedrijf` },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 51.0347, longitude: 5.7381 },
        geoRadius: 7000,
      },
      offers: [
        {
          "@type": "Offer",
          name: "Wandeling van 30 minuten",
          price: String(wandeling.prijs),
          priceCurrency: "EUR",
          url: `${BASIS}/prijzen`,
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Dagpakket, twee bezoeken van 45 minuten",
          price: String(dagpakket.prijs),
          priceCurrency: "EUR",
          url: `${BASIS}/prijzen`,
          availability: "https://schema.org/InStock",
        },
      ],
    },
  ],
}

export default function Prijzen() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* -------------------------- KOP -------------------------- */}
      <section className="pt-[calc(var(--nav-h)+2.5rem)]">
        <div className="shell pb-14">
          <nav aria-label="Kruimelpad" className="mb-6 text-sm text-muted">
            <Link href="/" className="hover:text-accent hover:underline">
              Home
            </Link>
            <span aria-hidden="true" className="px-2">
              /
            </span>
            <span className="font-semibold text-ink">Prijzen</span>
          </nav>

          <h1 className="max-w-3xl">Wat kost een hondenuitlaatservice?</h1>

          {/* De eerste zin geeft meteen het antwoord. Dat is wat een
              zoekmachine of een chatbot eruit licht als iemand vraagt wat
              zo'n dienst kost. */}
          <p className="lead mt-6 max-w-2xl">
            Bij De Hondenwandelaar in Dilsen-Stokkem kost een wandeling van 30 minuten{" "}
            <strong className="text-ink">{euro(wandeling.prijs)}</strong>, plus € 0,52
            per gereden kilometer. Een dagpakket met twee bezoeken van 45 minuten kost{" "}
            <strong className="text-ink">{euro(dagpakket.prijs)}</strong>. Een tweede
            hond kost {euro(tweedeHond.meerprijs)} extra. De kennismaking is gratis.
          </p>

          <dl className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              { cijfer: euro(wandeling.prijs), label: "wandeling van 30 min" },
              { cijfer: euro(dagpakket.prijs), label: "dagpakket, 2 × 45 min" },
              { cijfer: "€ 0", label: "kennismaking" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl bg-white px-5 py-4 shadow-soft">
                <dt className="sr-only">{k.label}</dt>
                <dd>
                  <span className="block font-display text-3xl leading-none text-accent">
                    {k.cijfer}
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-tight text-muted">
                    {k.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------ TARIEVEN ------------------------ */}
      <section className="full-bleed bg-white">
        <div className="shell section">
          <h2>Tarieven van de hondenuitlaatservice</h2>
          <p className="lead mt-4 max-w-2xl">
            Dit zijn de vaste bedragen. De reiskost hangt af van je adres en reken je
            verderop op deze pagina uit.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
              <caption className="sr-only">
                Tarieven van De Hondenwandelaar, exclusief reiskost
              </caption>
              <thead>
                <tr className="border-b-2 border-ink/15">
                  <th scope="col" className="py-3 pr-4 font-bold text-ink">
                    Dienst
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold text-ink">
                    Duur
                  </th>
                  <th scope="col" className="py-3 pr-4 font-bold text-ink">
                    Prijs
                  </th>
                  <th scope="col" className="py-3 font-bold text-ink">
                    Eenheid
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-ink/10">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Wandeling
                  </th>
                  <td className="py-4 pr-4">{wandeling.duur}</td>
                  <td className="py-4 pr-4 font-display text-lg text-accent">
                    {euro(wandeling.prijs)}
                  </td>
                  <td className="py-4">{wandeling.eenheid}</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Dagpakket
                  </th>
                  <td className="py-4 pr-4">{dagpakket.duur}</td>
                  <td className="py-4 pr-4 font-display text-lg text-accent">
                    {euro(dagpakket.prijs)}
                  </td>
                  <td className="py-4">{dagpakket.eenheid}</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Tweede hond
                  </th>
                  <td className="py-4 pr-4">Zelfde wandeling</td>
                  <td className="py-4 pr-4 font-display text-lg text-accent">
                    + {euro(tweedeHond.meerprijs)}
                  </td>
                  <td className="py-4">per wandeling</td>
                </tr>
                <tr className="border-b border-ink/10">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Reiskost
                  </th>
                  <td className="py-4 pr-4">Heen en terug</td>
                  <td className="py-4 pr-4 font-display text-lg text-accent">€ 0,52</td>
                  <td className="py-4">per gereden km</td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    Kennismaking
                  </th>
                  <td className="py-4 pr-4">Ongeveer 30 min</td>
                  <td className="py-4 pr-4 font-display text-lg text-accent">Gratis</td>
                  <td className="py-4">eenmalig, verplicht</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-2xl rounded-2xl border border-ink/12 bg-accent-soft px-6 py-5 text-[15px] leading-relaxed text-muted">
            <strong className="text-ink">Waarom de reiskost apart staat.</strong> Ik rijd
            naar jou toe, en die afstand verschilt per klant. Door hem los te rekenen
            betaalt iemand om de hoek niet mee aan de kilometers van iemand aan de rand
            van mijn werkgebied. Bij het dagpakket kom ik twee keer langs, dus daar zitten
            twee ritten in.
          </p>
        </div>
      </section>

      {/* --------------------- REKENVOORBEELDEN --------------------- */}
      <section className="shell section">
        <h2>Wat betaal je in totaal?</h2>
        <p className="lead mt-4 max-w-2xl">
          Hieronder staan volledige prijzen, reiskost inbegrepen, voor drie afstanden
          binnen mijn werkgebied van 7 km rond Dilsen-Stokkem.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-left text-[15px]">
            <caption className="sr-only">
              Totaalprijzen inclusief reiskost, per rijafstand
            </caption>
            <thead>
              <tr className="border-b-2 border-ink/15">
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Afstand
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Reiskost per rit
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Wandeling, 1 hond
                </th>
                <th scope="col" className="py-3 pr-4 font-bold text-ink">
                  Wandeling, 2 honden
                </th>
                <th scope="col" className="py-3 font-bold text-ink">
                  Dagpakket
                </th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {AFSTANDEN.map((km) => (
                <tr key={km} className="border-b border-ink/10 last:border-0">
                  <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                    {km} km
                  </th>
                  <td className="py-4 pr-4">{euro(ritkost(km))}</td>
                  <td className="py-4 pr-4 font-display text-lg text-ink">
                    {euro(wandeling.prijs + reiskost(km, wandeling.ritten))}
                  </td>
                  <td className="py-4 pr-4">
                    {euro(
                      wandeling.prijs + tweedeHond.meerprijs + reiskost(km, wandeling.ritten),
                    )}
                  </td>
                  <td className="py-4">
                    {euro(dagpakket.prijs + reiskost(km, dagpakket.ritten))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12">Twee veelvoorkomende situaties</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h4>Structureel, twee keer per week</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Eén hond, een adres op 4 km. Twee wandelingen van 30 minuten per week,
              telkens {euro(wandeling.prijs + reiskost(4, 1))} inclusief reiskost.
            </p>
            <p className="mt-4 font-display text-3xl text-accent">
              {euro(2 * (wandeling.prijs + reiskost(4, 1)))}
              <span className="ml-2 font-body text-sm font-semibold text-muted">
                per week
              </span>
            </p>
          </div>

          <div className="card p-7">
            <h4>Een werkweek weg van huis</h4>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Eén hond, een adres op 4 km. Vijf dagen een dagpakket, dus tien bezoeken
              van 45 minuten, telkens {euro(dagpakket.prijs + reiskost(4, 2))} inclusief
              reiskost.
            </p>
            <p className="mt-4 font-display text-3xl text-accent">
              {euro(5 * (dagpakket.prijs + reiskost(4, 2)))}
              <span className="ml-2 font-body text-sm font-semibold text-muted">
                voor vijf dagen
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------ CALCULATOR ------------------------ */}
      <Calculator
        id="calculator"
        eyebrow="Zelf rekenen"
        titel="Bereken de prijs voor jouw adres"
        lead="Vul je adres in en je ziet meteen het totaal, reiskost inbegrepen. Je kan van daaruit ook meteen een bericht sturen."
      />

      {/* --------------------- WAT ZIT ERIN --------------------- */}
      <section className="shell section">
        <h2>Wat zit er in de prijs?</h2>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl">Inbegrepen</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
              <li>Een wandeling op maat van je hond, solo of in een vast duo</li>
              <li>Een gratis kennismaking vooraf, zonder verplichting</li>
              <li>Een bericht met foto&apos;s na elke wandeling</li>
              <li>Verzekering via Ring Twice op elke opdracht</li>
              <li>Poepzakjes, water bij warm weer en een handdoek bij regen</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl">Niet inbegrepen</h3>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted">
              <li>De reiskost, die komt er apart bij en hangt af van je adres</li>
              <li>Hondenoppas of verblijf, dat bied ik niet meer aan</li>
              <li>Groepswandelingen, ik wandel met hoogstens twee honden</li>
              <li>Bezoeken buiten 7 km rond Dilsen-Stokkem</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------- VEELGESTELD ----------------------- */}
      <section className="full-bleed bg-white">
        <div className="shell section">
          <h2>Veelgestelde vragen over de prijzen</h2>

          <dl className="mt-8 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
            {VRAGEN.map((v) => (
              <div key={v.vraag} className="py-6">
                <dt className="font-display text-lg text-ink">{v.vraag}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                  {v.antwoord}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[15px] text-muted">
            Staat je vraag er niet bij? Kijk op de{" "}
            <Link href="/" className="font-bold text-accent underline underline-offset-4">
              homepage van de hondenuitlaatservice
            </Link>{" "}
            of stuur gewoon een berichtje.
          </p>
        </div>
      </section>

      <Cta />
    </>
  )
}
