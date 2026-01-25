import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="container mx-auto min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="relative">
                <span className="text-[150px] md:text-[200px] font-black leading-none text-slate-100 select-none">
                    404
                </span>
                <div className="absolute inset-0 flex items-center justify-center mt-8">
                    <Search className="h-24 w-24 text-blue-600 animate-bounce" />
                </div>
            </div>

            <div className="text-center space-y-4 -mt-4 relative z-10">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Oops! Page not found.</h2>
                <p className="text-muted-foreground text-xl font-medium max-w-md mx-auto italic">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </div>

            <div className="mt-12">
                <Link href="/">
                    <Button className="h-14 px-10 text-xl font-black rounded-2xl shadow-xl shadow-blue-200">
                        <Home className="mr-3 h-6 w-6" /> Back to Safety
                    </Button>
                </Link>
            </div>
        </div>
    )
}