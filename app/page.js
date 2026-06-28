import Voordelen from "../components/voordelen"
import Beschikbaarheid from "../components/beschikbaarheid"
import Diensten from "../components/diensten"
import Werkgebied from "../components/werkgebied"
import Over from "../components/over"
import RingTwice from "../components/ringtwice"
import CTA from "../components/cta"
import Prijscalculator from "../components/calculator"
import Image from "next/image"

// REGEL 10 mag helemaal LEEG blijven (verwijder 'import { Metadata } ...')

export const metadata = {
  title: 'De Hondenwandelaar | Professionele Hondenuitlaatservice in Dilsen-Stokkem',
  description: 'Zoek je een betrouwbare hondenuitlaatservice? Wij laten jouw hond met liefde uit. Bekijk onze tarieven rondom Dilsen-Stokkem.',
  openGraph: {
    title: 'De Hondenwandelaar | Professionele Hondenuitlaatservice',
    description: 'Zoek je een betrouwbare hondenuitlaatservice? Wij laten jouw hond met liefde uit.',
    url: 'https://dehondenwandelaar.be', // Pas dit aan naar jouw echte domein
    type: 'website',
  },
};


export default function Home() {
  return (
    <main>
    <div className="flex flex-col lg:flex-row justify-center pt-2 lg:pt-20 gap-4 lg:gap-32"> 
      <div className="lg:w-1/2 w-full"> {/*Make container half of parent*/}
        <span className="hidden lg:inline-block border-2 border-[color:var(--dark-blue)] rounded-full px-7 py-3 shadow-[4px_4px_0px_0px_var(--accent-color)] bg-neutral-50 font-[var(--font-text)] inline-block mb-6">Nu beschikbaar</span>
        <h1>Honden&shy;uitlaatservice</h1>
        <h3>@Dilsen-Stokkem</h3>
        <p className="break-words">Geen massale groepen of gehaaste wandelingen in regio Dilsen-Stokkem. Ik anticipeer op de omgeving en waarborg de rust, zodat jij je hond met een gerust hart meegeeft.</p>
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
          <a className="button" href="https://ringtwice.be/nl/listworkers/495768-kimberly-v">Boek je gratis kennismaking</a>
          <a href="https://api.whatsapp.com/send/?phone=32468584998&text=Hoi%21+Ik+heb+een+vraag+over%3A+%5BPrijs+%2F+Beschikbaarheid+%2F+Iets+anders%5D.+Het+gaat+om+de+dienst%3A+%5BNaam+dienst%5D.+Groetjes%2C+%5BNaam%5D&type=phone_number&app_absent=0&utm_campaign=website&utm_source=google" className="button !bg-[var(--accent-color)]">Vragen? Neem contact op</a>
        </div>
      </div>
      <div className="lg:w-1/2 w-full bg-[var(--accent-color)] rounded-full flex justify-center items-center">
        <div className="rotate-wrapper lg:h-[500px] !h-[316px] !rounded-[50%_50%_40%_60%/60%_40%_50%_50%] flex justify-center items-center"></div>   
        <Image width={600} height={600} src="/hondenuitlaatservice-met-mechelse-herder.webp" loading="eager" alt="hondenwondelaar met Mechelse Herder" className="border-8 border-white !rounded-[50%_50%_40%_60%/60%_40%_50%_50%] lg:h-[500px] h-[316px] mx-auto my-8 w-full object-bottom object-cover"></Image>
      </div>
    </div>
    <Voordelen/>
    <Beschikbaarheid/>
    <Diensten/>
    <Werkgebied/>
    <Over/>
    <Prijscalculator/>
    <RingTwice/>
    <CTA/>
    </main>

  );
}