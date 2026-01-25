// components/ProductCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductI } from '@/interfaces'
import Mystar from '@/components/ui/mystar'
import Link from 'next/link'
import AddToCart from '@/components/addtoCart/addToCart'

export function ProductCard({ product }: { product: ProductI }) {
    return (
        <Card className="group overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl w-full flex flex-col h-full bg-white">
            <Link href={'/products/' + product.id} className="flex-grow">
                {/* Image Wrapper - يملأ عرض الكارد بالكامل */}
                <div className="relative aspect-square overflow-hidden bg-gray-50/40 p-5">
                    <img 
                        src={product.imageCover} 
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" 
                        alt={product.title} 
                    />
                </div>

                <CardHeader className="p-4 pb-0 space-y-1">
                    {/* Brand Name */}
                    <span className="text-[10px] font-medium text-blue-600/70 uppercase tracking-widest">
                        {product.brand.name}
                    </span>
                    {/* Title - Semi-bold */}
                    <CardTitle className="text-sm md:text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-2 space-y-4">
                    <div className="flex items-center justify-between">
                        {/* Rating Section */}
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Mystar 
                                    key={s} 
                                    fill={s <= Math.round(product.ratingsAverage)} 
                                    className="size-3 md:size-3.5" 
                                />
                            ))}
                            <span className="text-[10px] font-medium text-muted-foreground ml-1">
                                ({product.ratingsAverage})
                            </span>
                        </div>
                        
                        {/* Price - Semi-bold */}
                        <p className="font-semibold text-base md:text-lg text-slate-900 leading-none">
                            {product.price.toLocaleString()} <span className="text-[9px] font-normal text-muted-foreground uppercase">EGP</span>
                        </p>
                    </div>
                </CardContent>
            </Link>

            {/* Action Button */}
            <div className="p-4 pt-0">
                <AddToCart productId={product._id} />
            </div>
        </Card>
    )
}