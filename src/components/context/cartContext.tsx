'use client'

import { CartResponse } from "@/interfaces"
import { createContext, ReactNode, useEffect, useState } from "react"

const CartContext = createContext<{
    cartContent: CartResponse | null
    setCartContent: (value: CartResponse | null) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    getCart: () => void
}>({
    cartContent: null,
    setCartContent: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { }
})

export default function CartContextProvider({
    children,
}: {
    children: ReactNode
}) {
    const [cartContent, setCartContent] =
        useState<CartResponse | null>(null)

    const [isLoading, setIsLoading] = useState(false)

    async function getCart() {
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:3000/api/get-cart')
            const data: CartResponse = await response.json()
            setCartContent(data)
            console.log(data)
        } catch (error) {
            console.error('Error fetching cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <CartContext.Provider
            value={{ cartContent, isLoading, setIsLoading, setCartContent, getCart }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { CartContext }
