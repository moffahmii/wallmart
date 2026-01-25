'use client'
import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative flex flex-col items-center gap-4">

                {/* Spinner Outer Ring */}
                <div className="relative">
                    <Loader2 className="h-16 w-16 animate-spin text-blue-600 stroke-[1.5px]" />

                    {/* Optional: Glow effect behind the spinner */}
                    <div className="absolute inset-0 blur-2xl bg-blue-400/20 rounded-full"></div>
                </div>

                {/* Brand Text */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                        WallMart
                    </h2>
                    <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mt-1">
                        Loading Experience...
                    </p>
                </div>

                {/* Progress Bar (Decorative) */}
                <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-blue-600 animate-progress-loading"></div>
                </div>
            </div>
        </div>
    )
}