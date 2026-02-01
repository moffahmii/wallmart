import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import CheckOut from '@/components/checkOut/checkOut'
import Link from 'next/link'

export function CartSummary({ total, cartId }: { total: number, cartId: string }) {
    console.log("Current Cart ID:", cartId); 
    return (
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="rounded-[40px] border-4 border-slate-900 bg-white p-10 space-y-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Summary</h2>
                <div className="space-y-5">
                    <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <span>Subtotal</span>
                        <span className="font-black italic text-xl text-slate-900">{total.toLocaleString()} EGP</span>
                    </div>
                    <Separator className="h-1 bg-slate-100" />
                    <div className="flex justify-between items-end font-black uppercase italic text-lg">
                        <span>Total</span>
                        <p className="text-3xl text-blue-600 leading-none">{total.toLocaleString()} EGP</p>
                    </div>
                </div>
                <div className="space-y-4 pt-4">
                    <CheckOut cartId={cartId} />
                    <Link href="/products" className="block">
                        <Button variant="outline" className="w-full h-14 font-black uppercase italic rounded-2xl border-4 border-slate-900">Add More Items</Button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}