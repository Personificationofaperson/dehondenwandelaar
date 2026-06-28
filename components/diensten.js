import { Icon } from "@iconify/react";
import Image from "next/image"

export default function Diensten() {
  return (
    <>
    <div id="diensten" className="full-bleed bg-[#B6D8F2] section">
      <div className="absolute top-0 left-0 w-full leading-[0] rotate-180 -mt-[1px]">
        <svg viewBox="0 0 1440 120" fill="#F4F2EC" preserveAspectRatio="none" className="w-full h-12 md:h-24 block">
          <path d="M0,0 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="w-full max-w-[80rem] mx-auto px-4 md:px-6 mt-12 md:mt-20">
        <div className="grid md:grid-cols-2 items-center">
          <h2 className="font-['Lilita_One'] uppercase tracking-tight">Mijn Diensten</h2>
          <p className="md:border-l-[4px] border-[#3A5A70]/20 md:pl-6 ">
            Ik ben er om jouw dag makkelijker te maken en die van je hond leuker. Met persoonlijke wandelingen bied ik een veilige plek waar naar de noden van jouw hond wordt gekeken.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[80rem] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 gl:mt-16 mt-2 relative z-10">
        <div className="border-[4px] border-[#3A5A70] rounded-[2rem] overflow-hidden flex flex-col transition-transform duration-300 bg-white hover:-translate-y-2 bg-[#B6D8F2] shadow-[8px_8px_0px_#3A5A70] relative">
          <div className="absolute top-4 left-4 z-20 bg-white border-[3px] border-[#3A5A70] rounded-full px-4 py-1.5 flex items-center gap-2 shadow-[2px_2px_0px_#3A5A70]">
            <Icon icon="solar:star-bold" className="text-lg text-[#3A5A70]"></Icon>
            <span className="font-['Lilita_One'] text-sm uppercase tracking-tight text-[#3A5A70] pt-0.5">Dilsen-Stokkem</span>
          </div>

          <div className="h-56 w-full relative overflow-hidden border-b-[4px] border-[#3A5A70]">
            <Image
              width={600}
              height={600}
              src="/3-honden-wandeling.jpg"
              alt="Hond uitlaten"
              className="w-full h-full object-cover object-[center_-95px] transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full border-[3px] border-[#3A5A70] flex items-center justify-center z-10">
              <Icon icon="solar:routing-2-linear" className="text-2xl text-[#3A5A70]"></Icon>
            </div>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="font-['Lilita_One'] uppercase tracking-tight mb-4">De wandeling</h3>
            <p className="mb-6 flex-grow">
              Actieve, verfrissend wandeling in de eigen buurt. Ideaal terwijl jij aan het werk bent, even geen tijd hebt of gewoon een helpende hand nodig hebt met jouw viervoeter.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70] font-semibold text-sm">30-60 min</span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70] font-semibold text-sm">8 km rond Dilsen</span>
            </div>
            
              <a href="https://ringtwice.be/nl/listworkers/495768-kimberly-v"
              className="inline-flex justify-center items-center h-12 px-6 rounded-full border-[3px] border-[#3A5A70] bg-white text-[#3A5A70] shadow-[3px_3px_0px_#3A5A70] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-['Lilita_One'] uppercase tracking-tight text-xl w-full"
              target="_blank"
            >
              Boek wandeling
            </a>
          </div>
        </div>

        <div className="border-[4px] border-[#3A5A70] rounded-[2rem] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 bg-white shadow-[8px_8px_0px_#B6D8F2]">
          <div className="h-56 w-full relative overflow-hidden border-b-[4px] border-[#3A5A70]">
            <Image
              width={600}
              height={600}
              src="/weekend-wandeling.webp"
              alt="Hond aan de deur"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full border-[3px] border-[#3A5A70] flex items-center justify-center z-10">
              <Icon icon="solar:sun-linear" className="text-xl text-[#3A5A70]"></Icon>
            </div>
          </div>
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="font-['Lilita_One'] uppercase tracking-tight text-3xl md:text-4xl mb-4">Toffe weekend&shy;wandeling</h3>
            <p className="mb-6 flex-grow">
              Weekendje weg of gewoon geen tijd? Ik neem je hond uren op sjok, zodat hij erna voldaan kan soezen bij thuiskomst. Je hond blijft in zijn vertrouwde omgeving na urenlang avontuur terwijl jij zorgeloos van je welverdiende rust geniet.  
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70]">Uren plezier</span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70]">8km van Dilsen</span>
            </div>
            
             <a href="https://ringtwice.be/nl/listworkers/495768-kimberly-v"
              className="inline-flex justify-center items-center h-12 px-6 rounded-full border-[3px] border-[#3A5A70] bg-white text-[#3A5A70] shadow-[3px_3px_0px_#3A5A70] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-['Lilita_One'] uppercase tracking-tight text-xl w-full mt-auto"
              target="_blank">
              Boek wandeling
            </a>
          </div>
        </div>

        <div className="border-[4px] border-[#3A5A70] rounded-[2rem] overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 bg-white shadow-[8px_8px_0px_#3A5A70]">
          <div className="h-56 w-full relative overflow-hidden border-b-[4px] border-[#3A5A70] bg-[#F4F2EC]">
            <div className="w-full h-full flex items-center justify-center">
            <Image
              width={600}
              height={600}
              src="/hondenoppas.webp"
              alt="Hond aan de deur"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full border-[3px] border-[#3A5A70] flex items-center justify-center z-10">
              <Icon icon="solar:home-2-linear" className="text-2xl text-[#3A5A70]"></Icon>
            </div>
          </div>
          <div className="p-8 flex flex-col flex-grow bg-white">
            <h3 className="font-['Lilita_One'] uppercase tracking-tight text-3xl md:text-4xl mb-4">De drop-in</h3>
            <p className="mb-6 flex-grow">
              De ideale oplossing voor actieve pups die nog niet volledig zindelijk zijn, én voor senioren die extra aandacht, vers water of korte sanitaire stop kunnen gebruiken. De drop-in wordt aangepast aan wat nodig is voor de hond!
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70]">15 min</span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-white border-[2px] border-[#3A5A70] shadow-[2px_2px_0px_#3A5A70]">Max 5 km rond Dilsen</span>
            </div>
            
              <a href="https://ringtwice.be/nl/listworkers/495768-kimberly-v"
              className="inline-flex justify-center items-center h-12 px-6 rounded-full border-[3px] border-[#3A5A70] bg-white text-[#3A5A70] shadow-[3px_3px_0px_#3A5A70] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-['Lilita_One'] uppercase tracking-tight text-xl w-full mt-auto"
              target="_blank">
              Boek drop-in
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}