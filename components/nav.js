"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { RINGTWICE_URL } from "../lib/prijzen"
import { track, EVENTS } from "../lib/analytics"

const LINKS = [
  { label: "Diensten", href: "#diensten" },
  { label: "Tarieven", href: "#tarieven" },
  { label: "Reviews", href: "#reviews" },
  { label: "Werkgebied", href: "#werkgebied" },
  { label: "Over mij", href: "#over" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [gescrold, setGescrold] = useState(false)

  useEffect(() => {
    const onScroll = () => setGescrold(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Escape sluit het mobiele menu
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${
        gescrold ? "shadow-soft" : ""
      }`}
      style={{ backgroundColor: "rgba(244,242,236,.88)", backdropFilter: "blur(12px)" }}
    >
      <nav aria-label="Hoofdnavigatie" className="shell">
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="De Hondenwandelaar, naar boven">
            <Image
              src="/dehondenwandelaar-logo.png"
              alt=""
              width={96}
              height={96}
              priority
              className="h-11 w-11 object-contain"
            />
            <span className="hidden font-display text-lg leading-none text-brand-900 sm:block">
              De Hondenwandelaar
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[15px] font-semibold text-brand-700 transition-colors hover:text-clay-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={RINGTWICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(EVENTS.CONTACT_KLIK, { plek: "nav", kanaal: "ringtwice" })}
              className="btn btn-primary !min-h-[2.75rem] !px-4 !text-[15px] sm:!px-5"
            >
              <span className="sm:hidden">Kennismaking</span>
              <span className="hidden sm:inline">Gratis kennismaking</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-700/20 bg-white text-brand-900 lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <ul id="mobiel-menu" className="border-t border-brand-700/10 py-2 lg:hidden">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-brand-700/10 py-3 font-semibold text-brand-900 last:border-0"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}
