import { HeartOff, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ProductI } from '@/interfaces'
import AddToCart from '@/components/addtoCart/addToCart'
import WishlistButton from '@/app/(pages)/wishlist/wishlistButtons/page';
import { getUserWishlist } from './_actions/wishlist.actions';

export default async function WishlistPage() {
    const response = await getUserWishlist();
    const wishlistProducts: ProductI[] = response?.data || [];

    return (
        <main className="container mx-auto py-16 px-4 min-h-screen bg-[#fafafa]">
            
            {/* Header القسم العلوي */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b-8 border-slate-900 pb-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded-full">
                        <ShoppingBag size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Personal Collection</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
                        My <span className="text-red-500 underline decoration-8 underline-offset-12">Vault</span>
                    </h1>
                </div>
                <div className="bg-white border-4 border-slate-900 px-8 py-4 rounded-4xl shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                    <p className="font-black italic uppercase text-xl">
                        {wishlistProducts.length} Saved Items
                    </p>
                </div>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {wishlistProducts.map((product) => (
                        <div key={product._id} className="group flex bg-white border-4 border-slate-900 rounded-[32px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 min-h-55">
                            
                            {/* صورة المنتج مع زر الـ Toggle السريع */}
                            <div className="w-1/3 bg-slate-100 p-4 border-r-4 border-slate-900 overflow-hidden relative">
                                <img 
                                    src={product.imageCover} 
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                    alt={product.title} 
                                />
                                {/* الزر العائم فوق الصورة للتحكم في الحالة */}
                                <div className="absolute top-2 right-2">
                                    <WishlistButton productId={product._id} isFavoriteInitial={true} />
                                </div>
                            </div>
                            
                            {/* تفاصيل المنتج */}
                            <div className="w-2/3 p-6 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[10px] font-black text-red-500 uppercase italic tracking-widest">
                                            {product.brand?.name}
                                        </p>
                                        {/* خيار الحذف الصريح (Trash Icon) */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <WishlistButton productId={product._id} isFavoriteInitial={true} />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-black uppercase italic leading-[1.1] line-clamp-2">
                                        {product.title}
                                    </h3>
                                    <p className="text-2xl font-black italic mt-2">
                                        {product.price} <span className="text-[10px] uppercase text-slate-400">EGP</span>
                                    </p>
                                </div>
                                
                                <div className="flex gap-3 mt-4">
                                    <div className="flex-1">
                                        <AddToCart productId={product._id} />
                                    </div>
                                    <Link 
                                        href={`/products/${product._id}`}
                                        className="w-12 h-12 rounded-xl border-4 border-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none"
                                    >
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 border-8 border-dotted border-slate-200 rounded-[60px] bg-white">
                    <HeartOff size={100} className="mx-auto text-slate-100 mb-6" />
                    <h2 className="text-4xl font-black uppercase italic text-slate-300 tracking-tighter">Vault is Empty</h2>
                    <Link href="/products" className="inline-flex items-center gap-2 mt-8 font-black uppercase italic text-red-500 border-b-4 border-red-500">
                        Explore Collection <ArrowRight size={20} />
                    </Link>
                </div>
            )}
        </main>
    )
}