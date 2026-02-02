'use client'
import { createContext, ReactNode, useEffect, useState, useCallback, useRef } from "react"
import { getCartAction } from "@/app/(pages)/cart/_actions/cartActions"
import { CartResponse } from "@/interfaces"

interface CartContextType {
    cartContent: CartResponse | null;
    setCartContent: (value: CartResponse | null) => void;
    isLoading: boolean;
    getCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartContent, setCartContent] = useState<CartResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isFirstRun = useRef(true); 

    const getCart = useCallback(async () => {
        try {
            const data = await getCartAction();
            if (data?.status === 'success') {
                setCartContent(data);
            } else {
                setCartContent(null);
            }
        } catch (error) {
            setCartContent(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isFirstRun.current) {
            getCart();
            isFirstRun.current = false;
        }
    }, [getCart]);

    return (
        <CartContext.Provider value={{ cartContent, isLoading, setCartContent, getCart }}>
            {children}
        </CartContext.Provider>
    );
}