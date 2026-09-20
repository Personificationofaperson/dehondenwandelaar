"use client"

import { RINGTWICE_URL, whatsappLink } from "../lib/prijzen"
import { track, EVENTS } from "../lib/analytics"

const WA_TEKST =
  "Hoi Kimberly! Ik heb een vraag over de hondenuitlaatservice. Het gaat om: [dienst]. Groetjes, [naam]"

export default function CtaKnoppen({ plek, className = "", licht = false }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <a
        href={RINGTWICE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(EVENTS.CONTACT_KLIK, { plek, kanaal: "ringtwice" })}
        className={`btn ${licht ? "btn-primary" : "btn-primary"}`}
      >
        Boek een gratis kennismaking
      </a>
      <a
        href={whatsappLink(WA_TEKST)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(EVENTS.CONTACT_KLIK, { plek, kanaal: "whatsapp" })}
        className={`btn ${licht ? "btn-ghost-light" : "btn-secondary"}`}
      >
        Stel eerst een vraag
      </a>
    </div>
  )
}
