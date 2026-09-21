import Link from "next/link"
import Hero from "../components/hero"
import Voordelen from "../components/voordelen"
import Diensten from "../components/diensten"
import Reviews from "../components/reviews"
import Calculator from "../components/calculator"
import HoeWerktHet from "../components/hoe-werkt-het"
import Praktisch from "../components/praktisch"
import Over from "../components/over"
import Faq from "../components/faq"
import Cta from "../components/cta"

export const metadata = {
  title: "Hondenuitlaatservice Dilsen-Stokkem | De Hondenwandelaar",
  description:
    "Persoonlijke hondenuitlaatservice in Dilsen-Stokkem. Solo of in duo, nooit in groep. Bereken meteen je richtprijs inclusief reiskost.",
}

export default function Home() {
  return (
    <>
      <Hero />
      <Voordelen />
      <Diensten />
      <Reviews />
      {/* De prijsvraag zelf woont op /prijzen. Hier staat alleen de
          rekenmodule, met een andere kop, zodat de twee pagina's elkaar niet
          beconcurreren op hetzelfde zoekwoord. */}
      <Calculator
        titel="Bereken je prijs voor jouw adres"
        lead="Geen verrassingen achteraf. Kies je dienst, vul je adres in en je ziet meteen wat een wandeling kost, reiskost inbegrepen."
        onderKop={
          <p className="mt-4 text-[15px] text-muted">
            Liever eerst alle tarieven op een rij, met rekenvoorbeelden?{" "}
            <Link href="/prijzen" className="font-bold text-accent underline underline-offset-4">
              Bekijk de prijzenpagina
            </Link>
            .
          </p>
        }
      />
      <HoeWerktHet />
      <Praktisch />
      <Over />
      <Faq />
      <Cta />
    </>
  )
}
