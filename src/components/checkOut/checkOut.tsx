"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { CreditCard, Banknote, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { getAddressesAction } from "@/app/(pages)/profile/_actions/Profile.actions"
import getUserToken from "@/app/helpers/getUserToken"

export default function CheckOut({ cartId }: { cartId: string }) {
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState<any>(null)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    useEffect(() => {
        getAddressesAction().then(res => setAddresses(res.data || []))
    }, [])

    const handleCheckOut = async (method: 'visa' | 'cash') => {
        if (!cartId) return toast.error("Active cart not found. Please add items first.")
        if (!selectedAddress) return toast.error("Please select a shipping address")

        setIsPending(true)

        try {
            const token = await getUserToken()
            const baseUrl = "https://ecommerce.routemisr.com/api/v1"
            const url = method === 'visa'
                ? `${baseUrl}/orders/checkout-session/${cartId}?url=${window.location.origin}`
                : `${baseUrl}/orders/${cartId}`

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "token": token!,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shippingAddress: {
                        details: selectedAddress.details,
                        city: selectedAddress.city,
                        phone: selectedAddress.phone
                    }
                })
            })

            const data = await response.json()

            if (response.ok && data.status === 'success') {
                if (method === 'visa') {
                    window.location.href = data.session.url
                } else {
                    toast.success("Order Created Successfully!")
                    router.push('/allorders')
                }
            } else {
                toast.error(data.message || "Failed to process order. Your cart might be empty.")
            }
        } catch (error) {
            toast.error("Network error. Please try again later.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full h-14 rounded-2xl bg-blue-600 font-black uppercase italic shadow-xl hover:bg-blue-700 transition-all">
                    Proceed to Checkout
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[2.5rem] p-10 max-w-lg bg-white border-none shadow-2xl">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter">
                        Shipping
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-2">
                        Select From Saved Addresses
                    </span>

                    <div className="grid gap-3 max-h-62.5 overflow-y-auto pr-2 custom-scrollbar">
                        {addresses.length > 0 ? (
                            addresses.map((addr: any) => (
                                <div
                                    key={addr._id}
                                    onClick={() => setSelectedAddress(addr)}
                                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${selectedAddress?._id === addr._id
                                            ? 'border-blue-600 bg-blue-50/50 shadow-md'
                                            : 'border-slate-100 hover:border-slate-200 bg-white'
                                        }`}
                                >
                                    <p className="font-black text-slate-900 italic uppercase tracking-tighter leading-none">
                                        {addr.name}
                                    </p>
                                    <p className="text-xs font-medium text-slate-500 mt-1 truncate">
                                        {addr.city} • {addr.details}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-4 text-slate-400 italic font-bold">
                                No addresses found. Add one in profile.
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter className="flex-row gap-3">
                    <Button
                        disabled={isPending || !selectedAddress}
                        onClick={() => handleCheckOut('visa')}
                        className="flex-1 h-14 rounded-2xl bg-slate-950 font-black uppercase italic"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : <><CreditCard className="mr-2" /> Visa</>}
                    </Button>

                    <Button
                        disabled={isPending || !selectedAddress}
                        onClick={() => handleCheckOut('cash')}
                        variant="outline"
                        className="flex-1 h-14 rounded-2xl border-2 border-slate-950 font-black uppercase italic"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : <><Banknote className="mr-2 text-green-600" /> Cash</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}