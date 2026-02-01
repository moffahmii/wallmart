"use client" // 👈 ضروري جداً

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit3, User } from "lucide-react"
import EditProfileForm from "./EditProfileForm"

export default function EditProfileModal({ user }: { user: any }) {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-900 font-black py-7 uppercase text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-sm group">
                    <Edit3 className="size-4 mr-2 group-hover:rotate-12 transition-transform" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[3rem] border-none p-10 shadow-2xl max-w-md bg-white">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 shadow-inner">
                        <User className="size-10 text-slate-950" />
                    </div>
                    <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-slate-950">
                        Identity
                    </DialogTitle>
                </DialogHeader>
                <EditProfileForm user={user} onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}