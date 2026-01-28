'use client'
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/checkOut'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import {
    Loader,
    Trash2,
    ShoppingBag,
    Plus,
    Minus,
    ArrowLeft,
} from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import EmptyCart from '@/components/emptyCart/EmptyCart'
import removeFromCartAction from './_actions/removeAction'
import updateCartAction from './_actions/updateAction'
import clearCartAction from './_actions/clearAction'

export default function Cart() {
    const [removingId, setRemovingId] = useState<null | string>(null)
    const [updatingId, setUpdatingId] = useState<null | string>(null)
    const [isClearing, setIsClearing] = useState<boolean>(false)

    const { cartContent, isLoading, getCart, setCartContent } =
        useContext(CartContext)

    useEffect(() => {
        if (!cartContent) getCart()
    }, [cartContent, getCart])

    if (isLoading || !cartContent) return <Loading />

    /* ================= EMPTY CART ================= */
    if (!cartContent.data?.products?.length) {
        return (
            <EmptyCart />
        )
    }
    /* ================= HANDLERS (UNCHANGED) ================= */
    async function removeCartItem(productId: string) {
        setRemovingId(productId)
        const data = await removeFromCartAction(productId)
        if (data.status === 'success') {
            setCartContent(data)
            toast.success('Product removed')
        }
        setRemovingId(null)
    }
    async function updateCartItem(productId: string, count: number) {
        if (count < 1) return
        setUpdatingId(productId)
        const data = await updateCartAction(productId, count)
        if (data.status === 'success') setCartContent(data)
        setUpdatingId(null)
    }
    async function clearCart() {
        setIsClearing(true)
        const data = await clearCartAction()
        if (data.message === 'success') {
            setCartContent(null)
            toast.success('Cart cleared')
        }
        setIsClearing(false)
    }
    /* ================= UI ================= */
    return (
        <div className="container mx-auto py-14 px-4 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">
                        You have{' '}
                        <span className="font-bold text-foreground">
                            {cartContent.numOfCartItems}
                        </span>{' '}
                        items
                    </p>
                </div>

                <Button
                    variant="ghost"
                    className="text-destructive font-bold hover:bg-destructive/10"
                    onClick={clearCart}
                    disabled={isClearing}
                >
                    {isClearing ? (
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                    ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Clear Cart
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* ================= CART ITEMS ================= */}
                <div className="lg:col-span-8 space-y-6">
                    {cartContent.data.products.map((item) => (
                        <div
                            key={item._id}
                            className="rounded-3xl border bg-card p-6 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition"
                        >
                            <div className="h-32 w-32 shrink-0 rounded-2xl border bg-muted overflow-hidden mx-auto sm:mx-0">
                                <img
                                    src={item.product.imageCover}
                                    alt={item.product.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold line-clamp-2">
                                            {item.product.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {item.product.brand.name} •{' '}
                                            {item.product.category.name}
                                        </p>
                                    </div>

                                    <p className="text-xl font-black">
                                        {item.price.toLocaleString()}{' '}
                                        <span className="text-xs font-medium">EGP</span>
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex items-center gap-2 bg-muted/60 border rounded-xl p-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-9 w-9 rounded-lg"
                                            disabled={item.count <= 1 || updatingId === item.product._id}
                                            onClick={() =>
                                                updateCartItem(item.product._id, item.count - 1)
                                            }
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>

                                        <span className="w-8 text-center font-bold">
                                            {updatingId === item.product._id ? (
                                                <Loader className="h-4 w-4 animate-spin mx-auto" />
                                            ) : (
                                                item.count
                                            )}
                                        </span>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-9 w-9 rounded-lg"
                                            disabled={updatingId === item.product._id}
                                            onClick={() =>
                                                updateCartItem(item.product._id, item.count + 1)
                                            }
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10"
                                        disabled={removingId === item.product._id}
                                        onClick={() => removeCartItem(item.product._id)}
                                    >
                                        {removingId === item.product._id ? (
                                            <Loader className="animate-spin mr-2 h-4 w-4" />
                                        ) : (
                                            <Trash2 className="mr-2 h-4 w-4" />
                                        )}
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ================= SUMMARY ================= */}
                <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <div className="rounded-3xl border bg-card p-8 space-y-6 shadow-sm">
                        <h2 className="text-2xl font-black">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-bold">
                                    {cartContent.data.totalCartPrice.toLocaleString()} EGP
                                </span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-bold text-emerald-600">Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-2xl font-black">
                                <span>Total</span>
                                <span className="text-blue-600">
                                    {cartContent.data.totalCartPrice.toLocaleString()} EGP
                                </span>
                            </div>
                        </div>
                        <div className="space-y-3 pt-2">
                            <CheckOut cartId={cartContent.cartId} />
                            <Link href="/">
                                <Button
                                    variant="outline"
                                    className="w-full h-12 font-bold rounded-xl"
                                >
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                        <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                            <ShoppingBag className="h-3 w-3" />
                            Secure checkout powered by WallMart
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
