'use client'
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/checkOut'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/interfaces'
import { Loader, Trash2, ShoppingBag, Plus, Minus, ArrowLeft } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export default function Cart() {
    const [removingId, setRemovingId] = useState<null | string>(null)
    const [updatingId, setUpdatingId] = useState<null | string>(null)
    const [isClearing, setIsClearing] = useState<boolean>(false)

    let { cartContent, isLoading, getCart, setCartContent } = useContext(CartContext)

    useEffect(() => {
        if (!cartContent) getCart()
    }, [cartContent, getCart])

    if (isLoading || !cartContent) return <Loading />

    // Empty Cart State
    if (!cartContent.data?.products?.length) {
        return (
            <div className="container mx-auto py-20 px-4">
                <div className="max-w-md mx-auto text-center space-y-6">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Your cart is empty</h2>
                        <p className="text-muted-foreground italic">
                            Looks like you haven&apos;t added anything to your cart yet.
                        </p>
                    </div>
                    <Link href="/">
                        <Button className="w-full mt-4 h-12 text-lg rounded-xl">
                            <ArrowLeft className="mr-2 h-5 w-5" /> Start Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Handlers (Keep your logic as it is, just UI updates)
    async function removeCartItem(productId: string) {
        setRemovingId(productId)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
            method: "DELETE",
            headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkzNzA5MTMsImV4cCI6MTc3NzE0NjkxM30.SlvFLZd5Y6RqTOIyAu_W3N217XTdayTcEWJ3uUBx3yw" } // Note: Move token to env or secure storage
        })
        const data: CartResponse = await response.json()
        if (data.status == 'success') {
            setCartContent(data)
            toast.success('Product removed')
        }
        setRemovingId(null)
    }

    async function updateCartItem(productId: string, count: number) {
        if (count < 1) return
        setUpdatingId(productId)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
            method: "PUT",
            body: JSON.stringify({ count }),
            headers: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkzNzA5MTMsImV4cCI6MTc3NzE0NjkxM30.SlvFLZd5Y6RqTOIyAu_W3N217XTdayTcEWJ3uUBx3yw",
                'content-type': 'application/json'
            }
        })
        const data: CartResponse = await response.json()
        if (data.status == 'success') {
            setCartContent(data)
        }
        setUpdatingId(null)
    }

    async function clearCart() {
        setIsClearing(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
            method: "DELETE",
            headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkzNzA5MTMsImV4cCI6MTc3NzE0NjkxM30.SlvFLZd5Y6RqTOIyAu_W3N217XTdayTcEWJ3uUBx3yw" }
        })
        const data: CartResponse = await response.json()
        if (data.message === 'success') {
            setCartContent(null)
            toast.success('Cart cleared')
        }
        setIsClearing(false)
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-7xl">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className='text-4xl font-black tracking-tight'>Shopping Cart</h1>
                    <p className='text-muted-foreground mt-2 flex items-center gap-2 text-lg'>
                        You have <span className='font-bold text-foreground'>{cartContent?.numOfCartItems}</span> items
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10 font-bold"
                    onClick={clearCart}
                    disabled={isClearing}
                >
                    {isClearing ? <Loader className="animate-spin mr-2 h-4 w-4" /> : <Trash2 className="mr-2 h-4 w-4" />}
                    Clear Cart
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* --- Left: Cart Items List --- */}
                <div className="lg:col-span-8 space-y-6">
                    {cartContent?.data.products.map((item) => (
                        <div key={item._id} className="group relative flex flex-col sm:flex-row gap-6 p-5 rounded-2xl border bg-card hover:shadow-md transition-all duration-300">
                            {/* Product Image */}
                            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border bg-muted mx-auto sm:mx-0">
                                <img src={item.product.imageCover} alt={item.product.title} className="h-full w-full object-cover" />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold line-clamp-1">{item.product.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 font-medium">
                                            {item.product.brand.name} • {item.product.category.name}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black">{item.price.toLocaleString()} <span className='text-xs font-normal'>EGP</span></p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6">
                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3 bg-muted/50 p-1 rounded-lg border">
                                        <Button
                                            variant="ghost" size="icon" className="h-8 w-8 rounded-md"
                                            onClick={() => updateCartItem(item.product._id, item.count - 1)}
                                            disabled={item.count <= 1 || updatingId === item.product._id}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>

                                        <span className="w-8 text-center font-bold text-lg">
                                            {updatingId === item.product._id ? <Loader className="animate-spin h-4 w-4 mx-auto" /> : item.count}
                                        </span>

                                        <Button
                                            variant="ghost" size="icon" className="h-8 w-8 rounded-md"
                                            onClick={() => updateCartItem(item.product._id, item.count + 1)}
                                            disabled={updatingId === item.product._id}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Remove Item */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10"
                                        onClick={() => removeCartItem(item.product._id)}
                                        disabled={removingId === item.product._id}
                                    >
                                        {removingId === item.product._id ? <Loader className="animate-spin mr-2 h-4 w-4" /> : <Trash2 className="mr-2 h-4 w-4" />}
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Right: Order Summary --- */}
                <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                    <div className="rounded-2xl border bg-card p-8 shadow-sm space-y-6">
                        <h2 className="text-2xl font-black">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-lg text-muted-foreground font-medium">
                                <span>Subtotal</span>
                                <span className='text-foreground font-bold'>{cartContent?.data.totalCartPrice.toLocaleString()} EGP</span>
                            </div>
                            <div className="flex justify-between text-lg text-muted-foreground font-medium">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-bold italic">Free</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-2xl font-black pt-2">
                                <span>Total</span>
                                <span className="text-blue-600">{cartContent?.data.totalCartPrice.toLocaleString()} EGP</span>
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <CheckOut cartId={cartContent.cartId} />
                            <Link href="/">
                                <Button variant="outline" className="w-full h-12 text-base font-bold border-2 rounded-xl">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>

                        {/* Safe Checkout Badge */}
                        <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                            <ShoppingBag className="h-3 w-3" /> Secure checkout powered by WallMart
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}