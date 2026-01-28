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
import { Loader2, ShieldCheck, ArrowRight, RefreshCcw } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { verifyResetCodeAction } from "./_actions/verifyResetCodeAction"

const verifySchema = z.object({
    resetCode: z.string().min(1, "Code is required"),
})

type VerifyFields = z.infer<typeof verifySchema>

export default function VerifyCode() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<VerifyFields>({
        resolver: zodResolver(verifySchema),
        mode: "onChange",
        defaultValues: { resetCode: "" },
    })

    async function onSubmit(values: VerifyFields) {
        setIsLoading(true)
        const result = await verifyResetCodeAction(values.resetCode)

        if (result.success) {
            toast.success("Code verified! You can now reset your password.")
            // الخطوة التالية هي صفحة تعيين الباسورد الجديد
            router.push("/reset-password")
        } else {
            toast.error(result.error)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[85vh] px-4">
            <div className="w-full max-w-md">
                <div className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                    {/* Header */}
                    <div className="bg-slate-50/80 p-10 text-center space-y-3 border-b">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tight">Verify Code</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Enter the 6-digit code sent to your email
                        </p>
                    </div>

                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="resetCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                                Verification Code
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        placeholder="Ex: 535863"
                                                        {...field}
                                                        className="h-14 text-center text-2xl font-black tracking-[0.5em] rounded-xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-[10px] italic font-bold text-center" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 flex gap-2"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : (
                                        <>
                                            Verify Code <ArrowRight size={20} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => router.back()}
                                className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase italic"
                            >
                                <RefreshCcw size={14} />
                                Resend or Change Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}