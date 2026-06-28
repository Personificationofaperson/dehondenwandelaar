// components/Boeken.js
import Image from "next/image";

export default function CTA() {
  const fotos = [
    { src: "/hondenoppas.webp", alt: "Vrouw met witte hond", rotate: "-rotate-[20deg]" },
    { src: "/weekend-wandeling.webp", alt: "Vrouw aait grote, zwarte retriever", rotate: "rotate-[20deg]" },
    { src: "/hondenuitlaatservice-met-mechelse-herder.webp", alt: "Vrouw met Mechelse Herder", rotate: "-rotate-[10deg]" },
    { src: "/3-honden-wandeling.jpg", alt: "Vrouw wordt gevolgd door 3 kleine honden op een wandeling", rotate: "rotate-[20deg]" },
  ];

  return (
    <div className="full-bleed bg-[#3A5A70] section">
      {/* TITEL + INTRO + KNOP */}
      <div className="w-full max-w-[80rem] mx-auto px-4 md:px-6 text-center">
        <h2 className="font-['Lilita_One'] uppercase tracking-tight text-white">
          Honden&shy;uitlaatservice boeken<br/> omgeving Dilsen-Stokkem
        </h2>

        <p className="mt-4 text-white/80">
          Stuur me een bericht via Ring Twice en we plannen snel een fijne kennismaking in.
        </p>

        
        <a href="https://ringtwice.be/nl/listworkers/495768-kimberly-v"
          className="button !bg-[var(--bg-color)]">
          Boek gratis kennismaking
        </a>
      </div>

      {/* FOTORIJ */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 md:px-6">
        {fotos.map((foto, i) => (
          <div
            key={i}
            className={`border-[4px] border-[#1f3140] rounded-[1.5rem] overflow-hidden shadow-[6px_6px_0px_#1f3140] transform ${foto.rotate}`}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={500}
              height={500}
              className="w-full h-72 object-cover object-[bottom]-_50px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}