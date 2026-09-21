"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  DIENSTEN,
  HONDEN_OPTIES,
  FREQUENTIES,
  DAGEN,
  MOMENTEN,
  MOMENTEN_SAMENVATTING,
  reiskost,
  euro,
  whatsappLink,
} from "../lib/prijzen"
import { track, EVENTS } from "../lib/analytics"
import Mailformulier from "./mailformulier"
import Poot from "./poot"

const CALCULEERBARE_DIENSTEN = DIENSTEN.filter((d) => d.inCalculator)

/**
 * De calculator staat zowel op de homepage als op /prijzen. Op de homepage
 * draagt hij zijn eigen kop, op /prijzen staat er al een kop boven en zetten
 * we die uit met toonKop={false}. Zo staat dezelfde h2 nooit twee keer op
 * dezelfde pagina.
 */
export default function Calculator({
  id = "tarieven",
  eyebrow = "Tarieven",
  titel = "Wat kost een hondenuitlaatservice in Dilsen-Stokkem?",
  lead = "Geen verrassingen achteraf. Kies je dienst, vul je adres in en je ziet meteen wat een wandeling voor jouw adres kost, reiskost inbegrepen.",
  toonKop = true,
  onderKop = null,
} = {}) {
  const idPrefix = useId()
  const gestart = useRef(false)
  // Het adres waarvoor we al bij Google zijn geweest, zodat we niet twee keer
  // hetzelfde opvragen.
  const laatsteAdres = useRef("")

  // Keuzes die meteen in de prijs doorwerken
  const [dienstId, setDienstId] = useState(CALCULEERBARE_DIENSTEN[0].id)
  const [aantalHonden, setAantalHonden] = useState(1)

  // Adres en afstand
  const [adres, setAdres] = useState({ straat: "", huisnummer: "", postcode: "", stad: "" })
  const [km, setKm] = useState(null)
  const [status, setStatus] = useState("leeg") // leeg | laden | klaar | fout
  const [foutmelding, setFoutmelding] = useState("")

  // Extra vragen
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [naam, setNaam] = useState("")
  const [frequentie, setFrequentie] = useState("")
  const [dagen, setDagen] = useState([])
  const [moment, setMoment] = useState("")
  const [startdatum, setStartdatum] = useState("")
  const [einddatum, setEinddatum] = useState("")

  const dienst = CALCULEERBARE_DIENSTEN.find((d) => d.id === dienstId)
  const hondenOptie = HONDEN_OPTIES.find((h) => h.aantal === aantalHonden)
  const reis = status === "klaar" && km != null ? reiskost(km, dienst.ritten) : 0
  const subtotaal = dienst.prijs + hondenOptie.meerprijs
  const totaal = subtotaal + reis
  const prijsKlaar = status === "klaar"

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

  function wisselDag(kort) {
    setDagen((d) => (d.includes(kort) ? d.filter((x) => x !== kort) : [...d, kort]))
  }

  function kiesFrequentie(id) {
    setFrequentie(id)
    // dag- en datumvelden verschillen per frequentie, dus leeg ze bij wissel
    setDagen([])
    setStartdatum("")
    setEinddatum("")
  }

  /**
   * Het adres is compleet genoeg om Google iets zinnigs te kunnen vragen.
   * De postcode moet vier cijfers zijn, anders sturen we requests weg die
   * toch niets opleveren.
   */
  function adresCompleet() {
    return (
      adres.straat.trim().length > 1 &&
      adres.huisnummer.trim() !== "" &&
      /^\d{4}$/.test(adres.postcode.trim()) &&
      adres.stad.trim().length > 1
    )
  }

  function adresAlsTekst() {
    return `${adres.straat.trim()} ${adres.huisnummer.trim()}, ${adres.postcode.trim()} ${adres.stad.trim()}`
  }

  /**
   * Rekent vanzelf zodra het adres compleet is, met een pauze van 800 ms na
   * de laatste toetsaanslag. Er stond eerst een knop tussen, maar naast de
   * prijskaart stond al een bedrag, dus niemand had een reden om erop te
   * drukken. En juist achter die knop zat de verzendknop.
   *
   * `laatsteAdres` onthoudt waarvoor we al gerekend hebben, zodat een
   * hertekening of een wijziging elders in het formulier geen tweede
   * request naar Google stuurt.
   */
  useEffect(() => {
    if (!adresCompleet()) return
    const tekst = adresAlsTekst()
    if (tekst === laatsteAdres.current) return

    const timer = setTimeout(() => {
      laatsteAdres.current = tekst
      berekenReiskost()
    }, 800)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adres.straat, adres.huisnummer, adres.postcode, adres.stad])

  async function berekenReiskost(e) {
    if (e) e.preventDefault()
    if (!adresCompleet()) return
    setStatus("laden")
    setFoutmelding("")

    const volledigAdres = adresAlsTekst()

    try {
      const res = await fetch(`/api/distance?destination=${encodeURIComponent(volledigAdres)}`)
      const data = await res.json()

      if (!res.ok || !data.distanceValue || Number.isNaN(Number(data.distanceValue))) {
        setStatus("fout")
        laatsteAdres.current = ""
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
        prijs: subtotaal + reiskost(afstand, dienst.ritten),
      })
    } catch {
      setStatus("fout")
      laatsteAdres.current = ""
      setFoutmelding(
        "Het berekenen lukte even niet. Probeer het zo nog eens, of stuur me gewoon een berichtje."
      )
    }
  }

  function datumNL(waarde) {
    if (!waarde) return null
    const [j, m, d] = waarde.split("-")
    return `${d}/${m}/${j}`
  }

  function dagenVoluit() {
    // in de volgorde van de week, niet in klikvolgorde
    return DAGEN.filter((d) => dagen.includes(d.kort)).map((d) => d.lang)
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

    const lijst = dagenVoluit()
    if (lijst.length > 0) {
      const label = frequentie === "structureel" ? "Vaste dagen" : "Dagen die het best passen"
      regels.push(`• ${label}: ${lijst.join(", ")}`)
    }

    if (moment) {
      regels.push(`• Moment van de dag: ${MOMENTEN.find((m) => m.id === moment)?.naam}`)
    }

    if (frequentie === "vakantie") {
      if (startdatum || einddatum) {
        regels.push(
          `• Periode: ${datumNL(startdatum) ?? "nog te bepalen"} tot ${
            datumNL(einddatum) ?? "nog te bepalen"
          }`
        )
      }
    } else if (startdatum) {
      regels.push(`• Liefst starten vanaf: ${datumNL(startdatum)}`)
    }

    regels.push("", naam ? `Groetjes, ${naam}` : "Groetjes!")
    return regels.join("\n")
  }

  const ingevuld = Boolean(frequentie || dagen.length > 0 || moment || startdatum || naam)

  function meetContact(positie, kanaal = "whatsapp") {
    track(EVENTS.CONTACT_KLIK, {
      plek: "calculator",
      positie,
      kanaal,
      dienst: dienst.korteNaam,
      aantal_honden: aantalHonden,
      prijs: totaal,
      frequentie: frequentie || "niet ingevuld",
      met_details: ingevuld,
    })
  }

  return (
    <section id={id} className="full-bleed bg-white">
      <div className="shell section">
        {toonKop && (
          <div className="max-w-2xl">
            <span className="eyebrow"><Poot size={13} /> {eyebrow}</span>
            <h2 className="mt-3">{titel}</h2>
            <p className="lead mt-4">{lead}</p>
            {onderKop}
          </div>
        )}

        <div className={`grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 ${toonKop ? "mt-12" : ""}`}>
          {/* ------------------------- FORMULIER ------------------------- */}
          <form onSubmit={berekenReiskost}>
            <fieldset className="border-0 p-0">
              <legend className="field-label !mb-3 !text-base">1. Welke dienst zoek je?</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {CALCULEERBARE_DIENSTEN.map((d) => (
                  <label
                    key={d.id}
                    className={`cursor-pointer rounded-2xl border-[1.5px] p-4 transition-all ${
                      dienstId === d.id
                        ? "border-accent bg-accent-soft shadow-soft"
                        : "border-ink/15 bg-white hover:border-ink/30"
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
                    <span className="block text-sm font-bold leading-snug text-ink">
                      {d.naam}
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-muted">
                      {d.duur}
                    </span>
                    <span className="mt-1 block font-display text-xl text-accent">
                      {euro(d.prijs)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8 border-0 p-0">
              <legend className="field-label !mb-1 !text-base">2. Hoeveel honden?</legend>
              <p className="mb-3 text-sm text-muted">
                Maximaal twee, en alleen als hun karakters bij elkaar passen.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {HONDEN_OPTIES.map((h) => (
                  <label
                    key={h.aantal}
                    className={`cursor-pointer rounded-pill border-[1.5px] px-5 py-2.5 text-sm font-bold transition-all ${
                      aantalHonden === h.aantal
                        ? "border-accent bg-accent-soft text-ink"
                        : "border-ink/15 bg-white text-muted hover:border-ink/30"
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
                      <span className="ml-1.5 font-semibold text-accent">
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

            {/* Geen knop meer: de reiskost wordt vanzelf opgehaald zodra het
                adres compleet is. Alleen bij een fout kan je het opnieuw
                proberen, want dan is er iets misgegaan dat je zelf niet ziet. */}
            <p aria-live="polite" className="mt-5 min-h-[1.5rem] text-sm text-muted">
              {status === "laden" && "Even de reiskost naar je adres ophalen…"}
              {prijsKlaar && (
                <span className="font-semibold text-moss">
                  Je totaalprijs staat hiernaast, inclusief reiskost.
                </span>
              )}
            </p>

            {status === "fout" && (
              <button type="submit" className="btn btn-outline mt-1">
                Opnieuw proberen
              </button>
            )}
          </form>

          {/* ------------------------- PRIJSKAART ------------------------- */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-moss px-7 py-6 text-white">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-moss-text">
                  Jouw richtprijs
                </span>
                {/* Zonder "vanaf" leest dit bedrag als het eindantwoord, en dan
                    drukt niemand meer op Berekenen. En juist achter die knop zit
                    de knop om je een bericht te sturen. */}
                <p className="mt-2 font-display text-5xl leading-none">
                  {!prijsKlaar && (
                    <span className="mr-2 align-middle font-body text-base font-semibold text-moss-text">
                      vanaf
                    </span>
                  )}
                  {euro(totaal)}
                </p>
                <p className="mt-2 text-sm text-moss-text">
                  {prijsKlaar
                    ? dienst.ritten > 1
                      ? `Inclusief ${dienst.ritten} ritten van en naar jouw adres op ${km} km.`
                      : `Inclusief reiskost voor ${km} km enkele rit.`
                    : "Vul je adres in, dan tel ik de reiskost er vanzelf bij."}
                </p>
              </div>

              <div className="px-7 py-6">
                <dl className="space-y-2.5 text-[15px]">
                  <Regel label={dienst.korteNaam} waarde={euro(dienst.prijs)} />
                  {hondenOptie.meerprijs > 0 && (
                    <Regel
                      label={`Meerprijs ${hondenOptie.naam}`}
                      waarde={`+ ${euro(hondenOptie.meerprijs)}`}
                    />
                  )}
                  <Regel
                    label={
                      dienst.ritten > 1
                        ? `Reiskost, ${dienst.ritten} ritten heen en terug`
                        : "Reiskost heen en terug"
                    }
                    waarde={prijsKlaar ? `+ ${euro(reis)}` : "nog te bepalen"}
                    grijs={!prijsKlaar}
                  />
                  <div className="flex items-baseline justify-between border-t border-ink/12 pt-3 font-bold text-ink">
                    <dt>{prijsKlaar ? "Totaal" : "Totaal, zonder reiskost"}</dt>
                    <dd className="font-display text-xl">
                      {prijsKlaar ? euro(totaal) : `vanaf ${euro(totaal)}`}
                    </dd>
                  </div>
                </dl>

                <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm">
                  {status === "fout" && (
                    <span className="font-semibold text-accent">{foutmelding}</span>
                  )}
                </p>

                {prijsKlaar ? (
                  <>
                    <VerzendKnoppen
                      bericht={bouwBericht()}
                      naam={naam}
                      onKlik={(kanaal) => meetContact("enig", kanaal)}
                      extra={
                        <ExtraVragen
                          idPrefix={idPrefix}
                          open={detailsOpen}
                          setOpen={(v) => {
                            setDetailsOpen(v)
                            if (v) track(EVENTS.DETAILS_GEOPEND)
                          }}
                          naam={naam}
                          setNaam={setNaam}
                          frequentie={frequentie}
                          kiesFrequentie={kiesFrequentie}
                          dagen={dagen}
                          wisselDag={wisselDag}
                          moment={moment}
                          setMoment={setMoment}
                          startdatum={startdatum}
                          setStartdatum={setStartdatum}
                          einddatum={einddatum}
                          setEinddatum={setEinddatum}
                        />
                      }
                    />
                  </>
                ) : (
                  /* De verzendknop zat volledig verborgen tot er gerekend was.
                     Niemand wist dus dat die knop er was, en er stond al een
                     bedrag op het scherm. Hier staat hij grijs in beeld, zodat
                     zichtbaar is wat die berekening oplevert. */
                  <>
                    {/* Een uitgeschakelde versie van de echte knop, met een
                        verzendpictogram. Een slotje leest als een blokkade, dit
                        leest als iets dat zo meteen kan. */}
                    <div
                      aria-hidden="true"
                      className="btn w-full cursor-default select-none bg-ink/[.07] text-muted"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 3 10.5 13.5" />
                        <path d="M21 3 14.5 21l-4-8-8-4L21 3Z" />
                      </svg>
                      Verstuur je aanvraag in één klik
                    </div>
                    <ul className="mt-4 space-y-2 text-xs leading-relaxed text-muted">
                      <li className="flex gap-2">
                        <span aria-hidden="true" className="text-accent">✓</span>
                        <span>
                          Je ziet wat het <strong className="text-ink">bij jou thuis</strong>{" "}
                          kost, reiskost inbegrepen
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span aria-hidden="true" className="text-accent">✓</span>
                        <span>
                          Je bericht staat klaar met je dienst, adres en prijs er al in,{" "}
                          <strong className="text-ink">je typt zelf niets</strong>
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span aria-hidden="true" className="text-accent">✓</span>
                        <span>Je kan het nog aanpassen voor je verstuurt</span>
                      </li>
                    </ul>
                    <p className="mt-3 text-center text-xs text-muted">
                      Vul hiernaast je adres in, de rest gaat vanzelf.
                    </p>
                  </>
                )}
              </div>
            </div>

            <p className="mt-4 px-2 text-xs leading-relaxed text-muted">
              Een richtprijs, geen offerte. De definitieve afspraak maken we samen tijdens de
              gratis kennismaking. Alle boekingen lopen via Ring Twice, waardoor elke opdracht
              verzekerd is.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * WhatsApp blijft de eerste keuze, maar er staat nu een mailknop onder voor
 * wie geen WhatsApp heeft of op een laptop zit. Zonder die tweede uitgang
 * liep een deel van de bezoekers dood op het moment dat ze wilden boeken.
 */
/**
 * Mail is de hoofdweg, want die werkt op elk apparaat. WhatsApp blijft
 * eronder staan, want bijna vier op de vijf bezoekers komt van mobiel en
 * daar is dat de laagste drempel.
 */
/**
 * Eén eindactie: versturen. WhatsApp stond hier eerst als tweede volle knop
 * in verzadigd groen, waardoor er twee even luide knoppen naast elkaar
 * stonden en geen van beide de primaire was. Nu is het een rustige
 * alternatieve link eronder.
 */
function VerzendKnoppen({ bericht, naam, extra, onKlik, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Mailformulier
        bericht={bericht}
        naam={naam}
        extra={extra}
        onVerstuurd={() => onKlik("email")}
      />
      <p className="mt-4 text-center text-xs text-muted">
        Liever via WhatsApp?{" "}
        <a
          href={whatsappLink(bericht)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onKlik("whatsapp")}
          className="font-bold text-accent underline underline-offset-4"
        >
          Stuur het zo door
        </a>
      </p>
    </div>
  )
}

function VerzendKnop({ href, onKlik, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onKlik}
      className={`btn btn-whatsapp w-full ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
      </svg>
      Stuur dit door via WhatsApp
    </a>
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
  frequentie,
  kiesFrequentie,
  dagen,
  wisselDag,
  moment,
  setMoment,
  startdatum,
  setStartdatum,
  einddatum,
  setEinddatum,
}) {
  const toontDagen = frequentie === "structureel" || frequentie === "sporadisch"
  const toontPeriode = frequentie === "vakantie"

  const dagLabel =
    frequentie === "structureel"
      ? "Welke dagen wil je vast?"
      : "Op welke dagen heb je me meestal nodig?"

  return (
    /* Dit stond eerst als een oranje kaart náást de verzendknop, en trok daar
       de aandacht weg van de eindactie. Binnen het formulier is het een
       ingeklapte, optionele regel: wie het invult krijgt sneller antwoord,
       wie het overslaat kan gewoon versturen. */
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-sand">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${idPrefix}-extra`}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span>
          <span className="block text-sm font-semibold text-ink">
            Wanneer heb je me nodig?{" "}
            <span className="font-normal text-muted">(optioneel)</span>
          </span>
          <span className="block text-xs text-muted">
            Vul je dit in, dan kan ik meteen zeggen of het past
          </span>
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#355B47"
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
        <div id={`${idPrefix}-extra`} className="space-y-5 border-t border-ink/8 px-5 py-5">
          <fieldset className="border-0 p-0">
            <legend className="field-label">Hoe vaak heb je me nodig?</legend>
            <div className="flex flex-col gap-2">
              {FREQUENTIES.map((f) => (
                <label
                  key={f.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-2.5 text-sm font-semibold transition-colors ${
                    frequentie === f.id
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-ink/15 bg-white text-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${idPrefix}-freq`}
                    checked={frequentie === f.id}
                    onChange={() => kiesFrequentie(f.id)}
                    className="sr-only"
                  />
                  {f.naam}
                </label>
              ))}
            </div>
          </fieldset>

          {toontDagen && (
            <fieldset className="border-0 p-0">
              <legend className="field-label">{dagLabel}</legend>
              <div className="flex flex-wrap gap-2">
                {DAGEN.map((dag) => (
                  <label
                    key={dag.kort}
                    className={`cursor-pointer rounded-xl border-[1.5px] px-3.5 py-2 text-sm font-bold transition-colors ${
                      dagen.includes(dag.kort)
                        ? "border-accent bg-accent-soft text-ink"
                        : "border-ink/15 bg-white text-muted"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={dagen.includes(dag.kort)}
                      onChange={() => wisselDag(dag.kort)}
                      className="sr-only"
                    />
                    <span className="sr-only">{dag.lang}</span>
                    <span aria-hidden="true">{dag.kort}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {toontPeriode && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor={`${idPrefix}-van`}>
                  Van
                </label>
                <input
                  id={`${idPrefix}-van`}
                  className="field"
                  type="date"
                  value={startdatum}
                  onChange={(e) => setStartdatum(e.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor={`${idPrefix}-tot`}>
                  Tot
                </label>
                <input
                  id={`${idPrefix}-tot`}
                  className="field"
                  type="date"
                  min={startdatum || undefined}
                  value={einddatum}
                  onChange={(e) => setEinddatum(e.target.value)}
                />
              </div>
            </div>
          )}

          {frequentie && (
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
                <option value="">Nog te bespreken</option>
                {MOMENTEN.filter((m) => m.id !== "overleg").map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.naam}
                  </option>
                ))}
              </select>
              {/* Wanneer ik kan, los van wat de bezoeker kiest. Zolang er niets
                  gekozen is staat het overzicht er, daarna enkel de regel die
                  bij die keuze hoort. */}
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {moment
                  ? MOMENTEN.find((m) => m.id === moment)?.toelichting
                  : MOMENTEN_SAMENVATTING}
              </p>

              {moment === "middag" && (
                <p className="mt-2 rounded-xl bg-accent-soft px-3.5 py-2.5 text-xs leading-relaxed text-accent">
                  Mijn solo-plekken in de middag zijn volzet. Een middagwandeling kan enkel
                  als jouw hond kan meelopen met een retriever die ik al vast uitlaat. Ik
                  laat je eerlijk weten of dat past.
                </p>
              )}
            </div>
          )}

          {toontDagen && (
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
          )}

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
        </div>
      )}
    </div>
  )
}
