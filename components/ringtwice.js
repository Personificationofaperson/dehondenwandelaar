// components/RingTwice.js
import { Icon } from "@iconify/react";

export default function RingTwice() {
  return (
    <div className="w-full max-w-[80rem] mx-auto lg:py-16 py-8">
      <div className="relative border-[4px] border-[#3A5A70] rounded-[2.5rem] bg-white p-10 lg:p-12 overflow-hidden shadow-[8px_8px_0px_#B6D8F2]">
        {/* decoratieve cirkel rechtsboven */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-[4px] border-[#3A5A70] bg-[#F4F2EC]"></div>

        <div className="relative flex lg:flex-row flex-col items-start gap-6">
          {/* icoon */}
          <div className="w-16 h-16 rounded-full border-[3px] border-[#3A5A70] bg-[#B6D8F2] flex items-center justify-center shrink-0">
            <Icon icon="solar:shield-check-linear" className="text-3xl text-[#3A5A70]" />
          </div>

          {/* tekst + knop */}
          <div className="max-w-2xl">
            <h2 className="font-['Lilita_One'] uppercase tracking-tight">Veilig via <br/> Ring Twice</h2>

            <p className="mt-4 mb-8 opacity-90">
              Alle boekingen verlopen via Ring Twice. Hierdoor is elke opdracht automatisch verzekerd en verloopt de betaling voor jou 100% veilig. Geen gedoe, wel zekerheid.
            </p>

            
            <button href="https://wa.me/32468584998"
              target="_blank"
              className="hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              Boek gratis kennismaking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}