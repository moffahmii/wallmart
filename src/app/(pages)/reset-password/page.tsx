"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Lock, Mail, CheckCircle2, Save, XCircle } from "lucide-react"
import { useState } from "react"
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
    const [serverMessage, setServerMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
    const router = useRouter()
    const form = useForm<ResetFields>({
        resolver: zodResolver(resetSchema),
        mode: "onChange",
        defaultValues: { email: "", newPassword: "" },
    })
    const { errors, touchedFields } = form.formState
    async function onSubmit(values: ResetFields) {
        setIsLoading(true)
        setServerMessage(null)

        const result = await resetPasswordAction(values.email, values.newPassword)

        if (result.success) {
            setServerMessage({
                type: 'success',
                text: "Password updated! Redirecting to login..."
            })
            setTimeout(() => router.push("/login"), 2000)
        } else {
            setServerMessage({
                type: 'error',
                text: result.error || "Failed to update password. Please try again."
            })
        }
        setIsLoading(false)
    }
    const getStatusClass = (name: keyof ResetFields) => {
        if (!touchedFields[name]) return "border-slate-100"
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
                        {serverMessage && (
                            <div className={`mb-6 p-4 rounded-2xl border-2 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${serverMessage.type === 'success'
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                    : 'bg-rose-50 border-rose-500 text-rose-700'
                                }`}>
                                {serverMessage.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                <span className="text-xs font-black uppercase italic tracking-tight">
                                    {serverMessage.text}
                                </span>
                            </div>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Field */}
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between tracking-widest">
                                            Confirm Email {touchedFields.email && !errors.email && <CheckCircle2 className="size-3 text-green-500" />}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input placeholder="name@example.com" {...field} className={`pl-10 h-12 rounded-xl transition-all border-2 ${getStatusClass('email')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold text-red-600" />
                                    </FormItem>
                                )} />

                                {/* New Password Field */}
                                <FormField control={form.control} name="newPassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between tracking-widest">
                                            New Password {touchedFields.newPassword && !errors.newPassword && <CheckCircle2 className="size-3 text-green-500" />}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input type="password" placeholder="••••••••" {...field} className={`pl-10 h-12 rounded-xl transition-all border-2 ${getStatusClass('newPassword')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold leading-tight text-red-600" />
                                    </FormItem>
                                )} />

                                <Button
                                    type="submit"
                                    disabled={isLoading || !form.formState.isValid}
                                    className="w-full h-14 rounded-2xl text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex gap-2"
                                >
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