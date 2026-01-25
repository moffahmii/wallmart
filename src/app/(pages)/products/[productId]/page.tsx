import { ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from 'react'
import Mystar from '@/components/ui/mystar'
import { Button } from '@/components/ui/button'
import { HeartIcon } from 'lucide-react'
import ProductSlider from '@/components/productSlider/productSlider'
import AddToCart from '@/components/addtoCart/addToCart'

export default async function ProductDetails({
    params,
}: {
    params: Promise<{ productId: string }>
}) {
    const { productId } = await params

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
        { cache: 'no-store' }
    )

    const json = await response.json()
    const product: ProductI = json.data

    console.log(product)

    return (
        <Card className="grid md:grid-cols-2 mt-10 items-center w-3/4 mx-auto">
            <div className='flex justify-center'>
                <ProductSlider image={product.images} altCont={product.title} />
            </div>
            <div>
                <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <CardTitle>{product.brand.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{product.category.name}</CardDescription>
                    <div className='flex items-center gap-2 '>
                        <Mystar />
                        <Mystar />
                        <Mystar />
                        <Mystar />
                        <p>({product.ratingsQuantity})</p>
                    </div>
                    <div className="flex justify-between mt-2">
                        <p className='font-bold'>{product.price} EGP</p>
                        <p className='font-bold'>{product.quantity} In Stock</p>
                    </div>
                </CardContent>
                <AddToCart productId={product._id} />
            </div>
        </Card>
    )
}

