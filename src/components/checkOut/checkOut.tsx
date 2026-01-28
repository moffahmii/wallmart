'use client'
import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from 'lucide-react'

export default function CheckOut({ cartId }: { cartId: string }) {

    const detailsInput = useRef<HTMLInputElement | null>(null)
    const cityInput = useRef<HTMLInputElement | null>(null)
    const phoneInput = useRef<HTMLInputElement | null>(null)

    async function checkOutSession(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        const shippingAddress = {
            details: detailsInput.current?.value,
            city: cityInput.current?.value,
            phone: phoneInput.current?.value
        }
        const response = await fetch(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            {
                method: "POST",
                headers: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzRmOTdjZmM5YTIxZTBlNjUxODViNiIsIm5hbWUiOiJNb2hhbWVkIEZhaG1pIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjkyNzM3MjQsImV4cCI6MTc3NzA0OTcyNH0.s_Q2cgX25IHT026pX9Nlp6wn6fraAYGwoe3iMhRnqrY',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(shippingAddress)
            }
        )

        const data = await response.json()
        console.log(data)
        if (data.status == 'success') {
            window.location.href = data.session.url
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full cursor-pointer text-lg bg mt-4' variant="outline">
                        Proceed to Checkout
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>Add shipping address</DialogTitle>
                        <DialogDescription>Make sure your data is accurate!</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>City</Label>
                            <Input id="city" ref={cityInput} />
                        </div>
                        <div className="grid gap-3">
                            <Label>Details</Label>
                            <Input id="details" ref={detailsInput} />
                        </div>
                        <div className="grid gap-3">
                            <Label>Phone</Label>
                            <Input id="phone" ref={phoneInput} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={checkOutSession} type="button">
                            <CreditCard /> Visa
                        </Button>
                        <Button type="button"> Cash</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
