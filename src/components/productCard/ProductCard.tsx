// components/ProductCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductI } from '@/interfaces'
import Mystar from '@/components/ui/mystar'
import Link from 'next/link'
import AddToCart from '@/components/addtoCart/addToCart'
import WishlistButton from "../../app/(pages)/wishlist/wishlistButtons/page"

export function ProductCard({ product, isFavorite = false }: { product: ProductI, isFavorite?: boolean }) {
    return (
        <Card className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm 
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
            {/* Wishlist Button - Absolute Position */}
            <div className="absolute right-3 top-3 z-20">
                <WishlistButton
                    productId={product._id}
                    isFavoriteInitial={isFavorite}
                />
            </div>
            {/*Image */}
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square bg-linear-to-br from-slate-50 to-slate-100 p-6 overflow-hidden">
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* subtle overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/2 transition" />
                </div>
            </Link>
            {/* Content */}
            <div className="flex flex-col grow">
                <CardHeader className="px-5 pt-4 pb-2 space-y-1">
                    {/* Brand */}
                    <span className="text-[10px] font-black tracking-widest uppercase text-blue-600/70 italic">
                        {product.brand.name}
                    </span>
                    {/* Title */}
                    <CardTitle className="text-sm md:text-base font-bold leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {product.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pt-2 pb-4 mt-auto space-y-4">
                    {/* Rating + Price */}
                    <div className="flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Mystar
                                    key={s}
                                    fill={s <= Math.round(product.ratingsAverage)}
                                    className="size-3.5"
                                />
                            ))}
                            <span className="ml-1 text-[10px] font-black text-slate-400">
                                {product.ratingsAverage.toFixed(1)}
                            </span>
                        </div>
                        {/* Price */}
                        <p className="text-base md:text-lg font-black italic text-slate-900">
                            {product.price.toLocaleString()}
                            <span className="ml-1 text-[9px] font-bold text-slate-400 uppercase">
                                EGP
                            </span>
                        </p>
                    </div>
                </CardContent>
            </div>
            {/* Action */}
            <div className="px-5 pb-5 mt-auto">
                <AddToCart productId={product._id} />
            </div>
        </Card>
    )
}