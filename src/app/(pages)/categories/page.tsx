import { CategoryI } from '@/interfaces'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
    const { data: categories }: { data: CategoryI[] } = await response.json()

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8">
            {categories.map((category) => (
                <div key={category._id}>
                    <Card className="h-full">
                        <Link href={`/categories/${category._id}`}>
                            <CardHeader className="p-4">

                                {/* Image Wrapper */}
                                <div className="relative w-full aspect-square overflow-hidden rounded-md">
                                    <Image
                                        src={category.image}
                                        fill
                                        className="object-contain"
                                        alt={category.name}
                                    />
                                </div>

                                <CardTitle className="text-center mt-3 text-base">
                                    {category.name}
                                </CardTitle>

                            </CardHeader>
                        </Link>
                    </Card>
                </div>
            ))}
        </div>
    )

}
