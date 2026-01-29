'use client'
import React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function WishlistFloatButton() {
    const { status } = useSession()

    // يظهر فقط للمسجلين
    if (status !== "authenticated") return null;

    return (
        <Link 
            href="/wishlist" 
            className="fixed bottom-8 right-8 z-[999] group"
        >
            <div className="relative bg-white border-2 border-slate-900 p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-y-0 active:shadow-none hover:-translate-y-1">
                {/* أيقونة أصغر وأبسط */}
                <Heart className="size-5 text-red-500 fill-red-500" />
                
                {/* التلميح الجانبي (Tooltip) */}
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[8px] font-black uppercase italic px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Favorites
                </span>
            </div>
        </Link>
    )
}