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
    <div className="w-screen left-1/2 -translate-x-1/2 relative bg-[#3A5A70] pt-20 pb-0">
      {/* TITEL + INTRO + KNOP */}
      <div className="w-full max-w-[80rem] mx-auto px-6 text-center">
        <h2 className="font-['Lilita_One'] uppercase tracking-tight text-white">
          Hondenuitlaatservice boeken<br/> omgeving Dilsen-Stokkem
        </h2>

        <p className="mt-4 text-white/80">
          Stuur me een bericht via Ring Twice en we plannen snel een fijne kennismaking in.
        </p>

        
        <a  href="https://wa.me/32468584998"
          target="_blank"
          className="inline-flex justify-center items-center h-12 px-6 rounded-full border-[3px] border-[#3A5A70] bg-[#B6D8F2] text-[#3A5A70] shadow-[3px_3px_0px_#1f3140] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-['Lilita_One'] uppercase tracking-tight text-xl"
        >
          Boek gratis kennismaking
        </a>
      </div>

      {/* FOTORIJ */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-6 px-6">
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