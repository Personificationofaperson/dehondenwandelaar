//Can't be in layout.js directly because listeners can't be in server components. Hence I made a seperate file
"use client";
import {useState} from 'react';
import Link from 'next/link';

export default function HamburgerMenu() { //het hamburger menu component, by default closed = false
    const [isOpen, setIsOpen] = useState(false);
    let hamburgerIcon;

        if (isOpen) {
        hamburgerIcon = "./close-hamburger.svg"
    }
    else {
        hamburgerIcon = "./hamburger-menu.svg"
    }

    function OpenAndCloseHamburgerMenu() { //als er geklikt wordt op het hamburger menu, verandert state naar open
    setIsOpen(!isOpen);
    
    }
        return (
            <>
            <nav className="desktop-nav">
                <Link href="/">
                    <img src="./dehondenwandelaar-logo.png" className="hamburger-menu-logo w-16 h-16"></img>
                </Link>
                <div className="links">
                    <Link href="#voordelen">Voordelen</Link> {/*geen page reload voor laden van andere pagina, wel bij HTML a tags*/}
                    <Link href="#beschikbaarheid">Beschikbaarheid</Link>
                    <Link href="#diensten">Diensten</Link> 
                    <Link href="#werkgebied">Werkgebied</Link>
                    <Link href="#tarieven">Tarieven</Link>
                    <Link href="#over">Over</Link>
                </div>
                <button className="nav-CTA"><a className="text-white" href="https://ringtwice.be/nl/listworkers/495768-kimberly-v">Gratis kennismaking</a></button>
            </nav>

        <nav className="mobile-nav">
            <div className="top-menu-mobile">
                <Link href="/">
                    <img src="./dehondenwandelaar-logo.png" className="hamburger-menu-logo w-14 h-14"></img>
                </Link>
                <button className="nav-CTA"><a className="text-white" href="https://ringtwice.be/nl/listworkers/495768-kimberly-v">Gratis kennismaking</a></button>
                <img src={hamburgerIcon} alt="hamburger-menu-icon" className="w-10 h-10" onClick={OpenAndCloseHamburgerMenu}></img>
            </div>
            {isOpen && (
            <div className="hamburger-menu-open-link-container">
                <Link href="#voordelen">Voordelen</Link> {/*geen page reload voor laden van andere pagina, wel bij HTML a tags*/}
                <Link href="#beschikbaarheid">Beschikbaarheid</Link>
                <Link href="#diensten">Diensten</Link> 
                <Link href="#werkgebied">Werkgebied</Link>
                <Link href="#tarieven">Tarieven</Link>
                <Link href="#over">Over</Link>
            </div>
            )}
        </nav>
        </> //React mag maar 1 component teruggeven
    )
}
