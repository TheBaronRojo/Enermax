import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BiSolidReport } from 'react-icons/bi'
import { GoReport } from 'react-icons/go'
import { AiOutlineHome } from 'react-icons/ai'
import { BiTrendingUp } from 'react-icons/bi'

import Logo from "@/public/logo.png"

const MENU_OPTIONS = [
    {
        title: 'Dashboard',
        Icon: AiOutlineHome,
        route: '/',
    },
    {
        title: 'Tramos',
        Icon: BiSolidReport,
        route: '/tramos'
    },
    {
        title: 'Cliente',
        Icon: GoReport,
        route: '/cliente'
    },
    {
        title: 'Tramos cliente',
        Icon: BiTrendingUp,
        route: '/tramos-cliente'
    },

]

const Menu = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    return (
        <aside className={`${isMenuOpen ? 'w-[300px]' : 'w-[70px]'} h-screen flex flex-col bg-gray-light border-r border-[#d9d9d9] transition-all duration-300`}>
            <div className='py-6 pb-10 h-full relative flex flex-col overflow-y-auto bg-blue'>
                <div className='w-full flex justify-center mb-14 items-start px-3'>
                    <figure>
                        <Image src={Logo} width={150} alt="Logo" />
                    </figure>
                </div>

                <ul className='flex flex-col gap-3'>
                    {MENU_OPTIONS.map((option, key) => (
                        <li key={key}>
                            <MenuItem option={option} isMenuOpen={isMenuOpen} />
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}


type MenuItemProps = {
    option: {
        title: string
        Icon: any
        route: string
    },
    isMenuOpen: boolean
}

const MenuItem = ({ option, isMenuOpen }: MenuItemProps) => {
    const { title, Icon, route } = option

    const pathname = usePathname()

    return (
        <Link href={route} className={`${pathname === route ? 'text-white fill-white' : 'text-gray-400 fill-gray-400'} hover:text-white hover:fill-text-white transition-colors`}>
            <div className={`${pathname === route ? ' border-white' : 'bg-transparent border-transparent'} w-full border-l-4 relative`}>
                <div className='w-full flex gap-2 px-4 py-3 items-center'>
                    <Icon size={25}
                        className={`mb-1 min-w-[25px]`} />
                    <span className={`${isMenuOpen ? 'block' : 'hidden'}`}>
                        {title}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default Menu
