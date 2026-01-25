import { BrandI } from '@/interfaces'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Brands() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    const { data: brands }: { data: BrandI[] } = await response.json()

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8">
            {brands.map((brand) => (
                <div key={brand._id}>
                    <Card>
                        <Link href={`/brands/${brand._id}`}>
                            <CardHeader>
                                <Image
                                    src={brand.image}
                                    width={300}
                                    height={300}
                                    alt={brand.name}
                                />
                                <CardTitle className='text-center'>{brand.name}</CardTitle>
                            </CardHeader>
                        </Link>
                    </Card>
                </div>
            ))}
        </div>
    </>
}
