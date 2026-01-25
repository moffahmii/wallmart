'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCartIcon, UserIcon, MenuIcon, LogOut, User, Settings } from 'lucide-react'
import { CartContext } from '../context/cartContext'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function NavBar() {
  const { cartContent, isLoading } = useContext(CartContext)
  const pathname = usePathname()
  const cartCount = cartContent?.numOfCartItems ?? 0

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Categories', href: '/categories' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <MenuIcon className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader><SheetTitle className="text-2xl font-bold text-left">WallMart</SheetTitle></SheetHeader>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`text-xl font-semibold ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            WallMart
          </span>
        </Link>

        {/* Desktop Nav - Fixed legacyBehavior */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-base font-semibold px-5 py-6`}>
                    <Link href={link.href}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-5">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-11 w-11">
              <ShoppingCartIcon className="h-6 w-6" />
              {!isLoading && cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-xs">{cartCount}</Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-2"><UserIcon className="h-6 w-6" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-2">
              <DropdownMenuLabel className="text-lg font-bold">Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="py-3 cursor-pointer text-base">
                <Link href="/profile" className="flex items-center"><User className="mr-3 h-5 w-5" /> Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-3 text-red-600"><LogOut className="mr-3 h-5 w-5" /> Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}