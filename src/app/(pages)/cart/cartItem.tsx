import { Trash2, Plus, Minus, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItemProps {
    item: any;
    updatingId: string | null;
    removingId: string | null;
    onUpdate: (id: string, count: number) => void;
    onRemove: (id: string) => void;
}

export function CartItem({ item, updatingId, removingId, onUpdate, onRemove }: CartItemProps) {
    if (!item?.product) return null;

    const isUpdating = updatingId === item.product._id;
    const isRemoving = removingId === item.product._id;

    return (
        <div className="group relative rounded-[32px] border-4 border-slate-900 bg-white p-6 flex flex-col sm:flex-row gap-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
            <div className="h-40 w-40 shrink-0 rounded-2xl border-4 border-slate-100 bg-slate-50 overflow-hidden p-2">
                <img
                    src={item.product?.imageCover || null} 
                    alt={item.product?.title || 'Product'}
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="flex flex-1 flex-col justify-between py-2">
                <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-black uppercase italic leading-tight line-clamp-2">
                            {item.product?.title || "Untitled Product"}
                        </h3>
                        <p className="text-2xl font-black italic">
                            {(item.price || 0).toLocaleString()} <span className="text-[10px]">EGP</span>
                        </p>
                    </div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">
                        {item.product?.brand?.name || "No Brand"}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center gap-3 bg-slate-100 border-2 border-slate-900 rounded-2xl p-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-xl"
                            disabled={item.count <= 1 || isUpdating}
                            onClick={() => onUpdate(item.product._id, item.count - 1)}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-black italic">
                            {isUpdating ? <Loader className="h-4 w-4 animate-spin mx-auto" /> : (item.count || 1)}
                        </span>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-xl"
                            disabled={isUpdating}
                            onClick={() => onUpdate(item.product._id, item.count + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-500 font-black uppercase italic"
                        disabled={isRemoving}
                        onClick={() => onRemove(item.product._id)}
                    >
                        {isRemoving ? <Loader className="animate-spin h-4 w-4" /> : <Trash2 className="h-4 w-4 mr-1" />} Remove
                    </Button>
                </div>
            </div>
        </div>
    )
}