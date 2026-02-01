"use client"
import { useState } from "react"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteAddressAction } from "../_actions/Profile.actions"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteAddressButton({ addressId }: { addressId: string }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [open, setOpen] = useState(false)

    async function handleDelete() {
        setIsDeleting(true)
        const result = await deleteAddressAction(addressId)
        setIsDeleting(false)
        setOpen(false) 

        if (result.success) {
            toast.success(result.message)
        } else {
            toast.error(result.message)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all rounded-full"
                >
                    <Trash2 className="size-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-[2.5rem] border-none p-8 shadow-2xl">
                <AlertDialogHeader className="flex flex-col items-center text-center">
                    <div className="size-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                        <AlertTriangle className="size-8 text-red-600" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-black uppercase italic text-slate-900">
                        Confirm Deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-slate-500 font-medium text-base">
                        Are you sure you want to remove this address? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
                    <AlertDialogCancel className="grow h-12 rounded-xl border-slate-200 font-bold uppercase text-xs tracking-widest hover:bg-slate-50">
                        Keep it
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault(); 
                            handleDelete();
                        }}
                        disabled={isDeleting}
                        className="grow h-12 rounded-xl bg-red-600 hover:bg-red-700 font-bold uppercase text-xs tracking-widest shadow-lg shadow-red-100"
                    >
                        {isDeleting ? <Loader2 className="size-4 animate-spin" /> : "Yes, Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}