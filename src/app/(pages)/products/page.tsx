import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ProductI } from '@/interfaces'
import Image from 'next/image'
import Mystar from '@/components/ui/mystar'
import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import AddToCart from '@/components/addtoCart/addToCart'

export default async function Products() {

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
    const { data: products }: { data: ProductI[] } = await response.json()
    return <>
        <h1 className='text-3xl font-bold mt-6'>Brands</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8">
            {products.map((product) => <div key={product.id}>
                <Card >
                    <Link href={'/products/' + product.id}>
                        <CardHeader>
                            <Image src={product.imageCover} width={300} height={300} alt={product.title} />
                            <CardTitle>{product.title.split(' ', 2).join(' ')}</CardTitle>
                            <CardDescription>{product.brand.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex">
                                <Mystar />
                                <Mystar />
                                <Mystar />
                                <Mystar />
                                <Mystar />
                                <p>{product.ratingsAverage}</p>
                            </div>
                            <p className='pt-1'>Price : <span className='font-bold'>{product.price}</span> EGP</p>
                        </CardContent>
                    </Link>
                    <AddToCart productId={product._id} />
                </Card>
            </div>
            )}
        </div>
    </>
}
