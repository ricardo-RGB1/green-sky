'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useMedia } from "react-use"; 
import { useState } from 'react'
import { NavButton } from './nav-button'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "./ui/sheet"
 

const routes = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Transactions',
        href: '/transactions'
    },
    {
        label: 'Accounts',
        href: '/accounts'
    },
    {
        label: 'Categories',
        href: '/categories'
    },
    {
        label: 'Settings',
        href: '/settings'
    }
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const isMobile = useMedia('(max-width: 1024px)', false) 

    const onClick = (href: string) => {
        router.push(href) // navigate to the href
        setIsOpen(false) // close the sheet
    } // close the sheet when a link is clicked


    if (isMobile) { // if the screen is mobile, show the sheet
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="font-normal bg-black/10 hover:bg-black/20 hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-black/20 transition">
                       <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button 
                                key={route.href} 
                                onClick={() => onClick(route.href)}
                                variant={route.href === pathname ? 'secondary' : 'ghost'}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    } 

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
             <NavButton 
                key={route.href}
                href={route.href}
                label={route.label}
                active={pathname === route.href}
             />
            ))}
        </nav>
    )
}