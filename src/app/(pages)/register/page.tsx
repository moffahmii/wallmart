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
import { useRouter } from "next/navigation"
import { Loader2, User, Mail, Lock, UserPlus, CheckCircle2, Phone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner" // أو استخدم shadcn toast
import { registerAction } from "./_actions/registerAction"

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Starts with Uppercase, use special char"),
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
})
type FormFields = z.infer<typeof formSchema>
export default function Register() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    })

    const { errors, touchedFields } = form.formState
    async function onSubmit(values: FormFields) {
        setIsLoading(true)
        const result = await registerAction(values)
        if (result.success) {
            toast.success("Account created successfully! Redirecting...")
            setTimeout(() => router.push("/login"), 2000)
        } else {
            toast.error(result.error)
        }
        setIsLoading(false)
    }

    const getStatusClass = (name: keyof FormFields) => {
        if (!touchedFields[name]) return "border-slate-200"
        return errors[name] ? "border-red-500 bg-red-50/30" : "border-green-500 bg-green-50/30"
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen px-4 py-12 bg-slate-50/30">
            <div className="w-full max-w-md">
                <div className="border-none shadow-2xl rounded-[32px] overflow-hidden bg-white">
                    <div className="bg-slate-50/80 p-8 text-center space-y-3 border-b">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <UserPlus size={30} />
                        </div>
                        <h1 className="text-3xl font-black uppercase italic tracking-tight">Join WallMart</h1>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create your account</p>
                    </div>
                    <div className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Name {touchedFields.name && !errors.name && <CheckCircle2 className="size-3 text-green-500" />}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input {...field} placeholder="Abc"
                                                className={`pl-10 h-11 rounded-xl transition-all ${getStatusClass('name')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Email {touchedFields.email && !errors.email && <CheckCircle2 className="size-3 text-green-500" />}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input placeholder="email@example.con" {...field} className={`pl-10 h-11 rounded-xl transition-all ${getStatusClass('email')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Phone {touchedFields.phone && !errors.phone && <CheckCircle2 className="size-3 text-green-500" />}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input placeholder="01xxxxxxxxx" {...field} className={`pl-10 h-11 rounded-xl transition-all ${getStatusClass('phone')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Password {touchedFields.password && !errors.password && <CheckCircle2 className="size-3 text-green-500" />}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input type="password" {...field} className={`pl-10 h-11 rounded-xl transition-all ${getStatusClass('password')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="rePassword" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase text-slate-500 flex justify-between">Confirm Password {touchedFields.rePassword && !errors.rePassword && <CheckCircle2 className="size-3 text-green-500" />}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3.5 size-4 text-slate-400" />
                                                <Input type="password" {...field} className={`pl-10 h-11 rounded-xl transition-all ${getStatusClass('rePassword')}`} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] italic font-bold" />
                                    </FormItem>
                                )} />
                                <Button disabled={isLoading} className="w-full h-12 rounded-xl text-md font-black uppercase italic bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 mt-4 transition-all active:scale-95">
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up Free"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="bg-slate-50/80 p-6 text-center border-t text-sm font-medium">
                        Already a member? <Link href="/login" className="text-blue-600 font-black italic uppercase hover:underline">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}