// app/(pages)/wishlist/page.tsx
export const dynamic = "force-dynamic";

import { HeartOff, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ProductI } from '@/interfaces'
import AddToCart from '@/components/addtoCart/addToCart'
import WishlistButton from './wishlistButtons/page'
import { getUserWishlist } from './_actions/wishlist.actions'

export default async function WishlistPage() {
    const response = await getUserWishlist();
    const wishlistProducts: ProductI[] = response?.data || [];

    return (
        <main className="container mx-auto py-16 px-4 min-h-screen">
            <header className="mb-12 flex justify-between items-end border-b-4 pb-6">
                <h1 className="text-5xl font-black italic uppercase">
                    My Wishlist
                </h1>
                <span className="font-black text-slate-500">
                    {wishlistProducts.length} items
                </span>
            </header>

            {wishlistProducts.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wishlistProducts.map(product => (
                        <div
                            key={product._id}
                            className="border-4 rounded-3xl p-6 flex gap-6"
                        >
                            <img
                                src={product.imageCover}
                                className="w-32 h-32 object-contain"
                                alt={product.title}
                            />

                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-black uppercase italic">
                                        {product.title}
                                    </h3>
                                    <p className="font-black mt-2">
                                        {product.price} EGP
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <AddToCart productId={product._id} />
                                    <Link
                                        href={`/products/${product._id}`}
                                        className="p-3 border-2 rounded-xl"
                                    >
                                        <ArrowRight />
                                    </Link>
                                    <WishlistButton
                                        productId={product._id}
                                        isFavoriteInitial
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-32">
                    <HeartOff size={80} className="mx-auto text-slate-200" />
                    <p className="mt-6 font-black text-slate-400 uppercase">
                        Wishlist is empty
                    </p>
                </div>
            )}
        </main>
    )
}
