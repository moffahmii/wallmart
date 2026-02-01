"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { updateMeAction } from "../_actions/Profile.actions"

export default function UpdateProfileForm({ user }: { user: any }) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
        }

        const res = await updateMeAction(payload)
        setIsLoading(false)

        if (res.success) {
            toast.success("Profile updated! Please log in again to refresh data.")
        } else {
            toast.error(res.message)
        }
    }

    return (
        <form onSubmit={handleUpdate} className="space-y-4 pt-4">
            <Input name="name" defaultValue={user?.name} placeholder="Full Name" className="rounded-xl h-12" />
            <Input name="email" defaultValue={user?.email} placeholder="Email Address" className="rounded-xl h-12" />
            <Input name="phone" defaultValue={user?.phone} placeholder="Phone Number" className="rounded-xl h-12" />
            <Button disabled={isLoading} className="w-full h-12 rounded-xl bg-slate-950">
                {isLoading ? "Updating..." : "Save Changes"}
            </Button>
        </form>
    )
}