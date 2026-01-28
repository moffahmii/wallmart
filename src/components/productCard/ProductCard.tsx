// components/ProductCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductI } from '@/interfaces'
import Mystar from '@/components/ui/mystar'
import Link from 'next/link'
import AddToCart from '@/components/addtoCart/addToCart'

export function ProductCard({ product }: { product: ProductI }) {
    return (
        <Card className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">

            {/* Image */}
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 p-6 overflow-hidden">
                    <img
                        src={product.imageCover}
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* subtle overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition" />
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <CardHeader className="px-5 pt-4 pb-2 space-y-1">
                    {/* Brand */}
                    <span className="text-[10px] font-semibold tracking-widest uppercase text-blue-600/70">
                        {product.brand.name}
                    </span>

                    {/* Title */}
                    <CardTitle className="text-sm md:text-base font-semibold leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                            <span className="ml-1 text-[10px] font-medium text-muted-foreground">
                                {product.ratingsAverage.toFixed(1)}
                            </span>
                        </div>

                        {/* Price */}
                        <p className="text-base md:text-lg font-bold text-slate-900">
                            {product.price.toLocaleString()}
                            <span className="ml-1 text-[9px] font-medium text-muted-foreground uppercase">
                                EGP
                            </span>
                        </p>
                    </div>
                </CardContent>
            </div>

            {/* Action */}
            <div className="px-5 pb-5">
                <AddToCart productId={product._id} />
            </div>
        </Card>
    )
}
