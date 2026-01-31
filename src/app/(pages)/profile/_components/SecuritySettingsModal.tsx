"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2, ShieldCheck } from "lucide-react"
import ChangePasswordForm from "./ChangePasswordForm"

export default function SecuritySettingsModal() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full rounded-2xl bg-slate-950 text-white font-black py-7 uppercase text-[10px] tracking-widest hover:bg-blue-600 hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-slate-200">
                    <Settings2 className="size-4 mr-2" /> Security Settings
                </Button>
            </DialogTrigger>
            <DialogContent className="rounded-[3rem] border-none p-10 shadow-2xl max-w-md bg-white">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 shadow-inner">
                        <ShieldCheck className="size-10 text-slate-950" />
                    </div>
                    <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter text-slate-950">
                        Update Security
                    </DialogTitle>
                    <p className="text-slate-400 text-sm font-medium mt-2">
                        Enter your current credentials to verify identity.
                    </p>
                </DialogHeader>
                <ChangePasswordForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    )
}