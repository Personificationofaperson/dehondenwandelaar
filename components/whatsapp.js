import { Icon } from "@iconify/react";

export default function Whatsapp() {

    return (
        <>
            <a className="whatsapp bg-[#25d366] h-14 w-14 rounded-full flex justify-center items-center fixed bottom-6 right-6 z-50"
            href="https://api.whatsapp.com/send/?phone=32468584998&text=Hoi%21+Ik+heb+een+vraag+over%3A+%5BPrijs+%2F+Beschikbaarheid+%2F+Iets+anders%5D.+Het+gaat+om+de+dienst%3A+%5BNaam+dienst%5D.+Groetjes%2C+%5BNaam%5D&type=phone_number&app_absent=0&utm_campaign=website&utm_source=google">
                <Icon icon="ic:baseline-whatsapp" className="h-8 w-8 text-white"></Icon>
            </a>
        </>
    )    
}
