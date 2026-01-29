'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CartContext } from '../context/cartContext'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AddToCart({ productId }: { productId: string }) {
    const router = useRouter()
    const session = useSession()
    
    const cartContext = useContext(CartContext)
    if (!cartContext) {
        throw new Error("CartContext is undefined. Make sure your component is wrapped in CartContextProvider")
    }
    const { getCart, setCartContent } = cartContext

    const [isLoading, setIsLoading] = useState(false)

    async function addProductToCart() {
        if (session.status == 'authenticated') {
            setIsLoading(true)
            const data = await addToCartAction(productId)
            if (data.status === 'success') {
                toast.success('Product added successfully')
                setCartContent(data)
            }
            setIsLoading(false)
        } else {
            router.push('/login')
        }
    }

    return (
        <CardFooter className='gap-2 mt-2'>
            <Button onClick={addProductToCart} className='grow cursor-pointer'>
                {isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />} Add to cart
            </Button>
        </CardFooter>
    )
}
