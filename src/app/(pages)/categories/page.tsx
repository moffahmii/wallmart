import { CategoryI } from '@/interfaces'
import { Card, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
    const response = await fetch(`${process.env.API_URL}/categories`, {
        next: { revalidate: 3600 }
    })
    const { data: categories }: { data: CategoryI[] } = await response.json()

    return (
        <main className="container mx-auto py-12 px-4">
            {/* Header */}
            <div className="mb-12 border-b pb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">Shop by Category</h1>
                <p className="text-muted-foreground mt-2 text-lg font-medium italic">Discover everything you need, organized just for you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categories?.map((category) => (
                        <Card key={category._id} className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-500 rounded-[32px] overflow-hidden bg-white">
                            <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={category.image}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={category.name}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                                    <span className="bg-white text-black font-black px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl">
                                        Explore Section
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 text-center bg-white group-hover:bg-blue-600 transition-colors duration-500">
                                <CardTitle className="text-2xl font-black tracking-tight group-hover:text-white transition-colors duration-500 uppercase italic">
                                    {category.name}
                                </CardTitle>
                            </div>
                        </Card>
                ))}
            </div>
        </main>
    )
}