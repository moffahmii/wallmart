export const dynamic = "force-dynamic";

import { HeartOff, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProductI } from "@/interfaces"
import AddToCart from "@/components/addtoCart/addToCart"
import WishlistButton from "./wishlistButtons/page"
import { getUserWishlist } from "./_actions/wishlist.actions"

export default async function WishlistPage() {
    const response = await getUserWishlist()
    const wishlistProducts: ProductI[] = response?.data || []

    return (
        <main className="container mx-auto py-20 px-6 min-h-screen">
            <header className="mb-12 flex items-end justify-between border-b border-border pb-6">
                <div className="space-y-1">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter">
                        Wishlist
                    </h1>
                    <p className="text-sm font-medium text-muted-foreground italic">
                        The products you saved for later
                    </p>
                </div>

                <span className="text-xs font-black uppercase italic bg-secondary text-secondary-foreground px-4 py-1.5 rounded-[var(--radius)]">
                    {wishlistProducts.length} Items
                </span>
            </header>

            {wishlistProducts.length ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {wishlistProducts.map(product => (
                        <div
                            key={product._id}
                            className="group relative flex gap-6 p-6 rounded-[var(--radius)] border border-border bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <WishlistButton productId={product._id}  isFavoriteInitial={true} />
                            </div>

                            <div className="h-32 w-32 shrink-0 rounded-xl bg-muted/50 p-3 overflow-hidden">
                                <img
                                    src={product.imageCover}
                                    alt={product.title}
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex flex-col justify-between flex-1">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-black uppercase italic leading-tight line-clamp-2">
                                        {product.title}
                                    </h3>

                                    <p className="text-2xl font-black text-primary italic">
                                        {product.price.toLocaleString()}
                                        <span className="text-[10px] text-muted-foreground ml-1 uppercase not-italic">
                                            EGP
                                        </span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 mt-4">
                                    <div className="flex-1">
                                        <AddToCart productId={product._id} />
                                    </div>

                                    <Link
                                        href={`/products/${product._id}`}
                                        className="p-3 rounded-[var(--radius)] bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                    >
                                        <ArrowRight className="size-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center border border-dashed border-border/60 rounded-[var(--radius)] bg-muted/10">
                    <HeartOff size={60} className="mx-auto text-muted-foreground/30" />
                    <p className="mt-6 font-black text-muted-foreground uppercase italic tracking-widest">
                        Your wishlist is empty
                    </p>

                    <Link
                        href="/products"
                        className="inline-block mt-8 px-8 py-3 rounded-[var(--radius)] bg-primary text-primary-foreground font-black uppercase italic text-sm hover:opacity-90 transition-opacity"
                    >
                        Browse products
                    </Link>
                </div>
            )}
        </main>
    )
}