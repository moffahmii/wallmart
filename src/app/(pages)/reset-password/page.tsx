"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Lock, Mail, CheckCircle2, Save } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { resetPasswordAction } from "./_actions/resetPasswordAction"
const resetSchema = z.object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8+ chars, with uppercase, lowercase, number and special char."
    ),
})
type ResetFields = z.infer<typeof resetSchema>
export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const form = useForm<ResetFields>({
        resolver: zodResolver(resetSchema),
        mode: "onChange",
        defaultValues: { email: "", newPassword: "" },
    })
    const { errors, touchedFields } = form.formState
    async function onSubmit(values: ResetFields) {
        setIsLoading(true)
        const result = await resetPasswordAction(values.email, values.newPassword)
        if (result.success) {
            toast.success("Password updated successfully! Please login now.")
            router.push("/login")
        } else {
            toast.error(result.error)
        }
        setIsLoading(false)
    }
    const getStatusClass = (name: keyof ResetFields) => {
        if (!touchedFields[name]) return "border-slate-200"
        return errors[name] ? "border-red-500 bg-red-50/30" : "border-green-500 bg-green-50/30"
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-[85vh] px-4">
            <div className="w-full max-w-md">
                <div className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                    {/* Header */}
                    <div className="bg-slate-50/80 p-10 text-center space-y-3 border-b">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <Save size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tight">New Password</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Secure your account with a new password
                        </p>
                    </div>
                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Field (Confirm identity) */}
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">
                                            Confirm Email {touchedFields.email && !errors.email && <CheckCircle2 className="size-3 text-green-500" />}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input placeholder="name@example.com" {...field} className={`pl-10 h-12 rounded-xl transition-all ${getStatusClass('email')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                {/* New Password Field */}
                                <FormField control={form.control} name="newPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">
                                            New Password {touchedFields.newPassword && !errors.newPassword && <CheckCircle2 className="size-3 text-green-500" />}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input type="password" placeholder="••••••••" {...field} className={`pl-10 h-12 rounded-xl transition-all ${getStatusClass('newPassword')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold leading-tight" />
                                    </FormItem>
                                )} />
                                <Button disabled={isLoading} className="w-full h-14 rounded-2xl text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Safe Shopping with WallMart
                </p>
            </div>
        </div>
    )
}