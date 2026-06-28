import './globals.css'
import Link from 'next/link'
import 'iconify-icon'
import HamburgerMenu from '../components/hamburgermenu.js';
import Footer from '../components/footer.js'
import Whatsapp from "../components/whatsapp"


export default function rootLayout({ children }) {
    return (
        <html lang="nl" suppressHydrationWarning>
            <body className="overflow-x-hidden">
                <HamburgerMenu />
                <main className="pt-28 px-4 md:px-6 max-w-[80rem] mx-auto">
                    {children}
                </main>
                <Whatsapp/>
                <Footer/>
            </body>
        </html>
    )
}




