import Image from "next/image"
import { RINGTWICE_URL, whatsappLink } from "../lib/prijzen"

const MENU = [
  { label: "Diensten", href: "#diensten" },
  { label: "Tarieven", href: "#tarieven" },
  { label: "Reviews", href: "#reviews" },
  { label: "Zo werkt het", href: "#hoe-werkt-het" },
  { label: "Werkgebied", href: "#werkgebied" },
  { label: "Over mij", href: "#over" },
  { label: "Veelgestelde vragen", href: "#faq" },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-700/10">
      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Image
            src="/dehondenwandelaar-logo.png"
            alt="De Hondenwandelaar"
            width={120}
            height={120}
            loading="lazy"
            className="mb-4 h-16 w-16 object-contain"
          />
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            De Hondenwandelaar biedt een persoonlijke en betrouwbare
            hondenuitlaatservice in Dilsen-Stokkem en omgeving. Ook voor liefdevolle
            hondenoppas kan je bij mij terecht.
          </p>
        </div>

        <nav aria-label="Footermenu">
          <h2 className="mb-4 font-display text-lg text-brand-900">Menu</h2>
          <ul className="space-y-2">
            {MENU.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-[15px] text-muted hover:text-clay-700 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-lg text-brand-900">Contact</h2>
          <ul className="space-y-2 text-[15px] text-muted">
            <li>Dilsen-Stokkem, Limburg</li>
            <li>Wandelingen: 8 km rondom Dilsen-Stokkem</li>
            <li>Oppas: tot 30 km rondom Dilsen-Stokkem</li>
            <li className="pt-2">
              <a
                href={whatsappLink("Hoi Kimberly! Ik heb een vraag over de hondenuitlaatservice.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-clay-700 hover:underline"
              >
                Stuur een WhatsApp
              </a>
            </li>
            <li>
              <a
                href={RINGTWICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-clay-700 hover:underline"
              >
                Boek via Ring Twice
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell border-t border-brand-700/10 py-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} De Hondenwandelaar — Dilsen-Stokkem
        </p>
      </div>
    </footer>
  )
}
