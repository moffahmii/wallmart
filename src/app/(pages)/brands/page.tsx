import { BrandI } from '@/interfaces'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brands() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
        next: { revalidate: 3600 } // تحديث كل ساعة لزيادة الأداء
    })
    const { data: brands }: { data: BrandI[] } = await response.json()

    return (
        <main className="container mx-auto py-12 px-4">
            {/* Header Section */}
            <div className="mb-12 border-b pb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">Official Brands</h1>
                <p className="text-muted-foreground mt-3 text-lg font-medium italic">
                    Shop from your favorite world-class manufacturers.
                </p>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {brands?.map((brand) => (
                    <Link key={brand._id} href={`/brands/${brand._id}`} className="group">
                        <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden bg-white">
                            <CardHeader className="p-0">
                                {/* Logo Container */}
                                <div className="aspect-square relative flex items-center justify-center p-6 bg-slate-50/50 group-hover:bg-white transition-colors">
                                    <img
                                        src={brand.image}
                                        alt={brand.name}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 border-t group-hover:bg-blue-600 transition-colors">
                                    <CardTitle className="text-center text-sm md:text-base font-bold group-hover:text-white transition-colors truncate">
                                        {brand.name}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </main>
    )
}