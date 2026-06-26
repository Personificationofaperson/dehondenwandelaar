import { Icon } from "@iconify/react";
import Image from "next/image"

export default function Over() {
  const punten = [ //array met objecten
    {
      icon: "solar:heart-linear",
      tekst:
        "Veiligheid voorop: ik behandel je hond alsof het de mijne is. Ik neem jouw vertrouwen serieus en scan de omgeving continu om problemen te voorkomen.",
    },
    {
      icon: "solar:hand-heart-linear",
      tekst:
        "20+ jaar ervaring met allerlei soorten honden. Van kleine maltezers tot grote herders en van explosieve, energieke karakters tot rustige levensgenieters.",
    },
    {
      icon: "solar:eye-linear",
      tekst:
        "Analytisch ingesteld: ik kijk echt naar de lichaamstaal en gedragingen van je hond om mijn aanpak hierop aan te passen.",
    },
    {
      icon: "solar:bolt-linear",
      tekst:
        "Flexibiliteit is bij mij de kern. Twijfel je of ik beschikbaar ben? Stuur gewoon een berichtje!",
    },
  ];

  return (
    <div id="over" className="w-full py-0 lg:py-16 grid md:grid-cols-2 gap-16 items-center">
      {/* FOTO met gestapelde frames */}
      <div className="relative">
        {/* achterste frame, licht gedraaid */}
        <div className="absolute inset-0 border-[4px] border-[#3A5A70] rounded-[2.5rem] bg-[#B6D8F2] transform rotate-3"></div>

        {/* voorste frame met foto */}
        <div className="relative border-[4px] border-[#3A5A70] rounded-[2.5rem] bg-white p-3 transform -rotate-2 shadow-[8px_8px_0px_#3A5A70]">
          <Image
            width={600}
            height={600}
            src="/hondenoppas.webp"
            alt="De hondenwandelaar met hond"
            className="w-full h-auto rounded-[2rem] object-cover"
          />

          {/* "Hoi!" badge linksboven */}
          <div className="absolute -top-5 left-6 bg-white border-[3px] border-[#3A5A70] rounded-full px-4 py-1.5 shadow-[2px_2px_0px_#3A5A70]">
            <span className="font-['Lilita_One'] text-sm uppercase tracking-tight text-[#3A5A70]">
              Hoi! 👋
            </span>
          </div>

          {/* smiley badge rechtsonder */}
          <div className="absolute -bottom-5 right-6 w-12 h-12 bg-white border-[3px] border-[#3A5A70] rounded-full flex items-center justify-center shadow-[2px_2px_0px_#3A5A70]">
            <Icon icon="solar:smile-circle-linear" className="text-2xl text-[#3A5A70]" />
          </div>
        </div>
      </div>

      {/* TEKST */}
      <div>
        <h2 className="font-['Lilita_One'] uppercase tracking-tight">Zorgvuldige uitlaatservice</h2>

        <p>
          Jouw hond is een waardevol deel van je gezin. Mijn doel is om jullie beiden volledig te ontzorgen met een veilige, waardevolle en begripvolle aanpak:
        </p>

        <div className="flex flex-col gap-7">
          {punten.map((punt, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border-[3px] border-[#3A5A70] bg-[#B6D8F2] flex items-center justify-center shrink-0">
                <Icon icon={punt.icon} className="text-xl text-[#3A5A70]" />
              </div>
              <p className="mb-0">{punt.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}