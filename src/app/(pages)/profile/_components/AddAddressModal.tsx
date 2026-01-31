"use client"
import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddressForm from "./AddressForm"

export default function AddAddressModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-slate-950 hover:bg-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-slate-200">
                    <Plus className="mr-2 h-4 w-4" /> Add New Address
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-8">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic text-slate-900 border-b pb-4">
                        New Address
                    </DialogTitle>
                </DialogHeader>

                <AddressForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}