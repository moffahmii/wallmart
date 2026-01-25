'use client'
import Loading from '@/app/loading'
import { CartContext } from '@/components/context/cartContext'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import React, { useContext } from 'react'

export default function Cart() {
    let { cartContent, isLoading, getCart } = useContext(CartContext)
    typeof cartContent?.data.products[0].product == 'string' && getCart()
    return <>
        {isLoading || typeof cartContent?.data.products[0].product == 'string' && getCart()            ? <Loading /> :

            <div className="container mx-auto py-6 px-4">
                <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
                <p className='text-muted-foreground mt-1'><span className='font-bold'>{cartContent?.numOfCartItems}</span> Itmes in your cart</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartContent?.data.products.map((item) =>
                            <div key={item._id} className='flex gap-4  rounded-xl p-4 shadow-sm border bg-card'>
                                <img src={item.product.imageCover} alt={item.product.title}
                                    className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                        <div>
                                            <h1 className='font-semibold text-base md:text-lg line-clamp-2'>
                                                {item.product.title}
                                            </h1>
                                            <p className='text-muted-foreground mt-1'>
                                                {item.product.brand.name}
                                                {item.product.category.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">
                                                EGP {item.price}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex mt-3 items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent'>
                                                -
                                            </button>
                                            <span className='w-6 text-center font-medium'>{item.count}</span>
                                            <button aria-label='increase' className='size-8 rounded-lg border hover:bg-accent'>
                                                +
                                            </button>
                                        </div>
                                        <button aria-label='remove' className='text-sm cursor-pointer text-destructive hover:underline items-baseline-last'>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    <div className='lg:col-span-1 sticky top-18'>
                        <div className="border rounded-xl p-5 shadow-sm">
                            <h2 className='text-lg font-semibold'>Order Summary</h2>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className='text-sm text-muted-foreground'>Subtotal : {cartContent?.numOfCartItems} Itmes</span>
                                    <span className='font-semibold'>{cartContent?.data.totalCartPrice} EGP</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className='text-sm text-muted-foreground'>Shipping</span>
                                    <span className='text-emerald-600 font-medium'>Free</span>
                                </div>
                            </div>
                            <div className="my-4 border-t">
                                <div className="flex items-center justify-between mt-4">
                                    <span className='text-base font-semibold'>Total</span>
                                    <span className='text-base font-bold'>{cartContent?.data.totalCartPrice} EGP </span>
                                </div>
                                <Button className='w-full cursor-pointer text-lg mt-4'>Proceed to Checkout</Button>
                                <Button className='w-full cursor-pointer text-lg mt-2'>Continue Shopping</Button>
                            </div>
                            <Button variant={'outline'}
                                className='mt-2 ms-auto text-destructive cursor-pointer flex hover:text-shadow-destructive'>
                                <Trash2 /> Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>}
    </>
}
