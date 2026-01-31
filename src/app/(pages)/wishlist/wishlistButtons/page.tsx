'use client'

import { useState, useTransition } from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { addToWishlist, removeFromWishlist } from '../_actions/wishlist.actions'

interface WishlistButtonProps {
    productId: string;
    isFavoriteInitial: boolean;
}

export default function WishlistButton({ productId, isFavoriteInitial }: WishlistButtonProps) {
    const [isFavorite, setIsFavorite] = useState(isFavoriteInitial)
    const [isPending, startTransition] = useTransition()

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (isPending) return

        startTransition(async () => {
            try {
                if (isFavorite) {
                    // منطق الحذف
                    const res = await removeFromWishlist(productId)
                    if (res?.status === 'success') {
                        setIsFavorite(false)
                        toast.error('Removed from vault', { icon: '💔' })
                    } else {
                        toast.error('Authentication required')
                    }
                } else {
                    // منطق الإضافة
                    const res = await addToWishlist(productId)
                    if (res?.status === 'success') {
                        setIsFavorite(true)
                        toast.success('Added to vault', { icon: '❤️' })
                    } else {
                        toast.error('Authentication required')
                    }
                }
            } catch {
                toast.error('Process failed. Try again.')
            }
        })
    }

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`
                flex items-center justify-center p-2.5 transition-all duration-300
                rounded-(--radius) border border-border
                ${isFavorite 
                    ? 'bg-destructive/10 text-destructive border-destructive/20' 
                    : 'bg-secondary/50 text-foreground hover:border-primary/30'}
                active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed
            `}
        >
            {isPending ? (
                <Loader2 className="size-4 animate-spin" />
            ) : (
                <Heart className={`size-4 ${isFavorite ? 'fill-current' : ''}`} />
            )}
        </button>
    )
}