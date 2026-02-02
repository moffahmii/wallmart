'use client'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '@/app/loading'
import EmptyCart from '@/components/emptyCart/EmptyCart'
import { toast } from 'sonner'
import { CartSummary } from './cartSummary'
import { CartItem } from './cartItem'
import { removeFromCartAction, updateCartAction, clearCartAction } from './_actions/cartActions'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { Loader, Trash2 } from 'lucide-react'

export default function Cart() {
    const context = useContext(CartContext)
    if (!context) {
        return null;
    }

    const { cartContent, isLoading, getCart, setCartContent } = context;
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [isClearing, setIsClearing] = useState(false)

    useEffect(() => {
        if (!cartContent) getCart()
    }, [cartContent, getCart])

    if (isLoading || !cartContent) return <Loading />

    if (!cartContent.data?.products?.length) return <EmptyCart />

    const updateCartItem = async (productId: string, count: number) => {
        if (count < 1) return;
        setUpdatingId(productId); // اللودر يشتغل للعنصر ده بس
        const data = await updateCartAction(productId, count);
        if (data.status === 'success') {
            setCartContent(data);
        }
        setUpdatingId(null); // اللودر يقف
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

    async function clearCart(cartId: string) {
        setIsClearing(true); // ابدأ التحميل
        try {
            const data = await clearCartAction(cartId);
            if (data.status === 'success') {
                // الخطوة الأهم: تحديث الـ Context بالبيانات الفارغة فوراً
                setCartContent(data);
                toast.success("Cart cleared successfully 🧹");
            } else {
                toast.error("Failed to clear cart");
            }
        } finally {
            setIsClearing(false); // أنهِ التحميل
        }
    }

    return (

        <div className='container mx-auto py-10 px-4'>
            <header className="mb-12 flex items-end justify-between border-b border-border pb-6">
                <div className="space-y-1">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                        Your Cart
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground italic">
                        Review your selected products before proceeding to checkout
                    </p>
                </div>

                <span className="text-xs font-black uppercase italic bg-secondary text-secondary-foreground px-4 py-1.5 rounded-[var(--radius)]">
                    {cartContent.data?.products?.length || 0} Items
                </span>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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

                <div className="lg:col-span-4 flex flex-col gap-4 sticky top-8">
                    <div className="flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-rose-500 font-black uppercase italic flex items-center gap-2"
                            disabled={isClearing}
                            onClick={() => {
                                setIsClearing(true);
                                clearCart(cartContent.cartId || "").finally(() => setIsClearing(false));
                            }}
                        >
                            {isClearing ? (
                                <Loader className="animate-spin h-4 w-4" />
                            ) : (
                                <Trash2 className="h-4 w-4" />
                            )}
                            Clear Cart
                        </Button>
                    </div>

                    <CartSummary
                        total={cartContent.data?.totalCartPrice || 0}
                        cartId={cartContent.cartId || ""}
                    />
                </div>
            </div>

        </div>

    )
}