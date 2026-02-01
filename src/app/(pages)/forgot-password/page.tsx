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
import { Loader2, Mail, KeyRound, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { forgotPasswordAction } from "../login/_actions/forgotPasswordAction"

const forgotSchema = z.object({
    email: z.string().email("Invalid email address"),
})

type ForgotFields = z.infer<typeof forgotSchema>

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [serverMessage, setServerMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)
    const router = useRouter()
    const form = useForm<ForgotFields>({
        resolver: zodResolver(forgotSchema),
        mode: "onChange",
        defaultValues: { email: "" },
    })
    const { errors, touchedFields } = form.formState
    async function onSubmit(values: ForgotFields) {
        setIsLoading(true)
        setServerMessage(null) 

        const result = await forgotPasswordAction(values.email)

        if (result.success) {
            setServerMessage({
                type: 'success',
                text: "Success! We've sent a code to your email."
            })
            setTimeout(() => router.push("/verify-code"), 2000)
        } else {
            setServerMessage({
                type: 'error',
                text: "We couldn't find an account with that email."
            })
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[85vh] px-4 bg-slate-50/30">
            <div className="w-full max-w-md">
                <div className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
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
                                                        placeholder="name@example.com"
                                                        {...field}
                                                        autoComplete="off"
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
                                    type="submit"
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
                <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    WallMart Security System v2.0
                </p>
            </div>
        </div>
    )
}