'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CartContext } from '../context/cartContext'

export default function AddToCart({ productId }: { productId: string }) {
    let { getCart, setCartContent } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)
    async function addProductToCart() {
        setIsLoading(true)
        const response = await fetch(
            'https://ecommerce.routemisr.com/api/v1/cart',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkyNzM3MjQsImV4cCI6MTc3NzA0OTcyNH0.s_Q2cgX25IHT026pX9Nlp6wn6fraAYGwoe3iMhRnqrY',
                },
                body: JSON.stringify({
                    productId: productId,
                }),
            }
        )
        const data = await response.json()
        data.status == 'success' && toast.success('Product added successfully')
        setCartContent(data)
        setIsLoading(false)
    }

    return (
        <CardFooter className='gap-2 mt-2'>
            <Button onClick={addProductToCart} className='grow cursor-pointer'>
                {isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />}  Add to cart
            </Button>
            <HeartIcon />
        </CardFooter>
    )
}
