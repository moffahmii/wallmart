'use client'

import { getCartAction } from "@/app/(pages)/cart/_actions/cartActions";
import { CartResponse } from "@/interfaces"
import { createContext, ReactNode, useEffect, useState, useCallback } from "react"

interface CartContextType {
    cartContent: CartResponse | null;
    setCartContent: (value: CartResponse | null) => void;
    isLoading: boolean;
    getCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartContent, setCartContent] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getCart = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getCartAction();

            if (data && data.status === 'success') {
                setCartContent(data);
                console.log("Cart loaded successfully:", data);
            } else {
                setCartContent(null);
            }
        } catch (error) {
            console.error('Error in getCart context:', error);
            setCartContent(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getCart();
    }, [getCart]);

    return (
        <CartContext.Provider value={{ cartContent, isLoading, setCartContent, getCart }}>
            {children}
        </CartContext.Provider>
    );
}