
'use client'
import { useState } from "react";
import Menu from "./Menu";
import { GiHamburgerMenu } from 'react-icons/gi'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
export default function Layout({ children }: { children: React.ReactNode }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }


    return (
        <section className='w-full flex relative'>
            <Menu isMenuOpen={isMenuOpen} />
            <main className={`relative flex flex-1 w-full flex-col transition-all min-w-0`}>
                <header className="p-3">
                    <button onClick={() => toggleMenu()}>
                        <GiHamburgerMenu size={30} />
                    </button>
                </header>
                <div className={`relative z-0 flex flex-col h-[calc(100vh_-_74px)] overflow-y-auto p-5 transition-all`}>
                    {children}
                </div>
            </main>
        </section >
    )
}