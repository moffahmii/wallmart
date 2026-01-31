"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AddressForm from "./AddressForm"
import DeleteAddressButton from "./DeleteAddressButton"

export default function AddressCard({ addr }: { addr: any }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    return (
        <>
            <Card
                onClick={() => setIsEditModalOpen(true)}
                className="rounded-2xl border-slate-100 hover:border-blue-500 transition-all group shadow-sm cursor-pointer relative"
            >
                <CardContent className="p-5 flex justify-between items-start">
                    <div className="space-y-1">
                        <Badge variant="secondary" className="mb-2 bg-slate-100 text-slate-600 border-none font-bold text-[10px] uppercase">
                            {addr.name || 'Address'}
                        </Badge>
                        <p className="font-bold text-slate-900 text-lg">{addr.city}</p>
                        <p className="text-sm text-slate-500 leading-snug">{addr.details}</p>
                        <p className="text-xs font-semibold text-slate-400 pt-2 flex items-center gap-2">
                            <span className="size-1 bg-slate-300 rounded-full" /> {addr.phone}
                        </p>
                    </div>

                    {/* نوقف الـ Bubbling عشان لما ندوس حذف ميفتحش المودال */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeleteAddressButton addressId={addr._id} />
                    </div>
                </CardContent>
            </Card>

            {/* مودال التعديل */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="rounded-[2.5rem] border-none p-8 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase italic">Edit Address</DialogTitle>
                    </DialogHeader>
                    <AddressForm
                        initialData={addr}
                        onSuccess={() => setIsEditModalOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}