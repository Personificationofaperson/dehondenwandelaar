'use client'
import { Icon } from "@iconify/react";
import { useState } from "react";
import axios from "axios";

export default function Prijscalculator() {

    // 1. STATES 
    const [distance, setDistance] = useState("")
    const [prijsDienst, setPrijsDienst] = useState(0)
    const [naamDienst, setNaamDienst] = useState("")
    const [prijsHonden, setPrijsHonden] = useState(0)
    const [naamHonden, setNaamHonden] = useState("")
    const [whatsappAdres, setwhatsappAdres] = useState({ straat: "", huisnummer: "", stad: "" })

    // 2. LIVE BEREKENINGEN (Draaien in de hoofdscope, dus overal bereikbaar)
    const travelCost = Math.ceil(Number(distance) * 0.52) * 2; // afstand tot klant maal km-vergoeding maal op en neer
    const totalCost = travelCost + prijsDienst + prijsHonden; 
    
    function finalPrice(){
        if(isNaN(travelCost) || distance === "Locatie niet gevonden") {
            return "Voer een correct adres in"
        }
        else if (distance === "") {
             return "€0"
        }
        return euroPrice
    }
    
    const euroPrice = new Intl.NumberFormat("nl-BE", {
        style: "currency",
        currency: "EUR"
    }).format(totalCost);

    // WHATSAPP LINK OPBOUW 
    const whatsappTekst = `Hoi, ik heb interesse. Kunnen we een kennismakingsgesprek inplannen? Ik heb gekozen voor: ${naamDienst} voor ${naamHonden}. Mijn adres is: ${whatsappAdres.straat} ${whatsappAdres.huisnummer} in ${whatsappAdres.stad} en de servicekost zou ${euroPrice} bedragen.`;
    const gecodeerdeWhatsappTekst = encodeURIComponent(whatsappTekst);

    // 3. DEFINING USER CHOICES (Wanneer het formulier wordt verzonden)
    const handleSubmit = (e) => { 
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const gekozenDienst = Number(formData.get("type-dienst")) 
        const hoeveelheidHonden = Number(formData.get("hoeveelheid-honden")) 
        const straat = formData.get("straat")
        const huisnummer = formData.get("huisnummer")
        const stad = formData.get("stad")
        const postcode = formData.get("postcode")

        // Haal het geselecteerde woord (de tekst) op uit de select-boxen
        const selectDienst = e.currentTarget.elements["type-dienst"];
        const tekstDienst = selectDienst.options[selectDienst.selectedIndex].text;

        const selectHonden = e.currentTarget.elements["hoeveelheid-honden"];
        const tekstHonden = selectHonden.options[selectHonden.selectedIndex].text;

        // SETTING STATES 
        setPrijsDienst(gekozenDienst) 
        setNaamDienst(tekstDienst)
        setPrijsHonden(hoeveelheidHonden)
        setNaamHonden(tekstHonden)
        setwhatsappAdres({ straat, huisnummer, stad })  

        const volledigAdres = `${straat}+${huisnummer}+${stad}+${postcode}`

        // Console logs voor debugging
        console.log(`Gekozen dienst door klant: ${gekozenDienst}`)
        console.log(volledigAdres);

        distanceCalculator(volledigAdres)
    }

    const distanceCalculator = async (volledigAdres) => {
        try {
            const response = await fetch(`/api/distance?destination=${encodeURIComponent(volledigAdres)}`) 
            if (!response.ok) throw new Error(`API error: ${response.status}`) 
            const data = await response.json() 
            
            if (data.distanceValue && !isNaN(data.distanceValue) && data.distanceValue !== 0) { 
                setDistance(data.distanceValue)
            } else {
                console.error("Unexpected response structure:", data)
                setDistance("Locatie niet gevonden")
            }
        } catch (error) {
            console.error("Distance calculation failed:", error)
            setDistance("Fout bij berekening")
        }
    }

    
    return (
        <div id="tarieven" className="calculatorOmhulsel flex lg:flex-row flex-col lg:p-12 p-6 lg:gap-32 gap-8 bg-white rounded-3xl border-[var(--dark-blue)] border-4 mt-12">
            <div className="Klantinputberekening lg:w-1/2 w-full">
                <form onSubmit={handleSubmit}>
                    <h3 className="mb-2 lg:pt-6 pt-4 mt-0 text-2xl">Kies een dienst</h3>
                    <select name="type-dienst" id="type-dienst" className="w-full rounded-xl p-4 bg-[var(--bg-color)] border-[var(--dark-blue)] border-4">
                        <option value="15">Wandeling half uur</option>
                        <option value="70">Weekendwandeling 1 dag</option>
                        <option value="140">Weekendwandeling 2 dagen</option>
                    </select>
                    
                    <h3 className="mb-2 text-2xl lg:mt-0 mt-[-8px]">Aantal honden</h3>
                    <select name="hoeveelheid-honden" id="hoeveelheid-honden" className="w-full rounded-xl p-4 bg-[var(--bg-color)] border-[var(--dark-blue)] border-4">
                        <option value="0">1 hond</option>
                        <option value="10">2 honden</option>
                        <option value="15">3 honden</option>
                    </select>
                    
                    <h3 className="mb-2 text-2xl lg:mt-0 mt-[-6px]">Jouw locatie</h3>
                    <div className="locatie gap-4 flex flex-col lg:mb-12 mb-8">
                        <div className="groepering-straat-nummer flex lg:flex-row flex-col gap-4">
                            <label htmlFor="straat">Straatnaam
                                <input type="text" name="straat" id="straat" required className="w-full rounded-xl p-4 basis-[70%] bg-[var(--bg-color)] border-[var(--dark-blue)] border-4" placeholder="Straatnaam" />
                            </label>
                            <label htmlFor="huisnummer">Huisnummer
                                <input type="text" name="huisnummer" id="huisnummer" required className="w-full rounded-xl p-4 basis-[30%] bg-[var(--bg-color)] border-[var(--dark-blue)] border-4" placeholder="Huisnummer" />
                            </label>
                        </div>
                        <label htmlFor="stad">Stad
                            <input type="text" name="stad" id="stad" required className="w-full rounded-xl p-4 bg-[var(--bg-color)] border-[var(--dark-blue)] border-4" placeholder="Stad" />
                        </label>
                        <label htmlFor="postcode">Postcode
                            <input type="text" name="postcode" id="postcode" required className="w-full rounded-xl p-4 bg-[var(--bg-color)] border-[var(--dark-blue)] border-4" placeholder="Postcode" />
                        </label>
                    </div>
                    <button type="submit" className="button">Prijs berekenen</button>
                </form>               
            </div>

            <div className="Prijsoverzicht lg:w-1/2 w-full bg-[var(--accent-color)] rounded-2xl lg:p-16 p-6 px-4 border-[var(--dark-blue)] border-4 flex flex-col center">
                <h3 className="mb-8 text-center">Je richtprijs is:</h3>
                <p className="lg:text-3xl text-2xl text-center">{finalPrice()}</p>
                <p className="text-center">Heb je interesse na het zien van de richtprijs? Geef me dan een seintje via onderstaande knop, zodat we een kennismaking&shy;sgesprek kunnen inplannen.</p>
                
                {!isNaN(travelCost) && distance !== "Locatie niet gevonden" && distance !== "" && (
                <button>
                    <a 
                        href={`https://wa.me/32468584998?text=${gecodeerdeWhatsappTekst}`} 
                        target="_blank"
                        className="button normal-case"
                    >
                        Neem contact op 
                    </a>
                </button>)}
            </div>
        </div>
    );
}
