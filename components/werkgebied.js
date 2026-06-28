import { Icon } from "@iconify/react";

export default function Werkgebied() {
  return (
    <>
      <div id="werkgebied" className="lg:py-16 py-12 relative">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white mix-blend-overlay opacity-50 blur-[40px]"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#3A5A70] mix-blend-overlay opacity-10 blur-[40px]"></div>

        <div className="w-full relative z-10">
          <div className="text-center">
            <h2>Mijn Werkgebied</h2>
            <p>
              Om kwaliteit en veiligheid te garanderen, werk ik met specifieke zones. <br/>Zo voorkom ik onnodige reistijd, blijf ik flexibel, en gaat alle aandacht direct naar jouw hond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border-[4px] border-[#3A5A70] rounded-[2.5rem] p-8 md:p-10 text-center shadow-[8px_8px_0px_#3A5A70] flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border-[3px] border-[#3A5A70] flex items-center justify-center mb-6 transform -rotate-3">
                <Icon icon="solar:map-point-linear" className="text-3xl text-[#3A5A70]"></Icon>
              </div>
              <h3 className="tracking-tight">Directe Omgeving</h3>
              <span className="inline-block mx-auto px-4 py-1.5 rounded-full bg-[#B6D8F2] border-[2px] border-[#3A5A70] tracking-widest mb-6 shadow-[2px_2px_0px_#3A5A70]">
                Max 8 km radius
              </span>
              <h4 className="mb-2">Wandelingen &amp; Drop-ins</h4>
              <p>
                Gefocust op Dilsen-Stokkem en directe omstreken. Door lokaal te blijven kan ik snel schakelen, me flexibel opstellen en gaat de tijd écht naar de wandeling in plaats van de auto.
              </p>
            </div>

            <div className="bg-[#F4F2EC] border-[4px] border-[#3A5A70] rounded-[2.5rem] p-8 md:p-10 text-center shadow-[8px_8px_0px_#3A5A70] flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white border-[3px] border-[#3A5A70] flex items-center justify-center mb-6 transform rotate-3">
                <Icon icon="solar:routing-3-linear" className="text-3xl text-[#3A5A70]"></Icon>
              </div>
              <h3 className="mb-4">Ruimere Regio</h3>
              <div className="inline-block mx-auto px-4 py-1.5 rounded-full bg-white border-[2px] border-[#3A5A70] font-['Lilita_One'] text-sm tracking-widest uppercase mb-6 shadow-[2px_2px_0px_#3A5A70]">
                Tot 10 km radius
              </div>
              <h4 className="mb-2">Weekendwandeling</h4>
              <p>
                Tijdens de weekendwandeling is je hond dé VIP. Aangezien die dag volledig gereserveerd is voor jouw hond houd ik de afstand beperkt tot 10 km van het centrum van Dilsen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
