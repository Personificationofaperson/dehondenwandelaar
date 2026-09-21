"use client"

import { useState } from "react"
import { track, EVENTS } from "../lib/analytics"

/**
 * Stuurt de samenvatting uit de calculator naar Kimberly, via de eigen
 * server-route. Haar adres staat daar in een omgevingsvariabele, dus het komt
 * nooit in de browser.
 *
 * Dit vervangt de mailto-link. Die liet het adres zien in de broncode, en
 * deed bovendien niets bij iemand zonder ingesteld mailprogramma, wat op een
 * laptop met webmail vaak zo is.
 */
export default function Mailformulier({ bericht, naam, onVerstuurd }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("leeg") // leeg | laden | klaar | fout
  const [fout, setFout] = useState("")
  // Honeypot. Onzichtbaar voor mensen, bots vullen hem wel in.
  const [website, setWebsite] = useState("")

  async function verstuur(e) {
    e.preventDefault()
    setStatus("laden")
    setFout("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, naam, bericht, website }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus("fout")
        setFout(data.error || "Versturen lukte even niet. Probeer het zo nog eens.")
        return
      }

      setStatus("klaar")
      onVerstuurd?.()
    } catch {
      setStatus("fout")
      setFout("Versturen lukte even niet. Probeer het zo nog eens.")
    }
  }

  if (status === "klaar") {
    return (
      <div className="rounded-2xl bg-moss-soft px-5 py-4 text-center">
        <p className="font-display text-lg text-moss">Verstuurd, bedankt!</p>
        <p className="mt-1 text-sm text-muted">
          Ik antwoord meestal dezelfde dag. Kijk ook even in je spam, voor het geval
          dat.
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          track(EVENTS.CONTACT_KLIK, { plek: "calculator", kanaal: "email", stap: "geopend" })
        }}
        className="btn btn-primary w-full"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        Verstuur je aanvraag
      </button>
    )
  }

  return (
    <form onSubmit={verstuur} noValidate={false}>
      <label htmlFor="mail-afzender" className="field-label">
        Je e-mailadres
      </label>
      <input
        id="mail-afzender"
        type="email"
        required
        autoComplete="email"
        placeholder="jij@voorbeeld.be"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="field"
      />
      <p className="mt-1.5 text-xs text-muted">
        Daar antwoord ik op. Verder doe ik er niets mee.
      </p>

      {/* Honeypot: uit beeld en overgeslagen bij tabben, maar geen display:none
          omdat sommige bots daar juist op letten. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="mail-website">Website</label>
        <input
          id="mail-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button type="submit" disabled={status === "laden"} className="btn btn-primary mt-3 w-full">
        {status === "laden" ? "Versturen…" : "Versturen"}
      </button>

      <p aria-live="polite" className="mt-2 min-h-[1.25rem] text-center text-sm">
        {status === "fout" && <span className="font-semibold text-accent">{fout}</span>}
      </p>
    </form>
  )
}
