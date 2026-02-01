"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
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
import { useSearchParams, useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Lock, Mail, XCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required"),
})

type FormFields = z.infer<typeof formSchema>

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    async function onSubmit(values: FormFields) {
        setIsLoading(true)
        const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: "/",
            redirect: true,
        })
        setIsLoading(false)
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-[75vh] px-4 py-8">
            <div className="w-full max-w-md p-0">
                <div className="border-none shadow-2xl rounded-[28px] overflow-hidden bg-white">
                    <div className="bg-slate-50/60 p-10 text-center space-y-3 border-b border-slate-100">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <Lock size={30} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight uppercase italic">
                            Welcome Back
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Access your account
                        </p>
                    </div>
                    <div className="p-8 bg-card">
                        {searchParams.get("error") && (
                            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 flex items-start gap-2">
                                <XCircle className="mt-0.5 h-5 w-5" />
                                <span>{searchParams.get("error")}</span>
                            </div>
                        )}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3.5 text-slate-400 size-4" />
                                                    <Input
                                                        placeholder="name@example.com"
                                                        {...field}
                                                        className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-600 focus:ring-blue-600"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="font-bold italic text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex justify-between items-center">
                                                <FormLabel className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                                                    Password
                                                </FormLabel>
                                                <Link
                                                    href="/forgot-password"
                                                    className="text-[10px] font-bold uppercase italic text-blue-600 hover:underline"
                                                >
                                                    Forgot Password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <div className="relative flex items-center"> 
                                                    <Lock className="absolute left-3 text-slate-400 size-4 z-20" />
                                                    <Input
                                                        autoComplete="new-password" 
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        {...field}
                                                        className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:border-blue-600 focus:ring-blue-600 z-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword((prev) => !prev)}
                                                        className="absolute right-3 z-20 p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer" // أضفنا z-20 و cursor-pointer
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="size-4" />
                                                        ) : (
                                                            <Eye className="size-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="font-bold italic text-xs" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl text-lg font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="animate-spin size-5" />
                                            <span>Authenticating...</span>
                                        </div>
                                    ) : (
                                        "Login Now"
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="bg-slate-50/60 p-6 text-center border-t">
                        <p className="text-slate-500 font-medium text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 font-black hover:underline italic uppercase ml-1"
                            >
                                Register Free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}