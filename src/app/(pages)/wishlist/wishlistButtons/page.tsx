'use client'
import { useState, useTransition } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { toast } from 'sonner' // أو أي مكتبة Toast تستخدمها
import { addToWishlist, removeFromWishlist } from '@/app/(pages)/wishlist/_actions/wishlist.actions'

export default function WishlistButton({ 
    productId, 
    isFavoriteInitial 
}: { 
    productId: string, 
    isFavoriteInitial: boolean 
}) {
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial)
    const [isPending, startTransition] = useTransition()

    const handleToggle = (e: React.MouseEvent) => {
        // منع الضغط على الكارد نفسه لو كان بداخل Link
        e.preventDefault()
        e.stopPropagation()

        startTransition(async () => {
            try {
                if (isFavorite) {
                    const res = await removeFromWishlist(productId)
                    if (res.status === 'success') {
                        setIsFavorite(false)
                        toast.error("Removed from Vault", { icon: "💔" })
                    }
                } else {
                    const res = await addToWishlist(productId)
                    if (res.status === 'success') {
                        setIsFavorite(true)
                        toast.success("Added to Vault", { icon: "❤️" })
                    }
                }
            } catch (error) {
                toast.error("Something went wrong")
            }
        })
    }

    return (
        <button 
            onClick={handleToggle}
            disabled={isPending}
            className={`
                group flex items-center justify-center p-2.5 rounded-xl border-2 transition-all duration-300
                ${isFavorite 
                    ? 'bg-red-50 border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]' 
                    : 'bg-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'}
                active:scale-90 disabled:opacity-70
            `}
        >
            {isPending ? (
                <Loader2 className="size-5 animate-spin text-slate-400" />
            ) : (
                <Heart 
                    className={`size-5 transition-all duration-300 ${
                        isFavorite 
                            ? 'fill-red-500 text-red-500 scale-110' 
                            : 'text-slate-900 group-hover:text-red-500'
                    }`} 
                />
            )}
        </button>
    )
}