'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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
import Link from 'next/link'
import { ShoppingCartIcon, UserIcon } from 'lucide-react'
import { CartContext } from '../context/cartContext'

export default function NavBar() {
  const { cartContent, isLoading } = useContext(CartContext)

  const cartCount = cartContent?.numOfCartItems ?? 0

  return (
    <nav className='bg-gray-100 py-3 sticky top-0'>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <h1 className="text-xl font-bold">WallMart</h1>
          </Link>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side */}
          <div className="flex items-center gap-4">

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserIcon className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <Link href="/profile">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Link href="/register">
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Logout</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart with Badge */}
            <Link href="/cart" className="relative">
              <ShoppingCartIcon className="size-6" />

              {!isLoading && cartCount > 0 && (
                <Badge
                  className="
                    absolute -top-2 -right-2
                    h-5 min-w-5
                    flex items-center justify-center
                    rounded-full px-1 text-xs
                  "
                >
                  {cartCount}
                </Badge>
              )}
            </Link>

          </div>
        </div>
      </div>
    </nav>
  )
}
