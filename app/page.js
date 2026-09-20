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
    "Persoonlijke hondenuitlaatservice in Dilsen-Stokkem. Geen massale groepen, wel rust en aandacht. Bereken meteen je richtprijs inclusief reiskost.",
}

export default function Home() {
  return (
    <>
      <Hero />
      <Voordelen />
      <Diensten />
      <Reviews />
      <Calculator />
      <HoeWerktHet />
      <Praktisch />
      <Over />
      <Faq />
      <Cta />
    </>
  )
}
