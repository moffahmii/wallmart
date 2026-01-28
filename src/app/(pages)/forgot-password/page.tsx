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
import { Loader2, Mail, KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { forgotPasswordAction } from "../login/_actions/forgotPasswordAction"

const forgotSchema = z.object({
    email: z.string().email("Invalid email address"),
})

type ForgotFields = z.infer<typeof forgotSchema>

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<ForgotFields>({
        resolver: zodResolver(forgotSchema),
        mode: "onChange",
        defaultValues: { email: "" },
    })

    const { errors, touchedFields } = form.formState

    async function onSubmit(values: ForgotFields) {
        setIsLoading(true)
        const result = await forgotPasswordAction(values.email)

        if (result.success) {
            toast.success("Success! Please check your email for the reset code.")
            // الـ Route API بيحتاج الخطوة الجاية تكون التحقق من الـ Reset Code
            router.push("/verify-code")
        } else {
            toast.error(result.error || "Something went wrong")
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[85vh] px-4 bg-slate-50/30">
            <div className="w-full max-w-md">
                <div className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                    {/* Header */}
                    <div className="bg-slate-50/80 p-10 text-center space-y-3 border-b border-slate-100">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <KeyRound size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tight text-slate-900">
                            Reset Password
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            Enter your email to recover your account
                        </p>
                    </div>
                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center mb-1">
                                                <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                                    Email Address
                                                </FormLabel>
                                                {!errors.email && touchedFields.email && (
                                                    <CheckCircle2 className="size-3 text-green-500" />
                                                )}
                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className={`absolute left-3 top-3.5 size-4 transition-colors ${touchedFields.email ? (errors.email ? 'text-red-400' : 'text-green-500') : 'text-slate-400'}`} />
                                                    <Input
                                                        placeholder="routeegypt@gmail.com"
                                                        {...field}
                                                        className={`pl-10 h-12 rounded-xl transition-all duration-200 border-2 ${touchedFields.email
                                                                ? (errors.email ? "border-red-500 bg-red-50/30 focus-visible:ring-red-500" : "border-green-500 bg-green-50/30 focus-visible:ring-green-500")
                                                                : "border-slate-100 focus:border-blue-600"
                                                            }`}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] italic font-bold text-red-600" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    disabled={isLoading || !form.formState.isValid}
                                    className="w-full h-14 rounded-2xl text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin size-5" />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        "Verify Email"
                                    )}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-8 text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase italic tracking-tighter"
                            >
                                <ArrowLeft size={14} />
                                Back to Login Screen
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    WallMart Security System v2.0
                </p>
            </div>
        </div>
    )
}