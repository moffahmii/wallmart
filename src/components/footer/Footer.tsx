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
            <div className="container mx-auto px-4 py-16">

                {/* --- Top Section: Newsletter --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 items-center">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">Join our newsletter</h2>
                        <p className="text-muted-foreground text-lg max-w-md">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter your email"
                            className="h-12 bg-white rounded-xl border-2 focus-visible:ring-blue-600"
                        />
                        <Button className="h-12 px-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-700">
                            <Send className="mr-2 h-4 w-4" /> Subscribe
                        </Button>
                    </div>
                </div>

                <Separator className="mb-16 bg-slate-200" />

                {/* --- Middle Section: Links & Info --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                WallMart
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-sm font-medium">
                            The ultimate destination for all your shopping needs. We provide quality, speed, and trust in every order.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <Button key={i} variant="outline" size="icon" className="h-10 w-10 rounded-full border-2 hover:border-blue-600 hover:text-blue-600 transition-all">
                                    <Icon className="h-5 w-5" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-black text-lg mb-6 uppercase tracking-wider">Shop</h3>
                        <ul className="space-y-4">
                            {footerLinks.shop.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-blue-600 font-medium transition-colors flex items-center group">
                                        {link.name} <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-lg mb-6 uppercase tracking-wider">Support</h3>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-blue-600 font-medium transition-colors flex items-center group">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="font-black text-lg mb-6 uppercase tracking-wider">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                                <span className="text-muted-foreground font-medium text-sm">123 Business St, Cairo, Egypt</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                                <span className="text-muted-foreground font-medium text-sm">+20 123 456 789</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                                <span className="text-muted-foreground font-medium text-sm">support@wallmart.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-16 bg-slate-200" />

                {/* --- Bottom Section: Copyright --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground font-medium text-sm">
                        © {currentYear} <span className="text-foreground font-bold">WallMart</span>. All rights reserved.
                    </p>

                    {/* Payment Icons Placeholder */}
                    <div className="flex items-center gap-4 opacity-60">
                        <div className="h-8 w-12 bg-slate-200 rounded-md"></div>
                        <div className="h-8 w-12 bg-slate-200 rounded-md"></div>
                        <div className="h-8 w-12 bg-slate-200 rounded-md"></div>
                        <div className="h-8 w-12 bg-slate-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        </footer>
    )
}