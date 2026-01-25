'use client'
import React from 'react'
import { Star } from 'lucide-react'
import { cn } from "@/lib/utils" // دالة دمج الكلاسات من shadcn

interface StarProps {
    className?: string;
    fill?: boolean;
}

export default function Mystar({ className, fill = true }: StarProps) {
    return (
        <Star
            className={cn(
                "size-5 transition-all",
                fill ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300",
                className
            )}
        />
    )
}