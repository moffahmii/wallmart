"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, ShieldCheck } from "lucide-react"
import { changePasswordAction } from "../_actions/Profile.actions"

export default function ChangePasswordForm({ onSuccess }: { onSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const payload = Object.fromEntries(formData)

        if (payload.password !== payload.rePassword) {
            toast.error("Passwords do not match")
            setIsLoading(false)
            return
        }

        const result = await changePasswordAction(payload)
        setIsLoading(false)

        if (result.success) {
            toast.success("Password changed successfully!")
            onSuccess()
        } else {
            toast.error(result.message || "Failed to change password")
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5 pt-4">
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Current Password</Label>
                <Input name="currentPassword" type="password" required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">New Password</Label>
                <Input name="password" type="password" required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Confirm New Password</Label>
                <Input name="rePassword" type="password" required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <Button disabled={isLoading} className="w-full h-14 rounded-2xl bg-slate-950 hover:bg-blue-600 font-black uppercase italic tracking-tighter transition-all duration-300 shadow-xl shadow-slate-200">
                {isLoading ? <Loader2 className="animate-spin" /> : "Update Security Credentials"}
            </Button>
        </form>
    )
}