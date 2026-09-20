"use client"

import { useId, useRef, useState } from "react"
import {
  DIENSTEN,
  HONDEN_OPTIES,
  FREQUENTIES,
  DAGEN,
  MOMENTEN,
  reiskost,
  euro,
  whatsappLink,
} from "../lib/prijzen"
import { track, EVENTS } from "../lib/analytics"

const CALCULEERBARE_DIENSTEN = DIENSTEN.filter((d) => d.inCalculator)

export default function Calculator() {
  const idPrefix = useId()
  const gestart = useRef(false)

  // Keuzes die meteen in de prijs doorwerken
  const [dienstId, setDienstId] = useState(CALCULEERBARE_DIENSTEN[0].id)
  const [aantalHonden, setAantalHonden] = useState(1)

  // Adres en afstand
  const [adres, setAdres] = useState({ straat: "", huisnummer: "", postcode: "", stad: "" })
  const [km, setKm] = useState(null)
  const [status, setStatus] = useState("leeg") // leeg | laden | klaar | fout
  const [foutmelding, setFoutmelding] = useState("")

  // Optionele extra vragen
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [naam, setNaam] = useState("")
  const [dagen, setDagen] = useState([])
  const [moment, setMoment] = useState("")
  const [frequentie, setFrequentie] = useState("")
  const [startdatum, setStartdatum] = useState("")

  const dienst = CALCULEERBARE_DIENSTEN.find((d) => d.id === dienstId)
  const hondenOptie = HONDEN_OPTIES.find((h) => h.aantal === aantalHonden)
  const reis = status === "klaar" && km != null ? reiskost(km) : 0
  const subtotaal = dienst.prijs + hondenOptie.meerprijs
  const totaal = subtotaal + reis

  function eersteInteractie() {
    if (gestart.current) return
    gestart.current = true
    track(EVENTS.CALCULATOR_START)
  }

  function wijzigAdres(veld, waarde) {
    eersteInteractie()
    setAdres((a) => ({ ...a, [veld]: waarde }))
    if (status === "klaar" || status === "fout") {
      setStatus("leeg")
      setKm(null)
    }
  }

  function wisselDag(dag) {
    setDagen((d) => (d.includes(dag) ? d.filter((x) => x !== dag) : [...d, dag]))
  }

  async function berekenReiskost(e) {
    e.preventDefault()
    setStatus("laden")
    setFoutmelding("")

    const volledigAdres = `${adres.straat} ${adres.huisnummer}, ${adres.postcode} ${adres.stad}`

    try {
      const res = await fetch(`/api/distance?destination=${encodeURIComponent(volledigAdres)}`)
      const data = await res.json()

      if (!res.ok || !data.distanceValue || Number.isNaN(Number(data.distanceValue))) {
        setStatus("fout")
        setFoutmelding(
          res.status === 404
            ? "Dat adres vinden we niet terug. Klopt de straatnaam en de postcode?"
            : "Het berekenen lukte even niet. Probeer het zo nog eens, of stuur me gewoon een berichtje."
        )
        return
      }

      const afstand = Number(data.distanceValue)
      setKm(afstand)
      setStatus("klaar")
      track(EVENTS.PRIJS_BEREKEND, {
        dienst: dienst.korteNaam,
        aantal_honden: aantalHonden,
        afstand_km: afstand,
        prijs: subtotaal + reiskost(afstand),
      })
    } catch {
      setStatus("fout")
      setFoutmelding(
        "Het berekenen lukte even niet. Probeer het zo nog eens, of stuur me gewoon een berichtje."
      )
    }
  }

  function bouwBericht() {
    const regels = [
      "Hoi Kimberly! Ik heb je prijscalculator gebruikt en zou graag een kennismaking inplannen.",
      "",
      `• Dienst: ${dienst.korteNaam}`,
      `• Aantal honden: ${hondenOptie.naam}`,
      `• Adres: ${adres.straat} ${adres.huisnummer}, ${adres.postcode} ${adres.stad}`,
      `• Richtprijs volgens de calculator: ${euro(totaal)} (incl. ${euro(reis)} reiskost)`,
    ]

    if (frequentie) {
      regels.push(`• Hoe vaak: ${FREQUENTIES.find((f) => f.id === frequentie)?.naam}`)
    }
    if (dagen.length > 0) {
      regels.push(`• Gewenste dagen: ${dagen.join(", ")}`)
    }
    if (moment) {
      regels.push(`• Gewenst moment: ${MOMENTEN.find((m) => m.id === moment)?.naam}`)
    }
    if (startdatum) {
      regels.push(`• Liefst starten vanaf: ${startdatum}`)
    }

    regels.push("", naam ? `Groetjes, ${naam}` : "Groetjes!")
    return regels.join("\n")
  }

  const prijsKlaar = status === "klaar"

  return (
    <section id="tarieven" className="full-bleed bg-white">
      <div className="shell section">
        <div className="max-w-2xl">
          <span className="eyebrow">Tarieven</span>
          <h2 className="mt-3">Bereken je richtprijs in twee tellen</h2>
          <p className="lead mt-4">
            Geen verrassingen achteraf. Kies je dienst, vul je adres in en je ziet
            meteen wat een wandeling voor jouw adres kost — reiskost inbegrepen.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* ------------------------- FORMULIER ------------------------- */}
          <form onSubmit={berekenReiskost} noValidate={false}>
            <fieldset className="border-0 p-0">
              <legend className="field-label !mb-3 !text-base">1. Welke dienst zoek je?</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {CALCULEERBARE_DIENSTEN.map((d) => (
                  <label
                    key={d.id}
                    className={`cursor-pointer rounded-2xl border-[1.5px] p-4 transition-all ${
                      dienstId === d.id
                        ? "border-clay-700 bg-clay-100 shadow-soft"
                        : "border-brand-700/20 bg-white hover:border-brand-700/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${idPrefix}-dienst`}
                      value={d.id}
                      checked={dienstId === d.id}
                      onChange={() => {
                        eersteInteractie()
                        setDienstId(d.id)
                      }}
                      className="sr-only"
                    />
                    <span className="block text-sm font-bold leading-snug text-brand-900">
                      {d.korteNaam}
                    </span>
                    <span className="mt-1 block font-display text-xl text-clay-700">
                      {euro(d.prijs)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8 border-0 p-0">
              <legend className="field-label !mb-3 !text-base">2. Hoeveel honden?</legend>
              <div className="flex flex-wrap gap-2.5">
                {HONDEN_OPTIES.map((h) => (
                  <label
                    key={h.aantal}
                    className={`cursor-pointer rounded-pill border-[1.5px] px-5 py-2.5 text-sm font-bold transition-all ${
                      aantalHonden === h.aantal
                        ? "border-clay-700 bg-clay-100 text-brand-900"
                        : "border-brand-700/20 bg-white text-muted hover:border-brand-700/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`${idPrefix}-honden`}
                      value={h.aantal}
                      checked={aantalHonden === h.aantal}
                      onChange={() => {
                        eersteInteractie()
                        setAantalHonden(h.aantal)
                      }}
                      className="sr-only"
                    />
                    {h.naam}
                    {h.meerprijs > 0 && (
                      <span className="ml-1.5 font-semibold text-clay-700">
                        +{euro(h.meerprijs)}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8 border-0 p-0">
              <legend className="field-label !mb-1 !text-base">3. Waar woon je?</legend>
              <p className="mb-3 text-sm text-muted">
                Nodig om de reiskost te berekenen. Je adres wordt nergens opgeslagen.
              </p>

              <div className="grid gap-3 sm:grid-cols-[1fr_7rem]">
                <div>
                  <label className="field-label" htmlFor={`${idPrefix}-straat`}>
                    Straatnaam
                  </label>
                  <input
                    id={`${idPrefix}-straat`}
                    className="field"
                    type="text"
                    required
                    autoComplete="address-line1"
                    placeholder="De Wachterstraat"
                    value={adres.straat}
                    onChange={(e) => wijzigAdres("straat", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor={`${idPrefix}-nr`}>
                    Nummer
                  </label>
                  <input
                    id={`${idPrefix}-nr`}
                    className="field"
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="31"
                    value={adres.huisnummer}
                    onChange={(e) => wijzigAdres("huisnummer", e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[7rem_1fr]">
                <div>
                  <label className="field-label" htmlFor={`${idPrefix}-postcode`}>
                    Postcode
                  </label>
                  <input
                    id={`${idPrefix}-postcode`}
                    className="field"
                    type="text"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{4}"
                    autoComplete="postal-code"
                    placeholder="3650"
                    value={adres.postcode}
                    onChange={(e) => wijzigAdres("postcode", e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor={`${idPrefix}-stad`}>
                    Gemeente
                  </label>
                  <input
                    id={`${idPrefix}-stad`}
                    className="field"
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="Dilsen-Stokkem"
                    value={adres.stad}
                    onChange={(e) => wijzigAdres("stad", e.target.value)}
                  />
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto" disabled={status === "laden"}>
              {status === "laden" ? "Even rekenen…" : prijsKlaar ? "Opnieuw berekenen" : "Bereken mijn richtprijs"}
            </button>
          </form>

          {/* ------------------------- PRIJSKAART ------------------------- */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-brand-900 px-7 py-6 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-200">
                  Jouw richtprijs
                </span>
                <p className="mt-2 font-display text-5xl leading-none">{euro(totaal)}</p>
                <p className="mt-2 text-sm text-brand-100">
                  {prijsKlaar
                    ? `Inclusief reiskost voor ${km} km enkele rit.`
                    : "Reiskost komt hier nog bij zodra je je adres invult."}
                </p>
              </div>

              <div className="px-7 py-6">
                <dl className="space-y-2.5 text-[15px]">
                  <Regel label={dienst.korteNaam} waarde={euro(dienst.prijs)} />
                  {hondenOptie.meerprijs > 0 && (
                    <Regel label={`Meerprijs ${hondenOptie.naam}`} waarde={`+ ${euro(hondenOptie.meerprijs)}`} />
                  )}
                  <Regel
                    label="Reiskost heen en terug"
                    waarde={prijsKlaar ? `+ ${euro(reis)}` : "nog te bepalen"}
                    grijs={!prijsKlaar}
                  />
                  <div className="flex items-baseline justify-between border-t border-brand-700/15 pt-3 font-bold text-brand-900">
                    <dt>Totaal</dt>
                    <dd className="font-display text-xl">{euro(totaal)}</dd>
                  </div>
                </dl>

                <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
                  {status === "fout" && <span className="font-semibold text-clay-700">{foutmelding}</span>}
                </p>

                {prijsKlaar ? (
                  <>
                    <a
                      href={whatsappLink(bouwBericht())}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track(EVENTS.CONTACT_KLIK, {
                          plek: "calculator",
                          kanaal: "whatsapp",
                          dienst: dienst.korteNaam,
                          aantal_honden: aantalHonden,
                          prijs: totaal,
                          met_details: detailsOpen && (dagen.length > 0 || Boolean(moment) || Boolean(frequentie)),
                        })
                      }
                      className="btn btn-whatsapp w-full"
                    >
                      Stuur dit door via WhatsApp
                    </a>
                    <p className="mt-3 text-center text-xs text-muted">
                      Je gegevens worden alvast in het bericht gezet. Je kan alles nog
                      aanpassen voor je verstuurt.
                    </p>

                    <ExtraVragen
                      idPrefix={idPrefix}
                      open={detailsOpen}
                      setOpen={(v) => {
                        setDetailsOpen(v)
                        if (v) track(EVENTS.DETAILS_GEOPEND)
                      }}
                      naam={naam}
                      setNaam={setNaam}
                      dagen={dagen}
                      wisselDag={wisselDag}
                      moment={moment}
                      setMoment={setMoment}
                      frequentie={frequentie}
                      setFrequentie={setFrequentie}
                      startdatum={startdatum}
                      setStartdatum={setStartdatum}
                    />
                  </>
                ) : (
                  <p className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-muted">
                    Vul je adres in en druk op <strong className="text-brand-900">Bereken mijn
                    richtprijs</strong>. Daarna kan je alles in één klik naar me doorsturen.
                  </p>
                )}
              </div>
            </div>

            <p className="mt-4 px-2 text-xs leading-relaxed text-muted">
              Een richtprijs, geen offerte. De definitieve afspraak maken we samen tijdens
              de gratis kennismaking. Alle boekingen lopen via Ring Twice, waardoor elke
              opdracht verzekerd is.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Regel({ label, waarde, grijs }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={grijs ? "text-muted" : "text-ink"}>{label}</dt>
      <dd className={`whitespace-nowrap font-semibold ${grijs ? "text-muted" : "text-ink"}`}>
        {waarde}
      </dd>
    </div>
  )
}

function ExtraVragen({
  idPrefix,
  open,
  setOpen,
  naam,
  setNaam,
  dagen,
  wisselDag,
  moment,
  setMoment,
  frequentie,
  setFrequentie,
  startdatum,
  setStartdatum,
}) {
  return (
    <div className="mt-5 rounded-2xl border border-brand-700/15 bg-brand-50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${idPrefix}-extra`}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span>
          <span className="block text-sm font-bold text-brand-900">
            Nog even dit, dan weet ik meteen alles
          </span>
          <span className="block text-xs text-muted">
            Optioneel — scheelt ons een paar berichtjes heen en weer
          </span>
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3A5A70"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div id={`${idPrefix}-extra`} className="space-y-5 border-t border-brand-700/10 px-5 py-5">
          <div>
            <label className="field-label" htmlFor={`${idPrefix}-naam`}>
              Hoe heet je?
            </label>
            <input
              id={`${idPrefix}-naam`}
              className="field"
              type="text"
              autoComplete="given-name"
              placeholder="Je voornaam"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
            />
          </div>

          <fieldset className="border-0 p-0">
            <legend className="field-label">Hoe vaak heb je me nodig?</legend>
            <div className="flex flex-col gap-2">
              {FREQUENTIES.map((f) => (
                <label
                  key={f.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-2.5 text-sm font-semibold transition-colors ${
                    frequentie === f.id
                      ? "border-clay-700 bg-clay-100 text-brand-900"
                      : "border-brand-700/20 bg-white text-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${idPrefix}-freq`}
                    checked={frequentie === f.id}
                    onChange={() => setFrequentie(f.id)}
                    className="sr-only"
                  />
                  {f.naam}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="border-0 p-0">
            <legend className="field-label">Welke dagen passen het best?</legend>
            <div className="flex flex-wrap gap-2">
              {DAGEN.map((dag) => (
                <label
                  key={dag}
                  className={`cursor-pointer rounded-xl border-[1.5px] px-3.5 py-2 text-sm font-bold transition-colors ${
                    dagen.includes(dag)
                      ? "border-clay-700 bg-clay-100 text-brand-900"
                      : "border-brand-700/20 bg-white text-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={dagen.includes(dag)}
                    onChange={() => wisselDag(dag)}
                    className="sr-only"
                  />
                  {dag}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="field-label" htmlFor={`${idPrefix}-moment`}>
              Welk moment van de dag?
            </label>
            <select
              id={`${idPrefix}-moment`}
              className="field"
              value={moment}
              onChange={(e) => setMoment(e.target.value)}
            >
              <option value="">Maakt niet uit / nog te bespreken</option>
              {MOMENTEN.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.naam}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor={`${idPrefix}-start`}>
              Vanaf wanneer?
            </label>
            <input
              id={`${idPrefix}-start`}
              className="field"
              type="date"
              value={startdatum}
              onChange={(e) => setStartdatum(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
