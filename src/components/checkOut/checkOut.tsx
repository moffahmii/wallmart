'use client'
import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Banknote, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import getUserToken from '@/app/helpers/getUserToken'

export default function CheckOut({ cartId }: { cartId: string }) {
    const { data: session } = useSession()
    const router = useRouter()

    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)
    async function checkOutSession() {
        const token = await getUserToken()
        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,
            {
                method: "POST",
                headers: {
                    token: token!,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ shippingAddress })
            }
        )
        const data = await response.json()
        if (data.status === 'success') {
            window.location.href = data.session.url
        }
    }
    async function createCashOrder() {
        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }
        const token = await getUserToken()
        const response = await fetch(
            `${process.env.API_URL}/orders/${cartId}`,
            {
                method: "POST",
                headers: {
                    token: token!,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ shippingAddress })
            }
        )
        const data = await response.json()
        if (data.status === 'success') {
            toast.success("Order Created Successfully!")
            router.push(`/allorders`)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full cursor-pointer text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl shadow-lg shadow-blue-100 mt-4'>
                    Proceed to Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[32px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic">Shipping Address</DialogTitle>
                    <DialogDescription className="font-bold text-slate-400">Where should we deliver your order?</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">City</Label>
                        <Input id="city" ref={cityInput} placeholder="Cairo" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Phone</Label>
                        <Input id="phone" ref={phoneInput} placeholder="01xxxxxxxxx" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Full Details</Label>
                        <Input id="details" ref={detailsInput} placeholder="Street, Building, Flat" className="rounded-xl h-12" />
                    </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button onClick={checkOutSession} className="flex-1 h-12 rounded-xl font-black uppercase italic bg-slate-900">
                        <CreditCard className="mr-2" /> Visa
                    </Button>
                    <Button onClick={createCashOrder} variant="outline" className="flex-1 h-12 rounded-xl font-black uppercase italic border-2">
                        <Banknote className="mr-2 text-green-600" /> Cash
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}