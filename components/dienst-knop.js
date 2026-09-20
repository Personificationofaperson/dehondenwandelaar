"use client"

import { RINGTWICE_URL } from "../lib/prijzen"
import { track, EVENTS } from "../lib/analytics"

export default function DienstKnop({ dienstId, label }) {
  return (
    <a
      href={RINGTWICE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(EVENTS.CONTACT_KLIK, { plek: "diensten", dienst: dienstId, kanaal: "ringtwice" })}
      className="btn btn-secondary mt-auto w-full"
    >
      {label}
    </a>
  )
}
