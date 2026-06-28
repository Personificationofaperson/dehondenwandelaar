// components/RingTwice.js
import { Icon } from "@iconify/react";

export default function RingTwice() {
  return (
    <div className="section">
      <div className="w-full max-w-[80rem] mx-auto py-8">
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

            
            <a href="https://api.whatsapp.com/send/?phone=32468584998&text=Hoi%21+Ik+heb+een+vraag+over%3A+%5BPrijs+%2F+Beschikbaarheid+%2F+Iets+anders%5D.+Het+gaat+om+de+dienst%3A+%5BNaam+dienst%5D.+Groetjes%2C+%5BNaam%5D&type=phone_number&app_absent=0&utm_campaign=website&utm_source=google"
              target="_blank"
              className="button"
            >
              Boek gratis kennismaking
            </a>
          </div>
        </div>
      </div>
    </div>
    <div/>
    </div>
  );
}