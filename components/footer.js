// components/Footer.js
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function Footer() {
  const menu = [
    { label: "Voordelen", href: "#voordelen" },
    { label: "Beschikbaarheid", href: "#beschikbaarheid" },
    { label: "Diensten", href: "#diensten" },
    { label: "Werkgebied", href: "#werkgebied" },
    { label: "Over", href: "#over" },
    { label: "Tarieven", href: "#tarieven" },
  ];

  return (
    <footer className="w-full max-w-[80rem] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* LOGO + INTRO */}
      <div>
        <Image src="/dehondenwandelaar-logo.png" alt="De Hondenwandelaar" width={120} height={120} className="w-28 h-auto mb-4" />
        <p className="text-sm mb-0">
          De Hondenwandelaar biedt een persoonlijke en betrouwbare hondenuitlaatservice aan. Je kan ook gebruikmaken van liefdevolle hondenoppasdiensten.
        </p>
      </div>

      {/* MENU */}
      <div>
        <h4 className="mb-4">Menu</h4>
        <ul className="flex flex-col gap-2">
          {menu.map((item) => (
            <li key={item.label}>
              <a href={item.href} className=" hover:opacity-100 hover:underline text-sm">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="mb-4">Neem Contact Op</h4>
        <div className="flex flex-col ">
          <p className="text-sm mb-3">Werkgebied uitlaatservice: 8 km rondom Dilsen-Stokkem</p>
          <p className="text-sm mb-3">Werkgebied oppas: 30 km rondom Dilsen-Stokkem</p>
          <a href="https://wa.me/32468584998" target="_blank" className="hover:underline text-sm mb-3">Service boeken</a>
          <a href="https://wa.me/32468584998" target="_blank" className="hover:underline text-sm mb-3">WhatsApp</a>
        </div>
      </div>

      {/* KAART */}
      <div>
        <div className="border-[3px] border-[#3A5A70] rounded-[1.5rem] overflow-hidden h-56">
          <iframe
            src="https://www.google.com/maps?q=Dilsen-Stokkem&output=embed"
            title="Werkgebied Dilsen-Stokkem"
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}