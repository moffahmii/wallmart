"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateMeAction } from "../_actions/Profile.actions" // سنضيفه للأكشنز
import { toast } from "sonner"
import { Loader2, User } from "lucide-react"

export default function EditProfileForm({ user, onSuccess }: { user: any, onSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        }

        const result = await updateMeAction(payload)
        setIsLoading(false)

        if (result.success) {
            toast.success("Profile updated! Please re-login to see changes.")
            onSuccess()
        } else {
            toast.error(result.message)
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-5 pt-4">
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Full Name</Label>
                <Input name="name" defaultValue={user?.name} required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Email Address</Label>
                <Input name="email" type="email" defaultValue={user?.email} required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Phone Number</Label>
                <Input name="phone" defaultValue={user?.phone} required className="rounded-xl h-12 border-slate-100 bg-slate-50/50" />
            </div>
            <Button disabled={isLoading} className="w-full h-14 rounded-2xl bg-slate-950 hover:bg-blue-600 font-black uppercase italic tracking-tighter transition-all duration-300">
                {isLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </Button>
        </form>
    )
}