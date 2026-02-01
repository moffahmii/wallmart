'use client'
import React from 'react'
import Link from 'next/link'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/products' },
      { name: 'Featured Brands', href: '/brands' },
      { name: 'Categories', href: '/categories' },
      { name: 'New Arrivals', href: '/new' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Shipping Policy', href: '/shipping' },
      { name: 'Return Policy', href: '/returns' },
    ],
    company: [
      { name: 'About WallMart', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ]
  }

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 py-12">

        {/* Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-center">
          <div className="lg:col-span-2 space-y-2">
            <h2 className="text-2xl font-black tracking-tight">
              Join our newsletter
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Get offers & updates straight to your inbox.
            </p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Email address"
              className="h-10 rounded-lg border"
            />
            <Button className="h-10 px-4 rounded-lg font-bold bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WallMart
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Quality products, fast delivery, and trusted service every time.
            </p>

            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:text-blue-600 hover:border-blue-600"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-black text-sm mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              {footerLinks.shop.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 flex items-center group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-black text-sm mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-sm mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Cairo, Egypt
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600" />
                +20 123 456 789
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                support@wallmart.com
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} <span className="font-bold text-foreground">WallMart</span>. All rights reserved.
          </p>

          <div className="flex gap-3 opacity-50">
            <div className="h-7 w-10 bg-slate-200 rounded"></div>
            <div className="h-7 w-10 bg-slate-200 rounded"></div>
            <div className="h-7 w-10 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
