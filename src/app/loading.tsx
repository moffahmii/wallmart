import { Loader } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return <>
        <div className="flex items-center justify-center min-h-screen">
            <h1>Loading<Loader className='animate-spin' /></h1>
        </div>
    </>
}
