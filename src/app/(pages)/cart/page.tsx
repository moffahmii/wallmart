'use client'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '@/app/loading'
import EmptyCart from '@/components/emptyCart/EmptyCart'
import { toast } from 'sonner'
import { CartSummary } from './cartSummary'
import { CartItem } from './cartItem'
import { removeFromCartAction, updateCartAction } from './_actions/cartActions'
import { CartContext } from '@/components/context/cartContext'

export default function Cart() {
    const context = useContext(CartContext)
    if (!context) {
        return null;
    }

    const { cartContent, isLoading, getCart, setCartContent } = context;
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    useEffect(() => {
        if (!cartContent) getCart()
    }, [cartContent, getCart])

    if (isLoading || !cartContent) return <Loading />
    
    if (!cartContent.data?.products?.length) return <EmptyCart />

    const updateCartItem = async (productId: string, count: number) => {
        if (count < 1) return;
        setUpdatingId(productId);
        const data = await updateCartAction(productId, count);
        if (data.status === 'success') setCartContent(data);
        setUpdatingId(null);
    };

    const removeCartItem = async (productId: string) => {
        setRemovingId(productId);
        const data = await removeFromCartAction(productId);
        if (data.status === 'success') {
            setCartContent(data);
            toast.success("Item removed");
        }
        setRemovingId(null);
    };

    return (
        <div className="container mx-auto py-14 px-4 max-w-7xl animate-in fade-in duration-500">
            <header className="mb-12 border-b-4 border-slate-900 pb-8">
                <h1 className="text-5xl font-black uppercase italic">Shopping Bag</h1>
                <p className="text-slate-400 mt-2 font-bold uppercase text-xs">
                    Items: {cartContent?.numOfCartItems || 0}
                </p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    {cartContent.data?.products?.map((item: any) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            updatingId={updatingId}
                            removingId={removingId}
                            onUpdate={updateCartItem}
                            onRemove={removeCartItem}
                        />
                    ))}
                </div>
                <CartSummary
                    total={cartContent.data?.totalCartPrice || 0}
                    cartId={cartContent.cartId || ""}
                />
            </div>
        </div>
    )
}