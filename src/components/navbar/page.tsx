'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCartIcon, UserIcon, MenuIcon, LogOut, User, Settings, LogIn, UserPlus } from 'lucide-react'
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
import { signOut, useSession } from 'next-auth/react'

export default function NavBar() {
  const { cartContent, isLoading } = useContext(CartContext)
  const pathname = usePathname()
  const cartCount = cartContent?.numOfCartItems ?? 0
  const { data: session, status } = useSession()

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Categories', href: '/categories' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-slate-950/95 backdrop-blur-md border-white/10">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">

        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center md:hidden ">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <MenuIcon className="h-7 w-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-75 bg-slate-950 text-white border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-black text-left text-blue-500">WallMart</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className={`text-xl text-center font-bold transition-colors ${pathname === link.href ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}>
                      {link.name}
                    </Link>
                  ))}
                  {status !== 'authenticated' && (
                    <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                      <Link href="/login"><Button className="w-full bg-blue-600 font-bold">Login</Button></Link>
                      <Link href="/register"><Button variant="outline" className="w-full font-bold">Register</Button></Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center">
            <span className="text-2xl md:text-4xl font-black tracking-tighter text-white">
              Wall<span className="text-blue-500">Mart</span>
            </span>
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent text-gray-300 hover:text-white hover:bg-white/5 text-base font-bold px-5`}>
                    <Link href={link.href}>{link.name}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right Side Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {status === 'authenticated' ? (
            <>
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative h-11 w-11 text-white hover:bg-white/10">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {!isLoading && cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-blue-600 p-0 text-[10px] font-bold border-2 border-slate-950">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 p-1 pl-3 h-11 rounded-full border border-white/10 hover:bg-white/10 text-white">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden lg:inline text-sm font-bold">{session.user?.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 bg-slate-900 border-white/10 text-white">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-base font-bold text-blue-500">My Account</span>
                    <span className="text-xs text-gray-400 truncate">{session.user?.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="py-3 cursor-pointer focus:bg-white/5 focus:text-white rounded-lg">
                    <Link href="/profile" className="flex items-center font-semibold"><User className="mr-3 h-5 w-5" /> Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="py-3 cursor-pointer focus:bg-white/5 focus:text-white rounded-lg">
                    <Link href="/settings" className="flex items-center font-semibold"><Settings className="mr-3 h-5 w-5" /> Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="py-3 text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer font-bold rounded-lg"
                  >
                    <LogOut className="mr-3 h-5 w-5" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-white font-bold hover:bg-white/5">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 rounded-xl shadow-lg shadow-blue-600/20">
                  Register
                </Button>
              </Link>
            </div>
          )}
          {/* User Icon for Mobile (Guest) */}
          {status !== 'authenticated' && (
            <div className="md:hidden">
              <Link href="/login">
                <Button size="icon" variant="ghost" className="text-white"><UserIcon /></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}