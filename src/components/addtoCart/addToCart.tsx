'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Loader, ShoppingCartIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CartContext } from '../context/cartContext'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { addToCartAction } from '@/app/(pages)/products/_action/addToCart.action'

export default function AddToCart({ productId }: { productId: string }) {
    const router = useRouter()
    const { status } = useSession() 
    const cartContext = useContext(CartContext)
    if (!cartContext) {
        throw new Error("CartContext must be used within a CartContextProvider")
    }

    const { setCartContent } = cartContext
    const [isLoading, setIsLoading] = useState(false)

    async function addProductToCart() {
        if (status !== 'authenticated') {
            toast.error('Please login to add products to cart')
            return router.push('/login')
        }
        try {
            setIsLoading(true)
            const data = await addToCartAction(productId)
            if (data?.status === 'success') {
                toast.success(data.message || 'Product added to cart')
                setCartContent(data) 
            } else {
                toast.error(data?.message || 'Failed to add product')
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CardFooter className='gap-2 mt-2'>
            <Button
                onClick={addProductToCart}
                disabled={isLoading}
                className='grow cursor-pointer font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none transition-all'
            >
                {isLoading ? (
                    <Loader className='animate-spin' />
                ) : (
                    <>
                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                        Add to cart
                    </>
                )}
            </Button>
        </CardFooter>
    )
}