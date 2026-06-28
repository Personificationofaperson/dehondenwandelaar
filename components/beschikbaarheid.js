import { Icon } from "@iconify/react";

export default function Beschikbaarheid() {
  return (
    <div id="beschikbaarheid" className="section">
      <div className="w-full max-w-[80rem] mx-auto">
        <div className="intro flex flex-col justify-center text-center">
          <h2 className="text-center"> Wanneer is de hondenuitlaat&shy;service beschikbaar?</h2>
          <p className="text-center">
            Kijk in een oogopslag welke momenten het beste passen voor jou en je hond.
            <br /> Hulp nodig op een ander moment? Stuur me een berichtje!
          </p>
        </div>

        <div className="card-container grid grid-cols-1 md:grid-cols-2 gap-8">


        {/*CARD MA, DI & WOE*/}
        <div className="card border-[4px] border-[#3A5A70] rounded-[2.5rem] bg-white p-8 lg:p-10 flex flex-col transform -rotate-1 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0px_#B6D8F2] p-8">
          <div className="flex items-center gap-5 border-b-[3px] border-dashed border-[#3A5A70]/20 pb-6 mb-8">
            <div className="w-16 h-16 rounded-[1.25rem] border-[3.5px] border-[#3A5A70] flex items-center justify-center shrink-0 bg-[#B6D8F2] transform -rotate-6 shadow-[3px_3px_0px_#3A5A70]">
              <Icon icon="solar:calendar-date-linear" className="text-3xl text-[#3A5A70]"></Icon>
            </div>
            <div>
              <h3 className="font-['Lilita_One'] uppercase tracking-tight text-[#3A5A70] leading-none mb-1">Maandag,<br/>dinsdag &amp; Woensdag</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3A5A70]/50 mt-1">Of een andere dag in overleg</p>
            </div>
          </div>
          <div className="flex flex-col gap-8 flex-grow">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl border-[2.5px] border-[#3A5A70] bg-[#F4F2EC] flex items-center justify-center shrink-0">
                <Icon icon="solar:clock-circle-linear" className="text-xl text-[#3A5A70]"></Icon>
              </div>
              <div className="pt-1">
                <h4 className="font-['Lilita_One'] uppercase tracking-tight text-xl text-[#3A5A70] mb-1 leading-none">Middag&shy;wandelingen</h4>
                <p className="text-lg text-[#3A5A70]/80 font-semibold leading-snug">Tussen 12:00 en 13:30</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl border-[2.5px] border-[#3A5A70] bg-[#F4F2EC] flex items-center justify-center shrink-0">
                <Icon icon="solar:home-2-linear" className="text-xl text-[#3A5A70]"></Icon>
              </div>
              <div className="pt-1">
                <h4 className="font-['Lilita_One'] uppercase tracking-tight text-xl text-[#3A5A70] mb-1 leading-none">Drop-ins</h4>
                <p className="text-lg text-[#3A5A70]/80 font-semibold leading-snug">Korte bezoekjes of een plaspauze.</p>
              </div>
            </div>
          </div>
        </div>



        {/*CARD DO & VRIJ*/}
        <div className="border-[4px] border-[#3A5A70] rounded-[2.5rem] bg-[#B6D8F2] p-8 lg:p-10 flex flex-col transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0px_#3A5A70]">
          <div className="flex items-center gap-5 border-b-[3px] border-dashed border-[#3A5A70]/30 pb-6 mb-8">
            <div className="w-16 h-16 rounded-[1.25rem] border-[3.5px] border-[#3A5A70] flex items-center justify-center shrink-0 bg-white transform rotate-6 shadow-[3px_3px_0px_#3A5A70]">
              <Icon icon="solar:calendar-linear" className="text-3xl text-[#3A5A70]"></Icon>
            </div>
            <div>
              <h3 className="font-['Lilita_One'] uppercase tracking-tight text-[#3A5A70] leading-none mb-1">Donderdag<br/> &amp; Vrijdag</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#3A5A70]/60 mt-1">Of een andere dag in overleg</p>
            </div>
          </div>

          <div className="flex flex-col gap-8 flex-grow">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl border-[2.5px] border-[#3A5A70] bg-white flex items-center justify-center shrink-0">
                <Icon icon="solar:moon-linear" className="text-xl text-[#3A5A70]"></Icon>
              </div>
              <div className="pt-1">
                <h4 className="font-['Lilita_One'] uppercase tracking-tight text-xl text-[#3A5A70] mb-1 leading-none">Avond - of namiddag&shy;wandelingen</h4>
                <p className="text-lg text-[#3A5A70]/80 font-semibold leading-snug">Vanaf 17:30 de deur uit</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl border-[2.5px] border-[#3A5A70] bg-white flex items-center justify-center shrink-0">
                <Icon icon="solar:sun-fog-linear" className="text-xl text-[#3A5A70]"></Icon>
              </div>
              <div className="pt-1">
                <h4 className="font-['Lilita_One'] uppercase tracking-tight text-xl text-[#3A5A70] mb-1 leading-none">Vroege ochtend&shy;wandelingen</h4>
                <p className="text-lg text-[#3A5A70]/80 font-semibold leading-snug">Lukt het niet om de hond 's ochtends uit te laten? Ik help je graag in de vroege uurtjes!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-8 justify-center">
        <a 
          href="https://ringtwice.be/nl/listworkers/495768-kimberly-v"
          target="_blank"
          className="button">
          Kennismaking inplannen
        </a>
      </div>
    </div>
    </div>
  );
}
