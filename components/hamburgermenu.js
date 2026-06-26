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
                <img src="./dehondenwandelaar-logo.png" className="hamburger-menu-logo w-16 h-16"></img>
                <div className="links">
                    <Link href="#">Voordelen</Link> {/*geen page reload voor laden van andere pagina, wel bij HTML a tags*/}
                    <Link href="#">Beschikbaarheid</Link>
                    <Link href="#">Diensten</Link> 
                    <Link href="#">Werkgebied</Link>
                    <Link href="#">Tarieven</Link>
                    <Link href="#">Over</Link>
                </div>
                <button className="nav-CTA" href="#">Gratis kennismaking</button>
            </nav>

        <nav className="mobile-nav">
            <div className="top-menu-mobile">
                <img src="./dehondenwandelaar-logo.png" className="hamburger-menu-logo w-14 h-14"></img>
                <button className="nav-CTA" href="#">Gratis kennismaking</button>
                <img src={hamburgerIcon} alt="hamburger-menu-icon" className="w-10 h-10" onClick={OpenAndCloseHamburgerMenu}></img>
            </div>
            {isOpen && (
            <div className="hamburger-menu-open-link-container">
                <Link href="#">Voordelen</Link> {/*geen page reload voor laden van andere pagina, wel bij HTML a tags*/}
                <Link href="#">Beschikbaarheid</Link>
                <Link href="#">Diensten</Link> 
                <Link href="#">Werkgebied</Link>
                <Link href="#">Tarieven</Link>
                <Link href="#">Over</Link>
            </div>
            )}
        </nav>
        </> //React mag maar 1 component teruggeven
    )
}
