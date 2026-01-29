'use client' // ملفات الـ Error لازم تكون Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCcw } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Captured Error:', error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="bg-red-50 p-6 rounded-[40px] mb-8">
                <AlertCircle className="size-16 text-red-600 animate-pulse" />
            </div>

            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4 text-slate-900">
                Oops! Server is Resting
            </h2>

            <p className="text-slate-500 text-lg font-medium max-w-md mb-10 leading-relaxed">
                Our data source seems to be temporarily unavailable. Don&apos;t worry, it&apos;s not you, it&apos;s us (or our API).
            </p>

            <div className="flex gap-4">
                <Button
                    size="lg"
                    onClick={() => reset()} // دالة reset بتحاول تعيد تحميل الـ Component اللي باظ بس
                    className="h-14 px-8 text-lg font-black rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200"
                >
                    <RefreshCcw className="mr-2 size-5" /> TRY AGAIN
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-lg font-black rounded-2xl border-2 border-slate-200"
                    asChild
                >
                    <a href="/">GO HOME</a>
                </Button>
            </div>

            <p className="mt-12 text-sm text-slate-400 font-bold uppercase tracking-widest">
                Error Code: 500_INTERNAL_SERVER_STRIKE
            </p>
        </div>
    )
}